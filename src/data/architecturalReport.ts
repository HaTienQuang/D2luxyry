export interface ArchitecturalReport {
  overview: string;
  ceiling: string;
  wallsAndFurniture: string;
  floorAndLighting: string;
  architectAdvice: string;
  tags: string[];
}

export function buildArchitecturalReport(
  designNeed: string,
  colorRequirements: string,
  designWishes: string,
  spaceTitleVi: string,
  colorFamily: string
): ArchitecturalReport {
  const combined = `${designNeed} ${colorRequirements} ${designWishes}`.toLowerCase();
  const tags: string[] = [];

  // Tag: Space
  tags.push(spaceTitleVi.toUpperCase());

  // Tag: Color
  if (colorFamily === "blue") tags.push("TONE XANH SAPPHIRE & NAVY");
  else if (colorFamily === "green") tags.push("TONE XANH EMERALD & SAGE");
  else if (colorFamily === "wood") tags.push("TONE GỖ ÓC CHÓ TỰ NHIÊN");
  else if (colorFamily === "gold") tags.push("TONE VÀNG KIM & BE SANG TRỌNG");
  else if (colorFamily === "white") tags.push("TONE TRẮNG CẨM THẠCH CALACATTA");
  else if (colorFamily === "dark") tags.push("TONE ĐEN GRAPHITE & KIM LOẠI");
  else tags.push("TONE LUXURY TRUNG TÍNH");

  // Ceiling analysis
  let ceiling = "Hệ trần thạch cao giật cấp tinh tế, tích hợp rãnh đèn LED hắt gián tiếp 3000K tạo chiều sâu và độ thông thoáng tối đa.";
  const hasWoodCeiling = combined.includes("trần gỗ") || combined.includes("tran go") || combined.includes("ốp trần gỗ") || combined.includes("lam trần");
  const hasFan = combined.includes("quạt trần") || combined.includes("quat tran") || combined.includes("quạt") || combined.includes("fan");
  const hasChandelier = combined.includes("đèn chùm") || combined.includes("den chum") || combined.includes("đèn thả");
  const hasHighCeiling = combined.includes("thông tầng") || combined.includes("trần cao") || combined.includes("cao thoáng");

  if (hasWoodCeiling && hasFan) {
    ceiling = "Thiết kế hệ trần ốp lam gỗ tự nhiên (gỗ óc chó/gỗ sồi nhập khẩu) xử lý chống ẩm tiêu chuẩn, tâm trần tích hợp quạt trần cao cấp cánh gỗ điêu khắc khí động học vận hành êm ái, kết hợp đèn LED rãnh hắt gián tiếp âm trần.";
    tags.push("TRẦN GỖ & QUẠT TRẦN");
  } else if (hasWoodCeiling) {
    ceiling = "Thiết kế trần ốp nan gỗ tự nhiên sang trọng, viền chỉ kim loại mạ PVD ánh kim kết hợp hệ chiếu sáng hắt sáng hai lớp tạo cảm giác ấm cúng và đẳng cấp.";
    tags.push("TRẦN GỖ NGHỆ THUẬT");
  } else if (hasFan) {
    ceiling = "Hệ trần phẳng sơn hiệu ứng kết hợp quạt trần hiện đại động cơ DC tiết kiệm điện, cánh gỗ thanh mảnh tối giản mang lại làn gió đối lưu êm dịu.";
    tags.push("QUẠT TRẦN HIỆN ĐẠI");
  } else if (hasChandelier || hasHighCeiling) {
    ceiling = "Không gian trần cao thoáng đãng với đèn chùm nghệ thuật thả thông tầng bằng pha lê và kim loại chải mạ đồng tạo tâm điểm xa hoa.";
    tags.push("ĐÈN CHÙM NGHỆ THUẬT");
  }

  // Walls & Furniture analysis
  let wallsAndFurniture = "Nội thất chế tác thủ công chuẩn mực, vách ốp tường đồng bộ kết hợp các đường nét phào chỉ hoặc nan gỗ tinh xảo.";
  const hasWoodWall = combined.includes("vách ốp gỗ") || combined.includes("vách gỗ") || combined.includes("ốp gỗ") || combined.includes("lam sóng");
  const isBedroom = combined.includes("ngủ") || combined.includes("bedroom") || combined.includes("master");
  const isKitchen = combined.includes("bếp") || combined.includes("bep") || combined.includes("kitchen");

  if (isBedroom) {
    if (colorFamily === "blue") {
      wallsAndFurniture = `Tâm điểm là giường ngủ King-size bọc nỉ nhung cao cấp màu xanh sapphire/navy hoàng gia với đệm may chần tỉ mỉ. Vách đầu giường ${hasWoodWall ? "ốp hệ lam gỗ óc chó tự nhiên chạy dọc kịch trần tích hợp nẹp đồng champagne" : "bọc đệm nỉ nghệ thuật phối nẹp kim loại mạ vàng"}, hai bên tab treo tường tối giản kèm đèn thả đọc sách.`;
      tags.push("GIƯỜNG NỈ XANH SAPPHIRE");
      if (hasWoodWall) tags.push("VÁCH ỐP GỖ ÓC CHÓ");
    } else {
      wallsAndFurniture = `Giường ngủ Master bọc da/nỉ cao cấp tone màu thanh lịch. Vách đầu giường ${hasWoodWall ? "ốp gỗ tự nhiên kết hợp da viền kim loại" : "bọc vách trang trí nghệ thuật"} tạo điểm nhấn sang trọng cho toàn bộ phòng.`;
      if (hasWoodWall) tags.push("VÁCH ỐP GỖ NGHỆ THUẬT");
    }
  } else if (isKitchen) {
    wallsAndFurniture = `Hệ tủ bếp kịch trần cánh phẳng ${colorFamily === "blue" ? "sơn mờ tone xanh navy thời thượng" : "gỗ tự nhiên ấm cúng"}, tích hợp đảo bếp đá cẩm thạch Calacatta nguyên khối và ghế quầy bar chân kim loại thanh thoát.`;
    tags.push("ĐẢO BẾP ĐÁ MARBLE");
  } else {
    wallsAndFurniture = `Bộ sofa salon sang trọng ${colorFamily === "blue" ? "bọc nỉ nhung xanh hoàng gia" : "chất liệu da bò/nỉ nhập khẩu"} kết hợp bàn trà đá cẩm thạch đôi và kệ tivi ốp đá đối vân đối xứng.`;
    tags.push("SOFA SALON CAO CẤP");
  }

  // Floor & Lighting
  let floorAndLighting = "Sàn gỗ lát xương cá cao cấp ấm áp, kết hợp thảm dệt tay sợi tự nhiên định hình khu vực chức năng. Cửa kính lớn đón trọn ánh sáng tự nhiên ban ngày và hệ đèn ấm 3000K ban đêm.";
  if (combined.includes("view sân vườn") || combined.includes("sân vườn") || combined.includes("kính")) {
    floorAndLighting = "Hệ cửa nhôm kính định hình Slim cao cấp view tràn viền mở rộng tối đa ra sân vườn cảnh quan, đón trọn luồng gió và ánh sáng tự nhiên kết hợp sàn gỗ kỹ thuật cao cấp chống ẩm.";
    tags.push("CỬA KÍNH TRÀN VIEW");
  }

  // Architect Advice
  let architectAdvice = "Đảm bảo tỉ lệ vàng giữa diện tích trần, màu sắc nội thất và ánh sáng tự nhiên để không gian đạt độ mở và sự thư thái cao nhất.";
  if (hasWoodCeiling && hasFan) {
    architectAdvice = "Khuyến nghị từ KTS D2 Luxury: Với trần ốp gỗ tích hợp quạt trần, khoảng cách an toàn từ cánh quạt tới vách tường nên đạt tối thiểu 0.8m, cao độ lắp đặt lý tưởng cách sàn từ 2.6m - 2.8m. Nên sử dụng đèn LED rãnh hắt gián tiếp hai bên mép trần thay vì đèn rọi thẳng vào cánh quạt để tránh hiện tượng quạt quay tạo bóng nhấp nháy.";
  } else if (colorFamily === "blue") {
    architectAdvice = "Khuyến nghị từ KTS D2 Luxury: Sắc xanh navy/sapphire mang tính tĩnh lặng và vương giả cho phòng ngủ. Để không gian không bị cảm giác nặng nề, KTS đã phối hợp hài hòa cùng vách gỗ tông ấm (ấm - lạnh tương hỗ) và ánh sáng vàng dịu 3000K.";
  }

  const overview = `Phối cảnh 3D toàn cảnh bao quát hài hòa giữa cấu trúc ${hasWoodCeiling ? "Trần ốp gỗ" : "Trần nghệ thuật"}${hasFan ? " tích hợp quạt trần" : ""}, điểm nhấn ${isBedroom ? "giường ngủ Master" : "nội thất chính"} tone ${colorFamily === "blue" ? "xanh dương hoàng gia" : "sang trọng"} và hệ vách sàn chuẩn phong cách Luxury đương đại.`;

  return {
    overview,
    ceiling,
    wallsAndFurniture,
    floorAndLighting,
    architectAdvice,
    tags,
  };
}
