'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from 'antd';
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  ClockCircleFilled,
  DollarCircleFilled,
} from '@ant-design/icons';

interface CtaBannerProps {
  onOpenConsultation: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenConsultation }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] relative">
      <div className="max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="relative overflow-hidden shadow-2xl p-8 sm:p-12 lg:p-16 border border-stone-800/20 min-h-[380px] flex items-center shine-overlay">
          {/* Crisp, Vibrant Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=85"
            alt="Không gian nội thất cao cấp D'Luxury Design"
            fill
            className="object-cover object-center"
            priority
          />

          {/* Balanced Transparent Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            {/* Left Copy & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#E8DCCF] bg-white/10 backdrop-blur-md px-3.5 py-1 border-l-2 border-[#8A4F2C]">
                ĐỒNG HÀNH CÙNG D&apos;LUXURY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white drop-shadow-md">
                Bạn đang tìm kiếm <br />
                một không gian sống lý tưởng?
              </h2>
              <p className="text-base sm:text-lg text-stone-200 max-w-lg leading-relaxed drop-shadow">
                Hãy để chúng tôi đồng hành cùng bạn từ những ý tưởng đầu tiên đến khi hoàn thiện tổ
                ấm mơ ước.
              </p>

              <div className="pt-2">
                <Button
                  size="large"
                  icon={<ArrowRightOutlined className="!text-xs text-[#8A4F2C]" />}
                  iconPosition="end"
                  onClick={onOpenConsultation}
                  className="!h-13 !px-8 !text-base !font-bold !bg-white !text-[#8A4F2C] !border-none shadow-2xl hover:!bg-[#F5EFE6] transition-all transform hover:-translate-y-1"
                >
                  Nhận tư vấn ngay
                </Button>
              </div>
            </div>

            {/* Right Value Points - Sharp Architectural Glass Cards */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
              <div className="flex items-center gap-3.5 bg-black/45 hover:bg-black/60 backdrop-blur-md px-5 py-4 border border-white/20 hover:border-[#8A4F2C] transition-all duration-300 shadow-lg hover:-translate-y-1">
                <div className="w-10 h-10 bg-[#8A4F2C] flex items-center justify-center text-white shrink-0 shadow-md">
                  <CheckCircleFilled className="text-lg text-white" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
                  Tư vấn và khảo sát miễn phí
                </span>
              </div>

              <div className="flex items-center gap-3.5 bg-black/45 hover:bg-black/60 backdrop-blur-md px-5 py-4 border border-white/20 hover:border-[#8A4F2C] transition-all duration-300 shadow-lg hover:-translate-y-1">
                <div className="w-10 h-10 bg-[#8A4F2C] flex items-center justify-center text-white shrink-0 shadow-md">
                  <ClockCircleFilled className="text-lg text-white" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
                  Báo giá nhanh chóng trong 24h
                </span>
              </div>

              <div className="flex items-center gap-3.5 bg-black/45 hover:bg-black/60 backdrop-blur-md px-5 py-4 border border-white/20 hover:border-[#8A4F2C] transition-all duration-300 shadow-lg hover:-translate-y-1">
                <div className="w-10 h-10 bg-[#8A4F2C] flex items-center justify-center text-white shrink-0 shadow-md">
                  <DollarCircleFilled className="text-lg text-white" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
                  Giải pháp tối ưu ngân sách
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
