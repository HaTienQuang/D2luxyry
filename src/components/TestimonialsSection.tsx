"use client";

import React, { useState } from "react";
import Image from "next/image";
import { reviewsData, siteConfig } from "@/data/siteData";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviewsData.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviewsData[currentIndex];

  return (
    <section
      id="sec-khachhang"
      className="relative w-full py-16 sm:py-24 bg-[#f4f0ec] text-black overflow-hidden border-t border-[#eae3d9]"
    >
      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Divider, Description & YouTube Button */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-bold uppercase tracking-wider text-black leading-[1.2]">
                Khách hàng nói gì về D2 Luxury?
              </h2>
              {/* Black divider line */}
              <div className="w-24 h-[2px] bg-black mt-4 mb-6" />
            </div>

            <p className="text-sm sm:text-base lg:text-[16px] text-[#222] font-serif leading-[1.85] font-light">
              Hành trình kiến tạo nên tổ ấm cho mỗi khách hàng là khác nhau, nhưng sự hài lòng của khách hàng luôn là điểm đến cuối cùng mà đội ngũ chúng tôi luôn hướng tới.
            </p>

            <div className="pt-2 sm:pt-4">
              <a
                href={siteConfig.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 bg-black hover:bg-[#222] text-white text-xs sm:text-[13.5px] font-serif font-semibold tracking-[0.2em] uppercase transition-colors"
              >
                <span>XEM TRÊN YOUTUBE</span>
              </a>
            </div>
          </div>

          {/* Right Column: Testimonial Quote Box matching lendecor.vn with smooth animation */}
          <div className="lg:col-span-7">
            <div className="relative bg-transparent p-6 sm:p-10 border border-[#ded8ce] space-y-6 transition-all duration-500">
              {/* Quote text with smooth fade */}
              <div key={currentReview.id} className="animate-fade-in">
                <p className="text-base sm:text-lg lg:text-[1.125rem] font-serif italic text-[#111] leading-[2] min-h-[120px]">
                  &ldquo;{currentReview.quote}&rdquo;
                </p>
              </div>

              {/* Author & Avatar */}
              <div className="pt-4 border-t border-[#ded8ce] flex items-center justify-between flex-wrap gap-4">
                <div key={`author-${currentReview.id}`} className="flex items-center gap-4 animate-fade-in">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-300 bg-white shrink-0 shadow-sm">
                    <Image
                      src={currentReview.avatar}
                      alt={currentReview.author}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div>
                    <strong className="block text-base sm:text-lg font-serif font-bold text-black uppercase">
                      {currentReview.author}
                    </strong>
                    {currentReview.project && (
                      <span className="text-xs sm:text-sm text-gray-600 font-serif">
                        {currentReview.project}
                      </span>
                    )}
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevReview}
                    className="p-2 border border-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
                    aria-label="Previous Review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono px-1">
                    {currentIndex + 1} / {reviewsData.length}
                  </span>
                  <button
                    onClick={nextReview}
                    className="p-2 border border-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
                    aria-label="Next Review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
