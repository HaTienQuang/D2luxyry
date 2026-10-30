"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteData";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import { motion } from "framer-motion";

interface FooterProps {
  onOpenZalo?: () => void;
}

export default function Footer({ onOpenZalo }: FooterProps = {}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#f4f0ec] text-black pt-12 sm:pt-16 pb-28 sm:pb-12 border-t border-[#ded8ce] relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Luxury Layout: 2 balanced columns on mobile, 12 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-8 sm:gap-8 lg:gap-10 items-start">
          
          {/* Column 1: Logo, Slogan & Connect Buttons (col-span-2 on mobile, col-span-3 on lg) */}
          <div className="col-span-2 lg:col-span-3 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-14 sm:h-20 w-44 sm:w-56 flex items-center">
                <Image
                  src="/logo.png"
                  alt="D2 Luxury Design - Kiến Trúc & Nội Thất"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] font-serif text-neutral-700 leading-relaxed font-light">
              Khơi nguồn cảm hứng cho không gian sống hoàn mỹ. Đồng hành cùng bạn kiến tạo những công trình đẳng cấp, tiện nghi và trường tồn cùng thời gian.
            </p>

            {/* Quick Connect Actions (Clean side-by-side on mobile, stacked on desktop) */}
            <div className="pt-1 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              {/* Zalo Button */}
              <a
                href={siteConfig.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#0068ff] hover:bg-[#0055d4] text-white shadow-sm transition-all group font-serif text-xs"
              >
                <div className="w-6 h-6 rounded bg-white text-[#0068ff] font-sans font-black text-[11px] flex items-center justify-center shrink-0">
                  Z
                </div>
                <div className="min-w-0 text-left">
                  <span className="block font-semibold tracking-wide text-xs">Chat Zalo Tư Vấn 24/7</span>
                  <span className="block text-[10.5px] text-blue-100 font-sans truncate">{siteConfig.phone1} – {siteConfig.phone2}</span>
                </div>
              </a>

              {/* Facebook Button */}
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-white border border-[#ded8ce] hover:border-black text-neutral-800 shadow-sm transition-all group font-serif text-xs"
              >
                <span className="w-6 h-6 rounded-full bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Facebook className="w-3.5 h-3.5 fill-white" />
                </span>
                <span className="font-medium truncate">Fanpage Facebook D2 Luxury Design</span>
              </a>
            </div>
          </div>

          {/* Column 2: VỀ D2 LUXURY (col-span-1 on mobile, col-span-2 on lg) */}
          <div className="col-span-1 lg:col-span-2 space-y-3 pt-1 sm:pt-0">
            <h4 className="text-xs sm:text-[13px] font-serif font-bold uppercase tracking-wider text-black pb-1 border-b border-black/10 inline-block">
              VỀ D2 LUXURY
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-serif text-neutral-700 font-light">
              <li>
                <Link href="/about" className="hover:text-black hover:font-normal transition-colors block py-0.5">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/about#sec-doi-ngu" className="hover:text-black hover:font-normal transition-colors block py-0.5">
                  Đội ngũ KTS
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-black hover:font-normal transition-colors block py-0.5">
                  Dự án thực tế
                </Link>
              </li>
              <li>
                <Link href="/about#sec-quy-trinh" className="hover:text-black hover:font-normal transition-colors block py-0.5">
                  Quy trình làm việc
                </Link>
              </li>
              <li>
                <Link href="/about#sec-danh-gia" className="hover:text-black hover:font-normal transition-colors block py-0.5">
                  Khách hàng đánh giá
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: DỊCH VỤ (col-span-1 on mobile, col-span-2 on lg) */}
          <div className="col-span-1 lg:col-span-2 space-y-3 pt-1 sm:pt-0">
            <h4 className="text-xs sm:text-[13px] font-serif font-bold uppercase tracking-wider text-black pb-1 border-b border-black/10 inline-block">
              DỊCH VỤ
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-serif text-neutral-700 font-light">
              <li>
                <Link href="/interior" className="hover:text-black hover:font-normal transition-colors block py-0.5">
                  Thiết kế nội thất
                </Link>
              </li>
              <li>
                <Link href="/construction" className="hover:text-black hover:font-normal transition-colors block py-0.5">
                  Thi công trọn gói
                </Link>
              </li>
              <li>
                <Link href="/interior" className="hover:text-black hover:font-normal transition-colors block py-0.5">
                  Sản xuất theo yêu cầu
                </Link>
              </li>
              <li>
                <Link href="/construction" className="hover:text-black hover:font-normal transition-colors block py-0.5">
                  Cải tạo nâng cấp
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black hover:font-normal transition-colors block py-0.5">
                  Phong thủy nhà ở
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: THÔNG TIN LIÊN HỆ & CƠ SỞ (col-span-2 on mobile, col-span-5 on lg) */}
          <div className="col-span-2 lg:col-span-5 space-y-3.5">
            <h4 className="text-xs sm:text-[13px] font-serif font-bold uppercase tracking-wider text-black">
              THÔNG TIN LIÊN HỆ & CƠ SỞ
            </h4>

            {/* Unified Luxury Contact Card */}
            <div className="bg-white/85 border border-[#ded8ce] rounded-xl p-4 sm:p-5 shadow-sm space-y-3.5 text-xs font-serif">
              {/* Hotline & Email */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#eae3d9]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
                  <div>
                    <span className="text-neutral-500 font-light">Hotline: </span>
                    <a href={`tel:${siteConfig.hotline}`} className="font-bold text-black hover:text-luxury-gold transition-colors">
                      {siteConfig.phone1Contact}
                    </a>
                    <span className="mx-1 text-neutral-400">–</span>
                    <a href={`tel:${siteConfig.hotline2}`} className="font-bold text-black hover:text-luxury-gold transition-colors">
                      {siteConfig.phone2}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-luxury-gold shrink-0" />
                  <a href={`mailto:${siteConfig.email}`} className="text-neutral-800 hover:text-black font-medium transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-semibold text-black uppercase tracking-wider text-[11px] block">
                    Văn phòng tại Tp Hà Nội:
                  </span>
                  <span className="text-neutral-700">{siteConfig.officeHanoi}</span>
                </div>
              </div>

              {/* 3 Workshops */}
              <div className="pt-2 border-t border-[#eae3d9] space-y-1.5">
                <span className="font-semibold text-black uppercase tracking-wider text-[11px] block">
                  Hệ thống 3 xưởng sản xuất:
                </span>
                <div className="grid grid-cols-1 gap-1.5 pl-3 border-l-2 border-luxury-gold/70 text-neutral-700 leading-relaxed">
                  <div>
                    <span className="font-medium text-black">• Xưởng Hà Nội: </span>
                    <span>{siteConfig.workshopHanoi}</span>
                  </div>
                  <div>
                    <span className="font-medium text-black">• Xưởng Tp HCM: </span>
                    <span>{siteConfig.workshopHCMC}</span>
                  </div>
                  <div>
                    <span className="font-medium text-black">• Xưởng Phú Quốc: </span>
                    <span>{siteConfig.workshopPhuQuoc}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="w-full h-[1px] bg-black/15 mt-10 mb-6" />

        {/* Sub-footer: Centered service links & copyright */}
        <div className="text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-10 text-[11px] sm:text-xs font-serif uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium text-neutral-700">
            <Link href="/construction" className="hover:text-black transition-colors">
              THI CÔNG XÂY DỰNG
            </Link>
            <Link href="/architecture" className="hover:text-black transition-colors">
              THIẾT KẾ KIẾN TRÚC
            </Link>
            <Link href="/interior" className="hover:text-black transition-colors">
              THIẾT KẾ NỘI THẤT
            </Link>
            <button
              onClick={scrollToTop}
              className="hover:text-black underline underline-offset-4 cursor-pointer"
            >
              LÊN TRÊN CÙNG
            </button>
          </div>

          <p className="text-[11px] sm:text-xs font-serif text-neutral-500 font-light">
            Copyright by D2 Luxury Design © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
