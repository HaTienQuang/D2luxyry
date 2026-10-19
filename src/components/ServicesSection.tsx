"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 650);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 650);
  };

  const total = services.length;
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
      {/* Background Watermark 03 (So2.svg) with unified sizing & positioning */}
      <div className="absolute top-2 left-0 sm:left-4 w-[420px] sm:w-[520px] lg:w-[560px] h-[400px] sm:h-[500px] lg:h-[540px] opacity-85 pointer-events-none select-none z-0">
        <Image
          src="/decor/So2.svg"
          alt="Watermark 03"
          fill
          className="object-contain object-left-top"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading with subtle entrance */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-serif font-bold uppercase tracking-wider text-black">
            DỊCH VỤ CỦA CHÚNG TÔI
          </h2>
          <div className="w-24 sm:w-32 h-[2px] bg-black mx-auto mt-4 transition-all duration-500" />
        </div>

        {/* 3-Item Focus Carousel with Smooth Transitions */}
        <div
          className="relative w-full overflow-hidden select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop & Tablet Smooth 3-Item Layout */}
          <div className="hidden md:flex items-start justify-center gap-6 lg:gap-8 px-4">
            {/* Left Preview Slide */}
            <div
              onClick={prevSlide}
              className="w-[28%] lg:w-[27%] shrink-0 opacity-55 hover:opacity-80 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform hover:scale-[0.98] cursor-pointer text-center space-y-4"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-black/5 shadow-sm transform transition-transform duration-700">
                <Image
                  src={services[leftIndex].image}
                  alt={services[leftIndex].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="350px"
                />
              </div>
              <div className="space-y-2 transition-all duration-500">
                <h3 className="text-sm sm:text-base font-serif font-bold text-black uppercase">
                  {services[leftIndex].title}
                </h3>
                <p className="text-xs text-gray-600 font-serif font-light leading-relaxed line-clamp-2 px-2">
                  {services[leftIndex].description}
                </p>
              </div>
            </div>

            {/* Left Navigation Arrow */}
            <div className="self-center -mt-16 z-20">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-full hover:bg-black/5 text-black hover:scale-110 active:scale-95 transition-all duration-300"
                aria-label="Previous Service"
              >
                <ChevronLeft className="w-8 h-8 stroke-[1.4]" />
              </button>
            </div>

            {/* Center Active Slide with Smooth Scaling & Shadow */}
            <div className="w-[44%] lg:w-[42%] shrink-0 text-center space-y-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-black/5 shadow-lg group">
                <Image
                  key={services[activeIndex].image}
                  src={services[activeIndex].image}
                  alt={services[activeIndex].title}
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="650px"
                />
              </div>
              <div className="space-y-3 pt-1 transition-all duration-500">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-black uppercase tracking-wide">
                  {services[activeIndex].title}
                </h3>
                <div className="w-16 h-[1.5px] bg-gray-400 mx-auto" />
                <p className="text-sm sm:text-[15.5px] text-neutral-800 font-serif font-light leading-[1.85] max-w-xl mx-auto transition-opacity duration-500">
                  {services[activeIndex].description}
                </p>
                <div className="pt-2">
                  <Link
                    href={services[activeIndex].href}
                    className="inline-block px-7 py-2.5 bg-black hover:bg-[#222] text-white text-xs font-serif uppercase tracking-[0.18em] transition-all duration-300 hover:shadow-md"
                  >
                    TÌM HIỂU THÊM
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Navigation Arrow */}
            <div className="self-center -mt-16 z-20">
              <button
                onClick={nextSlide}
                className="p-2.5 rounded-full hover:bg-black/5 text-black hover:scale-110 active:scale-95 transition-all duration-300"
                aria-label="Next Service"
              >
                <ChevronRight className="w-8 h-8 stroke-[1.4]" />
              </button>
            </div>

            {/* Right Preview Slide */}
            <div
              onClick={nextSlide}
              className="w-[28%] lg:w-[27%] shrink-0 opacity-55 hover:opacity-80 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform hover:scale-[0.98] cursor-pointer text-center space-y-4"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-black/5 shadow-sm transform transition-transform duration-700">
                <Image
                  src={services[rightIndex].image}
                  alt={services[rightIndex].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="350px"
                />
              </div>
              <div className="space-y-2 transition-all duration-500">
                <h3 className="text-sm sm:text-base font-serif font-bold text-black uppercase">
                  {services[rightIndex].title}
                </h3>
                <p className="text-xs text-gray-600 font-serif font-light leading-relaxed line-clamp-2 px-2">
                  {services[rightIndex].description}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Single Slide with Smooth Swipe */}
          <div className="md:hidden space-y-4 px-2">
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-black/5 shadow-sm">
              <Image
                key={services[activeIndex].image}
                src={services[activeIndex].image}
                alt={services[activeIndex].title}
                fill
                className="object-cover transition-transform duration-500"
                sizes="100vw"
              />
              {/* Arrows inside image on mobile */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white transition-colors"
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
