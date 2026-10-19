"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import { siteConfig } from "@/data/siteData";
import ConsultationModal from "@/components/ConsultationModal";
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone, Send, Warehouse } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Biệt thự / Villa",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    try {
      await fetch("/api/send-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          project: formData.projectType,
          notes: formData.message,
        }),
      });
    } catch (err) {
      console.error(err);
    }
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#f4f0ec] text-black">
      <Header />

      {/* Hero Banner matching synchronized style */}
      <section className="relative w-full h-[52vh] min-h-[460px] sm:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* White neoclassical mansion with natural illumination */}
        <div className="absolute inset-0">
          <Image
            src="/hero/main.jpg"
            alt="Liên hệ D2 Luxury"
            fill
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
            priority
          />
          {/* Refined translucent overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/30" />
        </div>

        {/* Centered Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-24 pb-8 flex flex-col items-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-serif font-bold uppercase tracking-[0.2em] text-white drop-shadow-md leading-tight">
            LIÊN HỆ VỚI CHÚNG TÔI
          </h1>
          <div className="w-20 sm:w-28 h-[2px] bg-white/80 mx-auto mt-4 mb-5" />
          <p className="max-w-2xl sm:max-w-3xl mx-auto text-xs sm:text-[13px] md:text-[14px] font-serif uppercase tracking-[0.08em] text-white/95 leading-relaxed font-normal drop-shadow">
            CHÚNG TÔI LUÔN SẴN SÀNG LẮNG NGHE VÀ ĐỒNG HÀNH CÙNG QUÝ KHÁCH KIẾN TẠO NÊN NHỮNG KHÔNG GIAN SỐNG THƯỢNG LƯU ĐỘC BẢN.
          </p>

          {/* Circular Scroll Down Button matching Roll.svg */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="mt-7 sm:mt-9"
          >
            <a
              href="#content"
              className="inline-flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity"
              aria-label="Cuộn xuống nội dung liên hệ"
            >
              <Image
                src="/Roll.svg"
                alt="Cuộn xuống"
                width={42}
                height={42}
                className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow"
              />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Grid Section */}
      <section id="content" className="py-16 sm:py-24 bg-white text-black border-b border-[#eae3d9] scroll-mt-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Contact Info & Channels */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-8"
            >
              <div>
                <span className="text-luxury-gold text-xs uppercase tracking-[0.25em] font-sans font-semibold block mb-2">
                  THÔNG TIN KẾT NỐI
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wider text-black">
                  CÔNG TY TNHH D2 LUXURY DESIGN
                </h2>
                <div className="w-20 h-[1.5px] bg-black mt-3 mb-6" />
              </div>

              {/* Info Items */}
              <div className="space-y-6 text-sm font-serif text-neutral-800">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#faf8f5] border border-[#ded8ce] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-black text-xs sm:text-sm">Trụ Sở Chính (TP.HCM)</h4>
                    <p className="text-neutral-600 font-light mt-1">{siteConfig.addressHCMC}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#faf8f5] border border-[#ded8ce] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-black text-xs sm:text-sm">Chi Nhánh Miền Bắc (Hà Nội)</h4>
                    <p className="text-neutral-600 font-light mt-1">{siteConfig.addressHanoi}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#faf8f5] border border-[#ded8ce] flex items-center justify-center shrink-0">
                    <Warehouse className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-black text-xs sm:text-sm">Hệ Thống 2 Xưởng Sản Xuất</h4>
                    <p className="text-neutral-600 font-light mt-1">Xưởng 1: {siteConfig.workshop1}</p>
                    <p className="text-neutral-600 font-light mt-0.5">Xưởng 2: {siteConfig.workshop2}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#faf8f5] border border-[#ded8ce] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-black text-xs sm:text-sm">Hotline & Zalo Hỗ Trợ</h4>
                    <p className="text-neutral-600 font-light mt-1">
                      <a href={`tel:${siteConfig.phone1}`} className="hover:text-black font-semibold text-black">
                        {siteConfig.phone1}
                      </a>{" "}
                      &bull;{" "}
                      <a href={`tel:${siteConfig.phone2}`} className="hover:text-black font-semibold text-black">
                        {siteConfig.phone2}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#faf8f5] border border-[#ded8ce] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-black text-xs sm:text-sm">Hòm Thư Điện Tử</h4>
                    <p className="text-neutral-600 font-light mt-1">
                      <a href={`mailto:${siteConfig.email}`} className="hover:text-black">
                        {siteConfig.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#faf8f5] border border-[#ded8ce] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-black text-xs sm:text-sm">Thời Gian Làm Việc</h4>
                    <p className="text-neutral-600 font-light mt-1">Thứ 2 - Thứ 7: 08:00 - 18:30 (Chủ nhật theo lịch hẹn)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Consultation Form Box */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7"
            >
              <div className="bg-[#faf8f5] border border-[#ded8ce] p-8 sm:p-12 shadow-lg">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <CheckCircle2 className="w-14 h-14 text-black mx-auto" />
                    <h3 className="text-2xl font-serif font-bold text-black uppercase">
                      Gửi Yêu Cầu Thành Công!
                    </h3>
                    <p className="text-sm text-neutral-600 font-serif font-light leading-relaxed max-w-md mx-auto">
                      Cảm ơn quý khách <strong>{formData.name}</strong> đã tin tưởng D2 Luxury. Kiến trúc sư trưởng của chúng tôi sẽ liên hệ lại qua số <strong>{formData.phone}</strong> trong vòng 15 phút.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-3 bg-black text-white text-xs uppercase font-serif tracking-widest hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      Gửi yêu cầu khác
                    </motion.button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <span className="text-luxury-gold text-xs uppercase tracking-[0.2em] font-sans font-semibold block mb-1">
                        GỬI YÊU CẦU TRỰC TIẾP
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold uppercase tracking-wider text-black">
                        ĐĂNG KÝ TƯ VẤN & BÁO GIÁ THIẾT KẾ
                      </h3>
                      <div className="w-16 h-[1.5px] bg-black mt-2 mb-6" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-serif text-neutral-700 uppercase tracking-wider mb-1.5">
                          Họ và tên *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Nguyễn Văn A"
                          className="w-full px-4 py-3 bg-white border border-[#ded8ce] text-sm focus:outline-none focus:border-black font-serif"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-serif text-neutral-700 uppercase tracking-wider mb-1.5">
                          Số điện thoại *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0967 323 335"
                          className="w-full px-4 py-3 bg-white border border-[#ded8ce] text-sm focus:outline-none focus:border-black font-serif"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-serif text-neutral-700 uppercase tracking-wider mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@example.com"
                          className="w-full px-4 py-3 bg-white border border-[#ded8ce] text-sm focus:outline-none focus:border-black font-serif"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-serif text-neutral-700 uppercase tracking-wider mb-1.5">
                          Loại công trình
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-[#ded8ce] text-sm focus:outline-none focus:border-black font-serif"
                        >
                          <option value="Biệt thự / Villa">Biệt thự / Villa</option>
                          <option value="Dinh thự / Lâu đài">Dinh thự / Lâu đài</option>
                          <option value="Nhà phố liền kề">Nhà phố liền kề</option>
                          <option value="Penthouse / Duplex">Penthouse / Duplex</option>
                          <option value="Căn hộ cao cấp">Căn hộ cao cấp</option>
                          <option value="Cải tạo trọn gói">Cải tạo trọn gói</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-serif text-neutral-700 uppercase tracking-wider mb-1.5">
                        Nội dung yêu cầu / Diện tích / Địa điểm
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Ví dụ: Cần thiết kế thi công biệt thự 3 tầng tại Vinhomes Grand Park, diện tích sàn 350m2..."
                        className="w-full px-4 py-3 bg-white border border-[#ded8ce] text-sm focus:outline-none focus:border-black font-serif resize-none"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-4 bg-black hover:bg-neutral-800 text-white text-xs sm:text-[13px] font-serif font-semibold tracking-widest uppercase transition-colors shadow-md hover:shadow-lg cursor-pointer"
                    >
                      GỬI YÊU CẦU TƯ VẤN NGAY
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWidgets
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
      />
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </main>
  );
}

