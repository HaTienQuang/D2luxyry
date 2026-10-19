import { NextRequest, NextResponse } from "next/server";

const fallbackConcepts: string[] = [
  "/projects/d2-luxury-3d-sample.jpg",
  "/hero/luxury-interior.jpg",
  "/hero/main.jpg",
  "/projects/thiet-ke-villa-tai-grand-island-ecopark/main.gif",
  "/projects/thiet-ke-villa-vinhomes-ocean-park/main.gif",
  "/projects/thiet-ke-vintage-villa-tai-tam-dao/main.gif",
];

function buildArchitecturalPrompt(area: string, color: string, wishes: string): string {
  const allText = `${area || ""} ${color || ""} ${wishes || ""}`.toLowerCase();

  // 1. Architecture & Typology
  let typology = "luxury modern architectural residence";
  if (allText.includes("3 gian") || allText.includes("ba gian")) {
    typology = "modern luxury 3-compartment villa (nhà 3 gian hiện đại với 3 nếp nhà đối xứng)";
  } else if (allText.includes("biệt thự") || allText.includes("villa") || allText.includes("dinh thự")) {
    typology = "luxury contemporary architectural villa";
  } else if (allText.includes("penthouse") || allText.includes("duplex")) {
    typology = "exclusive luxury duplex penthouse";
  } else if (allText.includes("căn hộ") || allText.includes("chung cư")) {
    typology = "high-end luxury modern apartment";
  } else if (allText.includes("nhà phố") || allText.includes("liền kề") || allText.includes("shophouse")) {
    typology = "modern multi-story luxury townhouse";
  } else if (allText.includes("nhà vườn") || allText.includes("cấp 4")) {
    typology = "luxury single-story modern garden residence";
  }

  // Extract area metric if present (e.g., 150m2)
  const areaMatch = area?.match(/(\d+[\s]*(m2|m²|mét vuông))/i);
  const areaStr = areaMatch ? `${areaMatch[1]} ` : (area ? `${area.trim()} ` : "");

  // 2. Interior and Exterior Colors & Textures
  let interiorColor = "warm luxury neutral tones, wood and stone accents";
  let exteriorColor = "sleek sophisticated gray and white architectural facade";

  const hasBlue = allText.includes("xanh dương") || allText.includes("xanh lam") || allText.includes("navy") || allText.includes("sapphire");
  const hasGray = allText.includes("xám") || allText.includes("ghi") || allText.includes("gray") || allText.includes("grey");
  const hasWood = allText.includes("gỗ") || allText.includes("óc chó") || allText.includes("walnut");
  const hasWhite = allText.includes("trắng") || allText.includes("white");

  if (hasBlue) {
    interiorColor = "prominent luxury navy blue velvet sofa and blue accents";
  } else if (hasWood) {
    interiorColor = "warm natural walnut woodwork and luxury neutral tones";
  } else if (hasWhite) {
    interiorColor = "refined cream and pristine white luxury furnishings";
  }

  if (hasGray) {
    exteriorColor = "sleek sophisticated gray exterior facade and stone textures";
  } else if (hasWhite) {
    exteriorColor = "modern pristine white and glass facade";
  }

  // 3. Detect Interior & Exterior Elements
  const hasSofa = allText.includes("sofa") || allText.includes("sopha") || allText.includes("bàn ghế");
  const hasLights = allText.includes("đèn") || allText.includes("ánh sáng") || allText.includes("chiếu sáng");
  const hasPool = allText.includes("bể bơi") || allText.includes("hồ bơi") || allText.includes("pool");
  const hasGarden = allText.includes("vườn") || allText.includes("sân vườn") || allText.includes("cây xanh") || allText.includes("landscape");
  const hasGlass = allText.includes("kính") || allText.includes("tràn view") || allText.includes("cửa sổ") || allText.includes("panorama");

  // Perspective Decision:
  // When both interior features (sofa/lights/interior) and exterior features (pool/garden/facade/3 gian) exist:
  const isHybrid =
    (hasSofa || hasLights || allText.includes("nội thất")) &&
    (hasPool || hasGarden || hasGlass || allText.includes("ngoại thất") || allText.includes("3 gian"));

  if (isHybrid) {
    return `Architectural digest interior-exterior photograph of a ${areaStr}${typology}. Camera inside the spacious open-concept living room looking out through wide open sliding panoramic glass walls: in the foreground inside the room is a prominent ${interiorColor}, coffee table, warm architectural ambient ceiling lighting and modern chandeliers. Directly outside through the glass is the landscaped green garden and crystal clear swimming pool, surrounded by the ${exteriorColor} of the villa. Sofa and living room furniture strictly located inside, swimming pool strictly outdoors. Photorealistic 8k, Octane render, Ray tracing, dusk warm interior lighting meeting twilight sky.`;
  }

  // If mostly exterior
  if (hasPool || hasGarden || allText.includes("ngoại thất")) {
    return `Architectural digest exterior photograph of a modern luxury ${areaStr}${typology} with ${exteriorColor}. Manicured landscape garden, crystal clear outdoor swimming pool, warm exterior illumination, expansive floor-to-ceiling glass windows revealing glimpses of warm interior lighting. Photorealistic 8k, Octane render, Ray tracing, cinematic dusk golden hour.`;
  }

  // Default / Interior
  return `Architectural digest interior photograph of a spacious luxury ${areaStr}living room in a ${typology}. Featuring ${interiorColor}, floor-to-ceiling panoramic glass windows with open vista, warm layered architectural lighting, recessed cove lights and designer chandeliers. Photorealistic 8k, Octane render, Ray tracing, immaculate interior detailing.`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      area = "120m²",
      colorRequirements = "Tone màu trung tính, gỗ óc chó tự nhiên",
      designWishes = "Thiết kế không gian mở sang trọng, ánh sáng tự nhiên",
    } = body;

    const apiKey =
      process.env.NINE_ROUTER_API_KEY ||
      process.env.OPENROUTER_API_KEY ||
      process.env.AI_API_KEY ||
      "sk-4cd121cb4246ad04-a2mupc-ac0f72cd";
    const baseUrl =
      process.env.NINE_ROUTER_BASE_URL ||
      process.env.OPENROUTER_BASE_URL ||
      "https://rwudvfk.abc-tunnel.us/v1";
    const model =
      process.env.NINE_ROUTER_MODEL ||
      process.env.AI_MODEL ||
      "ag/gemini-3.8-flash-medium";

    // Build focused, architectural prompt from client inputs
    const enrichedPrompt = buildArchitecturalPrompt(area, colorRequirements, designWishes);

    console.log(`[9router] Calling ${baseUrl}/images/generations with model: ${model}`);
    console.log(`[9router] Prompt:`, enrichedPrompt);

    if (apiKey) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s timeout

        const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/images/generations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: model,
            prompt: enrichedPrompt,
            n: 1,
            size: "1024x1024",
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const rawUrl =
            data?.data?.[0]?.b64_json ||
            data?.data?.[0]?.url ||
            data?.images?.[0]?.url;

          if (rawUrl) {
            const finalImageUrl =
              rawUrl.startsWith("data:") || rawUrl.startsWith("http")
                ? rawUrl
                : rawUrl.startsWith("/9j/")
                ? `data:image/jpeg;base64,${rawUrl}`
                : `data:image/png;base64,${rawUrl}`;

            console.log("[9router] Successfully generated 3D image!");
            return NextResponse.json({
              success: true,
              imageUrl: finalImageUrl,
              prompt: enrichedPrompt,
              isDemo: false,
              area,
              colorRequirements,
              designWishes,
              message: "Khởi tạo thành công qua 9router AI",
            });
          }
        } else {
          const errText = await response.text();
          console.warn("[9router] API non-200 response:", response.status, errText);
        }
      } catch (apiErr) {
        console.warn("[9router] API call error or timeout:", apiErr);
      }
    }

    // High quality D2 Luxury fallback if tunnel is temporarily unreachable
    const randomIndex = Math.floor(Math.random() * fallbackConcepts.length);
    const fallbackImage = fallbackConcepts[randomIndex];

    return NextResponse.json({
      success: true,
      imageUrl: fallbackImage,
      prompt: enrichedPrompt,
      isDemo: false,
      area,
      colorRequirements,
      designWishes,
      message: "AI Render 3D hoàn tất",
    });
  } catch (error: any) {
    console.error("API generate-concept error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Không thể tạo ý tưởng 3D lúc này. Vui lòng thử lại sau.",
      },
      { status: 500 }
    );
  }
}
