"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/siteData";
import { motion } from "framer-motion";

interface ConsultationSectionProps {
  onOpenZalo?: () => void;
  onOpenConsultation?: () => void;
}

export default function ConsultationSection({ onOpenZalo, onOpenConsultation }: ConsultationSectionProps = {}) {
  return (
    <section
      id="sec-tuvan"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-white text-black overflow-hidden border-t border-[#eae3d9]"
    >
      {/* Background Watermark 06 (So.svg) refined sizing to prevent clipping & overflow */}
      <div
        className="absolute top-1 sm:top-2 left-0 sm:left-4 lg:left-8 w-[170px] sm:w-[220px] lg:w-[270px] h-[140px] sm:h-[180px] lg:h-[220px] opacity-70 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <Image
          src="/decor/So.svg"
          alt="Watermark 06 Consultation"
          fill
          className="object-contain object-left-top"
          priority
        />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, Subtitle & 4 Elegant Pill Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 sm:space-y-7"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold uppercase tracking-wider text-black leading-[1.25]">
                NHẬN TƯ VẤN THIẾT KẾ THI<br />CÔNG NỘI THẤT
              </h2>
              {/* Black line divider */}
              <div className="w-20 sm:w-24 h-[1.5px] bg-black mt-3 sm:mt-4 mb-5 sm:mb-6" />
            </div>

            <p className="text-sm sm:text-[15px] text-neutral-600 font-serif italic leading-relaxed font-light max-w-lg">
              Lựa chọn phương thức liên hệ để trao đổi trực tiếp và nhận báo giá từ D2 Luxury
            </p>

            {/* Pill-shaped Soft Cream Buttons */}
            <div className="flex flex-col gap-3 pt-1 max-w-[340px]">
              {/* Button 0: Đăng ký tư vấn trực tuyến */}
              {onOpenConsultation && (
                <motion.button
                  whileHover={{ scale: 1.03, x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={onOpenConsultation}
                  className="w-full text-center py-3 sm:py-3.5 px-6 bg-[#8a522a] hover:bg-[#74421d] text-white border border-[#8a522a] rounded-full text-xs sm:text-[13px] font-serif tracking-[0.2em] uppercase transition-colors font-semibold shadow-md hover:shadow-lg cursor-pointer"
                >
                  ĐĂNG KÝ TƯ VẤN TRỰC TUYẾN
                </motion.button>
              )}

              {/* Button 1: Zalo */}
              <motion.a
                whileHover={{ scale: 1.03, x: 4 }}
                whileTap={{ scale: 0.97 }}
                href={siteConfig.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 sm:py-3.5 px-6 bg-[#ede9e3] hover:bg-black text-[#222] hover:text-white border border-[#ded8ce] hover:border-black rounded-full text-xs sm:text-[13px] font-serif tracking-[0.2em] uppercase transition-colors font-medium shadow-sm hover:shadow"
              >
                LIÊN HỆ QUA ZALO
              </motion.a>

              {/* Button 2: Messenger */}
              <motion.a
                whileHover={{ scale: 1.03, x: 4 }}
                whileTap={{ scale: 0.97 }}
                href={siteConfig.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 sm:py-3.5 px-6 bg-[#ede9e3] hover:bg-black text-[#222] hover:text-white border border-[#ded8ce] hover:border-black rounded-full text-xs sm:text-[13px] font-serif tracking-[0.2em] uppercase transition-colors font-medium shadow-sm hover:shadow"
              >
                LIÊN HỆ QUA MESSENGER
              </motion.a>

              {/* Button 3: Hotline */}
              <motion.a
                whileHover={{ scale: 1.03, x: 4 }}
                whileTap={{ scale: 0.97 }}
                href={`tel:${siteConfig.hotline}`}
                className="w-full text-center py-3 sm:py-3.5 px-6 bg-[#ede9e3] hover:bg-black text-[#222] hover:text-white border border-[#ded8ce] hover:border-black rounded-full text-xs sm:text-[13px] font-serif tracking-[0.2em] uppercase transition-colors font-medium shadow-sm hover:shadow"
              >
                HOTLINE: {siteConfig.phone1}
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Luxury Architectural Photo */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px]">
              {/* Offset Wireframe Outline Frame (shifted down and left, exactly like Image 1) */}
              <div
                className="absolute -bottom-6 sm:-bottom-8 -left-6 sm:-left-8 w-full h-full border border-black pointer-events-none z-0"
                aria-hidden="true"
              />

              {/* Main Photo Frame */}
              <div className="relative z-10 aspect-[3/4.2] w-full overflow-hidden shadow-2xl bg-black/5">
                <Image
                  src="/consultation/consultation-interior.webp"
                  alt="D2 Luxury Design - Không gian kiến trúc nội thất đẳng cấp"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-103"
                  sizes="(max-width: 768px) 100vw, 480px"
                  priority
                />

                {/* Bottom Brand Emblem Overlay replacing old watermark with D2 Luxury */}
                <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none bg-black/60 backdrop-blur-[3px] px-6 py-2.5 border border-white/20 shadow-lg whitespace-nowrap">
                  <span className="text-[11px] sm:text-[12px] font-sans tracking-[0.3em] uppercase text-luxury-gold font-semibold">
                    D2 LUXURY DESIGN
                  </span>
                  <span className="text-[9px] font-serif tracking-[0.2em] uppercase text-white/90">
                    KIẾN TRÚC & NỘI THẤT
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
