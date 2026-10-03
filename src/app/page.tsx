'use client';

import React, { useState } from 'react';
import { FloatButton } from 'antd';
import { PhoneOutlined, MessageOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Process } from '@/components/Process';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { Testimonials } from '@/components/Testimonials';
import { CtaBanner } from '@/components/CtaBanner';
import { Footer } from '@/components/Footer';
import { ConsultationModal } from '@/components/ConsultationModal';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | undefined>(undefined);

  const handleOpenConsultation = (serviceName?: string) => {
    setActiveService(serviceName);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2824] selection:bg-[#8A4F2C] selection:text-white flex flex-col font-sans pb-14 sm:pb-0">
      {/* Top Fixed Header */}
      <Header onOpenConsultation={() => handleOpenConsultation()} />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero onOpenConsultation={() => handleOpenConsultation()} />
        <Services onOpenConsultation={(svc) => handleOpenConsultation(svc)} />
        <WhyChooseUs onOpenConsultation={() => handleOpenConsultation()} />
        <Process />
        <FeaturedProjects onOpenConsultation={(proj) => handleOpenConsultation(proj)} />
        <Testimonials />
        <CtaBanner onOpenConsultation={() => handleOpenConsultation()} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Consultation Form Modal */}
      <ConsultationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={activeService}
      />

      {/* Desktop Floating Action Buttons */}
      <div className="hidden sm:block">
        <FloatButton.Group shape="circle" style={{ right: 24, bottom: 24 }}>
          <FloatButton
            icon={<PhoneOutlined className="text-[#8A4F2C]" />}
            tooltip="Hotline: 0967 323 335"
            href="tel:0967323335"
          />
          <FloatButton
            icon={<MessageOutlined className="text-[#8A4F2C]" />}
            tooltip="Đăng ký tư vấn"
            onClick={() => handleOpenConsultation()}
          />
          <FloatButton.BackTop
            visibilityHeight={300}
            icon={<ArrowUpOutlined className="text-[#8A4F2C]" />}
          />
        </FloatButton.Group>
      </div>

      {/* Mobile Sticky Quick Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EFE8DF] px-3 py-2 flex items-center gap-2 shadow-2xl">
        <a
          href="tel:0967323335"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#FAF8F5] border border-[#E8DFC0] text-[#733E22] font-semibold py-2.5 px-1.5 rounded-xl text-[11px] active:scale-95 transition-transform"
        >
          <PhoneOutlined className="text-[#8A4F2C] text-xs" />
          <span>Gọi Hotline</span>
        </a>
        <a
          href="https://zalo.me/0967323335"
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#0068FF]/10 border border-[#0068FF]/30 text-[#0068FF] font-semibold py-2.5 px-1.5 rounded-xl text-[11px] active:scale-95 transition-transform"
        >
          <span>Chat Zalo</span>
        </a>
        <button
          type="button"
          onClick={() => handleOpenConsultation()}
          className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#9C623C] to-[#8A4F2C] text-white font-semibold py-2.5 px-1.5 rounded-xl text-[11px] shadow-sm active:scale-95 transition-transform"
        >
          <MessageOutlined className="text-xs" />
          <span>Nhận tư vấn</span>
        </button>
      </div>
    </div>
  );
}
