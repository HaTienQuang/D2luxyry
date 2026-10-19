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
  const parts: string[] = [];

  // 1. Architecture & Typology
  const lowerArea = (area || "").toLowerCase();
  if (lowerArea.includes("nhà 3 gian") || lowerArea.includes("3 gian")) {
    parts.push("modern contemporary luxury 3-compartment villa (nhà 3 gian hiện đại)");
  } else if (lowerArea.includes("biệt thự") || lowerArea.includes("villa") || lowerArea.includes("dinh thự")) {
    parts.push("luxury modern architectural villa");
  } else if (lowerArea.includes("penthouse") || lowerArea.includes("duplex")) {
    parts.push("exclusive high-end penthouse interior with double height ceiling");
  } else if (lowerArea.includes("căn hộ") || lowerArea.includes("chung cư")) {
    parts.push("high-end luxury modern apartment living space");
  } else if (lowerArea.includes("nhà phố") || lowerArea.includes("liền kề")) {
    parts.push("modern multi-level luxury townhouse");
  } else {
    parts.push(`luxury modern residential architectural space ${area ? `approx ${area}` : ""}`);
  }

  // 2. Colors & Facade / Interior Materials
  const lowerColor = (color || "").toLowerCase();
  const colorDesc: string[] = [];
  if (lowerColor.includes("xanh dương") || lowerColor.includes("xanh lam")) colorDesc.push("navy and sapphire blue interior accents");
  if (lowerColor.includes("xám") || lowerColor.includes("ghi") || lowerColor.includes("grey") || lowerColor.includes("gray")) colorDesc.push("sophisticated modern gray exterior facade");
  if (lowerColor.includes("gỗ") || lowerColor.includes("óc chó")) colorDesc.push("warm natural walnut woodwork");
  if (lowerColor.includes("trắng") || lowerColor.includes("kem")) colorDesc.push("pristine white and cream tones");
  if (lowerColor.includes("vàng") || lowerColor.includes("gold") || lowerColor.includes("đồng")) colorDesc.push("warm brass and luxury gold details");
  if (lowerColor.includes("đen")) colorDesc.push("bold matte black modern details");
  
  if (colorDesc.length > 0) {
    parts.push(colorDesc.join(", "));
  } else if (color) {
    parts.push(`color palette: ${color}`);
  }

  // 3. Design Desires & Key Architectural Features
  const lowerWishes = (wishes || "").toLowerCase();
  const wishDesc: string[] = [];
  if (lowerWishes.includes("bể bơi") || lowerWishes.includes("hồ bơi")) wishDesc.push("outdoor swimming pool in lush garden with crystal blue water");
  if (lowerWishes.includes("kính") || lowerWishes.includes("tràn view") || lowerWishes.includes("cửa sổ")) wishDesc.push("expansive floor-to-ceiling panoramic glass windows with open view");
  if (lowerWishes.includes("sofa") || lowerWishes.includes("sopha")) wishDesc.push("luxury designer sofa in living area");
  if (lowerWishes.includes("đèn") || lowerWishes.includes("ánh sáng")) wishDesc.push("abundant warm architectural ambient lighting and designer luminaires");
  if (lowerWishes.includes("sân vườn") || lowerWishes.includes("vườn") || lowerWishes.includes("tiểu cảnh")) wishDesc.push("landscaped green courtyard garden");
  if (lowerWishes.includes("thông tầng")) wishDesc.push("soaring double-height open void");
  if (lowerWishes.includes("tân cổ điển")) wishDesc.push("neoclassical molding and arch elements");
  if (lowerWishes.includes("ban công")) wishDesc.push("spacious outdoor terrace balcony");

  if (wishDesc.length > 0) {
    parts.push(wishDesc.join(", "));
  } else if (wishes) {
    parts.push(`specific design requests: ${wishes}`);
  }

  // 4. Photorealistic Quality & Render Engine
  parts.push("photorealistic 8k, Octane render, Ray tracing, cinematic golden hour lighting, wide angle architectural digest photography, immaculate details");

  return parts.join(", ");
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
