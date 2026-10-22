"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/siteData";
import { X, MessageSquare, ChevronDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ZaloModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ZaloModal({ isOpen, onClose }: ZaloModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm"
        >
          <div className="fixed inset-0" onClick={onClose} />

          {/* Main Container styled exactly like Zalo Page in Image 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="relative z-10 w-full max-w-2xl bg-[#eef2f6] rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
        {/* Top Zalo Nav Bar */}
        <div className="bg-white px-6 py-3.5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#0068ff] font-bold text-2xl font-sans tracking-tight">
              Zalo
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-600 font-sans">
            <div className="hidden sm:flex items-center gap-1 cursor-pointer hover:text-black">
              <span>Ngôn ngữ:</span>
              <strong className="text-gray-900">Tiếng Việt</strong>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Inner Card Section */}
        <div className="p-6 sm:p-10 flex items-center justify-center">
          <div className="bg-white w-full rounded-2xl shadow-md border border-gray-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 justify-between">
            {/* Left Column: Bùi Dũng Profile & Nhắn tin */}
            <div className="flex-1 flex flex-col justify-between w-full md:pr-6 md:border-r md:border-gray-100 text-left">
              <div>
                <h3 className="text-2xl sm:text-[26px] font-bold text-gray-900 font-sans tracking-tight">
                  Bùi Dũng
                </h3>
                <p className="text-sm text-gray-500 font-normal mt-0.5">
                  Liên hệ
                </p>

                {/* Blue "Nhắn tin" button */}
                <div className="my-5">
                  <a
                    href={siteConfig.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0068ff] hover:bg-[#0055d4] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200 group"
                  >
                    <MessageSquare className="w-4 h-4 fill-white text-[#0068ff]" />
                    <span>Nhắn tin</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                  </a>
                </div>
              </div>

              {/* Giới thiệu bản thân */}
              <div className="pt-2 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900">
                  Giới thiệu bản thân
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
                  D2 LUXURY DESIGN
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Hotline / Zalo: {siteConfig.hotlineFormatted}
                </p>
              </div>
            </div>

            {/* Right Column: QR Code */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 p-2 bg-white border border-gray-200 rounded-xl shadow-inner flex items-center justify-center">
                <Image
                  src="/zalo-qr.png"
                  alt="Mã QR Zalo Bùi Dũng - D2 Luxury Design"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <p className="text-[11px] sm:text-xs text-gray-500 text-center mt-3 max-w-[190px] leading-relaxed">
                Mở Zalo, bấm quét QR để quét và xem trên điện thoại
              </p>
            </div>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
