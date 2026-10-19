"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceItem {
  id: string;
  title: string;
  image: string;
  description: string;
  href: string;
}

export default function ServicesSection() {
  const services: ServiceItem[] = [
    {
      id: "thiet-ke",
      title: "Thiết kế Kiến trúc – Nội thất",
      image: "/services/gallery-1.jpg",
      description:
        "Các nhà thiết kế của D2 Luxury tận dụng kỹ năng thiết kế và sức sáng tạo để tạo nên bản thiết kế 3D kiến trúc – nội thất, đáp ứng đồng thời về tính thẩm mỹ và công năng sử dụng. Mỗi không gian hứa hẹn mang đến trải nghiệm sống tuyệt hảo cho từng đối tượng khách hàng khác nhau.",
      href: "/thiet-ke-kien-truc",
    },
    {
      id: "thi-cong-xay-dung",
      title: "Thi công xây dựng",
      image: "/services/gallery-2.jpg",
      description:
        "Với đội ngũ thi công lành nghề, D2 Luxury sẽ góp phần đưa những ý tưởng thiết kế trên mặt giấy vào thực tế. Từ việc lập kế hoạch, tổ chức thi công theo bản vẽ đến khi bàn giao cho khách hàng, chúng tôi luôn luôn tuân thủ những tiêu chuẩn khắt khe nhằm mang đến những sản phẩm hoàn hảo nhất.",
      href: "/thi-cong-xay-dung",
    },
    {
      id: "thi-cong-noi-ngoai-that",
      title: "Thi công nội – ngoại thất",
      image: "/services/gallery-3.jpg",
      description:
        "Chăm chút tỉ mỉ đến từng chi tiết nhỏ nhất chính là kim chỉ nam cho đội ngũ sản xuất và thi công nội – ngoại thất của D2 Luxury. Ngoài ra, với thế mạnh là 2 nhà xưởng được trang bị máy móc hiện đại, chúng tôi tự tin kiểm soát tốt chất lượng sản phẩm, đáp ứng đúng nhu cầu của khách hàng và đảm bảo được tiến độ thi công.",
      href: "/thiet-ke-noi-that",
    },
    {
      id: "cai-tao",
      title: "Cải tạo nội – ngoại thất",
      image: "/services/gallery-4.jpg",
      description:
        "Những không gian tưởng chừng như đã cũ vẫn có thể biến hóa một cách ngoạn mục. Không chỉ mang đến diện mạo mới mẻ cho ngôi nhà của bạn, chúng tôi còn mang đến sự thoải mái, tiện nghi và niềm vui trong cuộc sống.",
      href: "/thi-cong-xay-dung",
    },
  ];

  const total = services.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const touchStartX = useRef<number | null>(null);

  const prevSlide = () => {
    setDirection("prev");
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection("next");
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const leftIndex = (activeIndex - 1 + total) % total;
  const rightIndex = (activeIndex + 1) % total;

  // Touch Swipe for mobile/trackpad
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    touchStartX.current = null;
  };

  return (
    <section
      id="sec-dichvu"
      className="relative w-full py-16 sm:py-24 bg-[#f4f0ec] text-black overflow-hidden border-t border-[#eae3d9]"
    >
      {/* Background Watermark 03 (So2.svg) */}
      <div className="absolute top-2 left-0 sm:left-4 w-[420px] sm:w-[520px] lg:w-[560px] h-[400px] sm:h-[500px] lg:h-[540px] opacity-85 pointer-events-none select-none z-0">
        <Image
          src="/decor/So2.svg"
          alt="Watermark 03"
          fill
          className="object-contain object-left-top"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Framer Motion Entrance */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl lg:text-[2.5rem] font-serif font-bold uppercase tracking-wider text-black"
          >
            DỊCH VỤ CỦA CHÚNG TÔI
          </motion.h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-[2px] bg-black mx-auto mt-4"
          />
        </div>

        {/* 3-Column Clean Side-by-Side Layout matching Original Layout + Smooth Motion Glide */}
        <div
          className="relative w-full overflow-hidden select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop & Tablet 3-Item Layout: Left 27%, Center 42%, Right 27% (No Overlap) */}
          <div className="hidden md:flex items-start justify-center gap-6 lg:gap-8 px-4">
            {/* Left Preview Slide with Push-in Entrance & Directional Slide */}
            <motion.div
              initial={{ opacity: 0, x: -75 }}
              whileInView={{ opacity: 0.55, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ opacity: 0.85, scale: 0.98 }}
              onClick={prevSlide}
              className="w-[28%] lg:w-[27%] shrink-0 cursor-pointer text-center space-y-4"
            >
              {/* Card Image Container with Directional Glide */}
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-black/5 shadow-sm">
                <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                  <motion.div
                    key={services[leftIndex].id}
                    custom={direction}
                    initial={{ x: direction === "next" ? 75 : -75, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction === "next" ? -75 : 75, opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={services[leftIndex].image}
                      alt={services[leftIndex].title}
                      fill
                      className="object-cover"
                      sizes="380px"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Left Slide Description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={services[leftIndex].id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <h3 className="text-sm sm:text-base font-serif font-bold text-black uppercase">
                    {services[leftIndex].title}
                  </h3>
                  <p className="text-xs text-gray-600 font-serif font-light leading-relaxed line-clamp-2 px-2">
                    {services[leftIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Left Navigation Arrow */}
            <div className="self-center -mt-16 z-20">
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                className="p-2.5 rounded-full hover:bg-black/5 text-black transition-colors cursor-pointer"
                aria-label="Previous Service"
              >
                <ChevronLeft className="w-8 h-8 stroke-[1.5]" />
              </motion.button>
            </div>

            {/* Center Active Slide with Scale & Full Focus */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="w-[44%] lg:w-[42%] shrink-0 text-center space-y-4"
            >
              {/* Card Image Container with Directional Glide */}
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-black/5 shadow-lg group">
                <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                  <motion.div
                    key={services[activeIndex].id}
                    custom={direction}
                    initial={{
                      x: direction === "next" ? 100 : -100,
                      opacity: 0,
                      scale: 0.96,
                    }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{
                      x: direction === "next" ? -100 : 100,
                      opacity: 0,
                      scale: 0.96,
                    }}
                    transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={services[activeIndex].image}
                      alt={services[activeIndex].title}
                      fill
                      priority
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      sizes="650px"
                    />

                    {/* Subtle Luxury Corner Tag on Center */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/75 backdrop-blur-sm text-luxury-gold text-[10px] font-sans tracking-[0.2em] uppercase font-semibold border border-white/10">
                      D2 LUXURY
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Center Active Slide Text Details with Smooth Crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={services[activeIndex].id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-3 pt-1"
                >
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-black uppercase tracking-wide">
                    {services[activeIndex].title}
                  </h3>
                  <div className="w-16 h-[1.5px] bg-gray-400 mx-auto" />
                  <p className="text-sm sm:text-[15.5px] text-neutral-800 font-serif font-light leading-[1.85] max-w-xl mx-auto">
                    {services[activeIndex].description}
                  </p>
                  <div className="pt-2">
                    <motion.div
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={services[activeIndex].href}
                        className="inline-block px-7 py-2.5 bg-black hover:bg-[#222] text-white text-xs font-serif uppercase tracking-[0.18em] transition-all duration-300 hover:shadow-md"
                      >
                        TÌM HIỂU THÊM
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right Navigation Arrow */}
            <div className="self-center -mt-16 z-20">
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                className="p-2.5 rounded-full hover:bg-black/5 text-black transition-colors cursor-pointer"
                aria-label="Next Service"
              >
                <ChevronRight className="w-8 h-8 stroke-[1.5]" />
              </motion.button>
            </div>

            {/* Right Preview Slide with Push-in Entrance & Directional Slide */}
            <motion.div
              initial={{ opacity: 0, x: 75 }}
              whileInView={{ opacity: 0.55, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ opacity: 0.85, scale: 0.98 }}
              onClick={nextSlide}
              className="w-[28%] lg:w-[27%] shrink-0 cursor-pointer text-center space-y-4"
            >
              {/* Card Image Container with Directional Glide */}
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-black/5 shadow-sm">
                <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                  <motion.div
                    key={services[rightIndex].id}
                    custom={direction}
                    initial={{ x: direction === "next" ? 75 : -75, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction === "next" ? -75 : 75, opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={services[rightIndex].image}
                      alt={services[rightIndex].title}
                      fill
                      className="object-cover"
                      sizes="380px"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Slide Description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={services[rightIndex].id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <h3 className="text-sm sm:text-base font-serif font-bold text-black uppercase">
                    {services[rightIndex].title}
                  </h3>
                  <p className="text-xs text-gray-600 font-serif font-light leading-relaxed line-clamp-2 px-2">
                    {services[rightIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile Single Slide with Smooth Swipe */}
          <div className="md:hidden space-y-4 px-2">
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-black/5 shadow-sm">
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.div
                  key={services[activeIndex].id}
                  custom={direction}
                  initial={{ x: direction === "next" ? 90 : -90, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction === "next" ? -90 : 90, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={services[activeIndex].image}
                    alt={services[activeIndex].title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Arrows inside image on mobile */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white transition-colors z-20"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white transition-colors z-20"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-serif font-bold text-black uppercase">
                {services[activeIndex].title}
              </h3>
              <p className="text-sm text-neutral-800 font-serif font-light leading-[1.8] px-2">
                {services[activeIndex].description}
              </p>
              <div className="pt-2">
                <Link
                  href={services[activeIndex].href}
                  className="inline-block px-6 py-2 bg-black hover:bg-[#222] text-white text-xs font-serif uppercase tracking-[0.16em] transition-all duration-300"
                >
                  TÌM HIỂU THÊM
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
