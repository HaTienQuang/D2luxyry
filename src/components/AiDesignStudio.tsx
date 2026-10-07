'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Input, message } from 'antd';
import {
  ThunderboltFilled,
  HomeOutlined,
  AppstoreOutlined,
  BgColorsOutlined,
  ArrowRightOutlined,
  DownloadOutlined,
  ReloadOutlined,
  CheckCircleFilled,
  LoadingOutlined,
} from '@ant-design/icons';

interface AiDesignStudioProps {
  onOpenConsultation: (serviceOrPrompt?: string) => void;
}

const SPACE_OPTIONS = [
  { id: 'phong-khach', label: 'Phòng Khách', icon: '🛋️' },
  { id: 'phong-ngu', label: 'Phòng Ngủ Master', icon: '🛏️' },
  { id: 'phong-bep', label: 'Phòng Bếp & Ăn', icon: '🍳' },
  { id: 'biet-thu', label: 'Biệt Thự & Villa', icon: '🏰' },
  { id: 'can-ho', label: 'Căn Hộ Penthouse', icon: '🏙️' },
];

const STYLE_OPTIONS = [
  { id: 'hien-dai', label: 'Hiện Đại (Modern Luxury)', desc: 'Tối ưu công năng, đường nét tinh tế' },
  { id: 'tan-co', label: 'Tân Cổ Điển (Neoclassical)', desc: 'Phào chỉ tỉ mỉ, quý phái vương giả' },
  { id: 'indochine', label: 'Đông Dương (Indochine)', desc: 'Giao thoa Á - Âu, hoài niệm sang trọng' },
  { id: 'wabi-sabi', label: 'Wabi Sabi', desc: 'Vẻ đẹp mộc mạc, tĩnh lặng và an yên' },
  { id: 'toi-gian', label: 'Tối Giản (Minimalism)', desc: 'Gọn gàng, thoáng đãng, nhiều ánh sáng' },
];

const COLOR_OPTIONS = [
  { id: 'vang-dong', label: 'Vàng Đồng & Trầm Ấm', color: 'bg-[#C5A880]' },
  { id: 'trang-kem', label: 'Trắng Kem & Gỗ Sồi', color: 'bg-[#F5EFE6]' },
  { id: 'ghi-xam', label: 'Ghi Xám & Đen Huyền Bí', color: 'bg-[#3D3835]' },
  { id: 'xanh-ngoc', label: 'Xanh Ngọc & Ánh Kim', color: 'bg-[#2E5B5B]' },
];

