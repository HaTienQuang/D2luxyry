"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import ZaloModal from "@/components/ZaloModal";
import { siteConfig } from "@/data/siteData";
import { ArrowRight, Compass, Layers, Palette, Phone, Ruler, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ArchitectureServicePage() {
  const [isZaloModalOpen, setIsZaloModalOpen] = useState(false);

  const styles = [
    { title: "TÂN CỔ ĐIỂN", desc: "Hài hòa giữa vẻ đẹp quý phái châu Âu và tiện nghi hiện đại với các thức cột, vòm cong và phào chỉ tinh tế.", img: "/projects/thiet-ke-biet-thu-tan-co/main.jpg" },
    { title: "HIỆN ĐẠI LUXURY", desc: "Đường nét khúc chiết, không gian mở ngập tràn ánh sáng với vách kính lớn và vật liệu cao cấp.", img: "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-1.jpg" },
    { title: "INDOCHINE ĐÔNG DƯƠNG", desc: "Giao thoa giữa bản sắc Á Đông truyền thống và nét lãng mạn kiểu Pháp, ấm cúng và đầy chiều sâu.", img: "/projects/thiet-ke-penthouse-indochina/main.jpg" },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#f4f0ec] text-black">
      <Header onOpenZalo={() => setIsZaloModalOpen(true)} />

      {/* Hero Banner matching synchronized style */}
      <section className="relative w-full h-[52vh] min-h-[460px] sm:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Architectural villa design with natural illumination */}
        <div className="absolute inset-0">
          <Image
            src="/projects/thiet-ke-villa-tai-grand-island-ecopark/main.jpg"
            alt="Thiết kế kiến trúc D2 Luxury Design"
            fill
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
            priority
          />
          {/* Refined translucent overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/30" />
        </div>

        {/* Centered Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-24 pb-8 flex flex-col items-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-serif font-bold uppercase tracking-[0.2em] text-white drop-shadow-md leading-tight">
            THIẾT KẾ KIẾN TRÚC
          </h1>
          <div className="w-20 sm:w-28 h-[2px] bg-white/80 mx-auto mt-4 mb-5" />
          <p className="max-w-2xl sm:max-w-3xl mx-auto text-xs sm:text-[13px] md:text-[14px] font-serif uppercase tracking-[0.08em] text-white/95 leading-relaxed font-normal drop-shadow">
            SÁNG TẠO NÊN NHỮNG CÔNG TRÌNH KIẾN TRÚC ĐỘC BẢN MANG DẤU ÂN RIÊNG, TỐI ƯU HÓA CÔNG NĂNG VÀ PHONG THỦY CHO GIA CHỦ.
          </p>

          {/* Circular Scroll Down Button matching Roll.svg */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="mt-7 sm:mt-9"
          >
            <a
              href="#content"
              className="inline-flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity"
              aria-label="Cuộn xuống nội dung thiết kế kiến trúc"
            >
              <Image
                src="/Roll.svg"
                alt="Cuộn xuống"
                width={42}
                height={42}
                className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow"
              />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section id="content" className="py-16 sm:py-24 bg-white text-black border-b border-[#eae3d9] scroll-mt-20">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6"
            >
              <div>
                <span className="text-luxury-gold text-xs uppercase tracking-[0.25em] font-sans font-semibold block mb-2">
                  TRIẾT LÝ THIẾT KẾ
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold uppercase tracking-wider text-black leading-tight">
                  TỔNG HÒA GIỮA THẨM MỸ, CÔNG NĂNG & THIÊN NHIÊN
                </h2>
                <div className="w-20 h-[1.5px] bg-black mt-3 mb-6" />
              </div>

              <div className="text-sm sm:text-[15.5px] text-neutral-700 font-serif leading-[1.9] font-light space-y-4">
                <p>
                  Một tác phẩm kiến trúc hoàn hảo không chỉ dừng lại ở vẻ đẹp hình khối lộng lẫy bên ngoài, mà phải là không gian sống nuôi dưỡng cảm xúc, đón nhận tối đa ánh sáng tự nhiên và gió trời, đồng thời tối ưu hóa từng mét vuông cho sinh hoạt của các thành viên trong gia đình.
                </p>
                <p>
                  Tại D2 Luxury Design, đội ngũ 30 kiến trúc sư luôn lắng nghe câu chuyện và thói quen sinh hoạt của từng khách hàng, từ đó nghiên cứu địa thế khu đất, hướng nắng, hướng gió và nguyên lý phong thủy để kiến tạo nên phương án kiến trúc độc nhất.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs sm:text-sm font-serif">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-luxury-gold" />
                  <span>Quy hoạch công năng khoa học</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-luxury-gold" />
                  <span>Tối ưu phong thủy và vi khí hậu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-luxury-gold" />
                  <span>Phối cảnh 3D chân thực 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-luxury-gold" />
                  <span>Hồ sơ bản vẽ kỹ thuật chi tiết</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-6"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl bg-neutral-100">
                <Image
                  src="/projects/vintage-villa-tam-dao/main.jpg"
                  alt="Biệt thự kiến trúc độc bản D2 Luxury Design"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Architectural Styles Showcase */}
      <section className="py-16 sm:py-24 bg-[#f4f0ec] text-black border-b border-[#eae3d9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-luxury-gold text-xs uppercase tracking-[0.25em] font-sans font-semibold block mb-2">
              ĐA DẠNG PHONG CÁCH
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold uppercase tracking-wider text-black">
              CÁC PHONG CÁCH THIẾT KẾ CHỦ ĐẠO
            </h2>
            <div className="w-24 h-[1.5px] bg-black mx-auto mt-3" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {styles.map((style, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -8 }}
                className="bg-white border border-[#ded8ce] overflow-hidden group hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-black/5">
                  <Image
                    src={style.img}
                    alt={style.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 sm:p-8 space-y-3">
                  <h3 className="text-lg font-serif font-bold uppercase tracking-wider text-black group-hover:text-luxury-gold transition-colors">
                    {style.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-serif text-neutral-600 leading-relaxed font-light">
                    {style.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-[#f4f0ec] text-black text-center border-t border-[#ded8ce]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4 space-y-5"
        >
          <h2 className="text-2xl sm:text-4xl font-serif font-bold uppercase tracking-wider text-black">
            BẮT ĐẦU PHÁC THẢO Ý TƯỞNG KIẾN TRÚC
          </h2>
          <p className="text-sm font-serif text-neutral-600 font-light">
            Nhận tư vấn trực tiếp từ KTS trưởng của D2 Luxury Design để hiện thực hóa ngôi nhà trong mơ của bạn.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/#sec-tuvan"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white text-xs font-serif font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-all shadow-md"
              >
                <span>ĐĂNG KÝ TƯ VẤN KIẾN TRÚC</span>
                <ArrowRight className="w-4 h-4 text-luxury-gold" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/du-an"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-black text-black text-xs font-serif font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-all"
              >
                <span>XEM BỘ SƯU TẬP DỰ ÁN</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
      <FloatingWidgets onOpenZalo={() => setIsZaloModalOpen(true)} />
      <ZaloModal isOpen={isZaloModalOpen} onClose={() => setIsZaloModalOpen(false)} />
    </main>
  );
}

