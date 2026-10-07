'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Input, message, Tooltip } from 'antd';
import {
  ThunderboltFilled,
  ArrowRightOutlined,
  ReloadOutlined,
  LoadingOutlined,
  BulbOutlined,
  ClearOutlined,
  CheckOutlined,
  SparklesOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

interface AiDesignStudioProps {
  onOpenConsultation: (serviceOrPrompt?: string) => void;
}

const SPACE_OPTIONS = [
  { id: 'phong-khach', label: '🛋️ Phòng Khách', matchRegex: /khách/i, phrase: 'Phòng khách thông tầng trần cao' },
  { id: 'phong-ngu', label: '🛏️ Phòng Ngủ Master', matchRegex: /ngủ|bedroom/i, phrase: 'Phòng ngủ Master ấm cúng sang trọng' },
  { id: 'phong-bep', label: '🍳 Phòng Bếp & Ăn', matchRegex: /bếp|ăn|dining|kitchen/i, phrase: 'Phòng bếp & bàn ăn mở hiện đại' },
  { id: 'biet-thu', label: '🏰 Biệt Thự & Villa', matchRegex: /biệt thự|villa/i, phrase: 'Không gian nội thất biệt thự villa cao cấp' },
  { id: 'can-ho', label: '🏙️ Căn Hộ Penthouse', matchRegex: /căn hộ|penthouse|chung cư/i, phrase: 'Căn hộ Penthouse view panorama triệu đô' },
];

const STYLE_OPTIONS = [
  { id: 'hien-dai', label: 'Hiện Đại (Modern Luxury)', matchRegex: /hiện đại|modern/i, phrase: 'phong cách Hiện đại sang trọng' },
  { id: 'tan-co', label: 'Tân Cổ Điển (Neoclassical)', matchRegex: /tân cổ|neoclassical/i, phrase: 'phong cách Tân cổ điển quý phái với phào chỉ tinh tế' },
  { id: 'indochine', label: 'Đông Dương (Indochine)', matchRegex: /đông dương|indochine/i, phrase: 'phong cách Đông Dương Indochine hoài niệm' },
  { id: 'wabi-sabi', label: 'Wabi Sabi', matchRegex: /wabi|sabi/i, phrase: 'phong cách Wabi Sabi mộc mạc an yên' },
  { id: 'toi-gian', label: 'Tối Giản (Minimalism)', matchRegex: /tối giản|minimal/i, phrase: 'phong cách Tối giản Minimalism ngập tràn ánh sáng' },
];

const COLOR_OPTIONS = [
  { id: 'vang-dong', label: 'Vàng Đồng & Trầm Ấm', colorDot: '#C5A880', matchRegex: /vàng|đồng|amber/i, phrase: 'tông màu Vàng đồng & trầm ấm sang trọng' },
  { id: 'trang-kem', label: 'Trắng Kem & Gỗ Sồi', colorDot: '#F5EFE6', matchRegex: /trắng|kem|sồi|ivory/i, phrase: 'tông màu Trắng kem & gỗ sồi thanh lịch' },
  { id: 'ghi-xam', label: 'Ghi Xám & Đen Huyền Bí', colorDot: '#3D3835', matchRegex: /ghi|xám|đen|black/i, phrase: 'tông màu Ghi xám & đen huyền bí thời thượng' },
  { id: 'xanh-ngoc', label: 'Xanh Ngọc & Ánh Kim', colorDot: '#2E5B5B', matchRegex: /xanh|ngọc|lục|teal|emerald/i, phrase: 'tông màu Xanh ngọc lục bảo kết hợp ánh kim quý tộc' },
];

const DETAIL_TAGS = [
  { label: '+ Sofa da bò Ý màu nâu', phrase: 'bộ sofa chữ L bọc da bò Ý màu nâu camel' },
  { label: '+ Đèn chùm pha lê thông tầng', phrase: 'đèn chùm pha lê xoắn ốc thả thông tầng ánh sáng vàng ấm' },
  { label: '+ Vách đá Calacatta vân mây', phrase: 'vách tivi ốp đá cẩm thạch Calacatta vân mây' },
  { label: '+ Tủ rượu cánh kính đèn LED', phrase: 'tủ rượu cánh kính kịch trần đèn LED ấm' },
  { label: '+ Gỗ óc chó tự nhiên', phrase: 'nội thất gỗ óc chó tự nhiên cao cấp' },
  { label: '+ Cửa kính view sân vườn', phrase: 'cửa kính panorama kịch trần nhìn ra sân vườn hồ bơi' },
  { label: '+ Bàn đảo bếp mặt đá', phrase: 'bàn đảo bếp ốp đá quartz trắng vân mây dạng thác nước' },
  { label: '+ Trần giật cấp đèn hắt', phrase: 'trần thạch cao giật cấp đèn hắt nghệ thuật' },
];

const SAMPLE_PROMPTS = [
  'Phòng khách biệt thự thông tầng trần cao, phong cách Hiện đại sang trọng, tông màu Xanh ngọc lục bảo kết hợp ánh kim quý tộc, bộ sofa chữ L bọc da bò Ý màu nâu camel, đèn chùm pha lê xoắn ốc thả thông tầng ánh sáng vàng ấm, vách tivi ốp đá cẩm thạch Calacatta vân mây, cửa kính panorama nhìn ra sân vườn cây xanh.',
  'Phòng ngủ Master phong cách Indochine hoài niệm, tông màu Trắng kem & gỗ sồi thanh lịch, giường ngủ bọc nỉ cao cấp, vách ốp lụa họa tiết chim hoa, quạt trần gỗ cổ điển, hệ tủ quần áo cánh kính đèn LED và ban công nhiều cây xanh.',
  'Không gian bếp & bàn ăn mở hiện đại, phong cách Hiện đại sang trọng, tông màu Ghi xám & đen huyền bí thời thượng, bàn đảo bếp ốp đá quartz trắng vân mây dạng thác nước, tủ rượu cánh kính kịch trần đèn LED ấm, bộ bàn ăn 8 ghế bọc da cao cấp.',
  'Phòng khách Tân cổ điển quý phái với phào chỉ tinh tế, tông màu Vàng đồng & trầm ấm sang trọng, lò sưởi decor phong cách châu Âu, đèn chùm pha lê nến lung linh, sàn lát gạch thảm hoa cương bóng loáng.',
];

export const AiDesignStudio: React.FC<AiDesignStudioProps> = ({ onOpenConsultation }) => {
  const [promptText, setPromptText] = useState(SAMPLE_PROMPTS[0]);
  const [selectedSpace, setSelectedSpace] = useState('phong-khach');
  const [selectedStyle, setSelectedStyle] = useState('hien-dai');
  const [selectedColor, setSelectedColor] = useState('xanh-ngoc');
  
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
  );
  const [appliedPrompt, setAppliedPrompt] = useState<string>(SAMPLE_PROMPTS[0]);

  // Intelligent real-time parser: When user types or pastes in prompt, sync the active buttons
  useEffect(() => {
    // 1. Detect Space
    const matchedSpace = SPACE_OPTIONS.find((s) => s.matchRegex.test(promptText));
    if (matchedSpace) setSelectedSpace(matchedSpace.id);

    // 2. Detect Style
    const matchedStyle = STYLE_OPTIONS.find((s) => s.matchRegex.test(promptText));
    if (matchedStyle) setSelectedStyle(matchedStyle.id);

    // 3. Detect Color
    const matchedColor = COLOR_OPTIONS.find((c) => c.matchRegex.test(promptText));
    if (matchedColor) setSelectedColor(matchedColor.id);
  }, [promptText]);

  // When clicking a space button
  const handleSpaceClick = (spaceId: string) => {
    setSelectedSpace(spaceId);
    const spaceObj = SPACE_OPTIONS.find((s) => s.id === spaceId);
    if (!spaceObj) return;

    let newPrompt = promptText;
    const existingSpace = SPACE_OPTIONS.find((s) => s.matchRegex.test(newPrompt));
    if (existingSpace) {
      newPrompt = newPrompt.replace(existingSpace.matchRegex, spaceObj.phrase.split(' ')[0]);
    } else {
      newPrompt = `${spaceObj.phrase}, ${newPrompt}`;
    }
    setPromptText(newPrompt);
  };

  // When clicking a style button
  const handleStyleClick = (styleId: string) => {
    setSelectedStyle(styleId);
    const styleObj = STYLE_OPTIONS.find((s) => s.id === styleId);
    if (!styleObj) return;

    let newPrompt = promptText;
    const existingStyle = STYLE_OPTIONS.find((s) => s.matchRegex.test(newPrompt));
    if (existingStyle) {
      newPrompt = newPrompt.replace(/phong cách [^,]+/i, styleObj.phrase);
    } else {
      newPrompt = `${newPrompt}, ${styleObj.phrase}`;
    }
    setPromptText(newPrompt.replace(/,\s*,/g, ',').trim());
  };

  // When clicking a color button
  const handleColorClick = (colorId: string) => {
    setSelectedColor(colorId);
    const colorObj = COLOR_OPTIONS.find((c) => c.id === colorId);
    if (!colorObj) return;

    let newPrompt = promptText;
    const existingColor = COLOR_OPTIONS.find((c) => c.matchRegex.test(newPrompt));
    if (existingColor) {
      newPrompt = newPrompt.replace(/tông màu [^,]+/i, colorObj.phrase);
    } else {
      newPrompt = `${newPrompt}, ${colorObj.phrase}`;
    }
    setPromptText(newPrompt.replace(/,\s*,/g, ',').trim());
  };

  // When clicking a detail feature tag
  const handleDetailTagClick = (phrase: string) => {
    if (!promptText.toLowerCase().includes(phrase.toLowerCase())) {
      setPromptText((prev) => (prev ? `${prev.trim()}, ${phrase}` : phrase));
    }
  };

  // Surprise / Random prompt
  const handleRandomPrompt = () => {
    const randomIdx = Math.floor(Math.random() * SAMPLE_PROMPTS.length);
    setPromptText(SAMPLE_PROMPTS[randomIdx]);
  };

  // Main Render Action
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userIdea: promptText.trim(),
        }),
      });

      const data = await response.json();
      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setAppliedPrompt(promptText.trim());
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
    const details = promptText ? ` (${promptText.slice(0, 140)}...)` : '';
    onOpenConsultation(`Tư vấn thi công theo ý tưởng AI${details}`);
  };

  return (
    <section id="ai-studio" className="py-20 sm:py-28 bg-[#F5EFE6] relative overflow-hidden border-y border-[#EFE8DF]">
      <div className="absolute inset-0 bg-[radial-gradient(#8A4F2C_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3.5 mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm lg:text-base font-bold uppercase tracking-[0.25em] text-[#8A4F2C]">
            TRẢI NGHIỆM CÔNG NGHỆ 9ROUTER AI STUDIO
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1A1613] tracking-tight">
            Phác Họa Không Gian 3D Theo Ý Tưởng
          </h2>
          <p className="text-base sm:text-lg text-[#5C554E] leading-relaxed max-w-3xl mx-auto">
            Gõ mô tả hoặc chọn các tiêu chí thiết kế bên dưới. AI sẽ đồng bộ thông minh và vẽ phối cảnh kiến trúc 3D chuẩn xác trong 5 giây.
          </p>
        </div>

        {/* Main 2-Column Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Controls: Unified Smart Prompt Studio */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 border border-[#EFE8DF] shadow-xl space-y-5">
            {/* 1. MASTER PROMPT TEXTAREA */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#8A4F2C] uppercase tracking-wider flex items-center gap-1.5">
                  <SparklesOutlined className="text-base" /> Mô Tả Ý Tưởng Thiết Kế Của Bạn
                </label>
                <div className="flex items-center gap-2">
                  <Tooltip title="Lấy ý tưởng mẫu ngẫu nhiên">
                    <button
                      type="button"
                      onClick={handleRandomPrompt}
                      className="text-xs font-semibold text-[#8A4F2C] hover:text-[#9C623C] flex items-center gap-1 cursor-pointer bg-amber-50 px-2 py-0.5 border border-amber-200 rounded"
                    >
                      <BulbOutlined /> Gợi ý mẫu
                    </button>
                  </Tooltip>
                  {promptText && (
                    <Tooltip title="Xóa để viết mới">
                      <button
                        type="button"
                        onClick={() => setPromptText('')}
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
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Nhập mô tả hoặc bấm các nút chọn bên dưới để AI tự động điền..."
                className="!text-sm !text-[#1A1613] !bg-[#FAF8F5] !border-2 !border-[#8A4F2C]/30 focus:!border-[#8A4F2C] focus:!shadow-none leading-relaxed p-3"
              />
            </div>

            {/* 2. QUICK SELECTOR PILLS (Auto-synchronized) */}
            <div className="space-y-4 pt-1 border-t border-[#EFE8DF]">
              {/* Space Selector */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider block">
                  Loại không gian:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SPACE_OPTIONS.map((item) => {
                    const isActive = selectedSpace === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSpaceClick(item.id)}
                        className={`text-xs px-3 py-1.5 border transition-all cursor-pointer font-medium flex items-center gap-1 rounded-sm ${
                          isActive
                            ? 'bg-[#8A4F2C] text-white border-[#8A4F2C] shadow-sm ring-1 ring-[#8A4F2C]'
                            : 'bg-[#FAF8F5] text-[#3D3835] border-[#EFE8DF] hover:border-stone-400'
                        }`}
                      >
                        {item.label}
                        {isActive && <CheckOutlined className="text-[10px]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Style Selector */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider block">
                  Phong cách kiến trúc:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {STYLE_OPTIONS.map((item) => {
                    const isActive = selectedStyle === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleStyleClick(item.id)}
                        className={`text-xs px-3 py-1.5 border transition-all cursor-pointer font-medium flex items-center gap-1 rounded-sm ${
                          isActive
                            ? 'bg-[#8A4F2C] text-white border-[#8A4F2C] shadow-sm ring-1 ring-[#8A4F2C]'
                            : 'bg-[#FAF8F5] text-[#3D3835] border-[#EFE8DF] hover:border-stone-400'
                        }`}
                      >
                        {item.label}
                        {isActive && <CheckOutlined className="text-[10px]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Selector */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider block">
                  Tông màu chủ đạo:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {COLOR_OPTIONS.map((item) => {
                    const isActive = selectedColor === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleColorClick(item.id)}
                        className={`text-xs px-2.5 py-1.5 border transition-all cursor-pointer font-medium flex items-center gap-2 rounded-sm ${
                          isActive
                            ? 'bg-[#FAF8F5] text-[#8A4F2C] border-[#8A4F2C] ring-2 ring-[#8A4F2C] shadow-sm'
                            : 'bg-white text-[#3D3835] border-[#EFE8DF] hover:border-stone-400'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: item.colorDot }}
                        />
                        <span className="truncate">{item.label}</span>
                        {isActive && <CheckOutlined className="text-[11px] ml-auto text-[#8A4F2C]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detail Accent Tags */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider block">
                  + Thêm nhanh chi tiết nội thất:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {DETAIL_TAGS.map((tag) => (
                    <button
                      key={tag.label}
                      type="button"
                      onClick={() => handleDetailTagClick(tag.phrase)}
                      className="text-[11px] px-2.5 py-1 bg-white hover:bg-[#8A4F2C] hover:text-white text-[#5C554E] border border-[#E8DFC0] transition-colors rounded-sm cursor-pointer"
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <Button
              type="primary"
              size="large"
              block
              loading={loading}
              onClick={handleGenerate}
              icon={<ThunderboltFilled className="text-amber-300" />}
              className="!h-14 !text-base sm:!text-[17px] !font-bold !bg-[#8A4F2C] hover:!bg-[#9C623C] !text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer mt-2"
            >
              {loading ? 'AI Đang Render Phối Cảnh 3D...' : 'Vẽ Không Gian Theo Ý Tưởng (Render 3D)'}
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
                {SPACE_OPTIONS.find((s) => s.id === selectedSpace)?.label} &bull; {STYLE_OPTIONS.find((s) => s.id === selectedStyle)?.label.split(' ')[0]}
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
                💡 <span className="font-semibold text-[#1A1613]">Mẹo:</span> Bạn có thể bấm <span className="text-[#8A4F2C] font-bold">"Tạo góc nhìn mới"</span> để AI tạo thêm các phương án phối cảnh khác.
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
