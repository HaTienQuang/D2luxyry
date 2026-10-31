import { NextRequest, NextResponse } from "next/server";

const fallbackConcepts: { [key: string]: string[] } = {
  bedroom: [
    "/projects/can-ho-3-phong-ngu-vinhomes-westpoint/photo-10.png",
    "/projects/thiet-ke-can-ho-du-an-brg-diamond/photo-10.png",
    "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-10.png",
  ],
  kitchen: [
    "/projects/can-ho-3-phong-ngu-vinhomes-westpoint/photo-6.png",
    "/projects/thiet-ke-can-ho-du-an-brg-diamond/photo-6.png",
    "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-6.png",
  ],
  bathroom: [
    "/projects/can-ho-3-phong-ngu-vinhomes-westpoint/photo-8.png",
    "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-8.png",
  ],
  altar: [
    "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-12.png",
  ],
  living: [
    "/projects/d2-luxury-3d-sample.png",
    "/projects/thiet-ke-villa-tai-grand-island-ecopark/main.png",
    "/projects/thiet-ke-villa-vinhomes-ocean-park/main.png",
    "/projects/thiet-ke-vintage-villa-tai-tam-dao/main.png",
  ],
};

function extractColors(text: string): { interior: string; exterior: string } {
  const lower = (text || "").toLowerCase();

  const colorMap: { [key: string]: string } = {
    "hồng": "luxury blush pink and soft rose velvet tones",
    "pink": "luxury blush pink, soft rose and warm pastel velvet tones",
    "xanh dương": "luxurious deep navy blue and sapphire velvet accents",
    "xanh lam": "rich sapphire blue and deep blue tones",
    "xanh ngọc": "elegant teal and turquoise accents",
    "xanh lá": "refined emerald green and sage accents",
    "rêu": "deep olive and moss green tones",
    "xám": "sophisticated warm gray and charcoal stone textures",
    "ghi": "modern sleek gray tones",
    "trắng": "pristine white and ivory finishes",
    "kem": "warm cream and beige luxury tones",
    "be": "warm beige and sand palette",
    "gỗ": "warm natural walnut woodwork and timber accents",
    "óc chó": "premium dark walnut wood finishes",
    "vàng": "warm champagne gold and brass details",
    "gold": "luxury gold accents",
    "đồng": "brushed bronze and warm metallic details",
    "đen": "bold modern matte black accents",
    "cam": "terracotta and warm amber accents",
  };

  const findColorsInText = (str: string): string[] => {
    const matched: string[] = [];
    for (const [key, desc] of Object.entries(colorMap)) {
      if (str.includes(key)) {
        matched.push(desc);
      }
    }
    return matched;
  };

  // Strictly separate "nội thất" vs "ngoại thất"
  let interiorPart = "";
  let exteriorPart = "";

  if (lower.includes("nội thất") && lower.includes("ngoại thất")) {
    const noiIdx = lower.indexOf("nội thất");
    const ngoaiIdx = lower.indexOf("ngoại thất");
    if (noiIdx < ngoaiIdx) {
      interiorPart = lower.slice(noiIdx, ngoaiIdx);
      exteriorPart = lower.slice(ngoaiIdx);
    } else {
      exteriorPart = lower.slice(ngoaiIdx, noiIdx);
      interiorPart = lower.slice(noiIdx);
    }
  } else if (lower.includes("nội thất")) {
    interiorPart = lower;
  } else if (lower.includes("ngoại thất")) {
    exteriorPart = lower;
  }

  const intColors = findColorsInText(interiorPart);
  const extColors = findColorsInText(exteriorPart);
  const generalColors = findColorsInText(lower);

  const defaultInterior = "warm luxury neutral tones with high-end fabric and wood accents";
  const defaultExterior = "modern architectural gray and white facade";

  return {
    interior: intColors.length > 0 ? intColors.join(", ") : (generalColors.length > 0 ? generalColors[0] : defaultInterior),
    exterior: extColors.length > 0 ? extColors.join(", ") : (generalColors.length > 0 ? generalColors[0] : defaultExterior),
  };
}

interface RoomSpec {
  roomCategory: "bedroom" | "kitchen" | "bathroom" | "altar" | "office" | "living";
  roomTitleEn: string;
  roomTitleVi: string;
  furniturePrompt: string;
  focalGuidance: string;
}

