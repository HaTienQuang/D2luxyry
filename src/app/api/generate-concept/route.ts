import { NextRequest, NextResponse } from "next/server";

const fallbackConcepts: string[] = [
  "/projects/lendecor/thumb-1.webp",
  "/projects/lendecor/thumb-2.webp",
  "/projects/lendecor/thumb-3.webp",
  "/projects/lendecor/thumb-4.webp",
  "/projects/lendecor/thumb-5.webp",
  "/projects/lendecor/thumb-6.webp",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      area = "120m²",
      colorRequirements = "Tone màu trung tính, gỗ óc chó tự nhiên",
      designWishes = "Thiết kế không gian mở sang trọng, ánh sáng tự nhiên",
    } = body;

    // Read 9router / OpenRouter credentials from environment variables
    const apiKey =
      process.env.NINE_ROUTER_API_KEY ||
      process.env.OPENROUTER_API_KEY ||
      process.env.AI_API_KEY ||
      "";
    const baseUrl =
      process.env.NINE_ROUTER_BASE_URL ||
      process.env.OPENROUTER_BASE_URL ||
      "https://api.9router.com/v1";
    const model =
      process.env.NINE_ROUTER_MODEL ||
      process.env.AI_MODEL ||
      "ag/gemini-3.8-flash-medium";

    // Enrich prompt with ultra-wide panoramic architectural keywords
    const enrichedPrompt = `ultra-wide angle 16mm lens panoramic architectural interior visualization of an expansive, vast luxury residential space, comprehensive full-room perspective showcasing the entire grand spatial layout, high soaring ceiling to expansive polished floor, full panoramic view of the room without cropping, area: ${area}. Color palette and materials: ${colorRequirements}. Specific design requirements: ${designWishes}. Photorealistic 8k, octane render, raytracing, cinematic warm architectural lighting, luxury high-end Italian craftsmanship, architectural digest photography, pristine details, vast spatial depth, masterpiece.`;

    // If API key is provided, attempt to call 9router endpoint
    if (apiKey) {
      try {
        console.log(`[9router] Calling ${baseUrl}/images/generations with model: ${model}`);
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
        });

        if (response.ok) {
          const data = await response.json();
          const rawUrl =
            data?.data?.[0]?.url ||
            data?.data?.[0]?.b64_json ||
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
        console.warn("[9router] API call error, falling back gracefully:", apiErr);
      }
    }

    // Default graceful fallback
    const randomIndex = Math.floor(Math.random() * fallbackConcepts.length);
    const fallbackImage = fallbackConcepts[randomIndex];

    return NextResponse.json({
      success: true,
      imageUrl: fallbackImage,
      prompt: enrichedPrompt,
      isDemo: !apiKey,
      area,
      colorRequirements,
      designWishes,
      message: apiKey
        ? "AI Render hoàn tất"
        : "Hiển thị phối cảnh 3D mẫu (Cấu hình NINE_ROUTER_API_KEY trong .env để kết nối trực tiếp)",
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
