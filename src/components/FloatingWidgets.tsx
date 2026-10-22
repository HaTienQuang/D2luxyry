"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteData";
import { Phone, ArrowUp, SquarePen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-center gap-2 sm:gap-3 select-none"
    >
      {/* 1. Nút Zalo */}
      <motion.a
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        href={siteConfig.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0068ff] hover:bg-[#0055d4] text-white shadow-xl transition-colors duration-200 border-2 border-white/80 ring-1 ring-black/10 cursor-pointer"
        aria-label="Tư vấn Zalo"
      >
        <span className="font-sans font-bold text-xs sm:text-[14px] tracking-tight text-white leading-none">
          Zalo
        </span>

        {/* Pulse wave ring */}
        <span className="absolute -inset-1 rounded-full bg-[#0068ff]/30 animate-ping pointer-events-none" />

        {/* Tooltip on hover */}
        <span className="hidden sm:block absolute right-14 px-3 py-1.5 bg-black/90 text-white text-xs font-serif whitespace-nowrap rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Mở Zalo: {siteConfig.phone1}
        </span>
      </motion.a>

      {/* 2. Nút Gọi Hotline */}
      <motion.a
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        href={`tel:${siteConfig.hotline}`}
        className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8a522a] hover:bg-[#72411e] text-white shadow-xl transition-colors duration-200 border-2 border-white/80 ring-1 ring-black/10 cursor-pointer"
        aria-label={`Gọi Hotline ${siteConfig.phone1}`}
      >
        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.2} />

        {/* Pulse wave ring */}
        <span className="absolute -inset-1 rounded-full bg-[#8a522a]/30 animate-ping pointer-events-none" />

        {/* Tooltip on hover */}
        <span className="hidden sm:block absolute right-14 px-3 py-1.5 bg-black/90 text-white text-xs font-serif whitespace-nowrap rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Hotline: {siteConfig.phone1} – {siteConfig.phone2}
        </span>
      </motion.a>

      {/* 3. Nút Đăng ký tư vấn (Ẩn trên mobile để tránh che nội dung) */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleConsultationClick}
        className="hidden sm:flex group relative items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-[#fbf9f6] text-[#8a522a] shadow-xl transition-colors duration-200 border-2 border-[#8a522a] ring-1 ring-black/10 cursor-pointer"
        aria-label="Đăng ký nhận tư vấn"
      >
        <SquarePen className="w-5 h-5 text-[#8a522a]" strokeWidth={2.2} />

        {/* Tooltip on hover */}
        <span className="absolute right-14 px-3 py-1.5 bg-black/90 text-white text-xs font-serif whitespace-nowrap rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Đăng ký tư vấn thiết kế
        </span>
      </motion.button>

      {/* 4. Nút Cuộn lên đầu trang */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="group relative flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#fbf9f6] text-[#8a522a] shadow-xl border border-neutral-300 sm:border-2 sm:border-[#8a522a] ring-1 ring-black/10 cursor-pointer"
            aria-label="Lên đầu trang"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#8a522a]" strokeWidth={2.4} />

            {/* Tooltip on hover */}
            <span className="hidden sm:block absolute right-14 px-3 py-1.5 bg-black/90 text-white text-xs font-serif whitespace-nowrap rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Lên đầu trang
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </aside>
  );
}
