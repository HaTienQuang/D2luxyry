"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/siteData";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSliderProps {
  onOpenConsultation?: () => void;
}

export default function HeroSlider({ onOpenConsultation }: HeroSliderProps = {}) {
  const slides = [
    {
      id: 1,
      image: "/hero/main.jpg",
      text: "ĐƠN VỊ THIẾT KẾ VÀ THI CÔNG TRỌN GÓI",
    },
    {
      id: 2,
      image: "/hero/luxury-interior.jpg",
      text: "KIẾN TẠO KHÔNG GIAN SỐNG ĐẲNG CẤP",
    },
    {
      id: 3,
      image: "/projects/thiet-ke-villa-tai-grand-island-ecopark/main.gif",
      text: "ĐẲNG CẤP NỘI THẤT MAY ĐO ĐỘC BẢN",
    },
    {
      id: 4,
      image: "/projects/thiet-ke-vintage-villa-tai-tam-dao/main.gif",
      text: "TINH HOA KIẾN TRÚC & NGHỆ THUẬT SỐNG",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHotlineHover, setIsHotlineHover] = useState(false);
  const [isHotlineRevealed, setIsHotlineRevealed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("sec-duan");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-black select-none">
      {/* Background Slides with Cinema Crossfade and Ken Burns Motion */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className={`relative w-full h-full ${isActive ? "animate-ken-burns" : ""}`}>
              <Image
                src={slide.image}
                alt={slide.text}
                fill
                priority={index === 0}
                className="object-cover object-center"
              />
            </div>
            {/* Subtle natural lighting gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/40" />
          </div>
        );
      })}

      {/* Hero Content Overlay */}
      <div className="relative z-20 h-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20 sm:pb-24">
        <div className="max-w-xl space-y-5">
          <p
            key={currentSlide}
            className="text-white uppercase font-serif text-xl sm:text-3xl lg:text-[2.1rem] tracking-wider leading-[1.25] drop-shadow-xl font-medium animate-slide-up-fade"
          >
            {slides[currentSlide].text}
          </p>

          {/* 2 Buttons Side-by-Side matching Image 5 with Framer Motion */}
          <div className="flex flex-row items-center gap-3 sm:gap-4 flex-nowrap pt-2">
            {/* Button 1: HOTLINE (Hiện số điện thoại 0967 323 335 khi hover/click) */}
            <motion.a
              href={`tel:${siteConfig.hotline}`}
              onMouseEnter={() => setIsHotlineHover(true)}
              onMouseLeave={() => setIsHotlineHover(false)}
              onClick={() => setIsHotlineRevealed(true)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center min-w-[140px] sm:min-w-[180px] px-6 sm:px-8 py-3.5 sm:py-4 bg-black hover:bg-[#181818] text-white text-xs sm:text-sm font-serif font-bold tracking-[0.18em] uppercase transition-all duration-300 shadow-xl hover:shadow-black/60 border border-white/25 hover:border-luxury-gold whitespace-nowrap shrink-0 cursor-pointer"
              aria-label={`Hotline ${siteConfig.phone1}`}
            >
              <div className="flex items-center justify-center gap-2 transition-all duration-300">
                {isHotlineHover || isHotlineRevealed ? (
                  <>
                    <Phone className="w-3.5 h-3.5 text-luxury-gold animate-bounce" />
                    <span className="text-luxury-gold font-sans tracking-wider">{siteConfig.phone1}</span>
                  </>
                ) : (
                  <span>HOTLINE</span>
                )}
              </div>

              {/* Tooltip on top */}
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/90 text-luxury-gold text-[11px] font-sans rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                Gọi ngay: {siteConfig.phone1}
              </span>
            </motion.a>

            {/* Button 2: NHẬN TƯ VẤN (Mở Modal Đăng Ký Tư Vấn) */}
            <motion.button
              type="button"
              onClick={onOpenConsultation}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-7 sm:px-9 py-3.5 sm:py-4 bg-luxury-gold hover:bg-luxury-goldLight text-black text-xs sm:text-sm font-serif font-bold tracking-[0.18em] uppercase transition-all duration-300 shadow-xl hover:shadow-luxury-gold/40 whitespace-nowrap shrink-0 cursor-pointer"
            >
              NHẬN TƯ VẤN
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Center Arch Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <button
          onClick={scrollToNextSection}
          className="group flex flex-col items-center cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-2 animate-bounce-arch"
          aria-label="Cuộn xuống dự án"
        >
          {/* Arch Icon outline */}
          <div className="w-6 h-10 border-2 border-white/90 rounded-t-full rounded-b-sm flex justify-center pt-2 group-hover:scale-105 transition-transform">
            <div className="w-1 h-2.5 bg-white rounded-full animate-pulse" />
          </div>
        </button>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 right-6 sm:right-10 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-500 h-1.5 rounded-full ${
              i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
