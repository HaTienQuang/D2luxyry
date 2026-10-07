const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const BASE_DIR = path.join(__dirname, '../public/images');
const LOGO_PATH = path.join(BASE_DIR, 'logo.png');

// Find all image files recursively
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllImageFiles(fullPath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file).toLowerCase();
      
      // Filter only project/content photos, skip logos/qr/temp files
      if (
        (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp') &&
        !baseName.includes('logo') &&
        !baseName.includes('zalo') &&
        !baseName.startsWith('test-')
      ) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

async function processSingleImage(filePath, logoBuffer) {
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    const { width, height } = metadata;

    if (!width || !height || width < 200 || height < 200) {
      return; // Skip icons or too small assets
    }

    const rawImage = await image.raw().toBuffer({ resolveWithObject: true });
    const { data, info } = rawImage;
    const channels = info.channels;

    if (channels < 3) return; // Skip grayscale if any

    // 1. Inpaint bottom watermark area: y from 91% to 97.5%, x from 16% to 84%
    const yStart = Math.floor(height * 0.91);
    const yEnd = Math.floor(height * 0.978);
    const xStart = Math.floor(width * 0.16);
    const xEnd = Math.floor(width * 0.84);
    const stripHeight = yEnd - yStart;

    const outData = Buffer.from(data);

    for (let y = yStart; y <= yEnd; y++) {
      // Texture source sample from above the watermark box
      const sampleY = Math.max(0, yStart - 2 - Math.floor((y - yStart) * 0.75));
      for (let x = xStart; x <= xEnd; x++) {
        const edgeDist = Math.min(x - xStart, xEnd - x);
        const featherX = Math.min(1, edgeDist / 25);
        const featherY = Math.min(1, Math.min(y - yStart, yEnd - y) / 5);
        const alpha = featherX * featherY;

        const targetIdx = (y * width + x) * channels;
        const sampleIdx = (sampleY * width + x) * channels;

        for (let c = 0; c < 3; c++) {
          const origVal = data[targetIdx + c];
          const sampleVal = data[sampleIdx + c];
          outData[targetIdx + c] = Math.round(origVal * (1 - alpha) + sampleVal * alpha);
        }
      }
    }

    // 2. Inpaint top-left logo area: x from 0 to 13%, y from 0 to 11%
    const topYEnd = Math.floor(height * 0.11);
    const topXEnd = Math.floor(width * 0.13);

    for (let y = 0; y <= topYEnd; y++) {
      for (let x = 0; x <= topXEnd; x++) {
        const sampleX = Math.min(width - 1, topXEnd + 5 + Math.floor((topXEnd - x) * 0.5));
        const targetIdx = (y * width + x) * channels;
        const sampleIdx = (y * width + sampleX) * channels;

        if (x < topXEnd * 0.85 && y < topYEnd * 0.85) {
          for (let c = 0; c < 3; c++) {
            outData[targetIdx + c] = data[sampleIdx + c];
          }
        }
      }
    }

    // 3. Render clean, beautiful new D2 LUXURY DESIGN watermark at bottom
    const fontSize = Math.max(11, Math.round(height * 0.022));
    const letterSpacing = Math.round(fontSize * 0.6);
    
    const watermarkSvg = `
      <svg width="${width}" height="${height}">
        <defs>
          <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000000" flood-opacity="0.85" />
          </filter>
        </defs>
        <text 
          x="${width / 2}" 
          y="${Math.round(height * 0.955)}" 
          font-family="'Be Vietnam Pro', 'Segoe UI', Arial, sans-serif" 
          font-size="${fontSize}" 
          font-weight="700" 
          letter-spacing="${letterSpacing}px" 
          fill="#FFFFFF" 
          fill-opacity="0.95"
          text-anchor="middle"
          filter="url(#shadow)"
        >D2 LUXURY DESIGN</text>
      </svg>
    `;

    // 4. Also place the new high-res official D2 3D Logo on top-left
    const logoHeight = Math.max(28, Math.round(height * 0.08));
    const topLogo = await sharp(logoBuffer)
      .resize({ height: logoHeight, fit: 'inside' })
      .toBuffer();

    const inpaintedJpeg = await sharp(outData, {
      raw: { width, height, channels }
    }).jpeg({ quality: 95 }).toBuffer();

    const finalBuffer = await sharp(inpaintedJpeg)
      .composite([
        {
          input: topLogo,
          top: Math.round(height * 0.025),
          left: Math.round(width * 0.025),
        },
        {
          input: Buffer.from(watermarkSvg),
          top: 0,
          left: 0,
        }
      ])
      .jpeg({ quality: 92, mozjpeg: true })
      .toBuffer();

    // Write back atomically
    fs.writeFileSync(filePath, finalBuffer);
  } catch (err) {
    console.error(`Failed to process ${filePath}:`, err.message);
  }
}

async function batchProcess() {
  console.log('--- STARTING BATCH WATERMARK UPDATE ---');
  const allImages = getAllImageFiles(BASE_DIR);
  console.log(`Found ${allImages.length} images to process.`);

  const logoBuffer = fs.readFileSync(LOGO_PATH);

  const CONCURRENCY = 12;
  let completed = 0;
  const startTime = Date.now();

  for (let i = 0; i < allImages.length; i += CONCURRENCY) {
    const chunk = allImages.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(file => processSingleImage(file, logoBuffer)));
    completed += chunk.length;
    
    if (completed % 60 === 0 || completed >= allImages.length) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const percent = ((completed / allImages.length) * 100).toFixed(1);
      console.log(`[${percent}%] Processed ${completed}/${allImages.length} images (${elapsed}s)`);
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`--- ALL ${allImages.length} IMAGES UPDATED SUCCESSFULLY IN ${totalTime}s ---`);
}

batchProcess().catch(console.error);