function detectRoom(allText: string, colorInterior: string, wishes: string): RoomSpec {
  const lower = allText.toLowerCase();

  // 1. PHÒNG NGỦ (Bedroom / Master Suite)
  if (
    lower.includes("phòng ngủ") ||
    lower.includes("phong ngu") ||
    lower.includes("ngủ") ||
    lower.includes("ngu") ||
    lower.includes("bedroom") ||
    lower.includes("master") ||
    lower.includes("giường")
  ) {
    const isEnsuite = lower.includes("khép kín") || lower.includes("khep kin") || lower.includes("ensuite") || lower.includes("wc");
    return {
      roomCategory: "bedroom",
      roomTitleEn: "ultra-luxury master bedroom suite",
      roomTitleVi: "Phòng ngủ Master cao cấp",
      furniturePrompt: `Centering on an imposing designer king-size bed with a bespoke architectural headboard upholstered in ${colorInterior}, layered with fine luxury linens and soft accent pillows. Floating matching nightstands with elegant bedside pendant lights and ambient sconces. Bespoke fluted timber wall paneling, acoustic upholstered backdrop, integrated walk-in wardrobe closet with smoked glass doors${isEnsuite ? ", and a sleek private en-suite bathroom glass partition" : ""}. Soft high-pile textured rug under the bed`,
      focalGuidance: "Camera is positioned inside the bedroom, focused directly on the luxury king-size bed, headboard, nightstands, and wardrobe. Strictly a tranquil, private bedroom sanctuary. NO living room sofas, NO kitchen fixtures.",
    };
  }

  // 2. PHÒNG BẾP & BÀN ĂN (Kitchen & Dining)
  if (
    lower.includes("phòng bếp") ||
    lower.includes("phong bep") ||
    lower.includes("nhà bếp") ||
    lower.includes("bếp") ||
    lower.includes("bep") ||
    lower.includes("kitchen") ||
    lower.includes("bàn ăn") ||
    lower.includes("ban an") ||
    lower.includes("dining") ||
    lower.includes("tủ bếp") ||
    lower.includes("tu bep") ||
    lower.includes("đảo bếp") ||
    lower.includes("quầy bar")
  ) {
    return {
      roomCategory: "kitchen",
      roomTitleEn: "contemporary luxury chef kitchen and dining room",
      roomTitleVi: "Phòng bếp & Bàn ăn sang trọng",
      furniturePrompt: `Dominated by a magnificent monolithic waterfall marble kitchen island with integrated induction cooktop and stylish designer bar stools in ${colorInterior}. Custom floor-to-ceiling seamless handleless cabinetry in ${colorInterior} with warm natural walnut wood accents and integrated luxury built-in appliances (oven, wine cooler, flush extractor). An adjacent sculptural contemporary dining table with comfortable designer dining chairs and an artistic linear pendant chandelier above the island`,
      focalGuidance: "Camera is positioned inside the kitchen looking directly at the marble kitchen island, cabinetry, and dining area. Pure luxury culinary focus. NO living room sofas in the frame.",
    };
  }

  // 3. PHÒNG TẮM (Bathroom / Master Ensuite)
  if (
    lower.includes("phòng tắm") ||
    lower.includes("phong tam") ||
    lower.includes("nhà tắm") ||
    lower.includes("nha tam") ||
    lower.includes("bathroom") ||
    lower.includes("toilet") ||
    lower.includes("wc") ||
    lower.includes("bồn tắm") ||
    lower.includes("lavabo")
  ) {
    return {
      roomCategory: "bathroom",
      roomTitleEn: "spa-inspired luxury master ensuite bathroom",
      roomTitleVi: "Phòng tắm Master phong cách Spa",
      furniturePrompt: `Featuring a freestanding oval stone soaking bathtub, double floating marble vanity with backlit LED mirrors and brushed gold/brass fixtures, frameless walk-in rainfall shower with fluted glass screen. Floor-to-ceiling large format ${colorInterior} porcelain slabs and warm teak slatted accents`,
      focalGuidance: "Focused on the freestanding bathtub, double vanity, and resort-grade stone finishes.",
    };
  }

  // 4. PHÒNG THỜ (Altar / Ancestral Worship Room)
  if (
    lower.includes("phòng thờ") ||
    lower.includes("phong tho") ||
    lower.includes("bàn thờ") ||
    lower.includes("gian thờ") ||
    lower.includes("altar")
  ) {
    return {
      roomCategory: "altar",
      roomTitleEn: "solemn contemporary Vietnamese ancestral altar room (không gian phòng thờ gia tiên cao cấp)",
      roomTitleVi: "Phòng thờ gia tiên trang trọng",
      furniturePrompt: `Centered upon a bespoke handcrafted natural dark walnut wood ancestral altar table with refined traditional geometric lattice motifs and brass incense vessels. Intricate wooden partition screens (vách CNC gỗ óc chó), warm amber silk lanterns, bronze decorative accents with ${colorInterior} fabric details, traditional kneeling cushions on a natural woven mat`,
      focalGuidance: "Solemn, symmetrical, respectful view of the traditional altar table and wooden screens.",
    };
  }

  // 5. PHÒNG LÀM VIỆC / THƯ VIỆN (Home Office / Study)
  if (
    lower.includes("làm việc") ||
    lower.includes("lam viec") ||
    lower.includes("office") ||
    lower.includes("study") ||
    lower.includes("thư viện") ||
    lower.includes("đọc sách")
  ) {
    return {
      roomCategory: "office",
      roomTitleEn: "prestigious executive home office and private library",
      roomTitleVi: "Phòng làm việc & Thư viện riêng",
      furniturePrompt: `Anchored by an executive solid wood and leather desk, ergonomic designer chair in ${colorInterior}. Full-height architectural bookshelves with vertical warm LED illumination displaying curated books and sculptures. A comfortable reading corner with an iconic lounge chair and brass reading lamp on a textured wool rug`,
      focalGuidance: "Focused on the executive desk, library bookshelves, and private quiet workspace.",
    };
  }

  // 6. DEFAULT: PHÒNG KHÁCH (Living Room)
  return {
    roomCategory: "living",
    roomTitleEn: "spacious open-concept living room",
    roomTitleVi: "Phòng khách sang trọng",
    furniturePrompt: `Featuring a prominent luxury ${colorInterior} designer modular sofa set, sculptural marble and smoked glass coffee table on a plush custom area rug, bespoke low-profile media console, curated fine art pieces`,
    focalGuidance: "Wide architectural interior view of the grand living salon and lounge area.",
  };
}

