'use client';

import React, { useState, useEffect } from 'react';
import {
  PhoneOutlined,
  FormOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import Image from 'next/image';

interface FloatingContactWidgetProps {
  onOpenConsultation: () => void;
}

export const FloatingContactWidget: React.FC<FloatingContactWidgetProps> = ({
  onOpenConsultation,
}) => {
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Desktop Floating Action Stack (Right side) */}
      <div className="hidden sm:flex fixed right-6 bottom-8 z-50 flex-col items-end gap-3.5 select-none pointer-events-auto">
        {/* 1. Zalo Chat Button - Enlarged with official Zalo icon & Pulse effect */}
        <div className="relative group flex items-center">
          {/* Expanding Tooltip Label */}
          <span className="absolute right-full mr-3.5 px-3.5 py-1.5 bg-[#0068FF] text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 pointer-events-none after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-full after:border-4 after:border-transparent after:border-l-[#0068FF]">
            Chat Zalo (0967.323.335)
          </span>
          <a
            href="https://zalo.me/0967323335"
            target="_blank"
            rel="noreferrer"
            aria-label="Chat Zalo ngay"
            className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#0068FF] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse-zalo group-hover:animate-none border-2 border-white/80 overflow-hidden"
          >
            {/* Custom high-res Zalo Logo */}
            <div className="relative w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center font-black tracking-tighter text-sm lg:text-base leading-none">
              <span className="font-extrabold tracking-tight">Zalo</span>
            </div>
          </a>
        </div>

        {/* 2. Hotline Call Button - Enlarged with Luxury Bronze Pulse */}
        <div className="relative group flex items-center">
          {/* Expanding Tooltip Label */}
          <span className="absolute right-full mr-3.5 px-3.5 py-1.5 bg-[#8A4F2C] text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 pointer-events-none after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-full after:border-4 after:border-transparent after:border-l-[#8A4F2C]">
            Hotline: 0967 323 335
          </span>
          <a
            href="tel:0967323335"
            aria-label="Gọi hotline tư vấn"
            className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-tr from-[#9C623C] to-[#8A4F2C] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse-hotline group-hover:animate-none border-2 border-white/80"
          >
            <PhoneOutlined className="text-xl lg:text-2xl animate-bounce" />
          </a>
        </div>

        {/* 3. Đăng ký tư vấn Button */}
        <div className="relative group flex items-center">
          {/* Expanding Tooltip Label */}
          <span className="absolute right-full mr-3.5 px-3.5 py-1.5 bg-[#1A1613] text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 pointer-events-none after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-full after:border-4 after:border-transparent after:border-l-[#1A1613]">
            Nhận tư vấn & Báo giá
          </span>
          <button
            type="button"
            onClick={onOpenConsultation}
            aria-label="Mở form tư vấn"
            className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white text-[#8A4F2C] border-2 border-[#8A4F2C] flex items-center justify-center shadow-xl hover:bg-[#8A4F2C] hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <FormOutlined className="text-xl lg:text-2xl" />
          </button>
        </div>

        {/* 4. Scroll To Top Button */}
        {showBackTop && (
          <div className="relative group flex items-center pt-1 animate-fade-in-up">
            <span className="absolute right-full mr-3.5 px-3 py-1 bg-stone-800 text-stone-200 text-xs rounded-md shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
              Lên đầu trang
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Cuộn lên đầu trang"
              className="w-12 h-12 lg:w-13 lg:h-13 rounded-full bg-white/95 text-stone-700 hover:text-[#8A4F2C] hover:bg-white border border-[#E8DFC0] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <ArrowUpOutlined className="text-base lg:text-lg" />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Sticky Quick Action Bar (Bottom bar) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-[#EFE8DF] px-3 py-2.5 flex items-center gap-2 shadow-[0_-8px_25px_rgba(0,0,0,0.08)]">
        {/* Hotline */}
        <a
          href="tel:0967323335"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#FAF8F5] border border-[#E8DFC0] text-[#733E22] font-bold py-3 px-2 rounded-xl text-xs active:scale-95 transition-transform"
        >
          <PhoneOutlined className="text-[#8A4F2C] text-sm" />
          <span>Hotline</span>
        </a>

        {/* Zalo */}
        <a
          href="https://zalo.me/0967323335"
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#0068FF] text-white font-bold py-3 px-2 rounded-xl text-xs active:scale-95 transition-transform shadow-md"
        >
          <span className="font-extrabold tracking-tighter text-xs">Zalo</span>
          <span>Chat Zalo</span>
        </a>

        {/* Nhận tư vấn */}
        <button
          type="button"
          onClick={onOpenConsultation}
          className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#9C623C] to-[#8A4F2C] text-white font-bold py-3 px-2 rounded-xl text-xs shadow-md active:scale-95 transition-transform"
        >
          <FormOutlined className="text-xs" />
          <span>Nhận tư vấn</span>
        </button>
      </div>
    </>
  );
};
