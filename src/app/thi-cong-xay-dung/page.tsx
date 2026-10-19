"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import ZaloModal from "@/components/ZaloModal";
import { siteConfig } from "@/data/siteData";
import { ArrowRight, CheckCircle2, Hammer, HardHat, Phone, ShieldCheck, Warehouse } from "lucide-react";

export default function ConstructionServicePage() {
  const [isZaloModalOpen, setIsZaloModalOpen] = useState(false);

  const constructionSteps = [
    { step: "01", title: "Khảo sát & Lập biện pháp thi công", desc: "Đo đạc hiện trạng địa chất, lập hồ sơ biện pháp thi công và tiến độ chi tiết từng giai đoạn." },
    { step: "02", title: "Thi công kết cấu phần thô", desc: "Ép cọc, đào móng, đổ bê tông cốt thép móng, dầm, sàn cột theo đúng tiêu chuẩn kỹ thuật nghiêm ngặt." },
    { step: "03", title: "Thi công xây tô & Chống thấm", desc: "Xây tường ngăn, trát phẳng mác cao, thi công chống thấm nhiều lớp bằng vật liệu cao cấp." },
    { step: "04", title: "Lắp đặt hệ thống cơ điện (M&E)", desc: "Đi âm ống luồn dây điện, hệ thống cấp thoát nước, điều hòa âm trần và mạng thông minh." },
    { step: "05", title: "Hoàn thiện ốp lát & Sơn nước", desc: "Ốp lát đá tự nhiên/gạch khổ lớn chuẩn milimet, sơn nước cao cấp bóng mịn và trần thạch cao giật cấp." },
    { step: "06", title: "Nghiệm thu & Bàn giao chìa khóa", desc: "Kiểm tra toàn diện, vệ sinh công nghiệp và bàn giao chìa khóa trao tay kèm biên bản bảo hành dài hạn." },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#f4f0ec] text-black">
      <Header onOpenZalo={() => setIsZaloModalOpen(true)} />

      {/* Hero Banner matching synchronized style */}
      <section className="relative w-full h-[52vh] min-h-[460px] sm:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Construction site image with natural illumination */}
        <div className="absolute inset-0">
          <Image
            src="/projects/cong-trinh-thuc-te-tai-tp-hcm/main.jpg"
            alt="Thi công xây dựng D2 Luxury"
            fill
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
            priority
          />
          {/* Refined translucent overlay: gentle dark tint keeping architecture luminous and clear */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/30" />
        </div>

        {/* Centered Content */}
        <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-24 pb-8 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-serif font-bold uppercase tracking-[0.2em] text-white drop-shadow-md leading-tight">
            THI CÔNG XÂY DỰNG
          </h1>
          <div className="w-20 sm:w-28 h-[2px] bg-white/80 mx-auto mt-4 mb-5" />
          <p className="max-w-2xl sm:max-w-3xl mx-auto text-xs sm:text-[13px] md:text-[14px] font-serif uppercase tracking-[0.08em] text-white/95 leading-relaxed font-normal drop-shadow">
            TỔNG THẦU THI CÔNG XÂY DỰNG TRỌN GÓI BIỆT THỰ, DINH THỰ, NHÀ PHỐ CAO CẤP VỚI HƠN 14 NĂM KINH NGHIỆM VÀ TIÊU CHUẨN KỸ THUẬT HÀNG ĐẦU.
          </p>

          {/* Circular Scroll Down Button matching Roll.svg */}
          <div className="mt-7 sm:mt-9">
            <a
              href="#content"
              className="inline-flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-85 hover:opacity-100"
              aria-label="Cuộn xuống nội dung thi công"
            >
              <Image
                src="/Roll.svg"
                alt="Cuộn xuống"
                width={42}
                height={42}
                className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="content" className="py-16 sm:py-24 bg-white text-black border-b border-[#eae3d9] scroll-mt-20">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-luxury-gold text-xs uppercase tracking-[0.25em] font-sans font-semibold block mb-2">
                  CHUẨN MỰC CHẤT LƯỢNG
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold uppercase tracking-wider text-black leading-tight">
                  MỖI CÔNG TRÌNH LÀ MỘT TUYỆT TÁC TRƯỜNG TỒN
                </h2>
                <div className="w-20 h-[1.5px] bg-black mt-3 mb-6" />
              </div>

              <div className="text-sm sm:text-[15.5px] text-neutral-700 font-serif leading-[1.9] font-light space-y-4">
                <p>
                  Thi công xây dựng là khâu hiện thực hóa những ý tưởng từ trang bản vẽ thành công trình thực tế vững chắc. D2 Luxury sở hữu đội ngũ hơn 200 thợ tay nghề cao, 20 kỹ sư giám sát và chỉ huy trưởng giàu kinh nghiệm, đảm bảo an toàn lao động, tiến độ và chất lượng kết cấu bền vững hàng chục năm.
                </p>
                <p>
                  Chúng tôi cam kết sử dụng vật liệu xây dựng chính hãng loại 1, quy trình quản lý chất lượng nghiêm ngặt và đồng hành cùng gia chủ từ khi đặt viên gạch đầu tiên đến khi bàn giao công trình hoàn thiện.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs sm:text-sm font-serif">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                  <span>Bảo hành kết cấu 10 năm</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardHat className="w-4 h-4 text-luxury-gold" />
                  <span>Giám sát 24/7 tại công trường</span>
                </div>
                <div className="flex items-center gap-2">
                  <Warehouse className="w-4 h-4 text-luxury-gold" />
                  <span>Vật tư chuẩn mác chính hãng</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hammer className="w-4 h-4 text-luxury-gold" />
                  <span>Cam kết đúng tiến độ 100%</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl bg-neutral-100">
                <Image
                  src="/projects/thi-cong-thuc-te-tai-villa-vinhomes-ocean-park/photo-1.jpg"
                  alt="Thi công thực tế D2 Luxury"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-24 bg-[#f4f0ec] text-black border-b border-[#eae3d9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-luxury-gold text-xs uppercase tracking-[0.25em] font-sans font-semibold block mb-2">
              QUY TRÌNH CHUẨN MỰC
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold uppercase tracking-wider text-black">
              QUY TRÌNH 6 BƯỚC THI CÔNG XÂY DỰNG
            </h2>
            <div className="w-24 h-[1.5px] bg-black mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {constructionSteps.map((item, idx) => (
              <div key={idx} className="bg-white border border-[#ded8ce] p-8 space-y-4 shadow-sm hover:shadow-xl transition-all duration-300">
                <span className="text-3xl font-serif font-bold text-luxury-gold block">
                  {item.step}
                </span>
                <h3 className="text-lg font-serif font-bold uppercase tracking-wider text-black">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-serif text-neutral-600 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-[#f4f0ec] text-black text-center border-t border-[#ded8ce]">
        <div className="max-w-3xl mx-auto px-4 space-y-5">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold uppercase tracking-wider text-black">
            BẮT ĐẦU DỰ ÁN CÙNG D2 LUXURY
          </h2>
          <p className="text-sm font-serif text-neutral-600 font-light">
            Liên hệ để nhận dự toán chi tiết và phương án thi công tối ưu cho ngôi nhà của bạn.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#sec-tuvan"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white text-xs font-serif font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-all shadow-md"
            >
              <span>NHẬN BÁO GIÁ THI CÔNG</span>
              <ArrowRight className="w-4 h-4 text-luxury-gold" />
            </Link>
            <a
              href={`tel:${siteConfig.hotline}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-black text-black text-xs font-serif font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>HOTLINE: {siteConfig.phone1}</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWidgets onOpenZalo={() => setIsZaloModalOpen(true)} />
      <ZaloModal isOpen={isZaloModalOpen} onClose={() => setIsZaloModalOpen(false)} />
    </main>
  );
}