function buildArchitecturalPrompt(area: string, color: string, wishes: string): { prompt: string; roomCategory: string } {
  const allText = `${area || ""} ${color || ""} ${wishes || ""}`.toLowerCase();
  const colorSpec = extractColors(color);
  const room = detectRoom(allText, colorSpec.interior, wishes);

  // 1. Architecture & Typology
  let typology = "luxury modern architectural residence";
  let is3Gian = false;
  if (allText.includes("3 gian") || allText.includes("ba gian")) {
    typology = "modern luxury 3-bay residence (nội thất nhà 3 gian hiện đại)";
    is3Gian = true;
  } else if (allText.includes("biệt thự") || allText.includes("villa") || allText.includes("dinh thự")) {
    typology = "luxury contemporary villa";
  } else if (allText.includes("penthouse") || allText.includes("duplex")) {
    typology = "luxury high-ceiling penthouse";
  } else if (allText.includes("căn hộ") || allText.includes("chung cư")) {
    typology = "luxury modern apartment";
  } else if (allText.includes("nhà phố") || allText.includes("liền kề") || allText.includes("shophouse")) {
    typology = "modern multi-story townhouse";
  } else if (allText.includes("nhà vườn") || allText.includes("cấp 4")) {
    typology = "luxury modern garden residence";
  }

  // Extract area metric (e.g. 80m2)
  const areaMatch = area?.match(/(\d+[\s]*(m2|m²|mét vuông))/i);
  const areaStr = areaMatch ? `${areaMatch[1]} ` : (area ? `${area.trim()} ` : "");

  // 2. Identify Requested Key Features
  const hasPool = allText.includes("bể bơi") || allText.includes("hồ bơi") || allText.includes("pool");
  const hasGarden = allText.includes("vườn") || allText.includes("sân vườn") || allText.includes("cây xanh") || allText.includes("landscape");
  const hasHighCeiling = allText.includes("trần cao") || allText.includes("thông tầng") || allText.includes("cao thoáng");
  const hasGlass = allText.includes("kính") || allText.includes("tràn view") || allText.includes("cửa sổ") || allText.includes("panorama");
  const hasLights = allText.includes("đèn") || allText.includes("ánh sáng");

  // Pure exterior perspective only when explicitly asked and no interior elements
  const isPureExterior =
    (allText.includes("ngoại thất") || allText.includes("mặt tiền") || allText.includes("toàn cảnh ngoài")) &&
    !allText.includes("nội thất") &&
    !allText.includes("phòng") &&
    !allText.includes("bếp") &&
    !allText.includes("ngủ") &&
    !allText.includes("sofa");

  if (isPureExterior) {
    let outdoorFeatures = "";
    if (hasPool) outdoorFeatures += ", outdoor swimming pool with crystal clear water";
    if (hasGarden) outdoorFeatures += ", lush landscaped garden courtyard";

    return {
      prompt: `Architectural digest exterior photograph of a modern luxury ${areaStr}${typology} with ${colorSpec.exterior}. Front elevation view of the residence, clean geometric architectural lines, elegant outdoor illumination, floor-to-ceiling glass windows${outdoorFeatures}. Photorealistic 8k, Octane render, Ray tracing, cinematic dusk golden hour.`,
      roomCategory: "exterior",
    };
  }

  // CEILING & LIGHTING SPECIFICATIONS
  let ceilingDesc = hasHighCeiling
    ? "with soaring double-height high ceilings, exposed architectural timber trusses and modern chandeliers"
    : "with elegant recessed coffered ceiling and warm architectural ambient lighting";

  if (hasLights) {
    ceilingDesc += ", abundant warm ambient recessed lighting and designer luminaires";
  }

  // WINDOW & OUTDOOR VIEW SPECIFICATIONS
  let windowAndOutdoorView = "";
  if (hasPool && hasGarden) {
    windowAndOutdoorView = `Expansive floor-to-ceiling glass walls offering panoramic view of the private garden courtyard and swimming pool, with subtle ${colorSpec.exterior} accents on the patio.`;
  } else if (hasPool) {
    windowAndOutdoorView = `Expansive floor-to-ceiling glass walls overlooking a private swimming pool terrace, with subtle ${colorSpec.exterior} accents.`;
  } else if (hasGarden || hasGlass || is3Gian) {
    windowAndOutdoorView = `Expansive floor-to-ceiling glass wall offering panoramic view of a lush green courtyard garden, with subtle ${colorSpec.exterior} architectural accents visible outside under natural daylight.`;
  } else {
    windowAndOutdoorView = `Large architectural panoramic windows flooding the space with gentle natural daylight, subtle ${colorSpec.exterior} accents visible outside.`;
  }

  const fullPrompt = `Architectural digest interior photograph of a ${room.roomTitleEn} in a modern luxury ${areaStr}${typology}. ${room.furniturePrompt}. ${ceilingDesc}. ${windowAndOutdoorView} ${room.focalGuidance} Natural daylight, warm indirect cove LED illumination, photorealistic 8k, Octane render, Ray tracing, architectural masterpiece.`;

  return {
    prompt: fullPrompt,
    roomCategory: room.roomCategory,
  };
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

    // Build intelligent room-specific architectural prompt from client inputs
    const { prompt: enrichedPrompt, roomCategory } = buildArchitecturalPrompt(
      area,
      colorRequirements,
      designWishes
    );

    console.log(`[9router] Room Category: ${roomCategory}`);
    console.log(`[9router] Calling ${baseUrl}/images/generations with model: ${model}`);
    console.log(`[9router] Prompt:`, enrichedPrompt);

    if (apiKey) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 55000); // 55s timeout

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
              message: "Khởi tạo thành công qua AI Studio",
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

    // High quality room-specific fallback matching requested room category
    const list = fallbackConcepts[roomCategory] || fallbackConcepts.living;
    const randomIndex = Math.floor(Math.random() * list.length);
    const fallbackImage = list[randomIndex];

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
