'use client';

import React from 'react';
import {
  MessageOutlined,
  SearchOutlined,
  EditOutlined,
  FileTextOutlined,
  ToolOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { PROCESS_STEPS } from '@/data/landingData';

export const Process: React.FC = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageOutlined className="text-2xl" />;
      case 'Search':
        return <SearchOutlined className="text-2xl" />;
      case 'FileEdit':
        return <EditOutlined className="text-2xl" />;
      case 'FileSpreadsheet':
        return <FileTextOutlined className="text-2xl" />;
      case 'Hammer':
        return <ToolOutlined className="text-2xl" />;
      case 'CheckCircle2':
      default:
        return <CheckCircleOutlined className="text-2xl" />;
    }
  };

  return (
    <section id="process" className="py-20 sm:py-28 bg-[#FAF8F5] relative border-y border-[#EFE8DF]">
      <div className="max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header without box wrapper */}
        <div className="text-center max-w-4xl mx-auto space-y-3.5 mb-14 sm:mb-20">
          <p className="text-xs sm:text-sm lg:text-base font-bold uppercase tracking-[0.25em] text-[#8A4F2C]">
            QUY TRÌNH LÀM VIỆC
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1A1613] tracking-tight">
            Rõ Ràng – Chuyên Nghiệp – Minh Bạch
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#5C554E] leading-relaxed max-w-2xl mx-auto">
            Chúng tôi đồng hành cùng bạn qua từng giai đoạn khắt khe, biến bản vẽ thiết kế thành kiệt tác không gian sống hoàn mỹ.
          </p>
        </div>

        {/* 6 Steps Process Sequence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative bg-white border border-[#EFE8DF] hover:border-[#8A4F2C] p-6 sm:p-7 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group flex flex-col justify-between overflow-hidden"
            >
              {/* Gold Top Accent Line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8A4F2C] to-[#C5A880] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Watermark Step Number */}
              <div className="absolute top-3 right-3 text-4xl sm:text-5xl font-serif font-black text-stone-100 group-hover:text-[#8A4F2C]/10 transition-colors pointer-events-none select-none">
                {step.step}
              </div>

              <div>
                {/* Step Pill */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8A4F2C] bg-[#FAF8F5] px-2.5 py-1 border border-[#E8DFC0]">
                    Bước {step.step}
                  </span>
                </div>

                {/* Icon Container */}
                <div className="w-14 h-14 bg-gradient-to-br from-[#FAF8F5] to-[#F3ECE4] border border-[#D5BEA8] text-[#8A4F2C] flex items-center justify-center group-hover:bg-[#8A4F2C] group-hover:text-white group-hover:scale-105 group-hover:shadow-md transition-all duration-300 mb-5">
                  {getStepIcon(step.iconName)}
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg sm:text-[19px] font-bold text-[#1A1613] group-hover:text-[#8A4F2C] transition-colors leading-snug mb-2.5">
                  {step.title}
                </h3>

                {/* Subtitle / Description */}
                <p className="text-xs sm:text-[13.5px] text-[#6B635B] leading-relaxed">
                  {step.subtitle}
                </p>
              </div>

              {/* Bottom Subtle Step Connector / Progress Dot */}
              <div className="pt-6 mt-4 border-t border-[#F5EFE8] flex items-center justify-between text-xs text-stone-400 group-hover:text-[#8A4F2C] transition-colors">
                <span className="font-medium text-[11px] uppercase tracking-wider">Giai đoạn {step.step}/06</span>
                <ArrowRightOutlined className="text-xs transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
