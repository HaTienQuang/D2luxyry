"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Project } from "@/data/siteData";
import { X, ChevronLeft, ChevronRight, MapPin, Sparkles, Calendar, Maximize2 } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  useEffect(() => {
    setSelectedImgIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setSelectedImgIndex((prev) => (prev + 1) % project.gallery.length);
      }
      if (e.key === "ArrowLeft") {
        setSelectedImgIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const currentImage = project.gallery[selectedImgIndex] || project.mainImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-6xl max-h-[92vh] bg-[#121212] text-white border border-[#2b2b2b] shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222222] bg-[#161616]">
          <div>
            <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold">
              {project.categoryLabel}
            </span>
            <h3 className="text-lg sm:text-xl font-serif text-white mt-0.5">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-colors rounded-none"
            aria-label="Close Modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body: Two Columns on large screens */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Main Visual Display (Large view + thumb reel) */}
          <div className="lg:col-span-8 bg-black flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#222222]">
            {/* Active Image Container */}
            <div className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] bg-black flex items-center justify-center">
              <Image
                src={currentImage}
                alt={`${project.title} - Ảnh ${selectedImgIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 800px"
              />

              {/* Navigation arrows for images */}
              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImgIndex(
                        (prev) => (prev - 1 + project.gallery.length) % project.gallery.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/90 text-white hover:text-luxury-gold transition-colors"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImgIndex((prev) => (prev + 1) % project.gallery.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/90 text-white hover:text-luxury-gold transition-colors"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image counter indicator */}
              <div className="absolute bottom-3 right-4 px-3 py-1 bg-black/70 text-xs text-gray-300 font-mono tracking-wider">
                {selectedImgIndex + 1} / {project.gallery.length}
              </div>
            </div>

            {/* Thumbnail Carousel Bar */}
            {project.gallery.length > 1 && (
              <div className="p-3 bg-[#161616] border-t border-[#222222] overflow-x-auto flex gap-2 scrollbar-thin">
                {project.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 overflow-hidden border-2 transition-all ${
                      idx === selectedImgIndex
                        ? "border-luxury-gold scale-105"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details Sidebar */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-[#151515] space-y-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-serif text-white mb-2">{project.title}</h4>
                <div className="w-12 h-[2px] bg-luxury-gold mb-4" />
                <p className="text-sm text-gray-300 leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              {/* Meta information specifications */}
              <div className="space-y-3 pt-4 border-t border-[#262626] text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block">Địa điểm:</span>
                    <span className="text-white font-medium">{project.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block">Phong cách thiết kế:</span>
                    <span className="text-white font-medium">{project.style}</span>
                  </div>
                </div>

                {project.year && (
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-400 block">Năm hoàn thiện:</span>
                      <span className="text-white font-medium">{project.year}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-6 border-t border-[#262626]">
              <a
                href="#tu-van"
                onClick={onClose}
                className="block w-full py-3.5 text-center bg-luxury-gold hover:bg-luxury-goldDark text-black text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md"
              >
                Tư vấn công trình tương tự
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

