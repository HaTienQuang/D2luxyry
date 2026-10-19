"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import ZaloModal from "@/components/ZaloModal";
import { siteConfig } from "@/data/siteData";
import { ArrowRight, CheckCircle2, Factory, HardHat, Heart, Phone, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [isZaloModalOpen, setIsZaloModalOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-[#f4f0ec] text-black">
      {/* Fixed Sticky Header */}
      <Header onOpenZalo={() => setIsZaloModalOpen(true)} />

      {/* Hero Banner matching Lendecor Image 1 */}
      <section className="relative w-full h-[52vh] min-h-[460px] sm:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Living room image with natural illumination */}
        <div className="absolute inset-0">
          <Image
            src="/hero/about-living-original.webp"
            alt="Về chúng tôi - D2 Luxury"
            fill
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
            priority
          />
          {/* Refined translucent overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/30" />
        </div>

        {/* Centered Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-24 pb-8 flex flex-col items-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-serif font-bold uppercase tracking-[0.2em] text-white drop-shadow-md leading-tight">
            VỀ CHÚNG TÔI
          </h1>
          <div className="w-20 sm:w-28 h-[2px] bg-white/80 mx-auto mt-4 mb-5" />
          <p className="max-w-2xl sm:max-w-3xl mx-auto text-xs sm:text-[13px] md:text-[14px] font-serif uppercase tracking-[0.08em] text-white/95 leading-relaxed font-normal drop-shadow">
            BỀN BỈ THEO ĐUỔI &ldquo;BỔN PHẬN ẤM ÊM&rdquo;, D2 LUXURY Ở ĐÂY ĐỂ GIÚP BẠN TẠO NÊN NHỮNG KHÔNG GIAN THOẢI MÁI VÀ HẠNH PHÚC, LÀ &ldquo;CHỐN MONG VỀ&rdquo; VÀ &ldquo;MUỐN GẮN BÓ NHIỀU HƠN&rdquo;.
          </p>

          {/* Circular Scroll Down Button matching Roll.svg in Image 1 */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="mt-7 sm:mt-9"
          >
            <a
              href="#content"
              className="inline-flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity"
              aria-label="Cuộn xuống nội dung"
            >
              <Image
                src="/Roll.svg"
                alt="Cuộn xuống"
                width={42}
                height={42}
                className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow"
              />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 1: Thông tin sơ bộ & Xuất phát điểm */}
      <section id="content" className="relative py-16 sm:py-24 bg-white text-black overflow-hidden border-b border-[#eae3d9] scroll-mt-20">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6"
            >
              <div>
                <span className="text-luxury-gold text-xs uppercase tracking-[0.25em] font-sans font-semibold block mb-2">
                  LỊCH SỬ HÌNH THÀNH & PHÁT TRIỂN
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold uppercase tracking-wider text-black leading-tight">
                  THÔNG TIN SƠ BỘ VỀ D2 LUXURY
                </h2>
                <div className="w-20 h-[1.5px] bg-black mt-3 mb-6" />
              </div>

              <div className="text-sm sm:text-[15.5px] text-neutral-700 font-serif leading-[1.9] font-light space-y-4">
                <p>
                  Xuất phát điểm từ một công ty nhỏ thành lập từ năm 2012 với chỉ 3 nhân sự đầy nhiệt huyết, chủ yếu phục vụ nhu cầu trang trí phòng ở. Sau hơn một thập kỷ kiên định với sứ mệnh mang lại giá trị thực, D2 Luxury đã vươn mình trở thành một trong những tổng thầu thiết kế và thi công kiến trúc – nội thất phân khúc cao cấp hàng đầu tại Việt Nam.
                </p>
                <p>
                  Để có được vị thế vững chắc như hiện tại, Ban lãnh đạo D2 Luxury luôn xác định con người và chất lượng là hai yếu tố cốt lõi cho sự phát triển bền vững. Chúng tôi không chỉ xây dựng những ngôi nhà, mà kiến tạo nên những tổ ấm trường tồn theo năm tháng.
                </p>
              </div>

              <div className="pt-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-[#f0ece4] pt-6">
                  <div>
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-black block">14+</span>
                    <span className="text-xs font-serif uppercase tracking-wider text-neutral-600 mt-1 block">Năm kinh nghiệm</span>
                  </div>
                  <div>
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-black block">500+</span>
                    <span className="text-xs font-serif uppercase tracking-wider text-neutral-600 mt-1 block">Dự án hoàn thành</span>
                  </div>
                  <div>
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-black block">4200m²</span>
                    <span className="text-xs font-serif uppercase tracking-wider text-neutral-600 mt-1 block">Diện tích xưởng</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Photo Frame */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-6 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[560px]">
                <div
                  className="absolute -bottom-6 -left-6 w-full h-full border border-black pointer-events-none z-0"
                  aria-hidden="true"
                />
                <div className="relative z-10 aspect-[4/3] w-full overflow-hidden shadow-2xl bg-[#faf8f5]">
                  <Image
                    src="/about/main.jpg"
                    alt="D2 Luxury Design Office & Team"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Độc đáo - Độc nhất - Khác biệt */}
      <section className="relative py-16 sm:py-24 bg-[#f4f0ec] text-black overflow-hidden border-b border-[#eae3d9]">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Photo Frame */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 order-2 lg:order-1 flex justify-center lg:justify-start"
            >
              <div className="relative w-full max-w-[560px]">
                <div
                  className="absolute -top-6 -right-6 w-full h-full border border-black pointer-events-none z-0"
                  aria-hidden="true"
                />
                <div className="relative z-10 aspect-[4/3] w-full overflow-hidden shadow-2xl bg-[#faf8f5]">
                  <Image
                    src="/projects/biet-thu-tan-co/main.jpg"
                    alt="Biệt thự độc bản D2 Luxury"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-6 order-1 lg:order-2 space-y-6"
            >
              <div>
                <span className="text-luxury-gold text-xs uppercase tracking-[0.25em] font-sans font-semibold block mb-2">
                  TRIẾT LÝ SÁNG TẠO
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold uppercase tracking-wider text-black leading-tight">
                  ĐỘC ĐÁO &bull; ĐỘC NHẤT &bull; KHÁC BIỆT
                </h2>
                <div className="w-20 h-[1.5px] bg-black mt-3 mb-6" />
              </div>

              <div className="text-sm sm:text-[15.5px] text-neutral-700 font-serif leading-[1.9] font-light space-y-4">
                <p>
                  D2 Luxury hướng đến phân khúc khách hàng cao cấp: Biệt thự, Dinh thự, Penthouse và Căn hộ hạng sang. Vì thế, mỗi một công trình, mỗi sản phẩm nội thất luôn đòi hỏi tính độc đáo, thậm chí độc nhất, khác biệt và thể hiện rõ gu thẩm mỹ riêng biệt của từng gia chủ.
                </p>
                <p>
                  Hiểu được những yêu cầu khắt khe từ tệp khách hàng thượng lưu, toàn bộ đội ngũ nhân sự thiết kế và thi công của D2 Luxury luôn tuân thủ quy trình kiểm soát chất lượng chuẩn xác từ ý tưởng bản vẽ sơ phác 3D cho đến từng mối ghép mộc và lớp sơn hoàn thiện cuối cùng.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-sm font-serif text-neutral-800">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span>Thiết kế may đo độc bản theo nhân trắc học và phong thủy gia chủ</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span>Đa dạng phong cách: Tân Cổ Điển, Indochine, Hiện Đại, Farmhouse</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span>Cam kết bản vẽ thi công thực tế đạt chuẩn 98% so với phối cảnh 3D</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Hệ thống 2 Xưởng sản xuất 4200m2 & Đội ngũ nhân sự */}
      <section className="relative py-16 sm:py-24 bg-white text-black overflow-hidden border-b border-[#eae3d9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="text-luxury-gold text-xs uppercase tracking-[0.25em] font-sans font-semibold block mb-2">
              NĂNG LỰC SẢN XUẤT TRỰC TIẾP
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold uppercase tracking-wider text-black">
              2 PHÂN XƯỞNG SẢN XUẤT 4200M² & ĐỘI NGŨ THỰC THI
            </h2>
            <div className="w-24 h-[1.5px] bg-black mx-auto mt-3 mb-5" />
            <p className="text-sm sm:text-base text-neutral-600 font-serif font-light leading-relaxed">
              Tự chủ 100% dây chuyền sản xuất đồ nội thất gỗ tự nhiên và đồ gỗ công nghiệp cao cấp, không qua trung gian.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: 2 Xưởng 4200m2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              whileHover={{ y: -6 }}
              className="bg-[#faf8f5] border border-[#ded8ce] p-8 space-y-4 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-none mb-4">
                <Factory className="w-6 h-6 text-luxury-gold" />
              </div>
              <h3 className="text-xl font-serif font-bold uppercase tracking-wider text-black">
                2 XƯỞNG QUY MÔ 4200M²
              </h3>
              <p className="text-sm font-serif text-neutral-700 leading-relaxed font-light">
                Sở hữu hai phân xưởng lớn tại TP. Hồ Chí Minh (Nguyễn Văn Cự, Quận Bình Tân) và Bình Thuận (Thị Trấn Tân Nghĩa, Hàm Tân). Trang bị đầy đủ máy móc CNC, máy dán cạnh tự động và phòng sơn sấy áp suất âm hiện đại.
              </p>
            </motion.div>

            {/* Card 2: Đội ngũ 200+ Thợ tay nghề cao */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              whileHover={{ y: -6 }}
              className="bg-[#faf8f5] border border-[#ded8ce] p-8 space-y-4 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-none mb-4">
                <Users className="w-6 h-6 text-luxury-gold" />
              </div>
              <h3 className="text-xl font-serif font-bold uppercase tracking-wider text-black">
                HƠN 200 THỢ NGHỀ & 30 KTS
              </h3>
              <p className="text-sm font-serif text-neutral-700 leading-relaxed font-light">
                Quy tụ hơn 200 nghệ nhân thợ mộc lành nghề giàu tâm huyết, 30 kiến trúc sư tài năng và 20 kỹ sư giám sát chất lượng tại hiện trường. Đảm bảo từng chi tiết sắc nét và đúng tiến độ cam kết.
              </p>
            </motion.div>

            {/* Card 3: Tiêu chuẩn thi công khắt khe */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              whileHover={{ y: -6 }}
              className="bg-[#faf8f5] border border-[#ded8ce] p-8 space-y-4 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-none mb-4">
                <HardHat className="w-6 h-6 text-luxury-gold" />
              </div>
              <h3 className="text-xl font-serif font-bold uppercase tracking-wider text-black">
                THI CÔNG CHÌA KHÓA TRAO TAY
              </h3>
              <p className="text-sm font-serif text-neutral-700 leading-relaxed font-light">
                Tổng thầu trọn gói từ phá dỡ cải tạo, thi công xây dựng thô, lắp đặt cơ điện M&E đến hoàn thiện nội thất và bàn giao chìa khóa trao tay. Bảo hành kết cấu dài hạn và bảo trì định kỳ trọn đời công trình.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Văn hóa "Tử Tế" & Lời chia sẻ từ Founder */}
      <section className="relative py-16 sm:py-24 bg-[#f4f0ec] text-black overflow-hidden border-b border-[#eae3d9]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-[#ded8ce] p-8 sm:p-14 shadow-lg relative"
          >
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-serif uppercase tracking-widest">
                <Heart className="w-3.5 h-3.5 text-luxury-gold" />
                <span>VĂN HÓA DOANH NGHIỆP D2 LUXURY</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wider text-black">
                VĂN HÓA “TỬ TẾ” & SỨ MỆNH MANG LẠI SỰ ẤM ÊM
              </h2>
              <div className="w-16 h-[1.5px] bg-black mx-auto" />

              <blockquote className="text-base sm:text-lg lg:text-xl font-serif italic text-neutral-800 leading-relaxed font-light pt-2">
                &ldquo;Nhân viên đứng thứ nhất, khách hàng đứng thứ hai, và cuối cùng mới là tôi. Chỉ khi đội ngũ nhân sự an tâm cống hiến và làm việc bằng cả cái tâm, họ mới có thể tạo ra những công trình hoàn mỹ nhất. Và chính khách hàng sẽ là người thừa hưởng trọn vẹn giá trị xứng đáng với niềm tin họ trao gửi.&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-[#f0ece4]">
                <p className="font-serif font-bold uppercase tracking-widest text-black text-sm sm:text-base">
                  BAN LÃNH ĐẠO D2 LUXURY
                </p>
                <span className="text-xs font-serif text-neutral-500 uppercase tracking-wider block mt-1">
                  Đơn vị thiết kế & thi công nội thất cao cấp từ năm 2012
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Call to Action - Liên hệ nhận tư vấn (Light luxury tone) */}
      <section className="relative py-16 sm:py-24 bg-[#f4f0ec] text-black text-center border-t border-[#ded8ce]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
        >
          <span className="text-luxury-gold text-xs sm:text-sm uppercase tracking-[0.25em] font-sans font-semibold block">
            BẮT ĐẦU HÀNH TRÌNH KIẾN TẠO TỔ ẤM
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold uppercase tracking-wider text-black">
            D2 LUXURY &ndash; SỰ LỰA CHỌN SỐ 1 CỦA BẠN
          </h2>
          <div className="w-20 h-[1.5px] bg-black mx-auto" />
          <p className="text-sm sm:text-base font-serif font-light text-neutral-700 max-w-xl mx-auto leading-relaxed">
            Hãy liên hệ với đội ngũ chuyên gia của chúng tôi để được khảo sát thực địa, tư vấn thiết kế và báo giá chi tiết hoàn toàn miễn phí.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link
                href="/#sec-tuvan"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-serif font-semibold tracking-widest uppercase transition-all shadow-md hover:shadow-lg"
              >
                <span>NHẬN TƯ VẤN NGAY</span>
                <ArrowRight className="w-4 h-4 text-luxury-gold" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <a
                href={`tel:${siteConfig.hotline}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-black hover:bg-black hover:text-white text-black text-xs sm:text-sm font-serif font-semibold tracking-widest uppercase transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>HOTLINE: {siteConfig.phone1}</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating Widgets */}
      <FloatingWidgets onOpenZalo={() => setIsZaloModalOpen(true)} />

      {/* Zalo Modal */}
      <ZaloModal isOpen={isZaloModalOpen} onClose={() => setIsZaloModalOpen(false)} />
    </main>
  );
}

