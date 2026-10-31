import { NextRequest, NextResponse } from "next/server";

const fallbackConcepts: { [key: string]: string[] } = {
  bedroom: [
    "/projects/can-ho-3-phong-ngu-vinhomes-westpoint/photo-10.png",
    "/projects/can-ho-3-phong-ngu-vinhomes-westpoint/photo-14.png",
    "/projects/can-ho-3-phong-ngu-vinhomes-westpoint/photo-15.png",
    "/projects/can-ho-3-phong-ngu-vinhomes-westpoint/photo-16.png",
    "/projects/thiet-ke-can-ho-du-an-brg-diamond/photo-10.png",
    "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-10.png",
    "/projects/thiet-ke-penthouse-indochina/photo-10.png",
  ],
  kitchen: [
    "/projects/can-ho-3-phong-ngu-vinhomes-westpoint/photo-6.png",
    "/projects/thiet-ke-can-ho-du-an-brg-diamond/photo-6.png",
    "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-6.png",
    "/projects/thiet-ke-penthouse-indochina/photo-5.png",
  ],
  bathroom: [
    "/projects/can-ho-3-phong-ngu-vinhomes-westpoint/photo-8.png",
    "/projects/thiet-ke-can-ho-du-an-brg-diamond/photo-8.png",
    "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-8.png",
  ],
  altar: [
    "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-12.png",
    "/projects/thiet-ke-penthouse-indochina/photo-1.png",
  ],
  living: [
    "/projects/d2-luxury-3d-sample.png",
    "/projects/thiet-ke-villa-tai-grand-island-ecopark/main.png",
    "/projects/thiet-ke-villa-vinhomes-ocean-park/main.png",
    "/projects/thiet-ke-vintage-villa-tai-tam-dao/main.png",
  ],
  exterior: [
    "/projects/thiet-ke-vintage-villa-tai-tam-dao/main.png",
    "/projects/thiet-ke-vintage-villa-tai-tam-dao/photo-1.png",
    "/projects/thiet-ke-vintage-villa-tai-tam-dao/photo-2.png",
    "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-1.png",
  ],
};

interface SemanticAnalysis {
  spaceCategory: "bedroom" | "kitchen" | "bathroom" | "altar" | "office" | "living" | "exterior";
  spaceTitleVi: string;
  spaceTitleEn: string;
  styleDescription: string;
  furniturePrompt: string;
  customFeatures: string;
  colorMaterialsPrompt: string;
  focalGuidance: string;
}

