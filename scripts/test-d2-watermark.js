const sharp = require('sharp');
const path = require('path');

async function testWithNewWatermark() {
  const inputImagePath = path.join(__dirname, '../public/images/projects/thiet-ke-va-thi-cong-nha-o-phong-cach-hien-dai/photo-1.jpg');
  const logoPath = path.join(__dirname, '../public/images/logo.png');
  const outputPath = path.join(__dirname, '../public/images/test-d2-watermark.jpg');

  const image = sharp(inputImagePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  const rawImage = await image.raw().toBuffer({ resolveWithObject: true });
  const { data, info } = rawImage;
  const channels = info.channels;

  // 1. Inpaint bottom watermark area
  const yStart = Math.floor(height * 0.93);
  const yEnd = Math.floor(height * 0.975);
  const xStart = Math.floor(width * 0.18);
  const xEnd = Math.floor(width * 0.82);
  const stripHeight = yEnd - yStart;

  const outData = Buffer.from(data);

  for (let y = yStart; y <= yEnd; y++) {
    const sampleY = Math.max(0, yStart - 2 - Math.floor((y - yStart) * 0.8));
    for (let x = xStart; x <= xEnd; x++) {
      const edgeDist = Math.min(x - xStart, xEnd - x);
      const featherX = Math.min(1, edgeDist / 30);
      const featherY = Math.min(1, Math.min(y - yStart, yEnd - y) / 6);
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

  // 2. Inpaint top-left logo area
  const topYEnd = Math.floor(height * 0.10);
  const topXEnd = Math.floor(width * 0.12);

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
  const fontSize = Math.max(12, Math.round(height * 0.022));
  const letterSpacing = Math.round(fontSize * 0.6);
  
  const watermarkSvg = `
    <svg width="${width}" height="${height}">
      <defs>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000000" flood-opacity="0.8" />
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
  const logoHeight = Math.round(height * 0.08);
  const topLogo = await sharp(logoPath)
    .resize({ height: logoHeight, fit: 'inside' })
    .toBuffer();

  const inpaintedJpeg = await sharp(outData, {
    raw: { width, height, channels }
  }).jpeg().toBuffer();

  await sharp(inpaintedJpeg)
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
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log('Saved D2 watermark test to:', outputPath);
}

testWithNewWatermark().catch(console.error);

