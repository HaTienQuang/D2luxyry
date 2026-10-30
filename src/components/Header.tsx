"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ChevronDown, ArrowRight, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/siteData";
import { allArchiveProjects } from "@/data/allProjects";

interface HeaderProps {
  onOpenZalo?: () => void;
}

// 100% verified real projects and real static slugs
const PROJECT_GROUPS = [
  {
    type: "BIỆT THỰ & DINH THỰ",
    projects: [
      { name: "Villa Grand Island – Ecopark", slug: "villa-grand-island-ecopark" },
      { name: "Villa Vinhomes Ocean Park", slug: "villa-vinhomes-ocean-park" },
      { name: "Vintage Villa – Tam Đảo", slug: "vintage-villa-tam-dao" },
      { name: "Biệt thự Vinhomes Riverside", slug: "biet-thu-vinhomes-riverside" },
      { name: "Biệt thự The Harmony", slug: "biet-thu-the-harmony" },
      { name: "Villa Nghỉ Dưỡng – Đà Lạt", slug: "villa-nghi-duong-da-lat" },
    ],
  },
  {
    type: "CĂN HỘ & PENTHOUSE",
    projects: [
      { name: "Penthouse Indochine", slug: "penthouse-indochine" },
      { name: "Căn hộ Vinhomes Metropolis", slug: "can-ho-vinhomes-metropolis" },
      { name: "Căn hộ Cao Cấp Han Jardin", slug: "can-ho-han-jardin" },
      { name: "Sapphire Villa – Tam Đảo", slug: "sapphire-villa-tam-dao" },
      { name: "Biệt Thự Tân Cổ Điển", slug: "biet-thu-tan-co-dien" },
      { name: "Biệt Thự Nhà Vườn Phúc Thọ", slug: "biet-thu-phuc-tho" },
    ],
  },
  {
    type: "HOÀN THIỆN THỰC TẾ",
    projects: [
      { name: "Thực tế Villa Ocean Park", slug: "thi-cong-thuc-te-ocean-park" },
      { name: "Thực tế Villa Star City", slug: "thi-cong-thuc-te-star-city" },
      { name: "Thực tế Biệt thự 3 Tầng", slug: "thi-cong-biet-thu-3-tang" },
      { name: "Công trình Thực tế TP.HCM", slug: "cong-trinh-thuc-te-tphcm" },
      { name: "Thi công Park Hill", slug: "thi-cong-park-hill" },
      { name: "Maya Villa – Ba Vì", slug: "maya-villa-ba-vi" },
    ],
  },
];

