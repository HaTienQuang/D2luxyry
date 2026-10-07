import { NextRequest, NextResponse } from 'next/server';

// Comprehensive dictionary translating Vietnamese interior architecture keywords into 8K visual cues
function buildArchitecturalPrompt(userIdea: string, spaceLabel: string, styleLabel: string, colorLabel: string): string {
  const text = (userIdea || '').toLowerCase().trim();

  // 1. Detect Space
  let spaceEn = 'luxury living room';
  if (/ngủ|bedroom/i.test(text)) spaceEn = 'grand master bedroom suite';
  else if (/bếp|ăn|dining|kitchen/i.test(text)) spaceEn = 'open luxury kitchen and dining room';
  else if (/biệt thự|villa/i.test(text)) spaceEn = 'exclusive luxury villa interior residence';
  else if (/căn hộ|penthouse|chung cư/i.test(text)) spaceEn = 'high-end penthouse interior with floor-to-ceiling panoramic view';
  else if (/tắm|bathroom/i.test(text)) spaceEn = 'spa-like luxury master bathroom with freestanding soaking tub';
  else if (/thờ|altar/i.test(text)) spaceEn = 'tranquil traditional Asian altar sacred room';
  else if (/làm việc|office/i.test(text)) spaceEn = 'executive private home office library';
  else if (spaceLabel) {
    if (/ngủ/i.test(spaceLabel)) spaceEn = 'grand master bedroom suite';
    else if (/bếp/i.test(spaceLabel)) spaceEn = 'open luxury kitchen and dining room';
    else if (/biệt thự/i.test(spaceLabel)) spaceEn = 'exclusive luxury villa interior residence';
    else if (/căn hộ/i.test(spaceLabel)) spaceEn = 'high-end penthouse interior';
  }

  // 2. Detect Style
  let styleEn = 'Modern Luxury contemporary aesthetic';
  if (/tân cổ|neoclassical/i.test(text) || /tân cổ/i.test(styleLabel)) {
    styleEn = 'opulent Neoclassical interior, elegant architectural wall mouldings, French luxury aesthetic';
  } else if (/đông dương|indochine/i.test(text) || /indochine/i.test(styleLabel)) {
    styleEn = 'refined Indochine style interior, French colonial elegance merged with authentic Vietnamese heritage, dark tropical woods';
  } else if (/wabi|sabi/i.test(text) || /wabi/i.test(styleLabel)) {
    styleEn = 'Wabi-Sabi organic luxury interior, textured plaster walls, natural raw stone, serene zen atmosphere';
  } else if (/tối giản|minimal/i.test(text) || /tối giản/i.test(styleLabel)) {
    styleEn = 'Warm Minimalism luxury interior, seamless hidden cabinetry, uncluttered refined spatial design';
  } else if (/cổ điển|classic/i.test(text)) {
    styleEn = 'Regal Classical palace interior with intricate gold leaf carvings';
  }

  // 3. Detect Colors
  let colorEn = 'warm amber gold, champagne bronze, and rich neutral earth tones';
  if (/xanh ngọc|xanh lục|màu xanh|xanh lá|emerald|teal/i.test(text) || /xanh/i.test(colorLabel)) {
    colorEn = 'luxurious emerald green, peacock teal, accented with warm golden brass and creamy marble';
  } else if (/trắng|kem|gỗ sồi|ivory|white/i.test(text) || /trắng kem/i.test(colorLabel)) {
    colorEn = 'creamy ivory, warm linen white, natural white oak wood, and soft champagne metal';
  } else if (/ghi|xám|đen|charcoal|black|gray/i.test(text) || /ghi xám/i.test(colorLabel)) {
    colorEn = 'sophisticated charcoal graphite gray, matte black accents, smoked glass, and warm ambient backlighting';
  } else if (/đỏ|ruby/i.test(text)) {
    colorEn = 'regal ruby burgundy accents paired with golden bronze and warm travertine';
  }

  // 4. Enrich Specific Furniture & Material Features
  const features: string[] = [];
  if (/sofa da|da bò|ghế da/i.test(text)) features.push('bespoke Italian top-grain camel brown leather sofa');
  if (/đèn chùm|pha lê|thông tầng/i.test(text)) features.push('monumental sculptural crystal chandelier casting warm golden glow');
  if (/đá cẩm thạch|marble|vách đá|vân mây/i.test(text)) features.push('bookmatched luxury Calacatta marble wall paneling with delicate veins');
  if (/gỗ óc chó|walnut/i.test(text)) features.push('custom American natural walnut wood joinery and fluted panels');
  if (/tủ rượu|cánh kính|led/i.test(text)) features.push('floor-to-ceiling smoked glass illuminated wine display cabinet with integrated warm LED');
  if (/cửa kính|sân vườn|hồ bơi|view/i.test(text)) features.push('massive floor-to-ceiling panoramic glass windows looking out to lush garden and reflecting pool');
  if (/bàn đảo|bếp đảo/i.test(text)) features.push('waterfall monolithic quartz kitchen island with brass barstools');
  if (/trần giật cấp|đèn hắt/i.test(text)) features.push('architectural coffered recessed ceiling with concealed soft warm cove lighting');

  // Construct master rendering prompt
  const userDetails = userIdea ? `Design details: ${userIdea}. ` : '';
  const featureString = features.length > 0 ? `Key features: ${features.join(', ')}. ` : '';

  return `Ultra-luxurious 8k photorealistic architectural interior photograph of a ${spaceEn}, masterfully designed in ${styleEn} by D2 Luxury Design. Color theme: ${colorEn}. ${userDetails}${featureString}Cinematic ambient warm architectural lighting, photorealistic V-Ray and Octane render, 35mm interior lens, soft raytracing shadows, architectural digest masterpiece award-winning showcase.`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      spaceType = 'phong-khach',
      spaceLabel = 'Phòng khách',
      style = 'hien-dai',
      styleLabel = 'Hiện đại sang trọng',
      colorPalette = 'vang-dong',
      colorLabel = 'Tông Vàng Đồng & Trầm Ấm',
      userIdea = '',
      specialRequirements = '',
    } = body;

    const rawIdea = (userIdea || specialRequirements || '').trim();
    const fullPrompt = buildArchitecturalPrompt(rawIdea, spaceLabel, styleLabel, colorLabel);
    const randomSeed = Math.floor(Math.random() * 10000000);

    const apiKey = process.env.NINEROUTER_API_KEY || process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
    
    // Candidate 9Router / AI Gateway Base URLs
    const baseUrls = [
      process.env.NINEROUTER_BASE_URL,
      'https://rwudvfk.abc-tunnel.us/v1',
      'http://localhost:20128/v1',
      'https://ai-gateway.vercel.sh/v1',
      'https://api.9router.com/v1',
    ].filter(Boolean) as string[];

    const candidateModels = [
      process.env.NINEROUTER_MODEL,
      'recraft/recraft-v4.1-flash',
      'bfl/flux-3-image',
      'openai/gpt-image-2.5-sunburst',
      'flux-1.1-pro',
    ].filter(Boolean) as string[];

    // 1. Try calling 9Router / AI Gateway if available
    for (const baseUrl of baseUrls) {
      for (const model of candidateModels) {
        try {
          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
          };
          if (apiKey) {
            headers['Authorization'] = `Bearer ${apiKey}`;
            headers['x-api-key'] = apiKey;
          }

          // Timeout controller of 8 seconds per candidate
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000);

          // A. Try /images/generations
          const imageRes = await fetch(`${baseUrl}/images/generations`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              prompt: fullPrompt,
              model: model,
              n: 1,
              size: '1024x1024',
              response_format: 'url',
            }),
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (imageRes.ok) {
            const data = await imageRes.json();
            const imgUrl = data?.data?.[0]?.url || (data?.data?.[0]?.b64_json ? `data:image/png;base64,${data.data[0].b64_json}` : null);
            if (imgUrl) {
              return NextResponse.json({
                success: true,
                imageUrl: imgUrl,
                prompt: rawIdea || `${spaceLabel} - ${styleLabel}`,
                modelUsed: model,
                source: `9router (${baseUrl})`,
              });
            }
          }
        } catch (err: any) {
          // Continue to next candidate or fallback
        }
      }
    }

    // 2. Real-time Dynamic AI Architectural Render (Flux.1 Engine with unique seed)
    // Ensures every single click and "Tạo lại" creates a brand-new, customized 3D render strictly reflecting the user's prompt!
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const dynamicAiUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1280&height=854&seed=${randomSeed}&nologo=true&enhance=true&model=flux`;

    return NextResponse.json({
      success: true,
      imageUrl: dynamicAiUrl,
      prompt: rawIdea || `${spaceLabel} - ${styleLabel}`,
      seed: randomSeed,
      source: 'flux-ai-engine',
    });
  } catch (error: any) {
    console.error('[AI Design API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể xử lý yêu cầu tạo thiết kế AI.' },
      { status: 500 }
    );
  }
}
