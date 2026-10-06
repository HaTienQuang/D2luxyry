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
        return <MessageOutlined className="text-2xl text-inherit" />;
      case 'Search':
        return <SearchOutlined className="text-2xl text-inherit" />;
      case 'FileEdit':
        return <EditOutlined className="text-2xl text-inherit" />;
      case 'FileSpreadsheet':
        return <FileTextOutlined className="text-2xl text-inherit" />;
      case 'Hammer':
        return <ToolOutlined className="text-2xl text-inherit" />;
      case 'CheckCircle2':
      default:
        return <CheckCircleOutlined className="text-2xl text-inherit" />;
    }
  };

  return (
    <section id="process" className="py-16 sm:py-28 bg-[#FAF8F5] relative border-y border-[#EFE8DF]">
      <div className="max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-[#E8DFC0] text-[#8A4F2C]">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              QUY TRÌNH LÀM VIỆC
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1A1613] tracking-tight">
            Rõ ràng – Chuyên nghiệp – Minh bạch
          </h2>
          <p className="text-xs sm:text-base text-[#6B635B] leading-relaxed">
            Chúng tôi đồng hành cùng bạn trong từng bước, đảm bảo dự án được triển khai hiệu quả và
            đúng mong đợi.
          </p>
        </div>

        {/* 6 Steps Process Sequence - 2 Cols on mobile, 3 on tablet, 6 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative flex flex-col items-center text-center p-4 sm:p-5 bg-white border border-[#EFE8DF] hover:border-[#8A4F2C] hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5 shine-overlay"
            >
              {/* Connector Arrow (Desktop only between items) */}
              {idx < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:flex absolute top-[68px] -translate-y-1/2 -right-3.5 xl:-right-4 z-20 text-[#8A4F2C] items-center justify-center pointer-events-none">
                  <ArrowRightOutlined className="text-sm opacity-70" />
                </div>
              )}

              {/* Step Circle & Badge */}
              <div className="relative mb-3 sm:mb-5">
                {/* Step Number Tag */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#8A4F2C] text-white text-[11px] sm:text-xs font-bold flex items-center justify-center mx-auto mb-2 shadow-sm">
                  {step.step}
                </div>

                {/* Main Icon Box */}
                <div className="w-13 h-13 sm:w-16 sm:h-16 bg-[#FAF8F5] border border-[#E8DFC0] shadow-sm flex items-center justify-center text-[#8A4F2C] group-hover:bg-[#8A4F2C] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  {getStepIcon(step.iconName)}
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-serif text-sm sm:text-base font-bold text-[#1A1613] group-hover:text-[#8A4F2C] transition-colors mb-1 sm:mb-2 min-h-[36px] sm:min-h-[48px] flex items-center justify-center leading-snug">
                {step.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#78716C] leading-relaxed">
                {step.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
