"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import ZaloModal from "@/components/ZaloModal";
import { allArchiveProjects } from "@/data/allProjects";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsArchive() {
  const [activeTab, setActiveTab] = useState<"all" | "thuc-te" | "3d">("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isZaloOpen, setIsZaloOpen] = useState(false);

  const ITEMS_PER_PAGE = 12;

  // Filter projects by active tab
  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return allArchiveProjects;
    return allArchiveProjects.filter((p) => p.type === activeTab);
  }, [activeTab]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handleTabChange = (tab: "all" | "thuc-te" | "3d") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const contentEl = document.getElementById("content");
    if (contentEl) {
      contentEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-black font-serif flex flex-col justify-between selection:bg-luxury-gold selection:text-black">
      {/* Top Header */}
      <Header onOpenZalo={() => setIsZaloOpen(true)} />

      <main className="flex-grow">
        {/* Banner Section matching synchronized style */}
        <section className="relative w-full h-[52vh] min-h-[460px] sm:min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Banner Background Image with natural illumination */}
          <div className="absolute inset-0">
            <Image
              src="/hero/main.jpg"
              alt="Dự án D2 Luxury Design"
              fill
              className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
              priority
            />
            {/* Refined translucent overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/30" />
          </div>

          {/* Banner Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-24 pb-8 flex flex-col items-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-serif font-bold uppercase tracking-[0.2em] text-white drop-shadow-md leading-tight">
              DỰ ÁN
            </h1>
            <div className="w-20 sm:w-28 h-[2px] bg-white/80 mx-auto mt-4 mb-5" />
            <p className="max-w-2xl sm:max-w-3xl mx-auto text-xs sm:text-[13px] md:text-[14px] font-serif uppercase tracking-[0.08em] text-white/95 leading-relaxed font-normal drop-shadow">
              KHÁM PHÁ CÁC CÔNG TRÌNH BIỆT THỰ, DINH THỰ, PENTHOUSE & CĂN HỘ CAO CẤP HOÀN THIỆN BỞI D2 LUXURY DESIGN.
            </p>

            {/* Circular Scroll Down Button matching Roll.svg */}
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="mt-7 sm:mt-9"
            >
              <a
                href="#content"
                className="inline-flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity"
                aria-label="Cuộn xuống danh sách dự án"
              >
                <Image
                  src="/Roll.svg"
                  alt="Cuộn xuống"
                  width={42}
                  height={42}
                  className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow"
                />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Content Section: Title, Filter Tabs & 3-Column Project Grid */}
        <section id="content" className="py-14 sm:py-20 lg:py-24 scroll-mt-20">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading and Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10 sm:mb-14"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold uppercase tracking-wider text-black">
                DỰ ÁN CỦA D2 LUXURY DESIGN
              </h2>
              <div className="w-16 sm:w-20 h-[2px] bg-black mx-auto mt-3.5 mb-8" />

              {/* Filter Tabs matching lendecor.vn: Tất cả dự án | Hình ảnh thực tế | Hình ảnh 3D */}
              <div className="flex items-center justify-center gap-6 sm:gap-14 border-b border-[#e5dfd5] pb-3.5 text-sm sm:text-base font-serif uppercase tracking-[0.16em]">
                {[
                  { id: "all", label: "Tất cả dự án" },
                  { id: "thuc-te", label: "Hình ảnh thực tế" },
                  { id: "3d", label: "Hình ảnh 3D" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as "all" | "thuc-te" | "3d")}
                    className={`pb-3.5 -mb-3.5 transition-colors relative cursor-pointer ${
                      activeTab === tab.id
                        ? "text-black font-bold"
                        : "text-neutral-500 hover:text-black font-medium"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeArchiveTab"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* 3-Column Grid matching Image 2 */}
            <AnimatePresence mode="wait">
              {paginatedProjects.length > 0 ? (
                <motion.div
                  key={`${activeTab}-${currentPage}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
                >
                  {paginatedProjects.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                      whileHover={{ y: -6 }}
                    >
                      <Link
                        href={`/projects/${item.slug}`}
                        className="group cursor-pointer flex flex-col h-full"
                      >
                        {/* Project Photo with Aspect Ratio ~3:2 */}
                        <div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-200 shadow-sm transition-all duration-500 group-hover:shadow-xl">
                          <Image
                            src={item.mainImage}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />

                          {/* Subtle hover overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                          {/* Type Badge */}
                          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white text-[11px] sm:text-xs uppercase font-serif tracking-widest px-2.5 py-1">
                            {item.type === "thuc-te" ? "Thực tế" : "Bản vẽ 3D"}
                          </div>
                        </div>

                        {/* Centered Title under photo matching Image 2 */}
                        <div className="pt-3.5 pb-2 text-center">
                          <h3 className="font-serif font-bold text-sm sm:text-[15.5px] lg:text-[16.5px] uppercase tracking-wider text-black group-hover:text-luxury-gold transition-colors leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-[13px] text-neutral-600 font-serif mt-1 font-light">
                            {item.categoryLabel} {item.location ? `· ${item.location}` : ""}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="py-20 text-center text-neutral-500 text-sm">
                  Không tìm thấy dự án phù hợp với bộ lọc đã chọn.
                </div>
              )}
            </AnimatePresence>

            {/* Pagination matching lendecor archive */}
            {totalPages > 1 && (
              <div className="mt-14 sm:mt-18 pt-8 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-serif">
                {/* Prev Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 sm:px-4 py-2 border transition-colors flex items-center gap-1 ${
                    currentPage === 1
                      ? "border-neutral-200 text-neutral-300 cursor-not-allowed"
                      : "border-neutral-300 text-black hover:bg-black hover:text-white"
                  }`}
                  aria-label="Trang trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Trước</span>
                </button>

                {/* Number Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border text-xs sm:text-sm font-medium transition-all ${
                      currentPage === pageNum
                        ? "bg-black border-black text-white shadow"
                        : "border-neutral-300 text-black hover:bg-neutral-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 sm:px-4 py-2 border transition-colors flex items-center gap-1 ${
                    currentPage === totalPages
                      ? "border-neutral-200 text-neutral-300 cursor-not-allowed"
                      : "border-neutral-300 text-black hover:bg-black hover:text-white"
                  }`}
                  aria-label="Trang tiếp"
                >
                  <span className="hidden sm:inline">Tiếp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Widgets */}
      <FloatingWidgets onOpenZalo={() => setIsZaloOpen(true)} />

      {/* Zalo Modal */}
      <ZaloModal isOpen={isZaloOpen} onClose={() => setIsZaloOpen(false)} />
    </div>
  );
}

