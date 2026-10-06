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
          <div className="lg:col-span-6 space-y-5 sm:space-y-8 animate-fade-in-up">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F2EAE0] text-[#733E22] border-l-2 border-[#8A4F2C]">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                THIẾT KẾ – THI CÔNG NỘI THẤT TRỌN GÓI
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-1.5 sm:space-y-3">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[58px] font-bold text-[#1A1613] tracking-tight leading-[1.15]">
                Không gian đẹp
              </h1>
              <div className="font-serif text-3xl sm:text-5xl lg:text-[58px] font-normal italic text-[#8A4F2C] tracking-tight leading-[1.15]">
                Bắt đầu từ bạn
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-lg text-[#5C554E] leading-relaxed max-w-xl font-normal">
              Chúng tôi mang đến giải pháp nội thất toàn diện, từ ý tưởng, thiết kế đến thi công và
              hoàn thiện. Kiến tạo không gian sống tiện nghi, thẩm mỹ và phù hợp với phong cách của
              bạn.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
              <Button
                type="primary"
                size="large"
                icon={<ArrowRightOutlined className="!text-xs !text-white transition-transform group-hover:translate-x-1" />}
                iconPosition="end"
                onClick={onOpenConsultation}
                className="!h-12 sm:!h-13 !px-8 !text-sm sm:!text-[15px] !font-semibold shadow-sm hover:shadow-md group !text-white !w-full sm:!w-auto"
              >
                Nhận tư vấn miễn phí
              </Button>

              <a href="#projects" className="w-full sm:w-auto">
                <Button
                  type="default"
                  size="large"
                  icon={<ArrowRightOutlined className="!text-xs text-[#8A4F2C] transition-transform group-hover:translate-x-1" />}
                  iconPosition="end"
                  className="!h-12 sm:!h-13 !px-7 !text-sm sm:!text-[15px] !font-semibold !border-[#D5BEA8] hover:!border-[#8A4F2C] !text-[#5C311C] hover:!text-[#8A4F2C] group !w-full sm:!w-auto"
                >
                  Xem dự án thực tế
                </Button>
              </a>
            </div>

            {/* Clean Stats Bar */}
            <div className="pt-6 sm:pt-8 border-t border-[#E8DFC0]/80 grid grid-cols-3 gap-2 sm:gap-8">
              {/* Stat 1 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 text-center sm:text-left">
                <div className="mt-0.5 text-[#8A4F2C] shrink-0 hidden sm:block">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl sm:text-3xl font-extrabold text-[#1A1613] tracking-tight leading-none">
                    500<span className="text-[#8A4F2C] font-bold text-lg sm:text-2xl ml-0.5">+</span>
                  </div>
                  <div className="text-[11px] sm:text-[13px] text-[#78716C] font-medium mt-1 leading-tight">
                    Dự án hoàn thành
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 text-center sm:text-left">
                <div className="mt-0.5 text-[#8A4F2C] shrink-0 hidden sm:block">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
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
                  <div className="text-xl sm:text-3xl font-extrabold text-[#1A1613] tracking-tight leading-none">
                    98<span className="text-[#8A4F2C] font-bold text-base sm:text-xl ml-0.5">%</span>
                  </div>
                  <div className="text-[11px] sm:text-[13px] text-[#78716C] font-medium mt-1 leading-tight">
                    Khách hàng hài lòng
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 text-center sm:text-left">
                <div className="mt-0.5 text-[#8A4F2C] shrink-0 hidden sm:block">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl sm:text-3xl font-extrabold text-[#1A1613] tracking-tight leading-none">
                    10<span className="text-[#8A4F2C] font-bold text-lg sm:text-2xl ml-0.5">+</span>
                  </div>
                  <div className="text-[11px] sm:text-[13px] text-[#78716C] font-medium mt-1 leading-tight">
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
