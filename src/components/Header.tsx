"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

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

  return (
    <>
      <header
        onMouseLeave={handleMouseLeave}
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          isScrolled || activeMenu !== null
            ? "bg-[#f4f0ec]/98 backdrop-blur-md shadow-sm py-2.5 border-b border-[#e7e1d8] text-black"
            : "bg-gradient-to-b from-black/85 via-black/45 to-transparent py-3 sm:py-4 text-white"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" onClick={closeMenu} className="inline-flex items-center group py-0.5 shrink-0">
              <div className="relative h-10 sm:h-12 w-32 sm:w-44 flex items-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo-tight.png"
                  alt="D2 Luxury Design"
                  fill
                  className="object-contain drop-shadow"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[13.5px] xl:text-[15px] uppercase tracking-[0.12em] font-serif font-semibold">
              {/* Trang chủ */}
              <Link
                href="/"
                onClick={closeMenu}
                onMouseEnter={() => handleMouseEnter("Trang chủ")}
                className={`transition-colors py-2 hover:text-luxury-gold ${
                  isScrolled || activeMenu !== null ? "text-neutral-900" : "text-white drop-shadow"
                }`}
              >
                Trang chủ
              </Link>

              {/* DỰ ÁN */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("Dự án")}
              >
                <Link
                  href="/du-an"
                  className={`transition-colors py-2 inline-flex items-center gap-1 hover:text-luxury-gold ${
                    activeMenu === "Dự án" ? "text-luxury-gold" : isScrolled || activeMenu !== null ? "text-neutral-900" : "text-white drop-shadow"
                  }`}
                >
                  <span>Dự án</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
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
                                    href={`/du-an/${p.slug}`}
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
                          href="/du-an"
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
                  href="/gioi-thieu"
                  className={`transition-colors py-2 inline-flex items-center gap-1 hover:text-luxury-gold ${
                    activeMenu === "Giới thiệu" ? "text-luxury-gold" : isScrolled || activeMenu !== null ? "text-neutral-900" : "text-white drop-shadow"
                  }`}
                >
                  <span>Giới thiệu</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
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
                          <Link href="/gioi-thieu" onClick={closeMenu} className="hover:text-luxury-gold block py-1">
                            Về D2 Luxury
                          </Link>
                        </li>
                        <li>
                          <Link href="/gioi-thieu#sec-trietly" onClick={closeMenu} className="hover:text-luxury-gold block py-1">
                            Triết lý thiết kế
                          </Link>
                        </li>
                        <li>
                          <Link href="/gioi-thieu#sec-nangluc" onClick={closeMenu} className="hover:text-luxury-gold block py-1">
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
                  className={`transition-colors py-2 inline-flex items-center gap-1 hover:text-luxury-gold ${
                    activeMenu === "Dịch vụ" ? "text-luxury-gold" : isScrolled || activeMenu !== null ? "text-neutral-900" : "text-white drop-shadow"
                  }`}
                >
                  <span>Dịch vụ</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
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
                          <Link href="/thiet-ke-kien-truc" onClick={closeMenu} className="hover:text-luxury-gold block py-1">
                            Thiết kế Kiến trúc
                          </Link>
                        </li>
                        <li>
                          <Link href="/thiet-ke-noi-that" onClick={closeMenu} className="hover:text-luxury-gold block py-1">
                            Thiết kế Nội thất
                          </Link>
                        </li>
                        <li>
                          <Link href="/thi-cong-xay-dung" onClick={closeMenu} className="hover:text-luxury-gold block py-1">
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
                  className={`transition-colors py-2 inline-flex items-center gap-1 hover:text-luxury-gold ${
                    activeMenu === "Thương hiệu" ? "text-luxury-gold" : isScrolled || activeMenu !== null ? "text-neutral-900" : "text-white drop-shadow"
                  }`}
                >
                  <span>Thương hiệu</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
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
                          <Link href="/#sec-thuonghieu" onClick={closeMenu} className="hover:text-luxury-gold block py-1 font-medium">
                            D2 Wood Craft (Bán đồ rời)
                          </Link>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* THIẾT KẾ 3D (Đổi từ "Ý tưởng AI") */}
              <Link
                href="/#sec-thietke3d"
                onClick={closeMenu}
                onMouseEnter={() => handleMouseEnter("Thiết kế 3D")}
                className={`transition-colors py-2 hover:text-luxury-gold ${
                  isScrolled || activeMenu !== null ? "text-neutral-900" : "text-white drop-shadow"
                }`}
              >
                Thiết kế 3D
              </Link>

              {/* LIÊN HỆ */}
              <Link
                href="/lien-he"
                onClick={closeMenu}
                onMouseEnter={() => handleMouseEnter("Liên hệ")}
                className={`transition-colors py-2 hover:text-luxury-gold ${
                  isScrolled || activeMenu !== null ? "text-neutral-900" : "text-white drop-shadow"
                }`}
              >
                Liên hệ
              </Link>
            </nav>

            {/* Right: Search Toggle */}
            <div className="flex items-center shrink-0">
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 hover:opacity-70 transition-opacity ${
                  isScrolled || activeMenu !== null ? "text-black" : "text-white drop-shadow"
                }`}
                aria-label="Tìm kiếm"
              >
                <Search className="w-5 sm:w-6 h-5 sm:h-6 stroke-[1.8]" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Strip */}
          <nav
            className={`lg:hidden flex items-center overflow-x-auto no-scrollbar gap-5 pt-2.5 pb-1.5 border-t transition-colors ${
              isScrolled ? "border-black/10" : "border-white/10"
            } text-[12.5px] sm:text-[13.5px] font-serif uppercase tracking-wider font-medium whitespace-nowrap`}
          >
            {[
              { label: "Trang chủ", href: "/" },
              { label: "Dự án", href: "/du-an" },
              { label: "Giới thiệu", href: "/gioi-thieu" },
              { label: "Dịch vụ", href: "/#sec-dichvu" },
              { label: "Thương hiệu", href: "/#sec-thuonghieu" },
              { label: "Thiết kế 3D", href: "/#sec-thietke3d" },
              { label: "Liên hệ", href: "/lien-he" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`transition-colors shrink-0 py-0.5 ${
                  isScrolled ? "text-neutral-800 hover:text-black" : "text-white hover:text-luxury-gold"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-sm"
          >
            <div className="absolute inset-0" onClick={() => setSearchOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative z-10 w-full max-w-xl bg-white text-black p-6 shadow-2xl border border-gray-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="text-xs uppercase tracking-widest font-semibold text-gray-500">
                  Tìm kiếm dự án & phong cách
                </span>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-gray-400 hover:text-black"
                  aria-label="Đóng tìm kiếm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Nhập tên dự án (VD: Villa, Penthouse, Ecopark...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 bg-transparent text-sm focus:outline-none"
                />
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-2 text-xs text-gray-600">
                <span className="text-gray-400">Gợi ý:</span>
                {["Villa Thảo Điền", "Grand Island Ecopark", "Vinhomes Ocean Park", "Tam Đảo", "Metropolis"].map((tag) => (
                  <a
                    key={tag}
                    href="#sec-duan"
                    onClick={() => setSearchOpen(false)}
                    className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-black transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
