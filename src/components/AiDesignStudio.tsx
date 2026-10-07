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
  { id: 'phong-khach', label: 'Phòng Khách', icon: '🛋️', phrase: 'Phòng khách thông tầng trần cao' },
  { id: 'phong-ngu', label: 'Phòng Ngủ Master', icon: '🛏️', phrase: 'Phòng ngủ Master ấm cúng' },
  { id: 'phong-bep', label: 'Phòng Bếp & Ăn', icon: '🍳', phrase: 'Phòng bếp & bàn ăn mở hiện đại' },
  { id: 'biet-thu', label: 'Biệt Thự & Villa', icon: '🏰', phrase: 'Không gian nội thất biệt thự villa cao cấp' },
  { id: 'can-ho', label: 'Căn Hộ Penthouse', icon: '🏙️', phrase: 'Căn hộ Penthouse view panorama triệu đô' },
];

const STYLE_OPTIONS = [
  { id: 'hien-dai', label: 'Hiện Đại (Modern Luxury)', desc: 'Tối ưu công năng, đường nét tinh tế', phrase: 'phong cách Hiện đại sang trọng' },
  { id: 'tan-co', label: 'Tân Cổ Điển (Neoclassical)', desc: 'Phào chỉ tỉ mỉ, quý phái vương giả', phrase: 'phong cách Tân cổ điển quý phái với phào chỉ tinh tế' },
  { id: 'indochine', label: 'Đông Dương (Indochine)', desc: 'Giao thoa Á - Âu, hoài niệm sang trọng', phrase: 'phong cách Đông Dương Indochine hoài niệm với gỗ tự nhiên' },
  { id: 'wabi-sabi', label: 'Wabi Sabi', desc: 'Vẻ đẹp mộc mạc, tĩnh lặng và an yên', phrase: 'phong cách Wabi Sabi mộc mạc an yên với vách đá tự nhiên' },
  { id: 'toi-gian', label: 'Tối Giản (Minimalism)', desc: 'Gọn gàng, thoáng đãng, nhiều ánh sáng', phrase: 'phong cách Tối giản Minimalism gọn gàng ngập tràn ánh sáng' },
];

const COLOR_OPTIONS = [
  { id: 'vang-dong', label: 'Vàng Đồng & Trầm Ấm', color: 'bg-[#C5A880]', phrase: 'tông màu Vàng đồng & trầm ấm sang trọng' },
  { id: 'trang-kem', label: 'Trắng Kem & Gỗ Sồi', color: 'bg-[#F5EFE6]', phrase: 'tông màu Trắng kem & gỗ sồi thanh lịch' },
  { id: 'ghi-xam', label: 'Ghi Xám & Đen Huyền Bí', color: 'bg-[#3D3835]', phrase: 'tông màu Ghi xám & đen huyền bí thời thượng' },
  { id: 'xanh-ngoc', label: 'Xanh Ngọc & Ánh Kim', color: 'bg-[#2E5B5B]', phrase: 'tông màu Xanh ngọc lục bảo kết hợp ánh kim quý tộc' },
];

const QUICK_IDEA_TAGS = [
  'Đèn chùm pha lê thông tầng',
  'Vách đá cẩm thạch Calacatta vân mây',
  'Sofa da bò Ý màu nâu camel',
  'Tủ rượu cánh kính đèn LED ấm',
  'Gỗ óc chó tự nhiên cao cấp',
  'Cửa kính lớn view sân vườn hồ bơi',
  'Bàn đảo bếp mặt đá Quartz thác nước',
  'Trần giật cấp đèn hắt nghệ thuật',
];

const SAMPLE_IDEAS = [
  'Phòng khách biệt thự thông tầng trần cao 7m, bộ sofa chữ L bọc da bò Ý màu nâu camel, đèn chùm pha lê xoắn ốc thả thông tầng ánh sáng vàng ấm, vách tivi ốp đá cẩm thạch Calacatta vân mây xám trắng kết hợp lam gỗ óc chó, cửa kính panorama nhìn ra sân vườn hồ bơi.',
  'Phòng ngủ Master phong cách Indochine hoài niệm tông màu xanh ngọc và gỗ sồi, giường bọc nỉ cao cấp, vách ốp lụa họa tiết chim hoa, quạt trần gỗ cổ điển, hệ tủ quần áo cánh kính đèn led và ban công nhiều cây xanh.',
  'Không gian bếp mở liên thông phòng ăn căn hộ Penthouse hiện đại tông ghi xám và vàng đồng, bàn đảo bếp ốp đá quartz trắng vân mây dạng thác nước, tủ rượu cánh kính kịch trần đèn led vàng ấm, bộ bàn ăn 8 ghế bọc da Ý.',
  'Phòng khách Tân cổ điển vương giả với các diện tường trang trí phào chỉ dát ánh kim tinh xảo, lò sưởi decor châu Âu, đèn chùm pha lê nến lung linh, sàn lát gạch thảm hoa cương bóng loáng.',
];

