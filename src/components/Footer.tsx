'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FacebookFilled,
  InstagramOutlined,
  YoutubeFilled,
  TikTokOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { FOOTER_DATA } from '@/data/landingData';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#1A1613] text-stone-300 pt-14 sm:pt-20 pb-8 sm:pb-10 border-t border-[#2C241E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-16 border-b border-[#2C241E]">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="#hero" className="inline-flex items-center group">
              <div className="bg-white/95 px-4 py-2.5 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/logo.png"
                  alt="D'Luxury Design Logo"
                  width={200}
                  height={160}
                  className="h-14 sm:h-16 w-auto object-contain mix-blend-multiply"
                />
              </div>
            </Link>

            <p className="text-sm text-[#A89F95] leading-relaxed max-w-sm">
              {FOOTER_DATA.slogan} Đồng hành cùng bạn kiến tạo những không gian sống đẳng cấp, tiện nghi và trường tồn cùng thời gian.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#28221D] flex items-center justify-center text-stone-300 hover:bg-[#8A4F2C] hover:text-white transition-all"
                aria-label="Facebook"
              >
                <FacebookFilled className="text-base" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#28221D] flex items-center justify-center text-stone-300 hover:bg-[#8A4F2C] hover:text-white transition-all"
                aria-label="Instagram"
              >
                <InstagramOutlined className="text-base" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#28221D] flex items-center justify-center text-stone-300 hover:bg-[#8A4F2C] hover:text-white transition-all"
                aria-label="YouTube"
              >
                <YoutubeFilled className="text-base" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#28221D] flex items-center justify-center text-stone-300 hover:bg-[#8A4F2C] hover:text-white transition-all"
                aria-label="TikTok"
              >
                <TikTokOutlined className="text-base" />
              </a>
            </div>
          </div>

          {/* Quick Links: Về D'Luxury Design */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Về D&apos;Luxury</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" className="hover:text-[#D5BEA8] transition-colors">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D5BEA8] transition-colors">
                  Đội ngũ kiến trúc sư
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#D5BEA8] transition-colors">
                  Dự án thực tế
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#D5BEA8] transition-colors">
                  Quy trình làm việc
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#D5BEA8] transition-colors">
                  Khách hàng đánh giá
                </a>
              </li>
            </ul>
          </div>

          {/* Dịch vụ */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dịch vụ</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="hover:text-[#D5BEA8] transition-colors">
                  Thiết kế nội thất cao cấp
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D5BEA8] transition-colors">
                  Thi công nội thất trọn gói
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D5BEA8] transition-colors">
                  Sản xuất nội thất theo yêu cầu
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D5BEA8] transition-colors">
                  Cải tạo và nâng cấp không gian
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D5BEA8] transition-colors">
                  Tư vấn phong thủy nhà ở
                </a>
              </li>
            </ul>
          </div>

          {/* Liên hệ & QR Code */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Thông tin liên hệ
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <EnvironmentOutlined className="text-[#8A4F2C] mt-1 shrink-0 text-base" />
                <span className="text-stone-300">{FOOTER_DATA.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneOutlined className="text-[#8A4F2C] shrink-0 text-base" />
                <a
                  href={`tel:${FOOTER_DATA.hotline.replace(/\s+/g, '')}`}
                  className="text-stone-300 hover:text-white font-semibold"
                >
                  {FOOTER_DATA.hotline}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailOutlined className="text-[#8A4F2C] shrink-0 text-base" />
                <a
                  href={`mailto:${FOOTER_DATA.email}`}
                  className="text-stone-300 hover:text-white"
                >
                  {FOOTER_DATA.email}
                </a>
              </li>
            </ul>

            {/* QR Code section */}
            <a
              href="https://zalo.me/0967323335"
              target="_blank"
              rel="noreferrer"
              className="pt-2 flex items-center gap-3 bg-[#241E1A] hover:bg-[#2C241E] p-3 rounded-xl border border-white/5 hover:border-[#8A4F2C]/40 transition-all duration-300 group cursor-pointer block"
            >
              <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center shrink-0 overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/zalo-qr.png"
                  alt="Mã QR Zalo D'Luxury Design"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-xs text-[#A89F95]">
                <span className="font-semibold text-white group-hover:text-[#D5BEA8] transition-colors block text-sm">
                  Quét mã Zalo
                </span>
                <span className="text-[12px] text-stone-400">Kết nối tư vấn 24/7 (0967.323.335)</span>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-4">
          <p>{FOOTER_DATA.copyright}</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-stone-300 transition-colors">
              Chính sách bảo mật
            </a>
            <span className="text-[#3D352E]">&bull;</span>
            <a href="#" className="hover:text-stone-300 transition-colors">
              Điều khoản sử dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
