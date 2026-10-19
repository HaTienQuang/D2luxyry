"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/siteData";
import { Sparkles, Maximize2, Download, ArrowRight, CheckCircle2, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface AIConceptSectionProps {
  onOpenZalo?: () => void;
}

export default function AIConceptSection({ onOpenZalo }: AIConceptSectionProps = {}) {
  // Direct, simplified customer requirements
  const [area, setArea] = useState("");
  const [colorRequirements, setColorRequirements] = useState("");
  const [designWishes, setDesignWishes] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [conceptImage, setConceptImage] = useState("/projects/d2-luxury-3d-sample.jpg");
  const [conceptMeta, setConceptMeta] = useState<{
    area: string;
    colorRequirements: string;
    isDemo: boolean;
    message?: string;
  }>({
    area: "Không gian tiêu chuẩn",
    colorRequirements: "Tone màu Luxury sang trọng",
    isDemo: false,
  });

  const [lightboxOpen, setLightboxOpen] = useState(false);

  const loadingStepsText = [
    "Khởi tạo cấu trúc hình học 3D theo diện tích...",
    "Phối hợp ánh sáng raytracing, màu nội & ngoại thất...",
    "Hoàn thiện phối cảnh 3D độ phân giải cao...",
  ];

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 2 ? prev + 1 : prev));
    }, 1200);

    try {
      const res = await fetch("/api/generate-concept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          area: area.trim() || "120m² không gian cao cấp",
          colorRequirements:
            colorRequirements.trim() ||
            "Nội thất gỗ óc chó & đá tự nhiên, ngoại thất màu sáng hiện đại",
          designWishes:
            designWishes.trim() ||
            "Thiết kế không gian mở sang trọng, tinh tế, ánh sáng tự nhiên",
        }),
      });

      const data = await res.json();
      clearInterval(stepInterval);

      if (data.success && data.imageUrl) {
        setConceptImage(data.imageUrl);
        setConceptMeta({
          area: data.area || area || "Không gian cao cấp",
          colorRequirements: data.colorRequirements || colorRequirements || "Màu sắc Luxury",
          isDemo: data.isDemo,
          message: data.message,
        });
      }
    } catch (err) {
      console.error("Generate concept error:", err);
      clearInterval(stepInterval);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="sec-thietke3d"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#fbf9f6] text-black overflow-hidden border-t border-[#eae3d9]"
    >
      <div id="sec-ai-concept" className="absolute -top-24" />
      {/* Background Watermark 05 (So5.svg) identical sizing and placement */}
      <div
        className="absolute top-2 left-0 sm:left-4 w-[420px] sm:w-[520px] lg:w-[560px] h-[400px] sm:h-[500px] lg:h-[540px] opacity-85 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <Image
          src="/decor/So5.svg"
          alt="Watermark 05 AI Concept"
          fill
          className="object-contain object-left-top"
          priority
        />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[11px] font-sans tracking-[0.25em] uppercase font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            AI STUDIO
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold uppercase tracking-wider text-black leading-[1.25]">
            LÊN Ý TƯỞNG THIẾT KẾ 3D
          </h2>
          <div className="w-20 sm:w-24 h-[1.5px] bg-black mt-3 sm:mt-4 mb-4" />
          <p className="text-sm sm:text-[15px] text-neutral-600 font-serif italic max-w-2xl leading-relaxed">
            Nhập diện tích và yêu cầu về màu sắc nội ngoại thất mong muốn của bạn. Hệ thống D2 Luxury sẽ phác thảo bản vẽ phối cảnh 3D không gian trực quan dành riêng cho bạn.
          </p>
        </div>

        {/* 2-Column Studio Grid: Left 5 cols (Form), Right 7 cols (Expansive 3D Preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Streamlined Input Form */}
          <form
            onSubmit={handleGenerate}
            className="lg:col-span-5 bg-white p-6 sm:p-7 border border-[#ded8ce] shadow-sm space-y-5"
          >
            {/* Input 1: Diện tích không gian */}
            <div>
              <label className="block text-xs font-serif uppercase tracking-[0.15em] text-black font-semibold mb-2">
                1. Diện tích không gian cần thiết kế
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Ví dụ: 120m², Biệt thự 350m², Căn hộ 90m² 3 phòng ngủ..."
                className="w-full text-xs sm:text-[13px] font-sans px-4 py-3 bg-[#fdfbf9] border border-[#ded8ce] focus:border-black focus:outline-none transition-colors placeholder:text-neutral-400"
              />
            </div>

            {/* Input 2: Yêu cầu màu nội thất & ngoại thất */}
            <div>
              <label className="block text-xs font-serif uppercase tracking-[0.15em] text-black font-semibold mb-2">
                2. Yêu cầu về màu sắc nội thất & màu sắc ngoại thất
              </label>
              <input
                type="text"
                value={colorRequirements}
                onChange={(e) => setColorRequirements(e.target.value)}
                placeholder="Ví dụ: Nội thất tone gỗ óc chó & đá tự nhiên; Ngoại thất trắng sứ kết hợp đá xám khói..."
                className="w-full text-xs sm:text-[13px] font-sans px-4 py-3 bg-[#fdfbf9] border border-[#ded8ce] focus:border-black focus:outline-none transition-colors placeholder:text-neutral-400"
              />
            </div>

            {/* Input 3: Mô tả chi tiết mong muốn thiết kế */}
            <div>
              <label className="block text-xs font-serif uppercase tracking-[0.15em] text-black font-semibold mb-2">
                3. Mong muốn thiết kế như thế nào
              </label>
              <textarea
                value={designWishes}
                onChange={(e) => setDesignWishes(e.target.value)}
                placeholder="Mô tả chi tiết mong muốn của bạn (Ví dụ: Không gian phòng khách mở tràn ngập ánh sáng, cửa sổ kính tràn viền view sân vườn, sofa cong bọc da cao cấp, trần cao thoáng đãng, đèn chùm pha lê hiện đại...)"
                rows={4}
                className="w-full text-xs sm:text-[13px] font-sans p-4 bg-[#fdfbf9] border border-[#ded8ce] focus:border-black focus:outline-none transition-colors placeholder:text-neutral-400 leading-relaxed"
              />
            </div>

            {/* Action Button with Framer Motion */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.015, y: -1 } : {}}
              whileTap={!isLoading ? { scale: 0.985 } : {}}
              className={`w-full py-4 px-6 text-center text-xs sm:text-[13px] font-serif uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                isLoading
                  ? "bg-neutral-800 text-neutral-300 cursor-wait"
                  : "bg-black hover:bg-neutral-800 text-white shadow-md hover:shadow-lg"
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-luxury-gold" />
                  <span>{loadingStepsText[loadingStep]}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-luxury-gold" />
                  <span>KHỞI TẠO PHỐI CẢNH 3D NGAY</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Right Column: 3D Visualization Preview - Expanded to 7 columns with widescreen aspect */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-end w-full">
            <div className="relative w-full">
              {/* Offset Wireframe Outline (Signature D2 Luxury Design Frame) */}
              <div
                className="absolute -bottom-5 sm:-bottom-7 -right-5 sm:-right-7 w-full h-full border border-black pointer-events-none z-0 hidden sm:block"
                aria-hidden="true"
              />

              {/* Main Preview Container */}
              <div className="relative z-10 bg-white border border-[#ded8ce] shadow-xl overflow-hidden group w-full">
                {/* Image Display: Generous Aspect Ratio showing full spacious architecture */}
                <div className="relative aspect-[16/10] w-full min-h-[360px] sm:min-h-[460px] lg:min-h-[500px] bg-neutral-900 overflow-hidden">
                  <div key={conceptImage} className="relative w-full h-full animate-smooth-crossfade">
                    <Image
                      src={conceptImage}
                      alt="Phối cảnh 3D không gian theo yêu cầu"
                      fill
                      unoptimized
                      className={`object-cover transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isLoading ? "scale-105 blur-sm opacity-50" : "scale-100 opacity-100"
                      }`}
                      sizes="(max-width: 1024px) 100vw, 750px"
                      priority
                    />
                  </div>

                  {/* High-Tech Luxury Scanline when generating */}
                  {isLoading && <div className="luxury-scanline z-30" />}

                  {/* Loading Overlay */}
                  {isLoading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/65 backdrop-blur-md p-6 text-center text-white animate-fade-in">
                      <div className="relative w-14 h-14 mb-4">
                        <div className="absolute inset-0 border-2 border-luxury-gold/30 rounded-full animate-ping" />
                        <div className="w-14 h-14 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
                      </div>
                      <p className="text-xs font-serif tracking-[0.25em] uppercase font-semibold text-luxury-gold mb-1.5 drop-shadow">
                        ĐANG KHỞI TẠO BẢN VẼ 3D...
                      </p>
                      <p className="text-xs text-neutral-300 font-light max-w-sm">
                        {loadingStepsText[loadingStep]}
                      </p>
                    </div>
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-black/75 backdrop-blur-sm text-white text-[10px] font-sans tracking-[0.2em] uppercase font-medium border border-white/20 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        PHỐI CẢNH 3D HOÀN THIỆN
                      </span>
                      <span className="hidden sm:inline-block px-2.5 py-1 bg-black/60 backdrop-blur-sm text-neutral-300 text-[10px] font-sans tracking-[0.15em] uppercase border border-white/10">
                        GÓC RỘNG TOÀN CẢNH 16MM
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-luxury-gold text-black text-[10px] font-sans tracking-[0.15em] uppercase font-bold shadow-sm">
                      {conceptMeta.area}
                    </span>
                  </div>

                  {/* Bottom Hover Action Overlay */}
                  {!isLoading && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
                      <button
                        type="button"
                        onClick={() => setLightboxOpen(true)}
                        className="px-4 py-2 bg-white/90 hover:bg-white text-black text-xs font-serif tracking-wider uppercase flex items-center gap-2 rounded shadow"
                      >
                        <Maximize2 className="w-3.5 h-3.5" /> Xem phóng to
                      </button>
                      <a
                        href={conceptImage}
                        download="d2luxury-3d-concept.jpg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-black/90 hover:bg-black text-white text-xs font-serif tracking-wider uppercase flex items-center gap-2 rounded shadow"
                      >
                        <Download className="w-3.5 h-3.5" /> Tải về
                      </a>
                    </div>
                  )}
                </div>

                {/* Concept Information Footer */}
                <div className="p-5 bg-white border-t border-[#ded8ce] space-y-4">
                  <div className="space-y-1.5 text-xs font-serif">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-neutral-500">Màu sắc: </span>
                        <strong className="text-black font-medium">{conceptMeta.colorRequirements}</strong>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-700 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Render 8K</span>
                      </div>
                    </div>
                  </div>

                  {/* Consultation Lead Box */}
                  <div className="pt-3 border-t border-[#f0ebe3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-xs text-neutral-600 font-serif italic">
                      Ưng ý với ý tưởng này? Hãy để D2 Luxury hiện thực hóa thành bản vẽ thi công thực tế.
                    </p>
                    <motion.a
                      href={siteConfig.zaloUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="whitespace-nowrap px-4 py-2.5 bg-[#ede9e3] hover:bg-black text-black hover:text-white border border-[#ded8ce] hover:border-black text-[11px] font-serif uppercase tracking-[0.2em] font-semibold transition-colors duration-300 shadow-sm"
                    >
                      NHẬN BÁO GIÁ THEO MẪU
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-7xl max-h-[94vh] w-full h-[90vh] flex items-center justify-center">
            <Image
              src={conceptImage}
              alt="Phối cảnh 3D toàn cảnh phóng to"
              fill
              unoptimized
              className="object-contain"
            />
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-3 right-3 text-white bg-black/80 hover:bg-black px-5 py-2.5 text-xs font-sans tracking-widest uppercase border border-white/30 transition-colors shadow-lg"
            >
              ĐÓNG [ESC]
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

