'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Modal } from 'antd';
import {
  ArrowRightOutlined,
  CheckOutlined,
  FormOutlined,
  ToolOutlined,
  BuildOutlined,
  SyncOutlined,
  CompassOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import { SERVICES_DATA, ServiceItem } from '@/data/landingData';

interface ServicesProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenConsultation }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ClipboardCheck':
        return <AuditOutlined className="text-xl text-inherit" />;
      case 'PenTool':
        return <FormOutlined className="text-xl text-inherit" />;
      case 'Wrench':
        return <ToolOutlined className="text-xl text-inherit" />;
      case 'Factory':
        return <BuildOutlined className="text-xl text-inherit" />;
      case 'RefreshCw':
        return <SyncOutlined className="text-xl text-inherit" />;
      case 'Compass':
      default:
        return <CompassOutlined className="text-xl text-inherit" />;
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#F9F6F0] relative">
      <div className="max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#E8DFC0] text-[#8A4F2C]">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
                DỊCH VỤ CỦA CHÚNG TÔI
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1A1613] tracking-tight">
              Giải pháp nội thất <span className="text-[#8A4F2C]">toàn diện</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#5C554E] leading-relaxed">
              Từ tư vấn ý tưởng, thiết kế, thi công đến hoàn thiện, chúng tôi đồng hành cùng bạn
              kiến tạo không gian sống lý tưởng.
            </p>
          </div>

          {/* Luxury quote accent */}
          <div className="hidden md:flex flex-col items-end justify-center shrink-0 border-l-3 border-[#D5BEA8] pl-6 py-1">
            <span className="text-2xl lg:text-3xl font-bold text-[#8A4F2C] italic">
              “Mỗi không gian,
            </span>
            <span className="text-xl lg:text-2xl font-semibold text-[#A06037] italic">
              một câu chuyện riêng”
            </span>
          </div>
        </div>

        {/* 6 Services Grid - Full Image Background with Hover Reveal & Sharp Architecture Corners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group relative h-[440px] sm:h-[490px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between p-6 sm:p-8 border border-[#EFE8DF] hover:-translate-y-2 shine-overlay"
            >
              {/* Full Background Image */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Dynamic Overlay: Gradient that deepens on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/95 group-hover:via-black/70 group-hover:to-black/35 transition-all duration-500" />

              {/* Top Bar: Service Number Badge & Icon Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="w-11 h-11 bg-black/55 backdrop-blur-md text-white font-mono font-bold text-sm flex items-center justify-center border border-white/25 shadow-sm">
                  0{idx + 1}
                </span>

                <div className="w-13 h-13 bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center group-hover:bg-[#8A4F2C] group-hover:border-[#8A4F2C] transition-all duration-300 shadow-md text-xl">
                  {getServiceIcon(service.iconName)}
                </div>
              </div>

              {/* Bottom Content Area: Title always visible, checklist points reveal on hover */}
              <div className="relative z-10 space-y-3.5">
                {/* Service Title */}
                <div>
                  <h3 className="font-serif text-2xl sm:text-[28px] lg:text-[30px] font-bold text-white leading-snug group-hover:text-[#F3EAE1] transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Resting State Preview Cue */}
                <div className="flex items-center justify-between pt-1 group-hover:hidden transition-all text-sm text-stone-200 font-medium">
                  <span className="italic">Chạm xem chi tiết hạng mục</span>
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/25">
                    <ArrowRightOutlined className="text-xs -rotate-45" />
                  </div>
                </div>

                {/* Hover Revealing Section (Points & Buttons) */}
                <div className="max-h-0 opacity-0 group-hover:max-h-80 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out space-y-4 pt-1">
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-stone-100">
                    {service.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="w-4 h-4 bg-[#8A4F2C] flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5 font-bold">
                          ✓
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="pt-3 flex items-center justify-between border-t border-white/20">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedService(service);
                      }}
                      className="text-xs font-semibold text-[#D5BEA8] hover:text-white transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Xem đầy đủ</span>
                      <ArrowRightOutlined className="text-[10px]" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenConsultation(service.title);
                      }}
                      className="px-4 py-1.5 rounded-full bg-[#8A4F2C] hover:bg-[#9C623C] text-white text-xs font-semibold shadow-md transition-all hover:scale-105"
                    >
                      Tư vấn ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <Modal
        open={!!selectedService}
        onCancel={() => setSelectedService(null)}
        footer={null}
        centered
        width={600}
        title={
          <div className="font-serif text-2xl font-bold text-[#1A1613]">
            {selectedService?.title}
          </div>
        }
      >
        {selectedService && (
          <div className="space-y-6 pt-2">
            <div className="relative h-64 w-full rounded-xl overflow-hidden">
              <Image
                src={selectedService.image}
                alt={selectedService.title}
                fill
                className="object-cover"
              />
            </div>

            <p className="text-[#5C554E] leading-relaxed text-base">
              {selectedService.description}
            </p>

            <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EFE8DF]">
              <h4 className="text-sm font-bold text-[#1A1613] mb-3 uppercase tracking-wider">
                Hạng mục thực hiện:
              </h4>
              <ul className="space-y-2">
                {selectedService.points.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-[#4A423B]">
                    <CheckOutlined className="text-[#8A4F2C]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-2">
              <Button onClick={() => setSelectedService(null)} className="!h-11 sm:!h-10">Đóng</Button>
              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                onClick={() => {
                  const sTitle = selectedService.title;
                  setSelectedService(null);
                  onOpenConsultation(sTitle);
                }}
                className="!h-11 sm:!h-10 !text-white !font-semibold"
              >
                Nhận tư vấn gói này
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
