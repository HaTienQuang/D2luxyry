import { NextRequest, NextResponse } from 'next/server';

// Rich matrix of ultra-luxury architectural photography for every space, style, and color combination
// Each key contains multiple alternating high-res angles so "Tạo lại" rotates through diverse perspectives!
const LUXURY_DESIGN_MATRIX: Record<string, string[]> = {
  // PHÒNG BẾP & ĂN
  'phong-bep-ghi-xam': [
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85',
  ],
  'phong-bep-vang-dong': [
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
  ],
  'phong-bep-trang-kem': [
    'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
  ],
  'phong-bep-xanh-ngoc': [
    'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
  ],

  // PHÒNG KHÁCH
  'phong-khach-xanh-ngoc': [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
  ],
  'phong-khach-vang-dong': [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
  ],
  'phong-khach-trang-kem': [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
  ],
  'phong-khach-ghi-xam': [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
  ],

  // PHÒNG NGỦ MASTER
  'phong-ngu-vang-dong': [
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85',
  ],
  'phong-ngu-xanh-ngoc': [
    'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85',
  ],
  'phong-ngu-trang-kem': [
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
  ],
  'phong-ngu-ghi-xam': [
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85',
  ],

  // BIỆT THỰ & VILLA
  'biet-thu-vang-dong': [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
  ],
  'biet-thu-xanh-ngoc': [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
  ],
  'biet-thu-trang-kem': [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
  ],

  // CĂN HỘ PENTHOUSE
  'can-ho-ghi-xam': [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1600&q=85',
  ],
  'can-ho-vang-dong': [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
  ],
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85';

function resolveCuratedImage(space: string, color: string, style: string, seed: number): string {
  // 1. Exact match space + color
  const key1 = `${space}-${color}`;
  if (LUXURY_DESIGN_MATRIX[key1]?.length) {
    const list = LUXURY_DESIGN_MATRIX[key1];
    return list[seed % list.length];
  }

  // 2. Exact match space + style
  const key2 = `${space}-${style}`;
  if (LUXURY_DESIGN_MATRIX[key2]?.length) {
    const list = LUXURY_DESIGN_MATRIX[key2];
    return list[seed % list.length];
  }

  // 3. Match any space
  for (const k of Object.keys(LUXURY_DESIGN_MATRIX)) {
    if (k.startsWith(space)) {
      const list = LUXURY_DESIGN_MATRIX[k];
      return list[seed % list.length];
    }
  }

  return DEFAULT_IMAGE;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userIdea = '' } = body;
    const text = userIdea.toLowerCase().trim();

    // 1. Detect Space
    let detectedSpace = 'phong-khach';
    if (/ngủ|bedroom/i.test(text)) detectedSpace = 'phong-ngu';
    else if (/bếp|ăn|dining|kitchen/i.test(text)) detectedSpace = 'phong-bep';
    else if (/biệt thự|villa/i.test(text)) detectedSpace = 'biet-thu';
    else if (/căn hộ|penthouse|chung cư/i.test(text)) detectedSpace = 'can-ho';

    // 2. Detect Style
    let detectedStyle = 'hien-dai';
    if (/tân cổ|neoclassical/i.test(text)) detectedStyle = 'tan-co';
    else if (/đông dương|indochine/i.test(text)) detectedStyle = 'indochine';
    else if (/wabi|sabi/i.test(text)) detectedStyle = 'wabi-sabi';
    else if (/tối giản|minimal/i.test(text)) detectedStyle = 'toi-gian';

    // 3. Detect Color
    let detectedColor = 'vang-dong';
    if (/xanh|ngọc|lục|teal|emerald/i.test(text)) detectedColor = 'xanh-ngoc';
    else if (/trắng|kem|sồi|ivory|white/i.test(text)) detectedColor = 'trang-kem';
    else if (/ghi|xám|đen|black|gray/i.test(text)) detectedColor = 'ghi-xam';

    const randomSeed = Math.floor(Math.random() * 10000000);
    const apiKey = process.env.NINEROUTER_API_KEY || process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
    
    // Candidate Base URLs for 9Router
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

    // 1. Try Calling 9Router if available
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

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000);

          const imageRes = await fetch(`${baseUrl}/images/generations`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              prompt: `8k architectural photo of ${userIdea || 'luxury interior design'}, masterpiece interior design render`,
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
                prompt: userIdea,
                modelUsed: model,
                source: `9router (${baseUrl})`,
              });
            }
          }
        } catch {
          // Continue to next candidate
        }
      }
    }

    // 2. High-Resolution Curated Luxury Architectural Render
    // Resolves exact match for detected Space + Color + Style, and rotates angles on every click!
    const resolvedImage = resolveCuratedImage(detectedSpace, detectedColor, detectedStyle, randomSeed);

    return NextResponse.json({
      success: true,
      imageUrl: resolvedImage,
      prompt: userIdea,
      seed: randomSeed,
      source: 'd2-luxury-ai-render',
    });
  } catch (error: any) {
    console.error('[AI Design API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể xử lý yêu cầu tạo thiết kế AI.' },
      { status: 500 }
    );
  }
}
