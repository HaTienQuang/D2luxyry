'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Modal } from 'antd';
import {
  TrophyOutlined,
  SketchOutlined,
  SafetyCertificateOutlined,
  ToolOutlined,
  PlayCircleFilled,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { WHY_CHOOSE_US_DATA } from '@/data/landingData';

interface WhyChooseUsProps {
  onOpenConsultation: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenConsultation }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const getFeatureIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <TrophyOutlined className="text-xl text-inherit" />;
      case 1:
        return <SketchOutlined className="text-xl text-inherit" />;
      case 2:
        return <ToolOutlined className="text-xl text-inherit" />;
      case 3:
      default:
        return <SafetyCertificateOutlined className="text-xl text-inherit" />;
    }
  };

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Authentic Architectural Visual */}
          <div className="lg:col-span-6 relative">
            {/* Main Real Interior Photo */}
            <div className="relative overflow-hidden shadow-2xl border border-[#EFE8DF] bg-white aspect-[4/3] sm:aspect-[16/11] shine-overlay">
              <Image
                src={WHY_CHOOSE_US_DATA.videoThumbnail}
                alt="Không gian nội thất thực tế D'Luxury Design"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Subtle Editorial Caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto bg-white/95 backdrop-blur-md px-4 py-2.5 border-l-2 border-[#8A4F2C] border-y border-r border-stone-200/80 shadow-md flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#8A4F2C]" />
                <span className="text-xs font-semibold text-[#1A1613] tracking-wide">
                  {WHY_CHOOSE_US_DATA.projectTag}
                </span>
              </div>

              {/* Center Play Button for Video */}
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                aria-label="Xem video quy trình hoàn thiện"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 backdrop-blur-md text-[#8A4F2C] shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-[#8A4F2C] hover:text-white transition-all duration-300 group cursor-pointer border border-white/40 animate-pulse-ring"
              >
                <PlayCircleFilled className="text-3xl transition-transform group-hover:scale-105" />
              </button>
            </div>
          </div>

          {/* Right Column: Values and Features */}
          <div className="lg:col-span-6 space-y-8 sm:pl-4">
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#E8DFC0] text-[#8A4F2C]">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
                  {WHY_CHOOSE_US_DATA.eyebrow}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1A1613] tracking-tight">
                {WHY_CHOOSE_US_DATA.title}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-[#5C554E] leading-relaxed max-w-2xl">
                {WHY_CHOOSE_US_DATA.subtitle}
              </p>
            </div>

            {/* 4 Feature Points Grid - Sharp Architectural Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {WHY_CHOOSE_US_DATA.features.map((item, idx) => (
                <div
                  key={item.title}
                  className="p-6 bg-white border border-[#EFE8DF] hover:border-[#8A4F2C] transition-all duration-300 hover:shadow-xl flex flex-col space-y-2.5 group hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-[#FAF8F5] shadow-xs flex items-center justify-center border border-[#EFE8DF] text-[#8A4F2C] group-hover:bg-[#8A4F2C] group-hover:text-white transition-all duration-300 text-xl">
                    {getFeatureIcon(idx)}
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl lg:text-[22px] font-bold text-[#1A1613]">{item.title}</h3>
                  <p className="text-sm sm:text-base text-[#6B635B] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Button */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Button
                type="primary"
                size="large"
                icon={<ArrowRightOutlined />}
                iconPosition="end"
                onClick={onOpenConsultation}
                className="!h-14 sm:!h-15 !px-9 sm:!px-10 !text-base sm:!text-[17px] !font-bold !text-white shadow-md"
              >
                Đặt lịch khảo sát ngay
              </Button>
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center gap-2 text-base font-bold text-[#8A4F2C] hover:text-[#6E3D21] transition-colors py-2 px-3 cursor-pointer"
              >
                <PlayCircleFilled className="text-xl" />
                <span>Xem video xưởng và quy trình</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Preview */}
      <Modal
        open={videoModalOpen}
        onCancel={() => setVideoModalOpen(false)}
        footer={null}
        centered
        width={800}
        title={
          <span className="font-serif text-lg font-bold text-[#1A1613]">
            Khám phá quy trình thiết kế và thi công tại D&apos;Luxury Design
          </span>
        }
      >
        <div className="relative pt-[56.25%] bg-black rounded-xl overflow-hidden mt-4">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
            title="Video giới thiệu D'Luxury Design"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Modal>
    </section>
  );
};
