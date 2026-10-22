"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import ZaloModal from "@/components/ZaloModal";
import { ArchiveProject } from "@/data/allProjects";
import { siteConfig } from "@/data/siteData";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  MapPin,
  Calendar,
  Layers,
  Phone,
  MessageCircle,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectDetailViewProps {
  project: ArchiveProject;
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [isZaloOpen, setIsZaloOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.mainImage];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % gallery.length));
  };

  const prevLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length));
  };

  return (
    <div className="min-h-screen bg-white text-black font-serif flex flex-col justify-between selection:bg-luxury-gold selection:text-black">
      {/* Sticky Header */}
      <Header onOpenZalo={() => setIsZaloOpen(true)} />

      <main className="flex-grow">
        {/* Top Hero Banner matching synchronized style */}
        <section className="relative w-full h-[52vh] min-h-[460px] sm:min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Main Background Image with natural illumination */}
          <div className="absolute inset-0">
            <Image
              src={project.mainImage}
              alt={project.title}
              fill
              className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
              priority
            />
            {/* Subtle dark luxury translucent gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/30" />
          </div>

          {/* Centered Brand & Project Title */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20 sm:pt-24 pb-8 flex flex-col items-center space-y-3"
          >
            <span className="text-luxury-gold text-xs sm:text-sm uppercase tracking-[0.3em] font-sans font-semibold block">
              D2 LUXURY DESIGN & BUILD
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-serif font-bold uppercase tracking-[0.2em] text-white drop-shadow-md leading-tight">
              {project.title}
            </h1>
            <div className="w-20 sm:w-28 h-[2px] bg-luxury-gold mx-auto mt-4 mb-2" />

            {/* Circular Scroll Down Button matching Roll.svg */}
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="pt-4 sm:pt-6"
            >
              <a
                href="#detail-gallery"
                className="inline-flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity"
                aria-label="Cuộn xuống xem chi tiết bộ ảnh"
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

        {/* Content Section: Architectural Watermark 01 on Left & Gallery Grid in Center */}
        <section id="detail-gallery" className="relative py-14 sm:py-20 lg:py-24 overflow-hidden bg-white">
          {/* Main Content & Gallery */}
          <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Navigation & Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-serif uppercase tracking-widest text-neutral-500 hover:text-black transition-colors mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Quay lại tất cả dự án</span>
              </Link>

              {/* Headline & Description */}
              <div className="max-w-4xl space-y-4">
                <h2 className="text-xl sm:text-2xl lg:text-[28px] font-serif font-bold uppercase tracking-wider text-black leading-snug">
                  {project.headline || `KHÔNG GIAN NỘI THẤT HOÀN HẢO | ${project.title}`}
                </h2>

                {/* Specs metadata bar */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-neutral-600 font-sans border-y border-neutral-200 py-3.5 my-4">
                  {project.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-luxury-gold" />
                      <span>{project.location}</span>
                    </div>
                  )}
                  {project.style && (
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-luxury-gold" />
                      <span>Phong cách: <strong>{project.style}</strong></span>
                    </div>
                  )}
                  {project.year && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-luxury-gold" />
                      <span>Năm hoàn thiện: {project.year}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{project.type === "thuc-te" ? "Đã bàn giao thực tế" : "Bản vẽ 3D thiết kế"}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base lg:text-[16.5px] text-neutral-700 font-serif leading-[1.9] font-light">
                  {project.description}
                </p>
              </div>
            </motion.div>

            {/* Gallery Grid: 3 Columns matching Image 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 pt-4">
              {gallery.map((imgSrc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.3) }}
                  whileHover={{ y: -6 }}
                  onClick={() => openLightbox(idx)}
                  className="group relative aspect-[3/2] w-full overflow-hidden bg-neutral-100 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <Image
                    src={imgSrc}
                    alt={`${project.title} - Ảnh ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Hover Overlay with Zoom Icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-400 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-400 shadow-lg">
                      <Maximize2 className="w-5 h-5 stroke-[1.8]" />
                    </div>
                  </div>

                  {/* Photo index badge */}
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[11px] font-sans px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {idx + 1} / {gallery.length}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA Consultation Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 sm:mt-20 p-8 sm:p-12 bg-[#f8f5f0] border border-[#e5dfd5] text-center max-w-3xl mx-auto space-y-5"
            >
              <h3 className="text-xl sm:text-2xl font-serif font-bold uppercase tracking-wider text-black">
                YÊU THÍCH THIẾT KẾ CỦA {project.title}?
              </h3>
              <p className="text-sm sm:text-base text-neutral-700 font-serif leading-relaxed max-w-xl mx-auto">
                Liên hệ ngay với đội ngũ kiến trúc sư D2 Luxury Design để được tư vấn thiết kế và dự toán thi công hoàn toàn miễn phí cho ngôi nhà của bạn.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${siteConfig.hotline}`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-serif font-bold tracking-[0.18em] uppercase transition-colors shadow hover:shadow-lg"
                >
                  <Phone className="w-4 h-4 text-luxury-gold" />
                  <span>HOTLINE {siteConfig.phone1}</span>
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsZaloOpen(true)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-luxury-gold hover:bg-luxury-goldLight text-black text-xs sm:text-sm font-serif font-bold tracking-[0.18em] uppercase transition-colors shadow hover:shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>TƯ VẤN QUA ZALO</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Prev button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevLightboxImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-7 h-7" />
            </motion.button>

            {/* Main Large Image with Smooth Animated Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-6xl max-h-[85vh] w-full h-[80vh] flex items-center justify-center"
              >
                <Image
                  src={gallery[lightboxIndex]}
                  alt={`${project.title} - Ảnh ${lightboxIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Next button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextLightboxImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
              aria-label="Ảnh tiếp theo"
            >
              <ChevronRight className="w-7 h-7" />
            </motion.button>

            {/* Bottom Caption and counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white/90 font-serif text-sm">
              <span className="font-bold tracking-wider">{project.title}</span> —{" "}
              <span>
                Ảnh {lightboxIndex + 1} / {gallery.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />

      {/* Floating Widgets */}
      <FloatingWidgets onOpenZalo={() => setIsZaloOpen(true)} />

      {/* Zalo Modal */}
      <ZaloModal isOpen={isZaloOpen} onClose={() => setIsZaloOpen(false)} />
    </div>
  );
}

