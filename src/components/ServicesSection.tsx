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
  const [slideDirection, setSlideDirection] = useState<"next" | "prev" | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Entrance animation: smoothly push in the side images on reload/load
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    if (isSliding) return;
    setIsSliding(true);
    setSlideDirection("next");

    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % total);
      setIsSliding(false);
      setSlideDirection(null);
    }, 620);
  };

  const prevSlide = () => {
    if (isSliding) return;
    setIsSliding(true);
    setSlideDirection("prev");

    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + total) % total);
      setIsSliding(false);
      setSlideDirection(null);
    }, 620);
  };

  // Touch swipe support
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

  // 5 slots centered on activeIndex: [-2, -1, 0, 1, 2]
  const slotIndices = [
    (activeIndex - 2 + total * 2) % total,
    (activeIndex - 1 + total * 2) % total,
    activeIndex,
    (activeIndex + 1) % total,
    (activeIndex + 2) % total,
  ];

  // Calculate track transform percentage
  // Slot 2 (center) is resting at index 2 (offset = -33.333333% in desktop 3-card view)
  const getDesktopTrackTransform = () => {
    if (slideDirection === "next") return "translateX(-40%)";
    if (slideDirection === "prev") return "translateX(0%)";
    return "translateX(-20%)";
  };

  const getMobileTrackTransform = () => {
    if (slideDirection === "next") return "translateX(-60%)";
    if (slideDirection === "prev") return "translateX(-20%)";
    return "translateX(-40%)";
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

        {/* 3-Card Continuous Horizontal Sliding Carousel */}
        <div
          className="relative w-full overflow-hidden select-none py-2"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop & Tablet Sliding Track View */}
          <div className="hidden md:block relative w-full overflow-hidden">
            {/* Sliding Track containing 5 continuous slots */}
            <div
              className={`flex items-start ${
                isSliding
                  ? "transition-transform duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  : "transition-none"
              }`}
              style={{
                width: "166.666667%",
                transform: getDesktopTrackTransform(),
              }}
            >
              {slotIndices.map((serviceIdx, slotPos) => {
                const item = services[serviceIdx];
                const isCenter = slotPos === 2;
                const isLeft = slotPos === 1;
                const isRight = slotPos === 3;

                // Dynamic scale & opacity calculation during active slide
                let isTargetCenter = isCenter;
                let isTargetSide = isLeft || isRight;

                if (slideDirection === "next") {
                  isTargetCenter = slotPos === 3;
                  isTargetSide = slotPos === 2 || slotPos === 4;
                } else if (slideDirection === "prev") {
                  isTargetCenter = slotPos === 1;
                  isTargetSide = slotPos === 0 || slotPos === 2;
                }

                // Initial reload push-in from 2 sides
                let pushInTransform = "";
                let pushInOpacity = "";
                if (!hasEntered) {
                  if (slotPos === 1) {
                    pushInTransform = "translateX(-65px)";
                    pushInOpacity = "opacity-0";
                  } else if (slotPos === 3) {
                    pushInTransform = "translateX(65px)";
                    pushInOpacity = "opacity-0";
                  } else if (slotPos === 2) {
                    pushInTransform = "scale(0.96)";
                    pushInOpacity = "opacity-75";
                  }
                }

                return (
                  <div
                    key={`${slotPos}-${serviceIdx}`}
                    onClick={() => {
                      if (isLeft) prevSlide();
                      if (isRight) nextSlide();
                    }}
                    className={`w-[20%] shrink-0 px-3 lg:px-4 text-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      !isCenter ? "cursor-pointer" : ""
                    } ${pushInOpacity}`}
                    style={{
                      transform: pushInTransform,
                    }}
                  >
                    {/* Card Image Container with Smooth Scaling */}
                    <div
                      className={`relative aspect-[3/2] w-full overflow-hidden bg-black/5 transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] group ${
                        isTargetCenter
                          ? "shadow-2xl scale-100 opacity-100 z-20"
                          : "shadow-sm scale-[0.84] opacity-55 hover:opacity-85 z-10"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 33vw, 480px"
                        priority={isCenter}
                      />
                    </div>

                    {/* Text Details below the Card */}
                    {isCenter ? (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeIndex}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="pt-3 space-y-2.5 opacity-100 max-w-lg mx-auto"
                        >
                          <h3 className="font-serif font-bold text-black uppercase text-lg sm:text-xl lg:text-2xl tracking-wide pt-1">
                            {item.title}
                          </h3>

                          <div className="w-16 h-[1.5px] bg-gray-400 mx-auto my-2" />

                          <p className="font-serif font-light text-neutral-800 text-sm sm:text-[15.5px] leading-[1.85] line-clamp-3 px-2">
                            {item.description}
                          </p>

                          <div className="pt-2">
                            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
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
                      <div className="transition-all duration-500 pt-3 space-y-2 opacity-60 max-w-xs mx-auto">
                        <h3 className="font-serif font-bold text-black uppercase text-xs sm:text-sm tracking-normal">
                          {item.title}
                        </h3>
                        <p className="font-serif font-light text-gray-600 text-xs line-clamp-2 px-1">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Left Stationary Navigation Arrow with Motion */}
            <motion.button
              onClick={prevSlide}
              disabled={isSliding}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              className="absolute left-[24%] lg:left-[25%] top-[120px] sm:top-[140px] lg:top-[160px] -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/75 hover:bg-white text-black shadow-md hover:shadow-lg transition-colors disabled:opacity-50 cursor-pointer"
              aria-label="Dịch vụ trước"
            >
              <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.6]" />
            </motion.button>

            {/* Right Stationary Navigation Arrow with Motion */}
            <motion.button
              onClick={nextSlide}
              disabled={isSliding}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              className="absolute right-[24%] lg:right-[25%] top-[120px] sm:top-[140px] lg:top-[160px] -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/75 hover:bg-white text-black shadow-md hover:shadow-lg transition-colors disabled:opacity-50 cursor-pointer"
              aria-label="Dịch vụ tiếp theo"
            >
              <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.6]" />
            </motion.button>
          </div>

          {/* Mobile Sliding View */}
          <div className="md:hidden relative w-full overflow-hidden">
            <div
              className={`flex items-start ${
                isSliding
                  ? "transition-transform duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  : "transition-none"
              }`}
              style={{
                width: "500%",
                transform: getMobileTrackTransform(),
              }}
            >
              {slotIndices.map((serviceIdx, slotPos) => {
                const item = services[serviceIdx];
                const isCenter = slotPos === 2;
                return (
                  <div
                    key={`mobile-${slotPos}-${serviceIdx}`}
                    className="w-[20%] shrink-0 px-2 text-center space-y-3"
                  >
                    <div className="relative aspect-[3/2] w-full overflow-hidden bg-black/5 shadow-md">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority={isCenter}
                      />
                    </div>
                    <div className="space-y-2 px-2">
                      <h3 className="text-lg font-serif font-bold text-black uppercase">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-800 font-serif font-light leading-[1.8] line-clamp-3">
                        {item.description}
                      </p>
                      {isCenter && (
                        <div className="pt-2">
                          <Link
                            href={item.href}
                            className="inline-block px-6 py-2 bg-black hover:bg-[#222] text-white text-xs font-serif uppercase tracking-[0.16em] transition-all duration-300"
                          >
                            TÌM HIỂU THÊM
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Navigation Arrows */}
            <button
              onClick={prevSlide}
              disabled={isSliding}
              className="absolute left-1 top-[110px] -translate-y-1/2 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors z-20"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={isSliding}
              className="absolute right-1 top-[110px] -translate-y-1/2 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors z-20"
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
