'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Drawer } from 'antd';
import { ArrowRightOutlined, MenuOutlined, PhoneOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Trang chủ', href: '#hero' },
    { label: 'Giới thiệu', href: '#about' },
    { label: 'Dịch vụ', href: '#services' },
    { label: 'AI Studio', href: '#ai-studio' },
    { label: 'Dự án', href: '#projects' },
    { label: 'Quy trình', href: '#process' },
    { label: 'Đánh giá', href: '#testimonials' },
    { label: 'Liên hệ', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2 border-b border-[#EFE8DF]'
          : 'bg-[#FAF8F5]/90 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none py-2.5 sm:py-3 border-b border-[#EFE8DF]/50 sm:border-none'
      }`}
    >
      <div className="max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="flex items-center group py-0.5">
          <div className="relative h-13 sm:h-18 lg:h-20 flex items-center group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/logo.png"
              alt="D2 Luxury Design Logo"
              width={260}
              height={180}
              priority
              className="h-12 sm:h-16 lg:h-18 w-auto object-contain drop-shadow-sm"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[16px] lg:text-[17px] font-semibold text-[#3D3835] hover:text-[#8A4F2C] transition-colors duration-200 relative py-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2.5px] after:bg-[#8A4F2C] hover:after:w-full after:transition-all after:duration-300 tracking-tight"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined className="!text-xs !text-white transition-transform group-hover:translate-x-1" />}
            iconPosition="end"
            onClick={onOpenConsultation}
            className="!font-bold !px-7 !h-12 !text-[15px] sm:!text-[16px] group !text-white shadow-md"
          >
            Nhận tư vấn
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2.5">
          <a
            href="tel:0967323335"
            className="w-11 h-11 rounded-full bg-[#8A4F2C] text-white flex items-center justify-center text-base shadow-md"
            aria-label="Gọi hotline"
          >
            <PhoneOutlined />
          </a>
          <Button
            type="default"
            shape="circle"
            icon={<MenuOutlined className="text-lg text-[#5C311C]" />}
            onClick={() => setMobileDrawerOpen(true)}
            className="!border-[#D5BEA8] !h-11 !w-11 !flex !items-center !justify-center"
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="D2 Luxury Design Logo"
              width={180}
              height={70}
              className="h-12 w-auto object-contain"
            />
          </div>
        }
        placement="right"
        onClose={() => setMobileDrawerOpen(false)}
        open={mobileDrawerOpen}
        styles={{ body: { padding: '20px 16px' } }}
      >
        <div className="flex flex-col space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileDrawerOpen(false)}
              className="text-[15px] font-medium text-[#2D2824] hover:text-[#8A4F2C] py-2.5 border-b border-[#F0EBE3] transition-colors flex items-center justify-between"
            >
              <span>{link.label}</span>
              <ArrowRightOutlined className="text-xs text-stone-400" />
            </a>
          ))}

          <div className="pt-4 flex flex-col gap-3">
            <Button
              type="primary"
              block
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={() => {
                setMobileDrawerOpen(false);
                onOpenConsultation();
              }}
              className="!h-12 !rounded-full !text-base !font-semibold !text-white shadow-md"
            >
              Nhận tư vấn miễn phí
            </Button>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href="tel:0967323335"
                className="flex items-center justify-center gap-1.5 text-xs text-[#733E22] bg-[#FAF8F5] border border-[#E8DFC0] font-semibold py-3 px-2 rounded-xl text-center"
              >
                <PhoneOutlined /> 0967 323 335
              </a>
              <a
                href="https://zalo.me/0967323335"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 text-xs text-[#8A4F2C] bg-[#FAF8F5] border border-[#E8DFC0] font-semibold py-3 px-2 rounded-xl text-center"
              >
                Chat Zalo tư vấn
              </a>
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
};
