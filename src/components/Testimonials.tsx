'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Rate } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { TESTIMONIALS_DATA } from '@/data/landingData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= TESTIMONIALS_DATA.length - 3 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-[#FAF8F5] relative">
      <div className="max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#E8DFC0] text-[#8A4F2C]">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
                KHÁCH HÀNG NÓI VỀ CHÚNG TÔI
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1A1613] tracking-tight">
              Sự hài lòng của bạn là động lực để chúng tôi phát triển
            </h2>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              icon={<LeftOutlined className="text-sm" />}
              onClick={handlePrev}
              className="!w-12 !h-12 !flex !items-center !justify-center !border-[#D5BEA8] hover:!border-[#8A4F2C] !text-[#5C311C]"
            />
            <Button
              icon={<RightOutlined className="text-sm" />}
              onClick={handleNext}
              className="!w-12 !h-12 !flex !items-center !justify-center !border-[#D5BEA8] hover:!border-[#8A4F2C] !text-[#5C311C]"
            />
          </div>
        </div>

        {/* Testimonials 3 Cards Grid - Sharp Rectangular Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS_DATA.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 sm:p-9 border border-[#EFE8DF] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between space-y-6 hover:-translate-y-1.5 shine-overlay"
            >
              {/* Quote text */}
              <div className="space-y-4">
                <div className="text-4xl font-serif text-[#C5A880] leading-none select-none">“</div>
                <p className="text-base sm:text-lg lg:text-xl text-[#3D3835] italic leading-relaxed">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Author & Rating */}
              <div className="pt-6 border-t border-[#F5EFE6] flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-13 h-13 rounded-full overflow-hidden border-2 border-[#D5BEA8] shrink-0">
                    <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-[#1A1613]">{item.name}</h4>
                    <p className="text-xs sm:text-sm text-[#78716C]">{item.role}</p>
                  </div>
                </div>

                {/* 5 Stars */}
                <Rate
                  disabled
                  defaultValue={item.rating}
                  className="!text-sm !text-[#D97706] shrink-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
