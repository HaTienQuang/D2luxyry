"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteData";
import { Phone, ArrowUp, SquarePen } from "lucide-react";

interface FloatingWidgetsProps {
  onOpenZalo?: () => void;
  onOpenConsultation?: () => void;
}

export default function FloatingWidgets({ onOpenConsultation }: FloatingWidgetsProps = {}) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConsultationClick = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      const el = document.getElementById("sec-tuvan");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/#sec-tuvan";
      }
    }
  };

  return (
    <aside
      aria-label="Nút hỗ trợ nhanh"
      className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-center gap-3 select-none"
    >
      {/* 1. Nút Zalo (Mở trực tiếp trang Zalo Bùi Dũng trong tab mới) */}
      <a
        href={siteConfig.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0068ff] hover:bg-[#0055d4] text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/80 ring-1 ring-black/10 cursor-pointer"
        aria-label="Tư vấn Zalo"
      >
        <span className="font-sans font-bold text-[14px] tracking-tight text-white leading-none">
          Zalo
        </span>

        {/* Pulse wave ring */}
        <span className="absolute -inset-1 rounded-full bg-[#0068ff]/30 animate-ping pointer-events-none" />

        {/* Tooltip on hover */}
        <span className="absolute right-14 px-3 py-1.5 bg-black/90 text-white text-xs font-serif whitespace-nowrap rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Mở Zalo: {siteConfig.phone1}
        </span>
      </a>

      {/* 2. Nút Gọi Hotline (Màu nâu đồng thương hiệu D2 Luxury với icon điện thoại) */}
      <a
        href={`tel:${siteConfig.hotline}`}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#8a522a] hover:bg-[#72411e] text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/80 ring-1 ring-black/10"
        aria-label={`Gọi Hotline ${siteConfig.phone1}`}
      >
        <Phone className="w-5 h-5 text-white" strokeWidth={2.2} />

        {/* Pulse wave ring */}
        <span className="absolute -inset-1 rounded-full bg-[#8a522a]/30 animate-ping pointer-events-none" />

        {/* Tooltip on hover */}
        <span className="absolute right-14 px-3 py-1.5 bg-black/90 text-white text-xs font-serif whitespace-nowrap rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Hotline: {siteConfig.phone1}
        </span>
      </a>

      {/* 3. Nút Đăng ký tư vấn (Màu trắng viền nâu đồng với icon bút ghi chép) */}
      <button
        onClick={handleConsultationClick}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-[#fbf9f6] text-[#8a522a] shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-[#8a522a] ring-1 ring-black/10"
        aria-label="Đăng ký nhận tư vấn"
      >
        <SquarePen className="w-5 h-5 text-[#8a522a]" strokeWidth={2.2} />

        {/* Tooltip on hover */}
        <span className="absolute right-14 px-3 py-1.5 bg-black/90 text-white text-xs font-serif whitespace-nowrap rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Đăng ký tư vấn thiết kế
        </span>
      </button>

      {/* 4. Nút Cuộn lên đầu trang (Màu trắng viền nâu đồng với mũi tên hướng lên) */}
      <button
        onClick={scrollToTop}
        className={`group relative flex items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-[#fbf9f6] text-[#8a522a] shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-[#8a522a] ring-1 ring-black/10 ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-40 hover:opacity-100 translate-y-0"
        }`}
        aria-label="Lên đầu trang"
      >
        <ArrowUp className="w-5 h-5 text-[#8a522a]" strokeWidth={2.4} />

        {/* Tooltip on hover */}
        <span className="absolute right-14 px-3 py-1.5 bg-black/90 text-white text-xs font-serif whitespace-nowrap rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Lên đầu trang
        </span>
      </button>
    </aside>
  );
}
