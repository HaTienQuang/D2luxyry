"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteData";

interface BrandsSectionProps {
  onOpenZalo?: () => void;
}

export default function BrandsSection({ onOpenZalo }: BrandsSectionProps = {}) {
  return (
    <section
      id="sec-thuonghieu"
      className="relative w-full py-16 sm:py-24 bg-white text-black overflow-hidden border-t border-[#eae3d9]"
    >
      {/* Background Watermark 04 (So4.svg) with unified sizing & positioning */}
      <div
        className="absolute top-2 left-0 sm:left-4 w-[420px] sm:w-[520px] lg:w-[560px] h-[400px] sm:h-[500px] lg:h-[540px] opacity-85 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <Image
          src="/decor/So4.svg"
          alt="Watermark 04"
          fill
          className="object-contain object-left-top"
          priority
        />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching other sections */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-serif font-bold uppercase tracking-wider text-black">
            THƯƠNG HIỆU CỦA D2 LUXURY
          </h2>
          <div className="w-24 sm:w-32 h-[2px] bg-black mx-auto mt-4" />
        </div>

        {/* 2 Brand Cards: Only 2 Logos & Brand Names, pure luxury minimalism */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto items-stretch">
          {/* BRAND 1: DỰ ÁN KIẾN TRÚC & NỘI THẤT */}
          <Link
            href="/du-an"
            className="group block bg-[#faf8f5] border border-[#ded8ce] p-8 sm:p-12 hover:border-black/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 text-center"
          >
            {/* Logo Presentation Box */}
            <div className="relative w-full aspect-[16/11] max-w-[340px] mx-auto bg-white border border-[#eae3d9] p-6 sm:p-8 flex items-center justify-center group-hover:shadow-md transition-all duration-500">
              <Image
                src="/brand/logo-kientruc-noithat.png"
                alt="D2 Luxury Design - Kiến trúc & Nội thất"
                fill
                className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>

            {/* Brand Title */}
            <div className="mt-8 space-y-1.5">
              <h3 className="text-lg sm:text-xl font-serif font-bold uppercase tracking-[0.12em] text-black group-hover:text-luxury-gold transition-colors">
                D2 LUXURY DESIGN
              </h3>
              <p className="text-xs sm:text-[13px] font-serif uppercase tracking-[0.22em] text-neutral-600 font-medium">
                KIẾN TRÚC &amp; NỘI THẤT
              </p>
            </div>
          </Link>

          {/* BRAND 2: WEBSITE BÁN ĐỒ RỜI GỖ TỰ NHIÊN */}
          <a
            href={siteConfig.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onOpenZalo ? (e) => { e.preventDefault(); onOpenZalo(); } : undefined}
            className="group block bg-[#faf8f5] border border-[#ded8ce] p-8 sm:p-12 hover:border-[#4a2e18]/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 text-center"
          >
            {/* Logo Presentation Box */}
            <div className="relative w-full aspect-[16/11] max-w-[340px] mx-auto bg-white border border-[#eae3d9] p-6 sm:p-8 flex items-center justify-center group-hover:shadow-md transition-all duration-500">
              <Image
                src="/brand/logo-go-tunhien.png"
                alt="D2 Luxury Design - Nội thất gỗ tự nhiên"
                fill
                className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>

            {/* Brand Title */}
            <div className="mt-8 space-y-1.5">
              <h3 className="text-lg sm:text-xl font-serif font-bold uppercase tracking-[0.12em] text-black group-hover:text-luxury-gold transition-colors">
                D2 LUXURY DESIGN
              </h3>
              <p className="text-xs sm:text-[13px] font-serif uppercase tracking-[0.22em] text-neutral-600 font-medium">
                NỘI THẤT GỖ TỰ NHIÊN
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
