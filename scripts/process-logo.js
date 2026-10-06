const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processLogo() {
  const inputPath = 'C:/Users/quang/.gemini/antigravity/brain/46730750-7156-4d49-8992-93f6adf0ad69/.user_uploaded/media_1791280841590_d30fb9a5.png';
  
  console.log('Loading input logo:', inputPath);
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  console.log(`Dimensions: ${metadata.width}x${metadata.height}, channels: ${metadata.channels}`);

  // First, let's trim whitespace automatically using sharp
  const trimmedBuffer = await image
    .trim({
      threshold: 15, // trim anything close to pure white/corner color
    })
    .toBuffer();

  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  console.log(`Trimmed Dimensions: ${trimmedMeta.width}x${trimmedMeta.height}`);

  // Now, let's also create a transparent version where white background (R>245, G>245, B>245) becomes transparent with smooth anti-aliasing
  const rawImage = await sharp(trimmedBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { data, info } = rawImage;
  const { width, height, channels } = info;

  // Process raw RGBA pixels to remove white background cleanly
  const outBuffer = Buffer.from(data);
  for (let i = 0; i < outBuffer.length; i += channels) {
    const r = outBuffer[i];
    const g = outBuffer[i + 1];
    const b = outBuffer[i + 2];
    
    // Check whiteness distance from 255,255,255
    const brightness = (r + g + b) / 3;
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    
    // If it is almost pure white and very low saturation (grey/white bg)
    if (brightness > 248 && maxDiff < 10) {
      outBuffer[i + 3] = 0; // completely transparent
    } else if (brightness > 235 && maxDiff < 12) {
      // smooth alpha feather
      const alphaFactor = (248 - brightness) / (248 - 235);
      outBuffer[i + 3] = Math.round(outBuffer[i + 3] * Math.max(0, Math.min(1, alphaFactor)));
    }
  }

  const finalTransparent = await sharp(outBuffer, {
    raw: {
      width,
      height,
      channels
    }
  })
  .trim() // final tight trim
  .png()
  .toBuffer();

  const finalMeta = await sharp(finalTransparent).metadata();
  console.log(`Final Transparent Dimensions: ${finalMeta.width}x${finalMeta.height}`);

  // Save to public/images/logo.png and public/images/logo-tight.png
  fs.writeFileSync(path.join(__dirname, '../public/images/logo.png'), finalTransparent);
  fs.writeFileSync(path.join(__dirname, '../public/images/logo-tight.png'), finalTransparent);
  
  // Also save a trimmed high-res JPEG/white version if ever needed
  await sharp(trimmedBuffer).jpeg({ quality: 95 }).toFile(path.join(__dirname, '../public/images/logo.jpg'));
  
  // Update icon.png for favicon
  await sharp(finalTransparent).resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toFile(path.join(__dirname, '../src/app/icon.png'));

  console.log('Logo processing completed successfully!');
}

processLogo().catch(console.error);
