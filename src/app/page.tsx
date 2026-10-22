"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import BrandsSection from "@/components/BrandsSection";
import AIConceptSection from "@/components/AIConceptSection";
import ConsultationSection from "@/components/ConsultationSection";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import ConsultationModal from "@/components/ConsultationModal";

export default function HomePage() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-[#f4f0ec] text-black">
      {/* Fixed Header */}
      <Header />

      {/* 00. HERO SECTION (Hotline number reveal + Nhận tư vấn modal) */}
      <HeroSlider onOpenConsultation={() => setIsConsultationModalOpen(true)} />

      {/* 01. DỰ ÁN CỦA D2 LUXURY DESIGN */}
      <ProjectsSection />

      {/* 02. VỀ D2 LUXURY DESIGN */}
      <AboutSection />

      {/* 03. DỊCH VỤ CỦA CHÚNG TÔI */}
      <ServicesSection />

      {/* 04. 2 THƯƠNG HIỆU ĐỊNH DẠNG */}
      <BrandsSection />

      {/* 05. LÊN Ý TƯỞNG THIẾT KẾ 3D (AI Studio) */}
      <AIConceptSection />

      {/* 06. NHẬN TƯ VẤN THIẾT KẾ THI CÔNG NỘI THẤT */}
      <ConsultationSection
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
      />

      {/* FOOTER (Layout 4 cột theo ảnh 1, không lấy nền đen, click Zalo mở trực tiếp tab mới) */}
      <Footer />

      {/* Floating Action Buttons (Zalo mở trực tiếp tab mới, Hotline, Đăng ký tư vấn Modal, Scroll-top) */}
      <FloatingWidgets
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
      />

      {/* Consultation Modal matching Image 3 (Gửi trực tiếp đến d2luxurydesign@gmail.com) */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </main>
  );
}