export const AiDesignStudio: React.FC<AiDesignStudioProps> = ({ onOpenConsultation }) => {
  const [spaceType, setSpaceType] = useState('phong-khach');
  const [style, setStyle] = useState('hien-dai');
  const [colorPalette, setColorPalette] = useState('vang-dong');
  const [specialRequirements, setSpecialRequirements] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
  );
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const selectedSpace = SPACE_OPTIONS.find((s) => s.id === spaceType);
      const selectedStyle = STYLE_OPTIONS.find((s) => s.id === style);
      const selectedColor = COLOR_OPTIONS.find((c) => c.id === colorPalette);

      const response = await fetch('/api/generate-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spaceType,
          spaceLabel: selectedSpace?.label,
          style,
          styleLabel: selectedStyle?.label,
          colorPalette,
          colorLabel: selectedColor?.label,
          specialRequirements,
        }),
      });

      const data = await response.json();
      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setHasGenerated(true);
        message.success('Đã tạo bản phác thảo thiết kế 3D thành công!');
      } else {
        message.error('Không thể tạo ảnh, vui lòng thử lại!');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi kết nối hệ thống AI.');
    } finally {
      setLoading(false);
    }
  };

  const handleConsultWithDesign = () => {
    const space = SPACE_OPTIONS.find((s) => s.id === spaceType)?.label;
    const styleLabel = STYLE_OPTIONS.find((s) => s.id === style)?.label;
    onOpenConsultation(`Tư vấn thi công mẫu AI: ${space} - ${styleLabel}`);
  };

  return (
    <section id="ai-studio" className="py-20 sm:py-28 bg-[#F5EFE6] relative overflow-hidden border-y border-[#EFE8DF]">
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#8A4F2C_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3.5 mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm lg:text-base font-bold uppercase tracking-[0.25em] text-[#8A4F2C]">
            TRẢI NGHIỆM CÔNG NGHỆ 9ROUTER AI
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1A1613] tracking-tight">
            AI Studio – Phác Họa Không Gian Mơ Ước
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#5C554E] leading-relaxed max-w-3xl mx-auto">
            Chỉ với vài thao tác lựa chọn, trí tuệ nhân tạo sẽ hiện thực hóa ý tưởng thiết kế nội thất 3D độc bản dành riêng cho căn nhà của bạn chỉ sau 5 giây.
          </p>
        </div>

        {/* Main 2-Column Studio: Left Options / Right Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Controls Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#EFE8DF] shadow-xl space-y-6">
            {/* Step 1: Loại không gian */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#1A1613] uppercase tracking-wider flex items-center gap-2">
                <HomeOutlined className="text-[#8A4F2C]" /> 1. Chọn loại không gian
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SPACE_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSpaceType(item.id)}
                    className={`p-3 text-xs sm:text-sm font-semibold border transition-all text-left flex items-center gap-2 ${
                      spaceType === item.id
                        ? 'bg-[#8A4F2C] text-white border-[#8A4F2C] shadow-md'
                        : 'bg-[#FAF8F5] text-[#3D3835] hover:border-[#8A4F2C]/50 border-[#EFE8DF]'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Phong cách thiết kế */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#1A1613] uppercase tracking-wider flex items-center gap-2">
                <AppstoreOutlined className="text-[#8A4F2C]" /> 2. Chọn phong cách thiết kế
              </label>
              <div className="space-y-2">
                {STYLE_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStyle(item.id)}
                    className={`w-full p-3 text-xs sm:text-sm border transition-all text-left flex items-center justify-between ${
                      style === item.id
                        ? 'bg-[#FAF8F5] border-[#8A4F2C] border-l-4 shadow-sm'
                        : 'bg-white hover:bg-[#FAF8F5] border-[#EFE8DF]'
                    }`}
                  >
                    <div>
                      <div className={`font-bold ${style === item.id ? 'text-[#8A4F2C]' : 'text-[#1A1613]'}`}>
                        {item.label}
                      </div>
                      <div className="text-[12px] text-[#78716C]">{item.desc}</div>
                    </div>
                    {style === item.id && <CheckCircleFilled className="text-[#8A4F2C] text-base" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Tông màu chủ đạo */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#1A1613] uppercase tracking-wider flex items-center gap-2">
                <BgColorsOutlined className="text-[#8A4F2C]" /> 3. Tông màu yêu thích
              </label>
              <div className="grid grid-cols-2 gap-2">
                {COLOR_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setColorPalette(item.id)}
                    className={`p-2.5 text-xs font-semibold border transition-all flex items-center gap-2.5 ${
                      colorPalette === item.id
                        ? 'bg-[#FAF8F5] border-[#8A4F2C] ring-1 ring-[#8A4F2C]'
                        : 'bg-white border-[#EFE8DF] hover:border-stone-300'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full ${item.color} border border-black/10 shrink-0`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Ghi chú thêm mong muốn */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#5C554E]">
                Ghi chú chi tiết thêm (Tùy chọn):
              </label>
              <Input
                placeholder="VD: Cần nhiều ánh sáng tự nhiên, tủ rượu cánh kính..."
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                className="!py-2 text-sm"
              />
            </div>

            {/* Submit Action Button */}
            <Button
              type="primary"
              size="large"
              block
              loading={loading}
              onClick={handleGenerate}
              icon={<ThunderboltFilled className="text-amber-300" />}
              className="!h-14 !text-base sm:!text-[17px] !font-bold !bg-[#8A4F2C] hover:!bg-[#9C623C] !text-white shadow-xl hover:shadow-2xl transition-all"
            >
              {loading ? 'AI Đang Phác Họa Bản Vẽ...' : 'Tạo Bản Thiết Kế AI (Miễn Phí)'}
            </Button>
          </div>

          {/* Right Display Canvas */}
          <div className="lg:col-span-7 bg-white p-4 sm:p-6 border border-[#EFE8DF] shadow-xl flex flex-col justify-between h-full min-h-[520px]">
            {/* Canvas Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DF] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-[#1A1613] tracking-wide uppercase">
                  Bản Vẽ 3D Phối Cảnh AI
                </span>
              </div>
              <div className="text-xs text-[#8A4F2C] font-semibold bg-[#FAF8F5] px-3 py-1 border border-[#E8DFC0]">
                {SPACE_OPTIONS.find((s) => s.id === spaceType)?.label} &bull; {STYLE_OPTIONS.find((s) => s.id === style)?.label.split(' ')[0]}
              </div>
            </div>

            {/* Main Visual Frame */}
            <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full bg-stone-950 overflow-hidden shadow-inner flex items-center justify-center group">
              {loading ? (
                <div className="flex flex-col items-center justify-center text-white space-y-4 p-8 text-center">
                  <LoadingOutlined className="text-5xl text-[#C5A880] animate-spin" />
                  <div className="space-y-1">
                    <p className="text-lg font-bold text-[#E8DCCF]">Đang xử lý render 3D kiến trúc...</p>
                    <p className="text-xs text-stone-400">Áp dụng vật liệu, ánh sáng và bố cục không gian</p>
                  </div>
                </div>
              ) : generatedImage ? (
                <>
                  <Image
                    src={generatedImage}
                    alt="AI Generated Interior Design"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                  {/* Brand Watermark Badge */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/20 flex items-center gap-2 shadow-lg pointer-events-none">
                    <Image
                      src="/images/logo.png"
                      alt="D2 Luxury Design"
                      width={20}
                      height={20}
                      className="h-4 w-auto object-contain"
                    />
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#E8DCCF] uppercase">
                      D2 LUXURY DESIGN &bull; AI CONCEPT
                    </span>
                  </div>
                </>
              ) : null}
            </div>

            {/* Canvas Actions */}
            <div className="pt-5 border-t border-[#EFE8DF] mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-xs text-[#78716C]">
                💡 <span className="font-semibold text-[#1A1613]">Mẹo:</span> Bạn có thể đổi các lựa chọn bên trái và bấm tạo lại để xem thêm nhiều phương án khác.
              </div>

              <div className="flex items-center gap-2.5">
                <Button
                  icon={<ReloadOutlined />}
                  onClick={handleGenerate}
                  disabled={loading}
                  className="!border-[#D5BEA8] hover:!border-[#8A4F2C] !text-[#5C311C]"
                >
                  Tạo lại
                </Button>

                <Button
                  type="primary"
                  icon={<ArrowRightOutlined />}
                  onClick={handleConsultWithDesign}
                  className="!bg-[#8A4F2C] !text-white !font-bold shadow-md hover:!bg-[#9C623C]"
                >
                  Nhận báo giá mẫu này
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
