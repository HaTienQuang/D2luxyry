'use client';

import React, { useState } from 'react';
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
import { FloatingContactWidget } from '@/components/FloatingContactWidget';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | undefined>(undefined);

  const handleOpenConsultation = (serviceName?: string) => {
    setActiveService(serviceName);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2824] selection:bg-[#8A4F2C] selection:text-white flex flex-col font-sans pb-16 sm:pb-0">
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

      {/* Floating Action Buttons (Zalo, Hotline, Consultation, BackTop) */}
      <FloatingContactWidget onOpenConsultation={() => handleOpenConsultation()} />
    </div>
  );
}
