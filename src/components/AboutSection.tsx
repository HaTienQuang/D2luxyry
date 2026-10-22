"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/siteData";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="sec-gioithieu"
      className="relative w-full py-16 sm:py-24 bg-white text-black overflow-hidden border-t border-[#eae3d9]"
    >
      {/* Background Watermark 02 (So1.svg) refined sizing to prevent clipping & overflow */}
      <div className="absolute top-1 sm:top-2 left-0 sm:left-4 lg:left-8 w-[170px] sm:w-[220px] lg:w-[270px] h-[140px] sm:h-[180px] lg:h-[220px] opacity-70 pointer-events-none select-none z-0">
        <Image
          src="/decor/So1.svg"
          alt="Watermark 02 D2 Luxury Design"
          fill
          className="object-contain object-left-top"
          priority
        />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, Divider, Paragraphs & Button matching Image 2 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-serif font-bold uppercase tracking-wider text-black leading-[1.2]">
                D2 LUXURY DESIGN
              </h2>
              {/* Crisp Black divider line */}
              <div className="w-24 h-[1.5px] bg-black mt-3 mb-6" />
            </div>

            <div className="text-sm sm:text-[15.5px] lg:text-[16px] text-[#222] font-serif leading-[1.9] font-light space-y-4">
              <p>
                Ra đời từ năm 2012, hiện tại D2 Luxury Design là đơn vị thiết kế và thi công
                nội & ngoại thất hoạt động chủ yếu ở Thành phố Hồ Chí Minh 2 phân
                xưởng sản xuất, hơn 200 công nhân tay nghề cao, 30 kiến trúc sư và
                20 giám sát công trình. Với sứ mệnh “mang lại sự ấm êm” D2 Luxury Design
                luôn cố gắng để tạo ra những sản phẩm tốt nhất cho khách hàng, công
                việc ổn định cho nhân viên, tạo ra giá trị cho xã hội. Đó là những giá
                trị cốt lõi cho sự phát triển vững vàng.
              </p>
            </div>

            <div className="pt-2 sm:pt-4">
              <motion.a
                href="/gioi-thieu"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block px-9 sm:px-11 py-3.5 sm:py-4 bg-black hover:bg-[#1a1a1a] text-white text-xs sm:text-[13.5px] font-serif tracking-[0.22em] uppercase font-semibold transition-all duration-300 hover:shadow-lg active:translate-y-0"
              >
                TÌM HIỂU THÊM
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Featured Image with Architectural Outline Frame behind */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex justify-center lg:justify-end pt-4 lg:pt-0"
          >
            <div className="relative w-full max-w-[680px] group">
              {/* Architectural wireframe outline frame box behind image */}
              <div
                className="absolute -left-5 sm:-left-7 top-8 sm:top-10 -bottom-7 sm:-bottom-9 right-6 sm:right-8 border border-[#333333] z-0 pointer-events-none transition-transform duration-700 ease-out group-hover:translate-x-1 group-hover:translate-y-1"
                aria-hidden="true"
              />

              {/* Floating photo with luxury drop shadow */}
              <div className="relative z-10 w-full aspect-[16/10.7] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] bg-[#f7f5f2] transition-all duration-700 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)]">
                <Image
                  src="/about/main.jpg"
                  alt="D2 Luxury Design - Thẩm mỹ và công năng song hành"
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 700px"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
