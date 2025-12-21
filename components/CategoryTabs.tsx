"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Category } from "@/lib/types";

const CATEGORY_LABELS: Record<Category, { en: string; ko: string }> = {
  Mammals: { en: "Mammals", ko: "포유류" },
  Birds: { en: "Birds", ko: "조류" },
  Fish: { en: "Fish", ko: "어류" },
  Reptiles: { en: "Reptiles", ko: "파충류" },
  Amphibians: { en: "Amphibians", ko: "양서류" },
  Insects: { en: "Insects", ko: "곤충류" },
  Plants: { en: "Plants", ko: "식물" },
};

const CATEGORY_ICONS: Record<Category, string> = {
  Mammals: "/icons/mammals.svg",
  Birds: "/icons/birds.svg",
  Fish: "/icons/fish.svg",
  Reptiles: "/icons/reptiles.svg",
  Amphibians: "/icons/amphibians.svg",
  Insects: "/icons/insects.svg",
  Plants: "/icons/plants.svg",
};

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: Category | null;
  onCategorySelect: (category: Category | null) => void;
}

export default function CategoryTabs({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide">
      {/* 
        ============================================
        "All" 카테고리 버튼
        ============================================
        - h-full: 버튼 높이 (부모 컨테이너 높이에 맞춤)
        - px-3 md:px-4: 좌우 패딩 (모바일 12px, 데스크톱 16px)
        - gap-0.5: 텍스트와 아이콘 사이 간격 (2px)
        - 선택됨: bg-white/20 text-white border border-white/30
        - 미선택: text-white/70 hover:text-white hover:bg-white/10
      */}
      <button
        onClick={() => onCategorySelect(null)}
        className={`w-9 h-9 md:w-12 md:h-12 rounded-full transition-all relative flex items-center justify-center hover:scale-110 flex-shrink-0 ${
          selectedCategory === null
            ? "bg-white/20 ring-2 ring-white/30"
            : "hover:bg-white/10"
        }`}
        title="All"
      >
        {/* 지구본 아이콘 컨테이너 */}
        <div className="relative w-full h-full flex-shrink-0 p-1 md:p-1.5">
          <Image
            src="/icons/globe.png"
            alt="All"
            width={48}
            height={48}
            className={`
              w-full h-full         /* 컨테이너 크기에 맞춤 */
              object-contain        /* 비율 유지하며 컨테이너에 맞춤 */
              ${
                selectedCategory === null ? "" : "invert"
              }  /* 선택되지 않았을 때 색상 반전 */
            `}
          />
        </div>

        {/* 
          선택된 상태 표시 애니메이션 (배경 하이라이트)
          - bg-white/20: 배경색 (흰색 20%)
          - border border-white/30: 테두리 (흰색 30% 투명도)
        */}
        {selectedCategory === null && (
          <motion.div
            layoutId="categoryIndicator"
            className="absolute inset-0 rounded-full bg-white/20 ring-2 ring-white/30 -z-10"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>

      {/* 
        ============================================
        개별 카테고리 버튼들 (Mammals, Birds, 등)
        ============================================
        - h-full: 버튼 높이 (부모 컨테이너 높이에 맞춤)
        - px-3 md:px-4: 좌우 패딩 (모바일 12px, 데스크톱 16px)
        - gap-0.5: 텍스트와 아이콘 사이 간격 (2px)
        - 선택됨: bg-white/20 text-white border border-white/30
        - 미선택: text-white/70 hover:text-white hover:bg-white/10
      */}
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`w-9 h-9 md:w-12 md:h-12 rounded-full transition-all relative flex items-center justify-center hover:scale-110 flex-shrink-0 ${
              isSelected
                ? "bg-white/20 ring-2 ring-white/30"
                : "hover:bg-white/10"
            }`}
            title={CATEGORY_LABELS[category].en}
          >
            {/* SVG 아이콘 컨테이너 */}
            <div className="relative w-full h-full flex-shrink-0">
              <Image
                src={CATEGORY_ICONS[category]}
                alt={category}
                width={48}
                height={48}
                className={`w-full h-full object-contain ${
                  isSelected ? "invert" : ""
                }`}
              />
            </div>

            {/* 
              선택된 상태 표시 애니메이션 (배경 하이라이트)
              - bg-white/20: 배경색 (흰색 20%)
              - border border-white/30: 테두리 (흰색 30% 투명도)
            */}
            {isSelected && (
              <motion.div
                layoutId="categoryIndicator"
                className="absolute inset-0 rounded-full bg-white/20 ring-2 ring-white/30 -z-10"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
