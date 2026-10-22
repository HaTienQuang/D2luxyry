"use client";

import React, { useState } from "react";
import { X, User, Phone, Mail, CircleDollarSign, LayoutGrid, Home, Send, CheckCircle2, Loader2 } from "lucide-react";
import { siteConfig } from "@/data/siteData";
import { motion, AnimatePresence } from "framer-motion";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

const PROJECT_SUGGESTIONS = [
  "Thiết kế nội thất cao cấp",
  "Thi công nội thất trọn gói",
  "Sản xuất nội thất theo yêu cầu",
  "Villa Grand Island Ecopark",
  "Villa Vinhomes Ocean Park",
  "Vintage Villa Tam Đảo",
  "Biệt thự / Villa Đơn lập",
  "Dinh thự / Lâu đài",
  "Penthouse / Duplex Thượng Lưu",
  "Căn hộ cao cấp",
  "Cải tạo và nâng cấp không gian",
];

const BUDGET_SUGGESTIONS = [
  "Dưới 500 triệu",
  "500 triệu - 1 tỷ",
  "1 tỷ - 2 tỷ",
  "2 tỷ - 5 tỷ",
  "Trên 5 tỷ",
];

export default function ConsultationModal({ isOpen, onClose, defaultProject = "" }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    project: defaultProject,
    address: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg("Vui lòng nhập họ tên và số điện thoại.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/send-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.error || "Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (err) {
      console.error(err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      budget: "",
      project: "",
      address: "",
      notes: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
        >
          {/* Backdrop */}
          <div className="fixed inset-0" onClick={handleReset} />

          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="relative z-10 w-full max-w-[560px] bg-white rounded-2xl shadow-2xl p-6 sm:p-8 my-auto border border-[#eae3d9] text-left"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleReset}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </motion.button>

        {isSuccess ? (
          <div className="py-8 px-2 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#8a522a]/10 text-[#8a522a] flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a522a]">
              GỬI YÊU CẦU THÀNH CÔNG
            </span>
            <h3 className="text-2xl font-serif font-bold text-neutral-900">
              Cảm Ơn Quý Khách {formData.name}!
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans max-w-md mx-auto">
              Thông tin đăng ký tư vấn đã được gửi trực tiếp đến hòm thư{" "}
              <strong className="text-neutral-900">{siteConfig.email}</strong>.
              Kiến trúc sư trưởng D2 Luxury Design sẽ liên hệ lại qua số{" "}
              <strong className="text-[#8a522a]">{formData.phone}</strong> trong vòng 15 phút.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${siteConfig.hotline}`}
                className="px-6 py-3 bg-[#8a522a] text-white rounded-xl text-xs font-semibold tracking-wider uppercase hover:bg-[#74421d] transition-colors"
              >
                Gọi Hotline Ngay ({siteConfig.phone1})
              </a>
              <button
                onClick={handleReset}
                className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-xl text-xs font-semibold tracking-wider uppercase hover:bg-neutral-50 transition-colors"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="text-center pb-5">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#8a522a]">
                ĐĂNG KÝ TƯ VẤN MIỄN PHÍ
              </span>
              <h3 className="text-2xl sm:text-[27px] font-bold text-neutral-900 tracking-tight mt-1 font-sans">
                Kiến Tạo Không Gian Sống Của Bạn
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-500 font-light mt-1.5 leading-normal">
                Nhận giải pháp thiết kế tối ưu và bảng dự toán chi tiết không phát sinh.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg text-center">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-[13px]">
              {/* Row 1: Họ tên + Số điện thoại */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Họ và tên *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nhập họ và tên"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50/60 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#8a522a] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Số điện thoại *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Nhập số điện thoại"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50/60 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#8a522a] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email + Ngân sách dự kiến */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Nhập email của bạn"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50/60 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#8a522a] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Ngân sách dự kiến
                  </label>
                  <div className="relative">
                    <CircleDollarSign className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      list="budget-list"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="Nhập mức ngân sách dự kiến"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50/60 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#8a522a] transition-all"
                    />
                    <datalist id="budget-list">
                      {BUDGET_SUGGESTIONS.map((b) => (
                        <option key={b} value={b} />
                      ))}
                    </datalist>
                  </div>
                </div>
              </div>

              {/* Row 3: Dịch vụ / Dự án quan tâm */}
              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  Dịch vụ / Dự án quan tâm
                </label>
                <div className="relative">
                  <LayoutGrid className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    list="project-list"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    placeholder="Nhập dịch vụ hoặc tên dự án mong muốn"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50/60 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#8a522a] transition-all"
                  />
                  <datalist id="project-list">
                    {PROJECT_SUGGESTIONS.map((p) => (
                      <option key={p} value={p} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Row 4: Địa chỉ công trình */}
              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  Địa chỉ công trình
                </label>
                <div className="relative">
                  <Home className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Nhập địa chỉ hoặc khu đô thị / căn hộ"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50/60 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#8a522a] transition-all"
                  />
                </div>
              </div>

              {/* Row 5: Ghi chú yêu cầu */}
              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  Ghi chú yêu cầu
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Nhập thêm các yêu cầu đặc biệt hoặc phong cách bạn yêu thích..."
                  className="w-full p-3 bg-neutral-50/60 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#8a522a] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 mt-2 bg-[#8a522a] hover:bg-[#74421d] text-white rounded-xl sm:rounded-2xl font-medium tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#8a522a]/20 hover:shadow-[#8a522a]/30 transition-all duration-300 active:scale-[0.99] disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang gửi thông tin...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 -rotate-12" />
                    <span className="font-semibold">Gửi yêu cầu nhận tư vấn</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

