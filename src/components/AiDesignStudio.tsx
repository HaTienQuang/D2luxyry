'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Input, message, Tooltip } from 'antd';
import {
  ThunderboltFilled,
  HomeOutlined,
  AppstoreOutlined,
  BgColorsOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
  CheckCircleFilled,
  LoadingOutlined,
  BulbOutlined,
  ClearOutlined,
  EditOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

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

const QUICK_IDEA_TAGS = [
  'Đèn chùm pha lê thông tầng',
  'Vách đá cẩm thạch vân mây',
  'Sofa da bò Ý màu nâu camel',
  'Tủ rượu cánh kính đèn LED',
  'Gỗ óc chó tự nhiên',
  'Cửa kính lớn view sân vườn',
  'Bàn đảo bếp mặt đá Quartz',
  'Trần giật cấp đèn hắt ấm',
];

const SAMPLE_IDEAS = [
  'Phòng khách thông tầng có sofa da bò Ý màu nâu, đèn chùm pha lê hoành tráng, vách tivi ốp đá cẩm thạch tự nhiên và view cửa kính lớn nhìn ra sân vườn.',
  'Phòng ngủ Master phong cách Indochine hoài niệm với giường gỗ óc chó cao cấp, vách ốp lụa họa tiết chim hoa, quạt trần cổ điển và ban công nhiều cây xanh.',
  'Không gian bếp hiện đại liên thông phòng ăn, bàn đảo bếp ốp đá quartz trắng vân mây sang trọng, hệ tủ rượu cánh kính kịch trần đèn LED ấm áp.',
  'Biệt thự Tân cổ điển vương giả với các đường phào chỉ dát ánh kim tinh xảo, lò sưởi decor phong cách châu Âu, sàn lát gạch thảm đá hoa cương.',
];

export const AiDesignStudio: React.FC<AiDesignStudioProps> = ({ onOpenConsultation }) => {
  const [spaceType, setSpaceType] = useState('phong-khach');
  const [style, setStyle] = useState('hien-dai');
  const [colorPalette, setColorPalette] = useState('vang-dong');
  const [userIdea, setUserIdea] = useState(
    'Phòng khách thông tầng sang trọng có sofa da nâu bò, đèn chùm pha lê lớn, vách đá cẩm thạch và cửa kính panorama view hồ bơi.'
  );
  
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
  );
  const [appliedPrompt, setAppliedPrompt] = useState<string>(
    'Phòng khách thông tầng sang trọng có sofa da nâu bò, đèn chùm pha lê lớn, vách đá cẩm thạch và cửa kính panorama view hồ bơi.'
  );

  const handleAddTag = (tag: string) => {
    if (!userIdea.trim()) {
      setUserIdea(tag);
    } else if (!userIdea.includes(tag)) {
      setUserIdea(`${userIdea.trim()}, ${tag.toLowerCase()}`);
    }
  };

  const handleRandomIdea = () => {
    const randomIdx = Math.floor(Math.random() * SAMPLE_IDEAS.length);
    setUserIdea(SAMPLE_IDEAS[randomIdx]);
  };

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
          userIdea: userIdea.trim(),
        }),
      });

      const data = await response.json();
      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setAppliedPrompt(userIdea.trim() || `${selectedSpace?.label} phong cách ${selectedStyle?.label}`);
        message.success('Đã hiện thực hóa ý tưởng của bạn thành bản vẽ 3D!');
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
    const details = userIdea ? ` (Ý tưởng: ${userIdea.slice(0, 120)}...)` : '';
    onOpenConsultation(`Tư vấn thi công mẫu AI: ${space} - ${styleLabel}${details}`);
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
            AI Studio – Hiện Thực Hóa Ý Tưởng Của Bạn
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#5C554E] leading-relaxed max-w-3xl mx-auto">
            Nhập trực tiếp bất kỳ ý tưởng, vật liệu, màu sắc hoặc không gian mong muốn. Trí tuệ nhân tạo sẽ biến mô tả của bạn thành bản vẽ phối cảnh nội thất 3D chuẩn xác trong 5 giây.
          </p>
        </div>

        {/* Main 2-Column Studio: Left Options / Right Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Controls Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#EFE8DF] shadow-xl space-y-6">
            {/* Step 1: Primary User Text Idea (TRỌNG TÂM Ý TƯỞNG) */}
            <div className="space-y-3 p-4 bg-[#FAF8F5] border border-[#8A4F2C]/30 rounded-sm">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#8A4F2C] uppercase tracking-wider flex items-center gap-2">
                  <EditOutlined className="text-base" /> 1. Nhập ý tưởng thiết kế của bạn
                </label>
                <div className="flex items-center gap-2">
                  <Tooltip title="Tự động điền ý tưởng ngẫu nhiên">
                    <button
                      type="button"
                      onClick={handleRandomIdea}
                      className="text-xs font-semibold text-[#8A4F2C] hover:text-[#9C623C] flex items-center gap-1 cursor-pointer"
                    >
                      <BulbOutlined /> Gợi ý mẫu
                    </button>
                  </Tooltip>
                  {userIdea && (
                    <Tooltip title="Xóa nội dung">
                      <button
                        type="button"
                        onClick={() => setUserIdea('')}
                        className="text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
                      >
                        <ClearOutlined />
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>

              <TextArea
                rows={4}
                value={userIdea}
                onChange={(e) => setUserIdea(e.target.value)}
                placeholder="Ví dụ: Phòng khách có sofa da bò Ý màu nâu camel, đèn chùm pha lê thông tầng, vách đá cẩm thạch vân mây, cửa kính lớn nhìn ra sân vườn..."
                className="!text-sm !text-[#1A1613] !bg-white !border-[#EFE8DF] focus:!border-[#8A4F2C] focus:!shadow-none"
              />

              {/* Quick Idea Inspiration Chips */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider">
                  + Thêm nhanh chi tiết vào ý tưởng:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_IDEA_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddTag(tag)}
                      className="text-[11px] px-2.5 py-1 bg-white hover:bg-[#8A4F2C] hover:text-white text-[#5C554E] border border-[#E8DFC0] transition-colors rounded-sm cursor-pointer"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Loại không gian */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#1A1613] uppercase tracking-wider flex items-center gap-2">
                <HomeOutlined className="text-[#8A4F2C]" /> 2. Loại không gian bổ trợ
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SPACE_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSpaceType(item.id)}
                    className={`p-2.5 text-xs font-semibold border transition-all text-left flex items-center gap-2 cursor-pointer ${
                      spaceType === item.id
                        ? 'bg-[#8A4F2C] text-white border-[#8A4F2C] shadow-sm'
                        : 'bg-[#FAF8F5] text-[#3D3835] hover:border-[#8A4F2C]/50 border-[#EFE8DF]'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Phong cách thiết kế */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#1A1613] uppercase tracking-wider flex items-center gap-2">
                <AppstoreOutlined className="text-[#8A4F2C]" /> 3. Phong cách thiết kế
              </label>
              <div className="space-y-1.5">
                {STYLE_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStyle(item.id)}
                    className={`w-full p-2.5 text-xs border transition-all text-left flex items-center justify-between cursor-pointer ${
                      style === item.id
                        ? 'bg-[#FAF8F5] border-[#8A4F2C] border-l-4 shadow-sm'
                        : 'bg-white hover:bg-[#FAF8F5] border-[#EFE8DF]'
                    }`}
                  >
                    <div>
                      <div className={`font-bold ${style === item.id ? 'text-[#8A4F2C]' : 'text-[#1A1613]'}`}>
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#78716C]">{item.desc}</div>
                    </div>
                    {style === item.id && <CheckCircleFilled className="text-[#8A4F2C] text-sm" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Tông màu chủ đạo */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#1A1613] uppercase tracking-wider flex items-center gap-2">
                <BgColorsOutlined className="text-[#8A4F2C]" /> 4. Tông màu chủ đạo
              </label>
              <div className="grid grid-cols-2 gap-2">
                {COLOR_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setColorPalette(item.id)}
                    className={`p-2 text-xs font-semibold border transition-all flex items-center gap-2 cursor-pointer ${
                      colorPalette === item.id
                        ? 'bg-[#FAF8F5] border-[#8A4F2C] ring-1 ring-[#8A4F2C]'
                        : 'bg-white border-[#EFE8DF] hover:border-stone-300'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${item.color} border border-black/10 shrink-0`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action Button */}
            <Button
              type="primary"
              size="large"
              block
              loading={loading}
              onClick={handleGenerate}
              icon={<ThunderboltFilled className="text-amber-300" />}
              className="!h-14 !text-base sm:!text-[17px] !font-bold !bg-[#8A4F2C] hover:!bg-[#9C623C] !text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer"
            >
              {loading ? 'AI Đang Vẽ Theo Ý Tưởng Của Bạn...' : 'Vẽ Không Gian Theo Ý Tưởng (Render 3D)'}
            </Button>
          </div>

          {/* Right Display Canvas */}
          <div className="lg:col-span-7 bg-white p-4 sm:p-6 border border-[#EFE8DF] shadow-xl flex flex-col justify-between h-full min-h-[560px]">
            {/* Canvas Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DF] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-[#1A1613] tracking-wide uppercase">
                  Bản Vẽ 3D Render Theo Ý Tưởng
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
                    <p className="text-lg font-bold text-[#E8DCCF]">Đang phân tích ý tưởng & render 3D...</p>
                    <p className="text-xs text-stone-400">Áp dụng vật liệu, ánh sáng, chi tiết theo đúng mô tả của bạn</p>
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

            {/* Concept Prompt Summary Card */}
            {appliedPrompt && !loading && (
              <div className="mt-3 p-3 bg-[#FAF8F5] border border-[#EFE8DF] text-xs text-[#5C554E] flex items-start gap-2">
                <span className="text-base leading-none">💬</span>
                <div>
                  <span className="font-bold text-[#1A1613]">Ý tưởng thiết kế đã áp dụng:</span>{' '}
                  <span className="italic">{appliedPrompt}</span>
                </div>
              </div>
            )}

            {/* Canvas Actions */}
            <div className="pt-4 border-t border-[#EFE8DF] mt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-xs text-[#78716C]">
                💡 <span className="font-semibold text-[#1A1613]">Mẹo:</span> Bạn có thể gõ thêm các chi tiết cụ thể vào ô ý tưởng bên trái để AI biến đổi phối cảnh 3D.
              </div>

              <div className="flex items-center gap-2.5">
                <Button
                  icon={<ReloadOutlined />}
                  onClick={handleGenerate}
                  disabled={loading}
                  className="!border-[#D5BEA8] hover:!border-[#8A4F2C] !text-[#5C311C] cursor-pointer"
                >
                  Tạo lại
                </Button>

                <Button
                  type="primary"
                  icon={<ArrowRightOutlined />}
                  onClick={handleConsultWithDesign}
                  className="!bg-[#8A4F2C] !text-white !font-bold shadow-md hover:!bg-[#9C623C] cursor-pointer"
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
