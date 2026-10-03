'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Modal, Input, Pagination } from 'antd';
import {
  ArrowRightOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  SearchOutlined,
  PictureOutlined,
  LeftOutlined,
  RightOutlined,
  ExpandOutlined,
  CompressOutlined,
} from '@ant-design/icons';
import { CATEGORIES, PROJECTS_DATA, ProjectItem } from '@/data/landingData';

interface FeaturedProjectsProps {
  onOpenConsultation: (projectName?: string) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onOpenConsultation }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');

  const pageSize = 9;

  // Filter logic
  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.style.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalProjects = filteredProjects.length;
  const startIndex = (currentPage - 1) * pageSize;
  const visibleProjects = filteredProjects.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('projects');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleOpenProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setActivePhotoIndex(0);
  };

  const getCategoryCount = (key: string) => {
    if (key === 'all') return PROJECTS_DATA.length;
    return PROJECTS_DATA.filter((p) => p.category === key).length;
  };

  return (
    <section id="projects" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#8A4F2C]">
            BỘ SƯU TẬP DỰ ÁN
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1613] tracking-tight">
            Dự Án Tiêu Biểu
          </h2>
          <p className="text-sm sm:text-base text-[#6B635B] max-w-2xl mx-auto">
            Khám phá các công trình thiết kế và thi công nội thất biệt thự, căn hộ cao cấp, nhà phố
            và penthouse được thực hiện bởi D&apos;Luxury Design.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 sm:space-y-6 mb-10 sm:mb-14">
          {/* Category Filter Tabs - Horizontal Swipe on Mobile, Centered on Desktop */}
          <div className="flex sm:flex-wrap items-center sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1.5 -mx-4 sm:mx-0 px-4 sm:px-0 scroll-smooth">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              const count = getCategoryCount(cat.key);
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.key);
                    setCurrentPage(1);
                  }}
                  className={`h-10 sm:h-11 px-4 sm:px-6 rounded-full text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#8A4F2C] text-white shadow-md font-semibold ring-2 ring-[#8A4F2C]/20'
                      : 'bg-[#FAF8F5] text-[#5C554E] hover:bg-[#F3EAE1] hover:text-[#8A4F2C] border border-[#EFE8DF] font-medium'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full font-semibold ${
                      isActive ? 'bg-white/25 text-white' : 'bg-[#EAE2D7] text-[#733E22]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box - Centered below filter tabs */}
          <div className="max-w-md mx-auto">
            <Input
              prefix={<SearchOutlined className="text-[#8A4F2C] text-base mr-1" />}
              placeholder="Tìm kiếm dự án theo tên, vị trí, phong cách..."
              allowClear
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="!rounded-full !h-11 !px-4 !border-[#D5BEA8] !bg-[#FAF8F5] hover:!border-[#8A4F2C] focus:!border-[#8A4F2C] shadow-xs"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {visibleProjects.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF8F5] rounded-3xl border border-[#EFE8DF]">
            <PictureOutlined className="text-4xl text-[#C5A880] mb-3" />
            <p className="text-base font-semibold text-[#1A1613]">
              Không tìm thấy dự án phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;
            </p>
            <Button
              type="primary"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setCurrentPage(1);
              }}
              className="mt-4 !rounded-full"
            >
              Xem tất cả dự án
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleOpenProject(project)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#EFE8DF] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col hover:-translate-y-2 relative"
              >
                {/* Image with Tag & Photo Count */}
                <div className="relative h-72 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Floating Category Tag */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md">
                    <span className="text-[11px] font-bold text-[#8A4F2C] tracking-wide uppercase">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Photo Count Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-semibold flex items-center gap-1 border border-white/20">
                    <PictureOutlined className="text-xs text-[#E8DCCF]" />
                    <span>{project.gallery.length} ảnh</span>
                  </div>

                  {/* Bottom Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white flex items-end justify-between">
                    <div className="pr-3">
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D5BEA8] transition-colors leading-snug line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-stone-300 mt-1">
                        {project.style} &bull; {project.area}
                      </p>
                    </div>

                    {/* Circular Detail Button */}
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white group-hover:bg-[#8A4F2C] group-hover:border-[#8A4F2C] transition-all duration-300 shrink-0 shadow-md">
                      <ArrowRightOutlined className="text-xs -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Section */}
        {totalProjects > pageSize && (
          <div className="mt-14 pt-8 border-t border-[#EFE8DF] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-[#78716C] order-2 sm:order-1">
              Hiển thị <span className="font-semibold text-[#1A1613]">{startIndex + 1}</span> -{' '}
              <span className="font-semibold text-[#1A1613]">
                {Math.min(startIndex + pageSize, totalProjects)}
              </span>{' '}
              trên tổng số <span className="font-semibold text-[#8A4F2C]">{totalProjects}</span> dự án
            </div>

            <div className="order-1 sm:order-2">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalProjects}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </div>
        )}
      </div>

      {/* Project Detail & Multi-Photo Gallery Modal */}
      <Modal
        open={!!selectedProject}
        onCancel={() => setSelectedProject(null)}
        footer={null}
        centered
        width={960}
        title={
          <div className="font-serif text-xl sm:text-2xl font-bold text-[#1A1613] pr-6">
            {selectedProject?.title}
          </div>
        }
      >
        {selectedProject && (
          <div className="space-y-6 pt-2">
            {/* Main Active Photo Viewer */}
            <div className="relative h-[250px] sm:h-[480px] rounded-xl sm:rounded-2xl overflow-hidden bg-stone-950 shadow-inner group">
              {/* Soft Ambient Blurred Glow of current photo */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Image
                  src={selectedProject.gallery[activePhotoIndex] || selectedProject.image}
                  alt=""
                  fill
                  className="object-cover blur-2xl opacity-40 scale-110 transition-all duration-500"
                />
              </div>

              {/* Main Photo */}
              <Image
                src={selectedProject.gallery[activePhotoIndex] || selectedProject.image}
                alt={`${selectedProject.title} ảnh ${activePhotoIndex + 1}`}
                fill
                priority
                className={`transition-all duration-300 ${
                  fitMode === 'cover' ? 'object-cover' : 'object-contain'
                }`}
                sizes="(max-width: 1024px) 100vw, 920px"
              />

              {/* Fit Mode Toggle Button */}
              <button
                type="button"
                onClick={() => setFitMode((prev) => (prev === 'cover' ? 'contain' : 'cover'))}
                className="absolute top-3 left-3 bg-black/60 hover:bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-medium flex items-center gap-1.5 transition-all border border-white/20 z-20 cursor-pointer shadow-md"
                title={fitMode === 'cover' ? 'Chuyển xem trọn vẹn góc chụp' : 'Chuyển xem vừa khít tràn khung'}
              >
                {fitMode === 'cover' ? (
                  <>
                    <CompressOutlined className="text-xs" />
                    <span>Xem gốc</span>
                  </>
                ) : (
                  <>
                    <ExpandOutlined className="text-xs" />
                    <span>Tràn khung</span>
                  </>
                )}
              </button>

              {/* Photo Counter */}
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-semibold border border-white/10 z-20">
                Ảnh {activePhotoIndex + 1} / {selectedProject.gallery.length}
              </div>

              {/* Prev / Next navigation arrows */}
              {selectedProject.gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex((prev) =>
                        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all z-20 shadow-lg cursor-pointer border border-white/10 hover:scale-110"
                  >
                    <LeftOutlined className="text-xs sm:text-sm" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex((prev) =>
                        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all z-20 shadow-lg cursor-pointer border border-white/10 hover:scale-110"
                  >
                    <RightOutlined className="text-xs sm:text-sm" />
                  </button>
                </>
              )}
            </div>

            {/* Clickable Gallery Thumbnails */}
            {selectedProject.gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {selectedProject.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActivePhotoIndex(i)}
                    className={`relative w-16 h-12 sm:w-24 sm:h-16 rounded-lg overflow-hidden shrink-0 transition-all border-2 ${
                      activePhotoIndex === i
                        ? 'border-[#8A4F2C] scale-105 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={imgUrl} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-xl bg-[#FAF8F5] border border-[#EFE8DF]">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[11px] sm:text-xs text-[#78716C] block font-medium">Hạng mục</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A1613]">
                  {selectedProject.categoryLabel}
                </span>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[11px] sm:text-xs text-[#78716C] block font-medium">Diện tích</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A1613]">{selectedProject.area}</span>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[11px] sm:text-xs text-[#78716C] block font-medium">Địa điểm</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A1613] flex items-center gap-1">
                  <EnvironmentOutlined className="text-[#8A4F2C]" /> {selectedProject.location}
                </span>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[11px] sm:text-xs text-[#78716C] block font-medium">Thời gian</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A1613] flex items-center gap-1">
                  <CalendarOutlined className="text-[#8A4F2C]" /> {selectedProject.year}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[#5C554E] leading-relaxed text-xs sm:text-base">
              {selectedProject.description}
            </p>

            {/* Modal Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#F5EFE6]">
              <span className="text-xs text-[#78716C] text-center sm:text-left">
                Tổng cộng {selectedProject.gallery.length} góc nhìn hoàn thiện
              </span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <Button onClick={() => setSelectedProject(null)} className="!h-11 sm:!h-10">Đóng</Button>
                <Button
                  type="primary"
                  icon={<ArrowRightOutlined />}
                  onClick={() => {
                    const pTitle = selectedProject.title;
                    setSelectedProject(null);
                    onOpenConsultation(pTitle);
                  }}
                  className="!h-11 sm:!h-10 !text-white !font-semibold"
                >
                  Nhận báo giá dự án tương tự
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