export const AiDesignStudio: React.FC<AiDesignStudioProps> = ({ onOpenConsultation }) => {
  const [spaceType, setSpaceType] = useState('phong-khach');
  const [style, setStyle] = useState('hien-dai');
  const [colorPalette, setColorPalette] = useState('vang-dong');
  const [userIdea, setUserIdea] = useState(SAMPLE_IDEAS[0]);
  
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
  );
  const [appliedPrompt, setAppliedPrompt] = useState<string>(SAMPLE_IDEAS[0]);

  // Synchronize when selecting a space
  const handleSelectSpace = (spaceId: string) => {
    setSpaceType(spaceId);
    const spaceObj = SPACE_OPTIONS.find((s) => s.id === spaceId);
    const styleObj = STYLE_OPTIONS.find((s) => s.id === style);
    const colorObj = COLOR_OPTIONS.find((c) => c.id === colorPalette);
    
    // Smoothly update prompt text if user wants
    if (spaceObj) {
      setUserIdea((prev) => {
        // Replace previous space keyword or prepend
        const baseTags = prev.split(',').filter((part) => !SPACE_OPTIONS.some((s) => part.includes(s.label))).join(',');
        return `${spaceObj.phrase}, ${styleObj?.phrase || ''}, ${colorObj?.phrase || ''}${baseTags ? ', ' + baseTags.trim() : ''}`.replace(/\s+/g, ' ').trim();
      });
    }
  };

  // Synchronize when selecting a style
  const handleSelectStyle = (styleId: string) => {
    setStyle(styleId);
    const spaceObj = SPACE_OPTIONS.find((s) => s.id === spaceType);
    const styleObj = STYLE_OPTIONS.find((s) => s.id === styleId);
    const colorObj = COLOR_OPTIONS.find((c) => c.id === colorPalette);

    if (styleObj) {
      setUserIdea((prev) => {
        const withoutOldStyle = prev
          .replace(/phong cách [^,]+/gi, '')
          .replace(/,\s*,/g, ',')
          .trim();
        return `${spaceObj?.phrase || 'Phòng khách sang trọng'}, ${styleObj.phrase}, ${colorObj?.phrase || ''}${withoutOldStyle ? ', ' + withoutOldStyle : ''}`.replace(/\s+/g, ' ').replace(/^,\s*/, '').trim();
      });
    }
  };

  // Synchronize when selecting a color
  const handleSelectColor = (colorId: string) => {
    setColorPalette(colorId);
    const spaceObj = SPACE_OPTIONS.find((s) => s.id === spaceType);
    const styleObj = STYLE_OPTIONS.find((s) => s.id === style);
    const colorObj = COLOR_OPTIONS.find((c) => c.id === colorId);

    if (colorObj) {
      setUserIdea((prev) => {
        const withoutOldColor = prev
          .replace(/tông màu [^,]+/gi, '')
          .replace(/,\s*,/g, ',')
          .trim();
        return `${spaceObj?.phrase || 'Phòng khách sang trọng'}, ${styleObj?.phrase || ''}, ${colorObj.phrase}${withoutOldColor ? ', ' + withoutOldColor : ''}`.replace(/\s+/g, ' ').replace(/^,\s*/, '').trim();
      });
    }
  };

  const handleAddTag = (tag: string) => {
    if (!userIdea.trim()) {
      setUserIdea(tag);
    } else if (!userIdea.toLowerCase().includes(tag.toLowerCase())) {
      setUserIdea(`${userIdea.trim()}, ${tag}`);
    }
  };

  const handleRandomIdea = () => {
    const randomIdx = Math.floor(Math.random() * SAMPLE_IDEAS.length);
    const chosen = SAMPLE_IDEAS[randomIdx];
    setUserIdea(chosen);

    // Auto-sync buttons with chosen sample
    if (/ngủ/i.test(chosen)) setSpaceType('phong-ngu');
    else if (/bếp/i.test(chosen)) setSpaceType('phong-bep');
    else if (/biệt thự/i.test(chosen)) setSpaceType('biet-thu');
    else if (/penthouse/i.test(chosen)) setSpaceType('can-ho');
    else setSpaceType('phong-khach');

    if (/tân cổ/i.test(chosen)) setStyle('tan-co');
    else if (/indochine/i.test(chosen)) setStyle('indochine');
    else if (/wabi/i.test(chosen)) setStyle('wabi-sabi');
    else if (/tối giản/i.test(chosen)) setStyle('toi-gian');
    else setStyle('hien-dai');

    if (/xanh ngọc/i.test(chosen)) setColorPalette('xanh-ngoc');
    else if (/trắng kem/i.test(chosen)) setColorPalette('trang-kem');
    else if (/ghi xám/i.test(chosen)) setColorPalette('ghi-xam');
    else setColorPalette('vang-dong');
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
        setAppliedPrompt(userIdea.trim() || `${selectedSpace?.label} - ${selectedStyle?.label}`);
        message.success('Đã hiện thực hóa ý tưởng của bạn thành bản vẽ 3D mới!');
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
    const details = userIdea ? ` (Chi tiết ý tưởng: ${userIdea.slice(0, 140)}...)` : '';
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
            TRẢI NGHIỆM CÔNG NGHỆ 9ROUTER AI & FLUX ENGINE
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1A1613] tracking-tight">
            AI Studio – Hiện Thực Hóa Ý Tưởng Của Bạn
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#5C554E] leading-relaxed max-w-3xl mx-auto">
            Mọi ý tưởng, sở thích màu sắc và vật liệu của bạn đều được AI phân tích và biến thành bản vẽ 3D chân thực, sắc nét chỉ sau vài giây.
          </p>
        </div>

        {/* Main 2-Column Studio: Left Controls / Right Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Controls Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#EFE8DF] shadow-xl space-y-6">
            {/* Step 1: Primary User Text Idea (TRỌNG TÂM Ý TƯỞNG) */}
            <div className="space-y-3 p-4 bg-[#FAF8F5] border-2 border-[#8A4F2C]/40 rounded-sm">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#8A4F2C] uppercase tracking-wider flex items-center gap-2">
                  <EditOutlined className="text-base" /> 1. Ý tưởng & Mô tả không gian của bạn
                </label>
                <div className="flex items-center gap-2">
                  <Tooltip title="Đổi mẫu ý tưởng khác ngẫu nhiên">
                    <button
                      type="button"
                      onClick={handleRandomIdea}
                      className="text-xs font-semibold text-[#8A4F2C] hover:text-[#9C623C] flex items-center gap-1 cursor-pointer bg-amber-50 px-2 py-0.5 border border-amber-200 rounded"
                    >
                      <BulbOutlined /> Gợi ý mẫu
                    </button>
                  </Tooltip>
                  {userIdea && (
                    <Tooltip title="Xóa để viết lại">
                      <button
                        type="button"
                        onClick={() => setUserIdea('')}
                        className="text-xs text-stone-400 hover:text-stone-700 cursor-pointer px-1.5 py-0.5"
                      >
                        <ClearOutlined /> Xóa
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>

              <TextArea
                rows={4}
                value={userIdea}
                onChange={(e) => setUserIdea(e.target.value)}
                placeholder="Ví dụ: Phòng khách có sofa da bò Ý màu nâu camel, đèn chùm pha lê thông tầng, vách đá cẩm thạch Calacatta vân mây, cửa kính panorama view hồ bơi..."
                className="!text-sm !text-[#1A1613] !bg-white !border-[#EFE8DF] focus:!border-[#8A4F2C] focus:!shadow-none leading-relaxed"
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
                <HomeOutlined className="text-[#8A4F2C]" /> 2. Loại không gian
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SPACE_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSpace(item.id)}
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
                    onClick={() => handleSelectStyle(item.id)}
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
                    onClick={() => handleSelectColor(item.id)}
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
          <div className="lg:col-span-7 bg-white p-4 sm:p-6 border border-[#EFE8DF] shadow-xl flex flex-col justify-between h-full min-h-[580px]">
            {/* Canvas Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DF] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-[#1A1613] tracking-wide uppercase">
                  Bản Vẽ 3D Phối Cảnh AI Render
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
                    <p className="text-lg font-bold text-[#E8DCCF]">Đang phân tích ý tưởng & render 3D kiến trúc...</p>
                    <p className="text-xs text-stone-400">Áp dụng vật liệu, bố cục, ánh sáng và màu sắc đúng theo yêu cầu của bạn</p>
                  </div>
                </div>
              ) : generatedImage ? (
                <>
                  <Image
                    src={generatedImage}
                    alt="AI Generated Interior Design"
                    fill
                    unoptimized={true}
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
                      unoptimized={true}
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
              <div className="mt-3.5 p-3.5 bg-[#FAF8F5] border border-[#E8DFC0] text-xs text-[#5C554E] flex items-start gap-2.5 rounded-sm">
                <span className="text-lg leading-none">💬</span>
                <div>
                  <span className="font-bold text-[#1A1613]">Ý tưởng đã render:</span>{' '}
                  <span className="italic leading-relaxed text-[#3D3835]">{appliedPrompt}</span>
                </div>
              </div>
            )}

            {/* Canvas Actions */}
            <div className="pt-4 border-t border-[#EFE8DF] mt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-xs text-[#78716C]">
                💡 <span className="font-semibold text-[#1A1613]">Mẹo:</span> Bạn có thể bấm <span className="text-[#8A4F2C] font-bold">"Tạo góc nhìn mới"</span> để AI tạo thêm các phương án khác nhau cho cùng ý tưởng này.
              </div>

              <div className="flex items-center gap-2.5">
                <Button
                  icon={<ReloadOutlined />}
                  onClick={handleGenerate}
                  disabled={loading}
                  className="!border-[#D5BEA8] hover:!border-[#8A4F2C] !text-[#5C311C] cursor-pointer !h-11 px-4 font-semibold"
                >
                  Tạo góc nhìn mới
                </Button>

                <Button
                  type="primary"
                  icon={<ArrowRightOutlined />}
                  onClick={handleConsultWithDesign}
                  className="!bg-[#8A4F2C] !text-white !font-bold shadow-md hover:!bg-[#9C623C] cursor-pointer !h-11 px-5"
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
