const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function testTextureInpaint() {
  const inputImagePath = path.join(__dirname, '../public/images/projects/thiet-ke-va-thi-cong-nha-o-phong-cach-hien-dai/photo-1.jpg');
  const outputPath = path.join(__dirname, '../public/images/test-inpaint.jpg');

  const image = sharp(inputImagePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  const rawImage = await image.raw().toBuffer({ resolveWithObject: true });
  const { data, info } = rawImage;
  const channels = info.channels;

  // Let's inspect bottom watermark area:
  // y between height * 0.93 and height * 0.975
  // x between width * 0.20 and width * 0.80
  const yStart = Math.floor(height * 0.93);
  const yEnd = Math.floor(height * 0.975);
  const xStart = Math.floor(width * 0.20);
  const xEnd = Math.floor(width * 0.80);
  const stripHeight = yEnd - yStart;

  // For pixels inside this box, we can copy texture from directly above (yStart - offset)
  // with a soft horizontal and vertical feathering
  const outData = Buffer.from(data);

  for (let y = yStart; y <= yEnd; y++) {
    const progressY = (y - yStart) / stripHeight; // 0 to 1
    // Sample from yStart - 5 to yStart - stripHeight - 5
    const sampleY = Math.max(0, yStart - 2 - Math.floor((y - yStart) * 0.8));

    for (let x = xStart; x <= xEnd; x++) {
      // Calculate horizontal feather (0 at edges, 1 in middle)
      const edgeDist = Math.min(x - xStart, xEnd - x);
      const featherX = Math.min(1, edgeDist / 30);
      
      const targetIdx = (y * width + x) * channels;
      const sampleIdx = (sampleY * width + x) * channels;

      // Vertical feather at top and bottom of box
      const featherY = Math.min(1, Math.min(y - yStart, yEnd - y) / 6);
      const alpha = featherX * featherY;

      for (let c = 0; c < 3; c++) {
        const origVal = data[targetIdx + c];
        const sampleVal = data[sampleIdx + c];
        outData[targetIdx + c] = Math.round(origVal * (1 - alpha) + sampleVal * alpha);
      }
    }
  }

  // Also clean top-left logo: x: 0 to width * 0.12, y: 0 to height * 0.10
  const topYStart = 0;
  const topYEnd = Math.floor(height * 0.10);
  const topXStart = 0;
  const topXEnd = Math.floor(width * 0.12);

  for (let y = topYStart; y <= topYEnd; y++) {
    for (let x = topXStart; x <= topXEnd; x++) {
      // Sample from right of the logo (topXEnd + offset) or below
      const sampleX = Math.min(width - 1, topXEnd + 5 + Math.floor((topXEnd - x) * 0.5));
      const sampleY = y;

      const featherX = Math.min(1, (topXEnd - x) / 10);
      const featherY = Math.min(1, (topYEnd - y) / 10);
      const alpha = Math.min(1, Math.max(0, 1 - (x / (topXEnd))));

      const targetIdx = (y * width + x) * channels;
      const sampleIdx = (sampleY * width + sampleX) * channels;

      if (x < topXEnd * 0.85 && y < topYEnd * 0.85) {
        for (let c = 0; c < 3; c++) {
          outData[targetIdx + c] = data[sampleIdx + c];
        }
      }
    }
  }

  await sharp(outData, {
    raw: {
      width,
      height,
      channels
    }
  })
  .jpeg({ quality: 95 })
  .toFile(outputPath);

  console.log('Saved inpaint test to:', outputPath);
}

testTextureInpaint().catch(console.error);

