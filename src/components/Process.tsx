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
    <section id="process" className="py-14 sm:py-24 bg-[#FAF8F5] relative border-y border-[#EFE8DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3 mb-10 sm:mb-16">
          <span className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.2em] text-[#8A4F2C]">
            QUY TRÌNH LÀM VIỆC
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1A1613] tracking-tight">
            Rõ ràng – Chuyên nghiệp – Minh bạch
          </h2>
          <p className="text-xs sm:text-base text-[#6B635B] leading-relaxed">
            Chúng tôi đồng hành cùng bạn trong từng bước, đảm bảo dự án được triển khai hiệu quả và
            đúng mong đợi.
          </p>
        </div>

        {/* 6 Steps Process Sequence - 2 Cols on mobile, 3 on tablet, 6 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div key={step.step} className="relative flex flex-col items-center text-center p-3 sm:p-0 rounded-2xl bg-white/70 sm:bg-transparent border border-[#EFE8DF]/70 sm:border-none group">
              {/* Connector Arrow (Desktop only between items) */}
              {idx < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:flex absolute top-[72px] -translate-y-1/2 -right-3.5 xl:-right-4 z-10 text-[#C4A892] items-center justify-center pointer-events-none">
                  <ArrowRightOutlined className="text-base opacity-80" />
                </div>
              )}

              {/* Step Circle & Badge */}
              <div className="relative mb-3 sm:mb-5">
                {/* Step Number Tag */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#8A4F2C] text-white text-[11px] sm:text-xs font-bold flex items-center justify-center mx-auto mb-1.5 sm:mb-2 shadow-sm">
                  {step.step}
                </div>

                {/* Main Icon Circle */}
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-white border border-[#E8DFC0] shadow-sm flex items-center justify-center text-[#8A4F2C] group-hover:bg-[#8A4F2C] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  {getStepIcon(step.iconName)}
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-serif text-sm sm:text-base font-bold text-[#1A1613] group-hover:text-[#8A4F2C] transition-colors mb-1 sm:mb-2 min-h-[36px] sm:min-h-[48px] flex items-center justify-center leading-snug">
                {step.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#78716C] leading-relaxed max-w-[180px]">
                {step.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
