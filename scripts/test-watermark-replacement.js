const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function testReplaceWatermark() {
  const inputImagePath = path.join(__dirname, '../public/images/projects/thiet-ke-va-thi-cong-nha-o-phong-cach-hien-dai/photo-1.jpg');
  const logoPath = path.join(__dirname, '../public/images/logo.png');
  const outputPath = path.join(__dirname, '../public/images/test-output.jpg');

  const image = sharp(inputImagePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  console.log(`Original image: ${width}x${height}`);

  // In 1440x808:
  // The bottom watermark "D ' L U X U R Y   D E S I G N" is at:
  // y: around height * 0.92 to height * 0.97
  // x: center ~ width * 0.30 to width * 0.70
  
  // Let's create an overlay with SVG text or D2 Luxury Design badge that covers and replaces it cleanly!
  // We can create a subtle, sleek dark gradient bar or elegant badge with "D2 LUXURY DESIGN",
  // OR we can create an SVG overlay with the crisp gold/white "D2 LUXURY DESIGN" typography!

  const badgeHeight = Math.round(height * 0.05);
  const badgeWidth = Math.round(width * 0.42);
  const fontSize = Math.round(height * 0.024);

  const bottomOverlaySvg = `
    <svg width="${width}" height="${height}">
      <defs>
        <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.75" />
          <stop offset="70%" stop-color="#000000" stop-opacity="0.55" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.0" />
        </radialGradient>
      </defs>

      <!-- Background soft shadow to cover old text -->
      <rect x="${(width - badgeWidth) / 2}" y="${height * 0.92}" width="${badgeWidth}" height="${badgeHeight}" fill="url(#bgGrad)" rx="6" />

      <!-- Official D2 Luxury Design text -->
      <text 
        x="${width / 2}" 
        y="${height * 0.955}" 
        font-family="'Be Vietnam Pro', 'Segoe UI', Arial, sans-serif" 
        font-size="${fontSize}" 
        font-weight="800" 
        letter-spacing="6px" 
        fill="#FFFFFF" 
        text-anchor="middle"
        style="text-transform: uppercase;"
      >
        D2 LUXURY DESIGN
      </text>
    </svg>
  `;

  // Top-left logo cover / replacement
  const topLogoSize = Math.round(height * 0.08);
  const topLogo = await sharp(logoPath)
    .resize(Math.round(topLogoSize * 1.1), topLogoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const topOverlaySvg = `
    <svg width="${width}" height="${height}">
      <defs>
        <radialGradient id="topBgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.75" />
          <stop offset="80%" stop-color="#000000" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.0" />
        </radialGradient>
      </defs>
      <!-- Background soft shadow to cover old top-left logo -->
      <rect x="${width * 0.01}" y="${height * 0.015}" width="${width * 0.12}" height="${height * 0.09}" fill="url(#topBgGrad)" rx="8" />
    </svg>
  `;

  await sharp(inputImagePath)
    .composite([
      {
        input: Buffer.from(topOverlaySvg),
        top: 0,
        left: 0,
      },
      {
        input: topLogo,
        top: Math.round(height * 0.02),
        left: Math.round(width * 0.02),
      },
      {
        input: Buffer.from(bottomOverlaySvg),
        top: 0,
        left: 0,
      }
    ])
    .jpeg({ quality: 92 })
    .toFile(outputPath);

  console.log('Saved test image to:', outputPath);
}

testReplaceWatermark().catch(console.error);

