"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteData";
import { Phone, Mail, MapPin, Facebook, Youtube, Instagram } from "lucide-react";

interface FooterProps {
  onOpenZalo?: () => void;
}

export default function Footer({ onOpenZalo }: FooterProps = {}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#f4f0ec] text-black pt-16 pb-10 border-t border-[#ded8ce] relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Layout matching Image 1 without solid black background */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Column 1: Logo, Slogan, Socials */}
          <div className="lg:col-span-4 space-y-4">
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

            {/* Social Icons row */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 text-white hover:bg-[#8a522a] flex items-center justify-center transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 text-white hover:bg-[#8a522a] flex items-center justify-center transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 text-white hover:bg-[#8a522a] flex items-center justify-center transition-colors shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@d2luxury"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 text-white hover:bg-[#8a522a] flex items-center justify-center transition-colors shadow-sm"
                aria-label="TikTok"
              >
                {/* TikTok SVG Icon */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.87-4.48V8.69a8.19 8.19 0 0 0 4.9 1.6V6.84a4.87 4.87 0 0 1-1-.15z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: VỀ D2 LUXURY */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs sm:text-[13px] font-serif font-bold uppercase tracking-wider text-black">
              VỀ D2 LUXURY
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] font-serif text-neutral-700 font-light">
              <li>
                <Link href="/gioi-thieu" className="hover:text-black hover:font-normal transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu#sec-doi-ngu" className="hover:text-black hover:font-normal transition-colors">
                  Đội ngũ kiến trúc sư
                </Link>
              </li>
              <li>
                <Link href="/du-an" className="hover:text-black hover:font-normal transition-colors">
                  Dự án thực tế
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu#sec-quy-trinh" className="hover:text-black hover:font-normal transition-colors">
                  Quy trình làm việc
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu#sec-danh-gia" className="hover:text-black hover:font-normal transition-colors">
                  Khách hàng đánh giá
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: DỊCH VỤ */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs sm:text-[13px] font-serif font-bold uppercase tracking-wider text-black">
              DỊCH VỤ
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] font-serif text-neutral-700 font-light">
              <li>
                <Link href="/thiet-ke-noi-that" className="hover:text-black hover:font-normal transition-colors">
                  Thiết kế nội thất cao cấp
                </Link>
              </li>
              <li>
                <Link href="/thi-cong-xay-dung" className="hover:text-black hover:font-normal transition-colors">
                  Thi công nội thất trọn gói
                </Link>
              </li>
              <li>
                <Link href="/thiet-ke-noi-that" className="hover:text-black hover:font-normal transition-colors">
                  Sản xuất nội thất theo yêu cầu
                </Link>
              </li>
              <li>
                <Link href="/thi-cong-xay-dung" className="hover:text-black hover:font-normal transition-colors">
                  Cải tạo và nâng cấp không gian
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-black hover:font-normal transition-colors">
                  Tư vấn phong thủy nhà ở
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: THÔNG TIN LIÊN HỆ & Zalo QR Card */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs sm:text-[13px] font-serif font-bold uppercase tracking-wider text-black">
              THÔNG TIN LIÊN HỆ
            </h4>

            <div className="space-y-2.5 text-xs sm:text-[13px] font-serif text-neutral-800 font-light leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <span>Tầng 5, Tòa nhà D2 Luxury, Hà Nội & TP. HCM</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-neutral-900 shrink-0" />
                <a href={`tel:${siteConfig.hotline}`} className="hover:text-black font-semibold text-neutral-900">
                  {siteConfig.phone1}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-neutral-900 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-black transition-colors font-medium">
                  {siteConfig.email}
                </a>
              </div>
            </div>

            {/* Zalo QR Card Container matching Image 1 - Mở trực tiếp trang Zalo trong tab mới */}
            <a
              href={siteConfig.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 p-3 rounded-2xl bg-[#1c1917] text-white flex items-center gap-3.5 shadow-lg border border-neutral-700/60 hover:border-[#8a522a] transition-all duration-300 cursor-pointer group block"
            >
              {/* White QR Box */}
              <div className="relative w-12 h-12 bg-white rounded-lg p-1 shrink-0 overflow-hidden shadow-inner flex items-center justify-center">
                <Image
                  src="/zalo-qr.png"
                  alt="Mã Zalo D2 Luxury"
                  fill
                  className="object-contain p-0.5 group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="text-left font-sans">
                <span className="block font-bold text-xs sm:text-[13px] text-white tracking-wide group-hover:text-[#38bdf8] transition-colors">
                  Quét mã Zalo
                </span>
                <span className="block text-[10.5px] sm:text-[11px] text-neutral-300 font-light leading-tight mt-0.5">
                  Kết nối tư vấn 24/7 ({siteConfig.phone1})
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
            <Link href="/thi-cong-xay-dung" className="hover:text-black transition-colors">
              THI CÔNG XÂY DỰNG
            </Link>
            <Link href="/thiet-ke-kien-truc" className="hover:text-black transition-colors">
              THIẾT KẾ KIẾN TRÚC
            </Link>
            <Link href="/thiet-ke-noi-that" className="hover:text-black transition-colors">
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
            Copyright by D2 Luxury © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