export default function Header({ onOpenZalo }: HeaderProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live real-time project search filtering
  const filteredProjects = searchQuery.trim()
    ? allArchiveProjects.filter((p) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          p.title.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.style.toLowerCase().includes(q)
        );
      }).slice(0, 6)
    : [];

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const closeMenu = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(null);
  };

  const isSolid = isScrolled || isHovered || activeMenu !== null;

  return (
    <>
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          isSolid
            ? "bg-[#faf8f5] shadow-md py-2 sm:py-2.5 border-b border-[#e5dfd5] text-neutral-900"
            : "bg-gradient-to-b from-black/90 via-black/55 to-transparent py-3 sm:py-4 text-white"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" onClick={closeMenu} className="inline-flex items-center group py-1 shrink-0">
              <div className="relative h-12 sm:h-16 lg:h-20 w-44 sm:w-60 lg:w-80 flex items-center transition-transform duration-300 group-hover:scale-105">
                {/* Dark Logo (displayed on solid background) */}
                <Image
                  src="/logo.png"
                  alt="D2 Luxury Design"
                  fill
                  className={`object-contain object-left transition-opacity duration-300 ${
                    isSolid ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  priority
                />
                {/* White Logo (displayed on dark/transparent hero background - sharp without blurry glow) */}
                <Image
                  src="/logo-white.png"
                  alt="D2 Luxury Design"
                  fill
                  className={`object-contain object-left drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] transition-opacity duration-300 ${
                    isSolid ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3 text-[13.5px] xl:text-[15px] uppercase tracking-[0.12em] font-serif font-semibold">
              {/* Trang chủ */}
              <Link
                href="/"
                onClick={closeMenu}
                onMouseEnter={() => handleMouseEnter("Trang chủ")}
                className={`transition-all duration-200 px-3 py-1.5 rounded relative group inline-flex items-center ${
                  isSolid
                    ? "text-neutral-900 hover:text-luxury-gold hover:bg-black/[0.04]"
                    : "text-white drop-shadow hover:text-luxury-gold hover:bg-white/[0.12]"
                }`}
              >
                <span>Trang chủ</span>
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </Link>

              {/* DỰ ÁN */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("Dự án")}
              >
                <Link
                  href="/projects"
                  className={`transition-all duration-200 px-3 py-1.5 rounded relative group inline-flex items-center gap-1 ${
                    activeMenu === "Dự án"
                      ? "text-luxury-gold bg-black/[0.04]"
                      : isSolid
                      ? "text-neutral-900 hover:text-luxury-gold hover:bg-black/[0.04]"
                      : "text-white drop-shadow hover:text-luxury-gold hover:bg-white/[0.12]"
                  }`}
                >
                  <span>Dự án</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>

                {/* Dropdown: Các kiểu & mẫu dự án đúng link thực tế */}
                <AnimatePresence>
                  {activeMenu === "Dự án" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      onMouseEnter={() => handleMouseEnter("Dự án")}
                      onMouseLeave={handleMouseLeave}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[740px] bg-[#fbf9f6] text-black border border-[#ded8ce] shadow-xl p-6"
                    >
                      <div className="grid grid-cols-3 gap-6">
                        {PROJECT_GROUPS.map((group, idx) => (
                          <div key={idx} className="space-y-3">
                            <div className="font-serif font-bold text-xs uppercase tracking-wider text-black pb-1.5 border-b border-[#eae3d9]">
                              {group.type}
                            </div>
                            <ul className="space-y-2">
                              {group.projects.map((p, pIdx) => (
                                <li key={pIdx}>
                                  <Link
                                    href={`/projects/${p.slug}`}
                                    onClick={closeMenu}
                                    className="text-[12px] font-serif text-neutral-700 hover:text-luxury-gold hover:translate-x-0.5 transition-all block line-clamp-1 py-0.5"
                                  >
                                    • {p.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#eae3d9] flex items-center justify-between text-xs font-serif">
                        <span className="text-neutral-500 italic">Hơn 1.000+ công trình thực tế và bản vẽ 3D</span>
                        <Link
                          href="/projects"
                          onClick={closeMenu}
                          className="font-bold text-black hover:text-luxury-gold inline-flex items-center gap-1 uppercase tracking-wider"
                        >
                          <span>Xem tất cả dự án</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* GIỚI THIỆU */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("Giới thiệu")}
              >
                <Link
                  href="/about"
                  className={`transition-all duration-200 px-3 py-1.5 rounded relative group inline-flex items-center gap-1 ${
                    activeMenu === "Giới thiệu"
                      ? "text-luxury-gold bg-black/[0.04]"
                      : isSolid
                      ? "text-neutral-900 hover:text-luxury-gold hover:bg-black/[0.04]"
                      : "text-white drop-shadow hover:text-luxury-gold hover:bg-white/[0.12]"
                  }`}
                >
                  <span>Giới thiệu</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>

                <AnimatePresence>
                  {activeMenu === "Giới thiệu" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      onMouseEnter={() => handleMouseEnter("Giới thiệu")}
                      onMouseLeave={handleMouseLeave}
                      className="absolute left-0 top-full mt-2 w-52 bg-[#fbf9f6] text-black border border-[#ded8ce] shadow-xl py-3 px-4"
                    >
                      <ul className="space-y-2 text-xs font-serif">
                        <li>
                          <Link href="/about" onClick={closeMenu} className="hover:text-luxury-gold block py-1">
                            Về D2 Luxury Design
                          </Link>
                        </li>
                        <li>
                          <Link href="/about#sec-trietly" onClick={closeMenu} className="hover:text-luxury-gold block py-1">
                            Triết lý thiết kế
                          </Link>
                        </li>
                        <li>
                          <Link href="/about#sec-nangluc" onClick={closeMenu} className="hover:text-luxury-gold block py-1">
                            Năng lực 2 phân xưởng
                          </Link>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* DỊCH VỤ */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("Dịch vụ")}
              >
                <Link
                  href="/#sec-dichvu"
                  className={`transition-all duration-200 px-3 py-1.5 rounded relative group inline-flex items-center gap-1 ${
                    activeMenu === "Dịch vụ"
                      ? "text-luxury-gold bg-black/[0.04]"
                      : isSolid
                      ? "text-neutral-900 hover:text-luxury-gold hover:bg-black/[0.04]"
                      : "text-white drop-shadow hover:text-luxury-gold hover:bg-white/[0.12]"
                  }`}
                >
                  <span>Dịch vụ</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>

                <AnimatePresence>
                  {activeMenu === "Dịch vụ" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      onMouseEnter={() => handleMouseEnter("Dịch vụ")}
                      onMouseLeave={handleMouseLeave}
                      className="absolute left-0 top-full mt-2 w-56 bg-[#fbf9f6] text-black border border-[#ded8ce] shadow-xl py-3 px-4"
                    >
                      <ul className="space-y-2 text-xs font-serif">
                        <li>
                          <Link href="/architecture" onClick={closeMenu} className="hover:text-luxury-gold block py-1">
                            Thiết kế Kiến trúc
                          </Link>
                        </li>
                        <li>
                          <Link href="/interior" onClick={closeMenu} className="hover:text-luxury-gold block py-1">
                            Thiết kế Nội thất
                          </Link>
                        </li>
                        <li>
                          <Link href="/construction" onClick={closeMenu} className="hover:text-luxury-gold block py-1">
                            Thi công Xây dựng Trọn gói
                          </Link>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* THƯƠNG HIỆU */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("Thương hiệu")}
              >
                <Link
                  href="/#sec-thuonghieu"
                  className={`transition-all duration-200 px-3 py-1.5 rounded relative group inline-flex items-center gap-1 ${
                    activeMenu === "Thương hiệu"
                      ? "text-luxury-gold bg-black/[0.04]"
                      : isSolid
                      ? "text-neutral-900 hover:text-luxury-gold hover:bg-black/[0.04]"
                      : "text-white drop-shadow hover:text-luxury-gold hover:bg-white/[0.12]"
                  }`}
                >
                  <span>Thương hiệu</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>

                <AnimatePresence>
                  {activeMenu === "Thương hiệu" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      onMouseEnter={() => handleMouseEnter("Thương hiệu")}
                      onMouseLeave={handleMouseLeave}
                      className="absolute left-0 top-full mt-2 w-64 bg-[#fbf9f6] text-black border border-[#ded8ce] shadow-xl py-3 px-4"
                    >
                      <ul className="space-y-2 text-xs font-serif">
                        <li>
                          <Link href="/#sec-thuonghieu" onClick={closeMenu} className="hover:text-luxury-gold block py-1 font-medium">
                            D2 Luxury Design (Dự án)
                          </Link>
                        </li>
                        <li>
                          <a
                            href={siteConfig.woodFurnitureUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                            className="hover:text-luxury-gold py-1 font-medium flex items-center justify-between group/link"
                          >
                            <span>D2 Luxury Design (Nội thất gỗ tự nhiên)</span>
                            <span className="text-[11px] opacity-70 group-hover/link:opacity-100">↗</span>
                          </a>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* AI STUDIO */}
              <Link
                href="/#sec-thietke3d"
                onClick={closeMenu}
                onMouseEnter={() => handleMouseEnter("AI Studio")}
                className={`transition-all duration-200 px-3 py-1.5 rounded relative group inline-flex items-center ${
                  isSolid
                    ? "text-neutral-900 hover:text-luxury-gold hover:bg-black/[0.04]"
                    : "text-white drop-shadow hover:text-luxury-gold hover:bg-white/[0.12]"
                }`}
              >
                <span>AI Studio</span>
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </Link>

              {/* LIÊN HỆ */}
              <Link
                href="/contact"
                onClick={closeMenu}
                onMouseEnter={() => handleMouseEnter("Liên hệ")}
                className={`transition-all duration-200 px-3 py-1.5 rounded relative group inline-flex items-center ${
                  isSolid
                    ? "text-neutral-900 hover:text-luxury-gold hover:bg-black/[0.04]"
                    : "text-white drop-shadow hover:text-luxury-gold hover:bg-white/[0.12]"
                }`}
              >
                <span>Liên hệ</span>
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </Link>
            </nav>

            {/* Right: Search Toggle & Mobile Hamburger Menu */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 sm:p-2.5 rounded-full transition-all duration-200 ${
                  isSolid
                    ? "text-neutral-900 hover:text-luxury-gold hover:bg-black/[0.04]"
                    : "text-white drop-shadow hover:text-luxury-gold hover:bg-white/[0.12]"
                }`}
                aria-label="Tìm kiếm"
              >
                <Search className="w-5 sm:w-6 h-5 sm:h-6 stroke-[1.8]" />
              </button>

              {/* Hamburger Menu Toggle (Mobile & Tablet) */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${
                  isSolid
                    ? "text-neutral-900 hover:text-luxury-gold hover:bg-black/[0.04]"
                    : "text-white drop-shadow hover:text-luxury-gold hover:bg-white/[0.12]"
                }`}
                aria-label="Mở menu điều hướng"
              >
                <Menu className="w-6 h-6 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer (Sleek Luxury Slide-Over) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-in Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative z-10 w-[85%] max-w-[360px] h-full bg-[#fbf9f6] text-black shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#ded8ce]"
            >
              {/* Drawer Top Header */}
              <div>
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#eae3d9]">
                  <div className="relative h-9 w-32">
                    <Image
                      src="/logo.png"
                      alt="D2 Luxury Design"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full text-neutral-600 hover:text-black hover:bg-black/5 transition-colors"
                    aria-label="Đóng menu"
                  >
                    <X className="w-6 h-6 stroke-[1.8]" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="p-4 sm:p-5 space-y-1">
                  {[
                    { label: "Trang chủ", href: "/" },
                    { label: "Dự án thực tế", href: "/projects" },
                    { label: "Giới thiệu công ty", href: "/about" },
                    { label: "Thiết kế kiến trúc", href: "/architecture" },
                    { label: "Thiết kế nội thất", href: "/interior" },
                    { label: "Thi công xây dựng", href: "/construction" },
                    { label: "Thương hiệu gỗ tự nhiên", href: "/#sec-thuonghieu" },
                    { label: "AI Studio 3D", href: "/#sec-thietke3d" },
                    { label: "Liên hệ tư vấn", href: "/contact" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-3 px-3 rounded-lg text-xs sm:text-sm font-serif font-semibold uppercase tracking-wider text-neutral-800 hover:text-luxury-gold hover:bg-black/[0.03] transition-colors border-b border-black/[0.04]"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-40 text-neutral-500" />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer with Quick Contact */}
              <div className="p-4 sm:p-5 border-t border-[#eae3d9] bg-white/70 space-y-3">
                <div className="text-[11px] font-serif text-neutral-500 uppercase tracking-widest font-semibold">
                  Hotline tư vấn 24/7
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={`tel:${siteConfig.hotline}`}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-black text-white text-xs font-serif tracking-widest uppercase font-semibold rounded shadow hover:bg-neutral-800 transition-colors"
                  >
                    <span>GỌI {siteConfig.phone1}</span>
                  </a>
                  <a
                    href={siteConfig.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0068ff] text-white text-xs font-serif tracking-widest uppercase font-semibold rounded shadow hover:bg-[#0055d4] transition-colors"
                  >
                    <span>CHAT ZALO NGAY</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Real-time Project Search Modal & Fullscreen Mobile View */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md sm:p-4 sm:pt-20"
          >
            {/* Backdrop click to close on desktop */}
            <div className="hidden sm:block absolute inset-0" onClick={() => { setSearchOpen(false); setSearchQuery(""); }} />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative z-10 w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-2xl bg-[#fbf9f6] text-black shadow-2xl border-0 sm:border sm:border-[#ded8ce] flex flex-col overflow-hidden"
            >
              {/* Search Header Bar */}
              <div className="p-4 sm:p-5 border-b border-[#eae3d9] bg-white flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <Search className="w-5 h-5 text-luxury-gold shrink-0" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Tìm dự án, villa, penthouse, phong cách..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-1 bg-transparent text-sm sm:text-base font-serif text-black placeholder:text-neutral-400 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="p-1 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors"
                      aria-label="Xóa từ khóa"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  className="p-2 text-neutral-500 hover:text-black hover:bg-black/5 rounded-full transition-colors shrink-0 flex items-center justify-center"
                  aria-label="Đóng tìm kiếm"
                >
                  <X className="w-5 h-5 stroke-[2]" />
                </button>
              </div>

              {/* Search Results / Suggestions Content */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
                {/* When Query is Empty: Show Featured Projects directly */}
                {searchQuery.trim() === "" ? (
                  <div>
                    <span className="text-[11px] uppercase tracking-widest font-serif font-bold text-neutral-500 block mb-3">
                      Dự án tiêu biểu
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {allArchiveProjects.slice(0, 6).map((p) => (
                        <Link
                          key={p.id}
                          href={`/projects/${p.slug}`}
                          onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                          className="flex items-center gap-3 p-2 bg-white border border-[#eae3d9] hover:border-black/40 hover:shadow-md transition-all group rounded-sm"
                        >
                          <div className="relative w-16 h-12 bg-neutral-200 overflow-hidden shrink-0 rounded-sm">
                            <Image
                              src={p.mainImage}
                              alt={p.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-serif font-semibold text-black uppercase tracking-wider truncate group-hover:text-luxury-gold transition-colors">
                              {p.title}
                            </h4>
                            <p className="text-[11px] text-neutral-500 font-sans truncate mt-0.5">
                              {p.categoryLabel}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* When Query is Typed: Show Live Filtered Results */
                  <div>
                    {filteredProjects.length > 0 ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-1 border-b border-[#eae3d9]">
                          <span className="text-[11px] uppercase tracking-widest font-serif font-bold text-neutral-600">
                            Kết quả tìm kiếm ({filteredProjects.length})
                          </span>
                          <span className="text-[11px] text-neutral-500 font-serif italic">
                            Từ khóa: &quot;{searchQuery}&quot;
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {filteredProjects.map((p) => (
                            <Link
                              key={p.id}
                              href={`/projects/${p.slug}`}
                              onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                              className="flex items-center gap-3 sm:gap-4 p-2.5 bg-white border border-[#ded8ce] hover:border-black/50 hover:shadow-lg transition-all group rounded-sm"
                            >
                              <div className="relative w-16 sm:w-20 h-12 sm:h-14 bg-neutral-200 overflow-hidden shrink-0">
                                <Image
                                  src={p.mainImage}
                                  alt={p.title}
                                  fill
                                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                                />
                              </div>
                              <div className="min-w-0 flex-1 space-y-1">
                                <h4 className="text-xs sm:text-[13.5px] font-serif font-bold text-black uppercase tracking-wider truncate group-hover:text-luxury-gold transition-colors">
                                  {p.title}
                                </h4>
                                <div className="flex flex-wrap items-center gap-x-2 text-[11px] text-neutral-500 font-sans">
                                  <span className="font-medium text-luxury-gold">{p.categoryLabel}</span>
                                  <span>•</span>
                                  <span>{p.location}</span>
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all shrink-0 mr-1" />
                            </Link>
                          ))}
                        </div>

                        <div className="pt-3 text-center">
                          <Link
                            href="/projects"
                            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                            className="text-xs font-serif uppercase tracking-widest font-semibold text-black hover:text-luxury-gold hover:underline inline-flex items-center gap-1.5"
                          >
                            <span>Xem tất cả hơn 1.000 dự án</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      /* No results state */
                      <div className="py-8 sm:py-12 text-center space-y-3">
                        <Search className="w-10 h-10 text-neutral-300 mx-auto" />
                        <h4 className="text-sm font-serif font-bold text-black uppercase tracking-wider">
                          Không tìm thấy dự án phù hợp
                        </h4>
                        <p className="text-xs font-serif text-neutral-500 max-w-sm mx-auto leading-relaxed">
                          Không có kết quả nào cho &quot;<strong>{searchQuery}</strong>&quot;. Quý khách vui lòng thử tìm kiếm bằng từ khóa khác như <em>Villa</em>, <em>Ecopark</em>, <em>Penthouse</em> hoặc <em>Tam Đảo</em>.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
