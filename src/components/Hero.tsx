'use client';

import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  return (
    <section id="hero" className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pt-36 lg:pb-24 bg-[#FAF8F5]">
      <div className="max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 animate-fade-in-up">
            {/* Eyebrow */}
            <p className="text-xs sm:text-sm lg:text-base font-bold tracking-[0.25em] uppercase text-[#8A4F2C]">
              THIẾT KẾ – THI CÔNG NỘI THẤT TRỌN GÓI
            </p>

            {/* Main Heading - Enlarged & High Impact */}
            <div className="space-y-2 sm:space-y-4">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-[64px] xl:text-[72px] font-extrabold text-[#1A1613] tracking-tight leading-[1.12]">
                Không gian đẹp
              </h1>
              <div className="font-serif text-4xl sm:text-6xl lg:text-[64px] xl:text-[72px] font-normal italic text-[#8A4F2C] tracking-tight leading-[1.12]">
                Bắt đầu từ bạn
              </div>
            </div>

            {/* Description - Larger & Clear */}
            <p className="text-base sm:text-xl lg:text-[21px] text-[#4A423B] leading-relaxed max-w-2xl font-normal">
              Chúng tôi mang đến giải pháp nội thất toàn diện, từ ý tưởng, thiết kế đến thi công và
              hoàn thiện. Kiến tạo không gian sống tiện nghi, thẩm mỹ và trường tồn cùng thời gian.
            </p>

            {/* Action Buttons - Enlarged */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button
                type="primary"
                size="large"
                icon={<ArrowRightOutlined className="!text-sm !text-white transition-transform group-hover:translate-x-1" />}
                iconPosition="end"
                onClick={onOpenConsultation}
                className="!h-14 sm:!h-15 !px-9 sm:!px-10 !text-base sm:!text-[17px] !font-bold shadow-md hover:shadow-lg group !text-white !w-full sm:!w-auto"
              >
                Nhận tư vấn miễn phí
              </Button>

              <a href="#projects" className="w-full sm:w-auto">
                <Button
                  type="default"
                  size="large"
                  icon={<ArrowRightOutlined className="!text-sm text-[#8A4F2C] transition-transform group-hover:translate-x-1" />}
                  iconPosition="end"
                  className="!h-14 sm:!h-15 !px-8 sm:!px-9 !text-base sm:!text-[17px] !font-bold !border-[#D5BEA8] hover:!border-[#8A4F2C] !text-[#5C311C] hover:!text-[#8A4F2C] group !w-full sm:!w-auto shadow-xs"
                >
                  Xem dự án thực tế
                </Button>
              </a>
            </div>

            {/* Clean Stats Bar - Enlarged */}
            <div className="pt-8 sm:pt-10 border-t border-[#E8DFC0] grid grid-cols-3 gap-3 sm:gap-8">
              {/* Stat 1 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 text-center sm:text-left">
                <div className="mt-1 text-[#8A4F2C] shrink-0 hidden sm:block">
                  <svg
                    className="w-7 h-7 lg:w-8 lg:h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1A1613] tracking-tight leading-none">
                    500<span className="text-[#8A4F2C] font-bold text-xl sm:text-3xl ml-0.5">+</span>
                  </div>
                  <div className="text-xs sm:text-sm lg:text-[15px] text-[#6B635B] font-semibold mt-1.5 leading-tight">
                    Dự án hoàn thành
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 text-center sm:text-left">
                <div className="mt-1 text-[#8A4F2C] shrink-0 hidden sm:block">
                  <svg
                    className="w-7 h-7 lg:w-8 lg:h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1A1613] tracking-tight leading-none">
                    98<span className="text-[#8A4F2C] font-bold text-lg sm:text-2xl ml-0.5">%</span>
                  </div>
                  <div className="text-xs sm:text-sm lg:text-[15px] text-[#6B635B] font-semibold mt-1.5 leading-tight">
                    Khách hàng hài lòng
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 text-center sm:text-left">
                <div className="mt-1 text-[#8A4F2C] shrink-0 hidden sm:block">
                  <svg
                    className="w-7 h-7 lg:w-8 lg:h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1A1613] tracking-tight leading-none">
                    10<span className="text-[#8A4F2C] font-bold text-xl sm:text-3xl ml-0.5">+</span>
                  </div>
                  <div className="text-xs sm:text-sm lg:text-[15px] text-[#6B635B] font-semibold mt-1.5 leading-tight">
                    Năm kinh nghiệm
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-6 animate-fade-in-up">
            <div className="relative overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[16/11] bg-stone-900 shine-overlay">
              <Image
                src="/images/hero/luxury-interior.jpg"
                alt="Không gian nội thất cao cấp"
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
