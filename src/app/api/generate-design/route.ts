import { NextRequest, NextResponse } from 'next/server';

// Curated luxury architectural presets for fallback or instant preview
const PRESET_GALLERY: Record<string, string> = {
  'phong-khach-hien-dai': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
  'phong-khach-tan-co': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
  'phong-khach-indochine': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
  'phong-khach-wabi-sabi': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
  'phong-khach-toi-gian': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',

  'phong-ngu-hien-dai': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
  'phong-ngu-tan-co': 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85',
  'phong-ngu-indochine': 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1600&q=85',
  'phong-ngu-wabi-sabi': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85',
  'phong-ngu-toi-gian': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85',

  'phong-bep-hien-dai': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
  'phong-bep-tan-co': 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=85',
  'phong-bep-indochine': 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85',
  
  'biet-thu-hien-dai': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
  'biet-thu-tan-co': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
  
  'can-ho-hien-dai': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
  'can-ho-toi-gian': 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1600&q=85',
};

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85';

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
      specialRequirements = '',
    } = body;

    // Build rich, photorealistic 8K prompt for 9router / AI Image models
    const prompt = `Ultra-luxurious 8k photorealistic architectural interior photograph of a ${spaceLabel} (${spaceType}), designed in masterclass ${styleLabel} aesthetic by D2 Luxury Design. Color theme: ${colorLabel}. Details: ${specialRequirements ? specialRequirements + ', ' : ''}bespoke high-end furnishings, cinematic ambient warm architectural lighting, rich Italian marble, refined woodwork, photorealistic V-Ray render, 35mm lens, depth of field, award-winning interior architecture showcase.`;

    const apiKey = process.env.NINEROUTER_API_KEY || process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
    
    // Candidate Base URLs (Tunnel URL or Localhost)
    const baseUrls = [
      process.env.NINEROUTER_BASE_URL,
      'https://rwudvfk.abc-tunnel.us/v1',
      'http://localhost:20128/v1',
      'https://api.9router.com/v1',
    ].filter(Boolean) as string[];

    const model = process.env.NINEROUTER_MODEL || 'flux-1.1-pro';

    // Try calling 9router endpoints
    for (const baseUrl of baseUrls) {
      try {
        console.log(`[AI Design API] Trying 9router endpoint: ${baseUrl} with model: ${model}`);
        
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        if (apiKey) {
          headers['Authorization'] = `Bearer ${apiKey}`;
        }

        // 1. First attempt: Standard Images Generation endpoint (/images/generations)
        const imageRes = await fetch(`${baseUrl}/images/generations`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            prompt: prompt,
            model: model,
            n: 1,
            size: '1024x1024',
            response_format: 'url',
          }),
        });

        if (imageRes.ok) {
          const data = await imageRes.json();
          const imgUrl = data?.data?.[0]?.url || (data?.data?.[0]?.b64_json ? `data:image/png;base64,${data.data[0].b64_json}` : null);
          if (imgUrl) {
            return NextResponse.json({
              success: true,
              imageUrl: imgUrl,
              prompt: prompt,
              source: `9router (${baseUrl})`,
            });
          }
        }

        // 2. Second attempt: Chat Completions endpoint (/chat/completions)
        const chatRes = await fetch(`${baseUrl}/chat/completions`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: 'user',
                content: `Generate an 8k architectural interior design image: ${prompt}`,
              },
            ],
          }),
        });

        if (chatRes.ok) {
          const chatData = await chatRes.json();
          const content = chatData?.choices?.[0]?.message?.content || '';
          
          // Check if markdown image link exists: ![...](url) or http...
          const mdMatch = content.match(/!\[.*?\]\((https?:\/\/[^\s)]+)\)/);
          const urlMatch = content.match(/https?:\/\/[^\s)]+\.(jpg|jpeg|png|webp)/i);
          const foundUrl = mdMatch ? mdMatch[1] : (urlMatch ? urlMatch[0] : null);

          if (foundUrl) {
            return NextResponse.json({
              success: true,
              imageUrl: foundUrl,
              prompt: prompt,
              source: `9router-chat (${baseUrl})`,
            });
          }
        }
      } catch (err: any) {
        console.warn(`[AI Design API] Endpoint ${baseUrl} failed:`, err.message);
      }
    }

    // Smart Preset fallback when API Key is not set or during trial/demo
    const presetKey = `${spaceType}-${style}`;
    const fallbackImage = PRESET_GALLERY[presetKey] || PRESET_GALLERY[`phong-khach-${style}`] || DEFAULT_FALLBACK;

    return NextResponse.json({
      success: true,
      imageUrl: fallbackImage,
      prompt: prompt,
      source: apiKey ? 'preset-fallback' : 'demo-preview',
      note: apiKey ? undefined : 'Vui lòng cấu hình NINEROUTER_API_KEY trong file .env.local hoặc Vercel để kích hoạt tạo ảnh AI trực tiếp.',
    });
  } catch (error: any) {
    console.error('[AI Design API] Server error:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể xử lý yêu cầu tạo thiết kế AI.' },
      { status: 500 }
    );
  }
}
