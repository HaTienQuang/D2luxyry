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
    <footer className="bg-[#f4f0ec] text-black pt-16 pb-10 border-t border-[#ded8ce] relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Column 1: Logo, Slogan, Domain, Socials & Fanpage */}
          <div className="lg:col-span-3 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-16 sm:h-20 w-48 sm:w-56 flex items-center">
                <Image
                  src="/logo.png"
                  alt="D2 Luxury Design - Kiến Trúc & Nội Thất"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] font-serif text-neutral-700 leading-relaxed max-w-sm font-light">
              Khơi nguồn cảm hứng cho không gian sống hoàn mỹ. Đồng hành cùng bạn kiến tạo những không gian sống đẳng cấp, tiện nghi và trường tồn cùng thời gian.
            </p>

            {/* Facebook Fanpage Only */}
            <div className="pt-2 flex items-center gap-2.5">
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center transition-all shadow-sm"
                aria-label="Facebook Fanpage D2 Luxury Design"
              >
                <Facebook className="w-4 h-4 fill-white" />
              </motion.a>
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-[13px] font-serif text-neutral-800 hover:text-[#1877F2] transition-colors font-medium underline underline-offset-4"
              >
                Fanpage Facebook D2 Luxury Design
              </a>
            </div>
          </div>

          {/* Column 2: VỀ D2 LUXURY DESIGN */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs sm:text-[13px] font-serif font-bold uppercase tracking-wider text-black">
              VỀ D2 LUXURY DESIGN
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] font-serif text-neutral-700 font-light">
              <li>
                <Link href="/about" className="hover:text-black hover:font-normal transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/about#sec-doi-ngu" className="hover:text-black hover:font-normal transition-colors">
                  Đội ngũ kiến trúc sư
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-black hover:font-normal transition-colors">
                  Dự án thực tế
                </Link>
              </li>
              <li>
                <Link href="/about#sec-quy-trinh" className="hover:text-black hover:font-normal transition-colors">
                  Quy trình làm việc
                </Link>
              </li>
              <li>
                <Link href="/about#sec-danh-gia" className="hover:text-black hover:font-normal transition-colors">
                  Khách hàng đánh giá
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: DỊCH VỤ */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs sm:text-[13px] font-serif font-bold uppercase tracking-wider text-black">
              DỊCH VỤ
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] font-serif text-neutral-700 font-light">
              <li>
                <Link href="/interior" className="hover:text-black hover:font-normal transition-colors">
                  Thiết kế nội thất cao cấp
                </Link>
              </li>
              <li>
                <Link href="/construction" className="hover:text-black hover:font-normal transition-colors">
                  Thi công nội thất trọn gói
                </Link>
              </li>
              <li>
                <Link href="/interior" className="hover:text-black hover:font-normal transition-colors">
                  Sản xuất nội thất theo yêu cầu
                </Link>
              </li>
              <li>
                <Link href="/construction" className="hover:text-black hover:font-normal transition-colors">
                  Cải tạo và nâng cấp không gian
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black hover:font-normal transition-colors">
                  Tư vấn phong thủy nhà ở
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: THÔNG TIN LIÊN HỆ & Zalo QR Card */}
          <div className="lg:col-span-5 space-y-3.5">
            <h4 className="text-xs sm:text-[13px] font-serif font-bold uppercase tracking-wider text-black">
              THÔNG TIN LIÊN HỆ
            </h4>

            <div className="space-y-2 text-xs sm:text-[13px] font-serif text-neutral-800 font-light leading-relaxed">
              {/* Văn phòng Hà Nội */}
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-black">Văn phòng tại Tp Hà Nội:</span>{" "}
                  <span>{siteConfig.officeHanoi}</span>
                </div>
              </div>

              {/* Hệ thống 3 Xưởng sản xuất */}
              <div className="pt-1 space-y-1">
                <div className="flex items-start gap-2">
                  <span className="text-sm font-bold text-neutral-900 shrink-0 leading-none mt-0.5">➢</span>
                  <div>
                    <span className="font-semibold text-black">Xưởng sản xuất tại Hà Nội:</span>{" "}
                    <span>{siteConfig.workshopHanoi}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-sm font-bold text-neutral-900 shrink-0 leading-none mt-0.5">➢</span>
                  <div>
                    <span className="font-semibold text-black">Xưởng sản xuất tại Tp HCM:</span>{" "}
                    <span>{siteConfig.workshopHCMC}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-sm font-bold text-neutral-900 shrink-0 leading-none mt-0.5">➢</span>
                  <div>
                    <span className="font-semibold text-black">Xưởng sản xuất tại Phú Quốc:</span>{" "}
                    <span>{siteConfig.workshopPhuQuoc}</span>
                  </div>
                </div>
              </div>

              {/* Hotline */}
              <div className="flex items-start gap-2 pt-1.5 border-t border-black/10">
                <Phone className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-semibold text-black">Hotline:</span>
                  <a href={`tel:${siteConfig.hotline}`} className="hover:text-luxury-gold font-bold text-neutral-900 transition-colors">
                    {siteConfig.phone1Contact}
                  </a>
                  <span>–</span>
                  <a href={`tel:${siteConfig.hotline2}`} className="hover:text-luxury-gold font-bold text-neutral-900 transition-colors">
                    {siteConfig.phone2}
                  </a>
                </div>
              </div>

              {/* Email & Website */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-0.5">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-neutral-900 shrink-0" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-black transition-colors font-medium">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Zalo QR Card Container */}
            <a
              href={siteConfig.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 p-3 rounded-2xl bg-[#1c1917] text-white flex items-center gap-3.5 shadow-lg border border-neutral-700/60 hover:border-luxury-gold transition-all duration-300 cursor-pointer group block"
            >
              {/* White QR Box */}
              <div className="relative w-12 h-12 bg-white rounded-lg p-1 shrink-0 overflow-hidden shadow-inner flex items-center justify-center">
                <Image
                  src="/zalo-qr.png"
                  alt="Mã Zalo D2 Luxury Design"
                  fill
                  className="object-contain p-0.5 group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="text-left font-sans">
                <span className="block font-bold text-xs sm:text-[13px] text-white tracking-wide group-hover:text-luxury-gold transition-colors">
                  Quét mã Zalo
                </span>
                <span className="block text-[10.5px] sm:text-[11px] text-neutral-300 font-light leading-tight mt-0.5">
                  Kết nối tư vấn 24/7 ({siteConfig.phone1} – {siteConfig.phone2})
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Divider line */}
        <div className="w-full h-[1px] bg-black/15 mt-10 mb-6" />

        {/* Sub-footer: Centered service links & copyright */}
        <div className="text-center space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] sm:text-xs font-serif uppercase tracking-[0.2em] font-medium text-neutral-700">
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

          <p className="text-[11px] sm:text-xs font-serif text-neutral-500 font-light pt-1">
            Copyright by D2 Luxury Design © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
