"use client";

import React from "react";
import Image from "next/image";
import { pressArticles } from "@/data/siteData";
import { motion } from "framer-motion";

export default function PressSection() {
  return (
    <section
      id="sec-baochi"
      className="relative w-full py-16 sm:py-24 bg-[#f4f0ec] text-black overflow-hidden border-t border-[#eae3d9]"
    >
      {/* Background Watermark 05 (So5.svg) refined sizing to prevent clipping & overflow */}
      <div className="absolute top-1 sm:top-2 left-0 sm:left-4 lg:left-8 w-[170px] sm:w-[220px] lg:w-[270px] h-[140px] sm:h-[180px] lg:h-[220px] opacity-70 pointer-events-none select-none z-0">
        <Image
          src="/decor/So5.svg"
          alt="Watermark 05"
          fill
          className="object-contain object-left-top"
        />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12 space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-bold uppercase tracking-wider text-black">
            Báo chí
          </h2>
          <div className="w-20 h-[2px] bg-black" />
          <p className="text-sm sm:text-[14.5px] text-[#222] font-serif leading-[1.8] font-light">
            D2 Luxury mong muốn mang đến cho khách hàng những bản thiết kế mãn nhãn, những công trình đẳng cấp và sự chuyên nghiệp, tận tâm trong quy cách phục vụ. Đó cũng chính là những điều D2 Luxury luôn tâm niệm trong suốt hành trình hơn 10 năm làm nghề của mình.
          </p>
        </motion.div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pressArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
