"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectItem {
  id: string;
  title: string;
  image: string;
  categoryLabel?: string;
  location?: string;
  gallery?: string[];
  description?: string;
}

export default function ProjectsSection() {
  const [showAllMobile, setShowAllMobile] = useState(false);
  // 12 Authentic D2 Luxury Design Projects from public/projects/ with real photos & galleries
  const projectItems: ProjectItem[] = [
    {
      id: "villa-grand-island-ecopark",
      title: "VILLA GRAND ISLAND – ECOPARK",
      image: "/projects/thiet-ke-villa-tai-grand-island-ecopark/main.gif",
      categoryLabel: "Biệt thự đảo cao cấp",
      location: "Ecopark, Hưng Yên",
      gallery: [
        "/projects/thiet-ke-villa-tai-grand-island-ecopark/main.gif",
        "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-1.gif",
        "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-2.gif",
        "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-3.gif",
        "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-4.gif",
      ],
      description: "Dinh thự đảo siêu sang tại Grand Island Ecopark với không gian thông tầng kỳ vĩ, nội thất may đo chuẩn mực mang đậm dấu ấn D2 Luxury Design."
    },
    {
      id: "villa-vinhomes-ocean-park",
      title: "VILLA VINHOMES OCEAN PARK",
      image: "/projects/thiet-ke-villa-vinhomes-ocean-park/main.gif",
      categoryLabel: "Biệt thự đơn lập",
      location: "Gia Lâm, Hà Nội",
      gallery: [
        "/projects/thiet-ke-villa-vinhomes-ocean-park/main.gif",
        "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-1.gif",
        "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-2.gif",
        "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-3.gif",
      ],
      description: "Biệt thự tân cổ điển thanh lịch với đường nét phào chỉ tinh tế, hệ đèn chùm pha lê độc bản và vật liệu cao cấp chuẩn châu Âu."
    },
    {
      id: "vintage-villa-tam-dao",
      title: "VINTAGE VILLA – TAM ĐẢO",
      image: "/projects/thiet-ke-vintage-villa-tai-tam-dao/main.gif",
      categoryLabel: "Villa nghỉ dưỡng sườn đồi",
      location: "Tam Đảo, Vĩnh Phúc",
      gallery: [
        "/projects/thiet-ke-vintage-villa-tai-tam-dao/main.gif",
        "/projects/thiet-ke-vintage-villa-tai-tam-dao/photo-1.gif",
        "/projects/thiet-ke-vintage-villa-tai-tam-dao/photo-2.gif",
        "/projects/thiet-ke-vintage-villa-tai-tam-dao/photo-3.gif",
      ],
      description: "Biệt thự nghỉ dưỡng phong cách Vintage mộc mạc giữa rừng thông Tam Đảo, kết hợp hài hòa giữa đá tự nhiên, gỗ ấm và vách kính panorama."
    },
    {
      id: "biet-thu-vinhomes-riverside",
      title: "BIỆT THỰ VINHOMES RIVERSIDE",
      image: "/projects/thiet-ke-biet-thu-vinhomes-riverside/main.gif",
      categoryLabel: "Biệt thự ven sông",
      location: "Long Biên, Hà Nội",
      gallery: [
        "/projects/thiet-ke-biet-thu-vinhomes-riverside/main.gif",
        "/projects/thiet-ke-biet-thu-vinhomes-riverside/photo-1.gif",
        "/projects/thiet-ke-biet-thu-vinhomes-riverside/photo-2.gif",
      ],
      description: "Dinh thự phong cách Tân cổ điển Pháp uy nghi, cột thức Corinthian tráng lệ và cảnh quan sân vườn hướng sông thơ mộng."
    },
    {
      id: "biet-thu-the-harmony",
      title: "BIỆT THỰ THE HARMONY",
      image: "/projects/thiet-ke-biet-thu-tai-vinhomes-harmony/main.gif",
      categoryLabel: "Biệt thự song lập",
      location: "Vinhomes The Harmony, Hà Nội",
      gallery: [
        "/projects/thiet-ke-biet-thu-tai-vinhomes-harmony/main.gif",
        "/projects/thiet-ke-biet-thu-tai-vinhomes-harmony/photo-1.gif",
        "/projects/thiet-ke-biet-thu-tai-vinhomes-harmony/photo-2.gif",
      ],
      description: "Thiết kế nội thất bán cổ điển tinh gọn, tối ưu ánh sáng tự nhiên và công năng sử dụng tiện nghi cho gia đình đa thế hệ."
    },
    {
      id: "villa-nghi-duong-da-lat",
      title: "VILLA NGHỈ DƯỠNG – ĐÀ LẠT",
      image: "/projects/thiet-ke-villa-nghi-duong-tai-da-lat/main.jpg",
      categoryLabel: "Villa nghỉ dưỡng cao cấp",
      location: "TP. Đà Lạt, Lâm Đồng",
      gallery: [
        "/projects/thiet-ke-villa-nghi-duong-tai-da-lat/main.jpg",
        "/projects/villa-da-lat/gallery-1.jpg",
        "/projects/villa-da-lat/gallery-2.jpg",
      ],
      description: "Không gian sống hòa quyện cùng thiên nhiên sương mờ Đà Lạt, sử dụng tone màu ấm cúng và nội thất gỗ gia công tỉ mỉ."
    },
    {
      id: "sapphire-villa-tam-dao",
      title: "SAPPHIRE VILLA – TAM ĐẢO",
      image: "/projects/thiet-ke-sapphire-villa-tai-tam-dao/main.gif",
      categoryLabel: "Biệt thự đồi sinh thái",
      location: "Tam Đảo, Vĩnh Phúc",
      gallery: [
        "/projects/thiet-ke-sapphire-villa-tai-tam-dao/main.gif",
        "/projects/thiet-ke-sapphire-villa-tai-tam-dao/photo-1.gif",
        "/projects/thiet-ke-sapphire-villa-tai-tam-dao/photo-2.gif",
      ],
      description: "Tác phẩm kiến trúc hiện đại hòa mình vào đồi thông, hệ ban công kính mở rộng tầm nhìn trọn vẹn thung lũng mây."
    },
    {
      id: "maya-villa-ba-vi",
      title: "MAYA VILLA – BA VÌ",
      image: "/projects/thiet-ke-villa-tai-ba-vi/main.gif",
      categoryLabel: "Biệt thự vườn sinh thái",
      location: "Ba Vì, Hà Nội",
      gallery: [
        "/projects/thiet-ke-villa-tai-ba-vi/main.gif",
        "/projects/thiet-ke-villa-tai-ba-vi/photo-1.gif",
        "/projects/thiet-ke-villa-tai-ba-vi/photo-2.gif",
      ],
      description: "Biệt thự nhà vườn phong cách Farmhouse sang trọng, kết hợp bể bơi vô cực và khuôn viên cỏ cây xanh mướt thư thái."
    },
    {
      id: "penthouse-indochine",
      title: "PENTHOUSE INDOCHINE",
      image: "/projects/thiet-ke-penthouse-indochina/main.gif",
      categoryLabel: "Penthouse cao cấp",
      location: "Hà Nội",
      gallery: [
        "/projects/thiet-ke-penthouse-indochina/main.gif",
        "/projects/penthouse-tan-co/main.jpg",
      ],
      description: "Sự kết hợp hoàn hảo giữa nét lãng mạn Đông Dương và tiện nghi hiện đại của căn hộ thông tầng đỉnh cao."
    },
    {
      id: "biet-thu-tan-co-dien",
      title: "BIỆT THỰ TÂN CỔ ĐIỂN CAO CẤP",
      image: "/projects/biet-thu-tan-co/main.jpg",
      categoryLabel: "Dinh thự tân cổ điển",
      location: "TP. Hồ Chí Minh",
      gallery: [
        "/projects/biet-thu-tan-co/main.jpg",
        "/projects/cong-trinh-thuc-te-tai-tp-hcm/main.jpg",
      ],
      description: "Công trình tân cổ điển bề thế, hoa văn thạch cao dát vàng nhẹ nhàng và sàn gỗ tự nhiên herringbone cao cấp."
    },
    {
      id: "can-ho-vinhomes-metropolis",
      title: "CĂN HỘ VINHOMES METROPOLIS",
      image: "/projects/vinhomes-metropolis/main.jpg",
      categoryLabel: "Căn hộ hạng sang",
      location: "Liễu Giai, Ba Đình, Hà Nội",
      gallery: [
        "/projects/vinhomes-metropolis/main.jpg",
        "/projects/vinhomes-metropolis/gallery-1.jpg",
        "/projects/vinhomes-metropolis/gallery-2.jpg",
      ],
      description: "Căn hộ trung tâm thủ đô mang ngôn ngữ hiện đại tối giản, mặt đá marble sang trọng và hệ tủ áo cánh kính thời thượng."
    },
    {
      id: "can-ho-han-jardin",
      title: "CĂN HỘ HAN JARDIN – NGOẠI GIAO ĐOÀN",
      image: "/projects/can-ho-han-jardin/main.jpg",
      categoryLabel: "Căn hộ cao cấp",
      location: "Bắc Từ Liêm, Hà Nội",
      gallery: [
        "/projects/can-ho-han-jardin/main.jpg",
        "/projects/can-ho-3-phong-ngu-vinhomes-westpoint/main.jpg",
      ],
      description: "Không gian sống tinh tế với gam màu trung tính, bố cục khoa học và đồ nội thất đặt đóng riêng theo chuẩn thẩm mỹ D2 Luxury Design."
    }
  ];

  return (
    <section
      id="sec-duan"
      className="relative w-full py-14 sm:py-20 lg:py-24 bg-[#f4f0ec] text-black overflow-hidden"
    >
      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Anchored Watermark 01 (So3.svg) and Title */}
          <div className="lg:col-span-4 relative lg:sticky lg:top-24">
            {/* Watermark 01 (So3.svg) refined sizing to prevent clipping & oversized display */}
            <div
              className="absolute -top-8 sm:-top-10 lg:-top-12 -left-2 sm:-left-4 lg:-left-6 w-[200px] sm:w-[260px] lg:w-[300px] h-[160px] sm:h-[210px] lg:h-[250px] opacity-75 pointer-events-none select-none z-0"
              aria-hidden="true"
            >
              <Image
                src="/decor/So3.svg"
                alt="Watermark 01"
                fill
                className="object-contain object-left-top"
                priority
              />
            </div>

            {/* Left Content positioned below numeral 01 */}
            <div className="relative z-10 pt-[100px] sm:pt-[120px] lg:pt-[140px] space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold uppercase tracking-wider text-black leading-[1.15]">
                  DỰ ÁN CỦA<br />D2 LUXURY DESIGN
                </h2>
                {/* Clean Black Divider line matching Image 2 */}
                <div className="w-24 sm:w-28 h-[2px] bg-black mt-4 mb-6 sm:mb-8" />
              </div>

              <div className="space-y-4 text-sm sm:text-[15.5px] lg:text-[16px] text-[#222] font-serif leading-[1.9] font-light">
                <p>
                  Với hơn 14 năm kinh nghiệm trong lĩnh vực thiết kế và thi công kiến trúc – nội thất, D2 Luxury Design đã có cơ hội được làm việc với hàng ngàn khách hàng và hàng trăm dự án, thành công mang đến những không gian sống đẳng cấp, thẩm mỹ và thể hiện được dấu ấn cá nhân của gia chủ.
                </p>
                <p>
                  Bên cạnh đó, phong cách thiết kế và thi công của D2 Luxury Design đa dạng: từ Tân Cổ Điển, Bán Cổ Điển, Đông Dương, Farmhouse đến Hiện Đại.
                </p>
              </div>

              {/* Desktop CTA Button: pinned inside sticky sidebar */}
              <div className="hidden lg:block pt-2 sm:pt-4">
                <motion.a
                  href="/projects"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block px-9 sm:px-11 py-3.5 sm:py-4 bg-black hover:bg-[#1a1a1a] text-white text-xs sm:text-[13.5px] font-serif tracking-[0.22em] uppercase font-semibold transition-all duration-300 shadow hover:shadow-lg active:translate-y-0"
                >
                  XEM TOÀN BỘ DỰ ÁN
                </motion.a>
              </div>
            </div>
          </div>

          {/* Right Column: 2-column image grid with Framer Motion Stagger & Hover Elevation */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {projectItems.map((item, idx) => {
                const isHiddenOnMobile = idx >= 4 && !showAllMobile;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.7,
                      delay: (idx % 2) * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -6 }}
                    className={`overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 bg-black/5 ${
                      isHiddenOnMobile ? "hidden lg:block" : "block"
                    }`}
                  >
                    <Link
                      href={`/projects/${item.id}`}
                      className="group relative aspect-[3/2] w-full block overflow-hidden cursor-pointer"
                    >
                      {/* Real D2 Luxury Design Photo from public/projects/ */}
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      />

                      {/* Title Scrim: Always visible on mobile, hover slide-up on desktop */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 ease-out flex items-end p-4 sm:p-6">
                        <div className="transform translate-y-0 lg:translate-y-3 lg:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                          <span className="text-[10.5px] sm:text-xs tracking-widest uppercase text-luxury-gold font-sans font-medium block mb-1">
                            {item.categoryLabel}
                          </span>
                          <h3 className="text-white font-serif text-sm sm:text-base lg:text-lg tracking-wider font-semibold uppercase drop-shadow-md">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile / Tablet Action Bar: Expand +8 projects or View Full Archive */}
            <div className="lg:hidden mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowAllMobile((prev) => !prev)}
                className="w-full sm:w-auto text-center px-6 py-3 border border-black/40 hover:border-black text-black text-xs sm:text-[13px] font-serif tracking-[0.18em] uppercase font-semibold transition-all bg-white hover:bg-black/5 shadow-sm active:scale-[0.98]"
              >
                {showAllMobile ? "Thu gọn dự án" : "Xem thêm dự án (+8)"}
              </button>
              <Link
                href="/projects"
                className="w-full sm:w-auto text-center px-8 py-3.5 bg-black hover:bg-[#1a1a1a] text-white text-xs sm:text-[13px] font-serif tracking-[0.2em] uppercase font-semibold transition-all shadow hover:shadow-lg active:scale-[0.98]"
              >
                XEM TOÀN BỘ DỰ ÁN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
