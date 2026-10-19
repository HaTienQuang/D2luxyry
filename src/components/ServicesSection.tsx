"use client";

import React, { useState, useRef, useEffect } from "react";
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
  const [hasEntered, setHasEntered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Entrance animation: smoothly push in the side images on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setDirection("next");
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setDirection("prev");
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) nextSlide();
    if (diff < -45) prevSlide();
    touchStartX.current = null;
  };

  // Calculate normalized relative offset from activeIndex for each item
  const getOffset = (idx: number) => {
    let diff = idx - activeIndex;
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;
    return diff;
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

        {/* 3D Flip & Coverflow Stage Carousel */}
        <div
          className="relative w-full select-none py-2"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop & Tablet 3D Perspective Stage */}
          <div
            className="hidden md:block relative w-full h-[520px] sm:h-[560px] lg:h-[600px] overflow-hidden"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "center 42%",
              transformStyle: "preserve-3d",
            }}
          >
            {services.map((item, idx) => {
              const offset = getOffset(idx);
              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isHidden = Math.abs(offset) >= 2;

              // Compute 3D Flip and Glide coordinates
              let targetX = "0%";
              let targetRotateY = 0;
              let targetScale = 1;
              let targetZ = 100;
              let targetOpacity = 1;
              let targetBrightness = "brightness(1)";

              if (isLeft) {
                targetX = "-72%";
                targetRotateY = 24; // Flipped in 3D facing inward
                targetScale = 0.83;
                targetZ = 20;
                targetOpacity = 0.62;
                targetBrightness = "brightness(0.88)";
              } else if (isRight) {
                targetX = "72%";
                targetRotateY = -24; // Flipped in 3D facing inward
                targetScale = 0.83;
                targetZ = 20;
                targetOpacity = 0.62;
                targetBrightness = "brightness(0.88)";
              } else if (isHidden) {
                targetX = offset > 0 ? "130%" : "-130%";
                targetRotateY = offset > 0 ? -40 : 40;
                targetScale = 0.6;
                targetZ = 0;
                targetOpacity = 0;
                targetBrightness = "brightness(0.7)";
              }

              // Initial push-in coordinates before enter
              let initialX = targetX;
              let initialOpacity = targetOpacity;
              if (!hasEntered) {
                if (isLeft) {
                  initialX = "-105%";
                  initialOpacity = 0;
                } else if (isRight) {
                  initialX = "105%";
                  initialOpacity = 0;
                } else if (isCenter) {
                  initialOpacity = 0.6;
                }
              }

              return (
                <motion.div
                  key={item.id}
                  initial={{
                    x: initialX,
                    rotateY: targetRotateY,
                    scale: targetScale,
                    opacity: initialOpacity,
                  }}
                  animate={{
                    x: targetX,
                    rotateY: targetRotateY,
                    scale: targetScale,
                    opacity: targetOpacity,
                    zIndex: targetZ,
                    filter: targetBrightness,
                  }}
                  transition={{
                    duration: 0.72,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={
                    !isCenter && !isHidden
                      ? {
                          scale: 0.86,
                          opacity: 0.88,
                          rotateY: isLeft ? 16 : -16,
                          filter: "brightness(0.96)",
                          transition: { duration: 0.3 },
                        }
                      : {}
                  }
                  onClick={() => {
                    if (isLeft) prevSlide();
                    if (isRight) nextSlide();
                  }}
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-[42%] lg:w-[40%] text-center ${
                    !isCenter && !isHidden ? "cursor-pointer" : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                  }}
                >
                  {/* Card Image Container with 3D Depth Shadow */}
                  <div
                    className={`relative aspect-[3/2] w-full overflow-hidden bg-black/5 rounded-sm transition-shadow duration-700 ${
                      isCenter
                        ? "shadow-[0_20px_50px_rgba(0,0,0,0.22)] ring-1 ring-black/5"
                        : "shadow-md hover:shadow-xl"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                      sizes="(max-width: 1024px) 45vw, 600px"
                      priority={isCenter}
                    />

                    {/* Subtle Luxury Corner Tag on Center */}
                    {isCenter && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/75 backdrop-blur-sm text-luxury-gold text-[10px] font-sans tracking-[0.2em] uppercase font-semibold border border-white/10">
                        D2 LUXURY
                      </div>
                    )}
                  </div>

                  {/* Card Information & Typography */}
                  {isCenter ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="pt-4 space-y-2.5 max-w-lg mx-auto"
                      >
                        <h3 className="font-serif font-bold text-black uppercase text-lg sm:text-xl lg:text-2xl tracking-wide pt-1">
                          {item.title}
                        </h3>

                        <div className="w-16 h-[1.5px] bg-neutral-400 mx-auto my-2" />

                        <p className="font-serif font-light text-neutral-800 text-sm sm:text-[15.5px] leading-[1.85] line-clamp-3 px-2">
                          {item.description}
                        </p>

                        <div className="pt-2">
                          <motion.div
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Link
                              href={item.href}
                              className="inline-block px-7 py-2.5 bg-black hover:bg-[#222] text-white text-xs font-serif uppercase tracking-[0.18em] transition-all duration-300 hover:shadow-md"
                            >
                              TÌM HIỂU THÊM
                            </Link>
                          </motion.div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <div className="pt-3 space-y-2 max-w-xs mx-auto transition-opacity duration-300">
                      <h3 className="font-serif font-bold text-black uppercase text-xs sm:text-sm tracking-normal">
                        {item.title}
                      </h3>
                      <p className="font-serif font-light text-neutral-600 text-xs line-clamp-2 px-1">
                        {item.description}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Left Circular Navigation Arrow matching screenshot */}
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.15, x: -2 }}
              whileTap={{ scale: 0.92 }}
              className="absolute left-[26%] lg:left-[27%] top-[140px] sm:top-[160px] lg:top-[180px] -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white text-black shadow-[0_4px_16px_rgba(0,0,0,0.18)] hover:shadow-xl flex items-center justify-center border border-black/5 hover:border-black/20 transition-colors cursor-pointer"
              aria-label="Dịch vụ trước"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2]" />
            </motion.button>

            {/* Right Circular Navigation Arrow matching screenshot */}
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.15, x: 2 }}
              whileTap={{ scale: 0.92 }}
              className="absolute right-[26%] lg:right-[27%] top-[140px] sm:top-[160px] lg:top-[180px] -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white text-black shadow-[0_4px_16px_rgba(0,0,0,0.18)] hover:shadow-xl flex items-center justify-center border border-black/5 hover:border-black/20 transition-colors cursor-pointer"
              aria-label="Dịch vụ tiếp theo"
            >
              <ChevronRight className="w-6 h-6 stroke-[2]" />
            </motion.button>
          </div>

          {/* Mobile Fluid Slider */}
          <div className="md:hidden relative w-full overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{
                  opacity: 0,
                  x: direction === "next" ? 80 : -80,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: direction === "next" ? -80 : 80,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full text-center space-y-3 px-2"
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-black/5 shadow-md rounded-sm">
                  <Image
                    src={services[activeIndex].image}
                    alt={services[activeIndex].title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                </div>
                <div className="space-y-2 px-2">
                  <h3 className="text-lg font-serif font-bold text-black uppercase">
                    {services[activeIndex].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-800 font-serif font-light leading-[1.8] line-clamp-3">
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
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-[110px] -translate-y-1/2 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors z-20"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-[110px] -translate-y-1/2 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors z-20"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
