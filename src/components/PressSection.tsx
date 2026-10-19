"use client";

import React from "react";
import Image from "next/image";
import { pressArticles } from "@/data/siteData";

export default function PressSection() {
  return (
    <section
      id="sec-baochi"
      className="relative w-full py-16 sm:py-24 bg-[#f4f0ec] text-black overflow-hidden border-t border-[#eae3d9]"
    >
      {/* Background Watermark 05 (So5.svg) */}
      <div className="absolute top-4 left-0 w-[420px] sm:w-[560px] h-[400px] sm:h-[520px] opacity-80 pointer-events-none select-none z-0">
        <Image
          src="/decor/So5.svg"
          alt="Watermark 05"
          fill
          className="object-contain object-left-top"
        />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading & Intro */}
        <div className="max-w-2xl mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-bold uppercase tracking-wider text-black">
            Báo chí
          </h2>
          <div className="w-20 h-[2px] bg-black" />
          <p className="text-sm sm:text-[14.5px] text-[#222] font-serif leading-[1.8] font-light">
            D2 Luxury mong muốn mang đến cho khách hàng những bản thiết kế mãn nhãn, những công trình đẳng cấp và sự chuyên nghiệp, tận tâm trong quy cách phục vụ. Đó cũng chính là những điều D2 Luxury luôn tâm niệm trong suốt hành trình hơn 10 năm làm nghề của mình.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pressArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest font-mono text-gray-500 font-medium block">
                    {article.publisher} | {article.date}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-black group-hover:underline leading-snug">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                    </a>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#444] font-serif font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs uppercase font-serif tracking-widest text-black underline hover:opacity-70 transition-opacity font-medium pt-2"
                >
                  Xem chi tiết bài báo →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