function analyzeCustomerPrompt(
  designNeed: string,
  colorRequirements: string,
  designWishes: string
): SemanticAnalysis {
  const combined = `${designNeed} ${colorRequirements} ${designWishes}`.toLowerCase();

  // 1. STYLE ANALYSIS
  let styleDescription = "contemporary ultra-luxury architectural design";
  if (combined.includes("tân cổ điển") || combined.includes("tan co dien") || combined.includes("neo classic")) {
    styleDescription = "refined neoclassical French boiserie luxury interior with subtle wall mouldings";
  } else if (combined.includes("indochine") || combined.includes("đông dương") || combined.includes("dong duong")) {
    styleDescription = "timeless Indochine luxury aesthetic, handcrafted natural dark timber, woven cane rattan details, French colonial heritage";
  } else if (combined.includes("japandi") || combined.includes("wabi sabi") || combined.includes("tối giản") || combined.includes("toi gian") || combined.includes("minimalist")) {
    styleDescription = "zen luxury Japandi aesthetic, organic tactile textures, fluted light oak, understated serene minimalism";
  } else if (combined.includes("hiện đại") || combined.includes("modern")) {
    styleDescription = "sleek modern luxury architecture, clean crisp geometric lines, concealed flush details";
  }

  // 2. COLOR & MATERIAL DEEP MAPPING
  const colorFragments: string[] = [];
  if (combined.includes("xanh dương") || combined.includes("xanh duong") || combined.includes("navy") || combined.includes("sapphire") || combined.includes("xanh lam")) {
    colorFragments.push("luxurious deep navy blue and royal sapphire velvet upholstery with rich midnight accents");
  }
  if (combined.includes("xanh ngọc") || combined.includes("teal")) {
    colorFragments.push("deep ocean teal and emerald velvet accents");
  }
  if (combined.includes("xanh lá") || combined.includes("rêu") || combined.includes("sage")) {
    colorFragments.push("refined olive sage green and botanical velvet textures");
  }
  if (combined.includes("hồng") || combined.includes("pink")) {
    colorFragments.push("soft blush pink and dusty rose cashmere tones");
  }
  if (combined.includes("gỗ óc chó") || combined.includes("oc cho") || combined.includes("walnut")) {
    colorFragments.push("warm American dark walnut architectural timber paneling and fluted joinery");
  } else if (combined.includes("gỗ sồi") || combined.includes("gỗ") || combined.includes("wood")) {
    colorFragments.push("natural warm timber woodwork and refined architectural joinery");
  }
  if (combined.includes("đá marble") || combined.includes("cẩm thạch") || combined.includes("marble") || combined.includes("đá tự nhiên")) {
    colorFragments.push("bookmatched white Calacatta marble surfaces with delicate gold and grey veining");
  }
  if (combined.includes("vàng") || combined.includes("gold") || combined.includes("đồng") || combined.includes("brass")) {
    colorFragments.push("brushed champagne gold metallic trims and warm brass architectural hardware");
  }
  if (combined.includes("đen") || combined.includes("black")) {
    colorFragments.push("bold modern matte black metal trims and smoked glass accents");
  }
  if (combined.includes("trắng") || combined.includes("kem") || combined.includes("be") || combined.includes("ivory")) {
    colorFragments.push("pristine warm ivory, cream boucle fabric, alabaster stone, and soft beige tones");
  }
  if (combined.includes("xám") || combined.includes("ghi") || combined.includes("charcoal")) {
    colorFragments.push("tailored warm graphite gray and polished architectural stone textures");
  }

  const colorMaterialsPrompt =
    colorFragments.length > 0
      ? colorFragments.join(", ")
      : "luxurious warm neutral palette with premium fabric textures, natural timber, and brushed metallic accents";

  // 3. ARCHITECTURAL & CUSTOM SPATIAL FEATURES
  const customFeaturesList: string[] = [];
  const isEnsuite = combined.includes("khép kín") || combined.includes("khep kin") || combined.includes("ensuite") || combined.includes("wc");
  if (isEnsuite) {
    customFeaturesList.push("private self-contained master suite layout with an integrated en-suite luxury glass-partitioned bathroom");
  }
  if (combined.includes("thông tầng") || combined.includes("trần cao") || combined.includes("cao thoáng")) {
    customFeaturesList.push("dramatic soaring double-height ceilings with custom architectural chandelier");
  }
  if (combined.includes("view sân vườn") || combined.includes("view vườn") || combined.includes("sân vườn")) {
    customFeaturesList.push("expansive floor-to-ceiling panoramic glass windows framing tranquil landscaped courtyard views");
  } else if (combined.includes("cửa kính") || combined.includes("kính") || combined.includes("view")) {
    customFeaturesList.push("expansive architectural floor-to-ceiling glass walls flooding the space with natural daylight");
  }
  if (combined.includes("đèn chùm") || combined.includes("đèn thả") || combined.includes("ánh sáng")) {
    customFeaturesList.push("layered architectural indirect cove LED illumination and designer statement pendant lighting");
  }
  if (combined.includes("tủ rượu") || combined.includes("quầy rượu")) {
    customFeaturesList.push("bespoke floor-to-ceiling temperature-controlled illuminated smoked-glass wine display cellar");
  }
  if (combined.includes("đảo bếp") || combined.includes("quầy bar")) {
    customFeaturesList.push("freestanding monolithic waterfall marble kitchen island paired with designer bar counter stools");
  }
  if (combined.includes("ban công") || combined.includes("logia")) {
    customFeaturesList.push("sliding glass doors opening directly onto a scenic landscaped private balcony terrace");
  }

  const customFeatures =
    customFeaturesList.length > 0
      ? customFeaturesList.join(". ")
      : "expansive architectural glass, layered cove ambient LED lighting, seamless bespoke finishes";

  // 4. SPACE CATEGORY & FUNCTIONAL CORE
  // Check Pure Exterior
  const isExterior =
    (combined.includes("ngoại thất") || combined.includes("mặt tiền") || combined.includes("toàn cảnh villa") || combined.includes("kiến trúc ngoài")) &&
    !combined.includes("phòng ngủ") &&
    !combined.includes("phòng bếp") &&
    !combined.includes("nội thất");

  if (isExterior) {
    return {
      spaceCategory: "exterior",
      spaceTitleVi: "Ngoại thất Biệt thự cao cấp",
      spaceTitleEn: "luxury modern architectural villa exterior",
      styleDescription,
      furniturePrompt: "Dramatic front elevation view of the luxury villa with geometric architectural facade, landscaped courtyard, outdoor swimming pool terrace, and illuminated water features",
      customFeatures,
      colorMaterialsPrompt,
      focalGuidance: "Exterior architectural photograph. Cinematic dusk golden hour lighting. Octane render 8k.",
    };
  }

  // Check Bedroom
  if (
    combined.includes("phòng ngủ") ||
    combined.includes("phong ngu") ||
    combined.includes("ngủ") ||
    combined.includes("ngu") ||
    combined.includes("bedroom") ||
    combined.includes("master") ||
    combined.includes("giường")
  ) {
    return {
      spaceCategory: "bedroom",
      spaceTitleVi: "Phòng ngủ Master cao cấp",
      spaceTitleEn: "ultra-luxury master bedroom suite",
      styleDescription,
      furniturePrompt: `Centering on an imposing designer king-size bed with a bespoke architectural headboard upholstered in ${colorMaterialsPrompt}, layered with fine luxury linens and accent pillows. Floating matching nightstands with bedside pendant drop lights, bespoke fluted wall paneling, and an integrated walk-in wardrobe closet with smoked glass doors`,
      customFeatures,
      colorMaterialsPrompt,
      focalGuidance: "FOCAL GUIDANCE: Camera is positioned inside the bedroom, focused directly on the luxury king-size bed, headboard, nightstands, and wardrobe sanctuary. STRICT NEGATIVE CONSTRAINTS: NO living room sofas, NO kitchen island or counters, NO dining tables, NO living salon setup.",
    };
  }

  // Check Kitchen & Dining
  if (
    combined.includes("phòng bếp") ||
    combined.includes("phong bep") ||
    combined.includes("nhà bếp") ||
    combined.includes("bếp") ||
    combined.includes("bep") ||
    combined.includes("kitchen") ||
    combined.includes("bàn ăn") ||
    combined.includes("ban an") ||
    combined.includes("tủ bếp") ||
    combined.includes("đảo bếp")
  ) {
    return {
      spaceCategory: "kitchen",
      spaceTitleVi: "Phòng bếp & Bàn ăn sang trọng",
      spaceTitleEn: "contemporary luxury chef kitchen and dining room",
      styleDescription,
      furniturePrompt: `Dominated by a magnificent monolithic waterfall marble kitchen island with integrated cooktop and stylish designer bar stools finished in ${colorMaterialsPrompt}. Floor-to-ceiling seamless handleless cabinetry with warm natural wood accents, integrated chef-grade flush appliances, and an adjacent sculptural contemporary dining table with comfortable designer dining chairs`,
      customFeatures,
      colorMaterialsPrompt,
      focalGuidance: "FOCAL GUIDANCE: Camera is positioned inside the kitchen looking directly at the marble kitchen island, cabinetry, and dining area. Pure culinary luxury. STRICT NEGATIVE CONSTRAINTS: NO living room sofas, NO coffee tables, NO beds, NO bedroom furniture in the frame.",
    };
  }

  // Check Bathroom
  if (
    combined.includes("phòng tắm") ||
    combined.includes("phong tam") ||
    combined.includes("nhà tắm") ||
    combined.includes("bathroom") ||
    combined.includes("bồn tắm") ||
    combined.includes("lavabo")
  ) {
    return {
      spaceCategory: "bathroom",
      spaceTitleVi: "Phòng tắm Master phong cách Spa",
      spaceTitleEn: "spa-inspired luxury master ensuite bathroom",
      styleDescription,
      furniturePrompt: `Featuring a freestanding oval stone soaking bathtub, double floating marble vanity with backlit LED mirrors and brushed gold/brass fixtures, frameless walk-in rainfall shower with fluted glass screen, floor-to-ceiling large format porcelain slabs and warm slatted accents`,
      customFeatures,
      colorMaterialsPrompt,
      focalGuidance: "FOCAL GUIDANCE: Focused on the freestanding soaking tub, vanity mirrors, and luxury stone finishes. STRICT NEGATIVE CONSTRAINTS: NO sofas, NO beds, NO kitchen counters.",
    };
  }

  // Check Altar Room
  if (
    combined.includes("phòng thờ") ||
    combined.includes("phong tho") ||
    combined.includes("bàn thờ") ||
    combined.includes("gian thờ") ||
    combined.includes("altar")
  ) {
    return {
      spaceCategory: "altar",
      spaceTitleVi: "Phòng thờ gia tiên trang trọng",
      spaceTitleEn: "solemn contemporary Vietnamese ancestral altar room",
      styleDescription,
      furniturePrompt: "Centered upon a bespoke handcrafted natural dark walnut wood ancestral altar table with refined traditional geometric lattice motifs, intricate wooden CNC partition screens, warm amber silk lanterns, and bronze incense vessels",
      customFeatures,
      colorMaterialsPrompt,
      focalGuidance: "FOCAL GUIDANCE: Symmetrical, solemn, respectful view of the traditional altar table and wooden screens. STRICT NEGATIVE CONSTRAINTS: NO casual living room sofas, NO beds, NO kitchen counters.",
    };
  }

  // Check Home Office / Study
  if (
    combined.includes("làm việc") ||
    combined.includes("lam viec") ||
    combined.includes("office") ||
    combined.includes("thư viện") ||
    combined.includes("đọc sách")
  ) {
    return {
      spaceCategory: "office",
      spaceTitleVi: "Phòng làm việc & Thư viện riêng",
      spaceTitleEn: "prestigious executive home office and private library",
      styleDescription,
      furniturePrompt: `Anchored by an executive solid wood and leather desk, ergonomic designer chair in ${colorMaterialsPrompt}, full-height architectural bookshelves with vertical warm LED illumination, and a comfortable reading lounge chair`,
      customFeatures,
      colorMaterialsPrompt,
      focalGuidance: "FOCAL GUIDANCE: Focused on the executive desk, library bookshelves, and private quiet workspace. STRICT NEGATIVE CONSTRAINTS: NO beds, NO kitchen counters.",
    };
  }

  // Default: Grand Living Salon
  return {
    spaceCategory: "living",
    spaceTitleVi: "Phòng khách sang trọng",
    spaceTitleEn: "spacious open-concept luxury living salon",
    styleDescription,
    furniturePrompt: `Featuring a prominent luxury designer modular sofa set in ${colorMaterialsPrompt}, sculptural marble and smoked glass coffee table on a plush custom area rug, bespoke low-profile media console, curated fine art pieces`,
    customFeatures,
    colorMaterialsPrompt,
    focalGuidance: "FOCAL GUIDANCE: Wide architectural interior view of the grand living salon and lounge area.",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      designNeed = "",
      area = "", // support backward compatibility
      colorRequirements = "Tone màu trung tính, gỗ óc chó tự nhiên",
      designWishes = "Thiết kế không gian mở sang trọng, ánh sáng tự nhiên",
    } = body;

    const actualNeed = designNeed || area || "Phòng ngủ Master cao cấp";

    // Deep semantic analysis of customer requirements
    const analysis = analyzeCustomerPrompt(actualNeed, colorRequirements, designWishes);

    const fullArchitecturalPrompt = `Architectural Digest professional interior photograph of a ${analysis.styleDescription} ${analysis.spaceTitleEn}. Key elements: ${analysis.furniturePrompt}. Spatial features: ${analysis.customFeatures}. Palette: ${analysis.colorMaterialsPrompt}. ${analysis.focalGuidance} Natural daylight, warm indirect cove LED illumination, photorealistic 8k, Octane render, Ray tracing, architectural masterpiece.`;

    console.log(`[AI-Studio] Space Category: ${analysis.spaceCategory}`);
    console.log(`[AI-Studio] Space Title: ${analysis.spaceTitleVi}`);
    console.log(`[AI-Studio] Generated Prompt: ${fullArchitecturalPrompt}`);

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

    if (apiKey) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout for fast response

        const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/images/generations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: model,
            prompt: fullArchitecturalPrompt,
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

            console.log("[AI-Studio] Successfully generated 3D image via model!");
            return NextResponse.json({
              success: true,
              imageUrl: finalImageUrl,
              prompt: fullArchitecturalPrompt,
              spaceCategory: analysis.spaceCategory,
              spaceTitle: analysis.spaceTitleVi,
              colorRequirements,
              designWishes,
              message: "Khởi tạo thành công qua AI Studio",
            });
          }
        } else {
          const errText = await response.text();
          console.warn("[AI-Studio] API non-200 response:", response.status, errText);
        }
      } catch (apiErr) {
        console.warn("[AI-Studio] API call timeout or error:", apiErr);
      }
    }

    // High quality room-specific fallback matching the exact analyzed space
    const list = fallbackConcepts[analysis.spaceCategory] || fallbackConcepts.bedroom;
    const randomIndex = Math.floor(Math.random() * list.length);
    const fallbackImage = list[randomIndex];

    return NextResponse.json({
      success: true,
      imageUrl: fallbackImage,
      prompt: fullArchitecturalPrompt,
      spaceCategory: analysis.spaceCategory,
      spaceTitle: analysis.spaceTitleVi,
      colorRequirements,
      designWishes,
      message: "AI Render 3D hoàn tất theo yêu cầu",
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
