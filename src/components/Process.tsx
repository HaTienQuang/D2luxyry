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
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#8A4F2C]">
            QUY TRÌNH LÀM VIỆC
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1613] tracking-tight">
            Rõ ràng – Chuyên nghiệp – Minh bạch
          </h2>
          <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed max-w-xl mx-auto">
            Chúng tôi đồng hành cùng bạn trong từng bước, đảm bảo dự án được triển khai hiệu quả và
            đúng mong đợi.
          </p>
        </div>

        {/* 6 Steps Process Sequence - 2 Cols on mobile, 3 on tablet, 6 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative flex flex-col items-center text-center p-4 sm:p-6 bg-white border border-[#EFE8DF] hover:border-[#8A4F2C] hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5 shine-overlay"
            >
              {/* Connector Arrow (Desktop only between items) */}
              {idx < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:flex absolute top-[70px] -translate-y-1/2 -right-3.5 xl:-right-4 z-20 text-[#8A4F2C] items-center justify-center pointer-events-none">
                  <ArrowRightOutlined className="text-base opacity-80" />
                </div>
              )}

              {/* Step Circle & Badge */}
              <div className="relative mb-3.5 sm:mb-5">
                {/* Step Number Tag */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#8A4F2C] text-white text-xs sm:text-sm font-bold flex items-center justify-center mx-auto mb-2 shadow-sm">
                  {step.step}
                </div>

                {/* Main Icon Box */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FAF8F5] border border-[#E8DFC0] shadow-sm flex items-center justify-center text-[#8A4F2C] group-hover:bg-[#8A4F2C] group-hover:text-white group-hover:scale-105 transition-all duration-300 text-2xl">
                  {getStepIcon(step.iconName)}
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-sm sm:text-base font-bold text-[#1A1613] group-hover:text-[#8A4F2C] transition-colors mb-1.5 sm:mb-2 min-h-[40px] sm:min-h-[44px] flex items-center justify-center leading-snug">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
                {step.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
