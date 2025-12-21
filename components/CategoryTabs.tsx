"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Category } from "@/lib/types";
import { withBasePath } from "@/lib/basePath";

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
        className="w-[84px] md:w-24 rounded-full transition-all relative flex flex-col items-center justify-center gap-0.5 hover:scale-105 flex-shrink-0 py-2"
        title="All"
      >
        {/* Sliding Pill Background */}
        {selectedCategory === null && (
          <motion.div
            layoutId="categoryIndicator"
            className="absolute inset-0 rounded-xl bg-white/10 -z-10"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}

        {/* 지구본 아이콘 컨테이너 */}
        <div className="relative w-12 h-12 md:w-[60px] md:h-[60px] flex-shrink-0 p-1.5 md:p-2">
          <Image
            src={withBasePath("/icons/globe.png")}
            alt="All"
            width={72}
            height={72}
            className="w-full h-full object-contain invert"
          />
        </div>

        {/* Text Label */}
        <span
          className={`text-[40px] md:text-base font-medium leading-tight ${
            selectedCategory === null ? "text-white" : "text-white/70"
          }`}
        >
          All
        </span>
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
        // Safety check: ensure category exists in CATEGORY_LABELS
        const categoryLabel = CATEGORY_LABELS[category] || {
          en: category,
          ko: category,
        };
        return (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className="w-[84px] md:w-24 rounded-full transition-all relative flex flex-col items-center justify-center gap-0.5 hover:scale-105 flex-shrink-0 py-2"
            title={categoryLabel.en}
          >
            {/* Sliding Pill Background */}
            {isSelected && (
              <motion.div
                layoutId="categoryIndicator"
                className="absolute inset-0 rounded-xl bg-white/10 -z-10"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            {/* SVG 아이콘 컨테이너 */}
            <div className="relative w-12 h-12 md:w-[60px] md:h-[60px] flex-shrink-0">
              <Image
                src={withBasePath(CATEGORY_ICONS[category] || "/icons/all.svg")}
                alt={category}
                width={72}
                height={72}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Text Label */}
            <span
              className={`text-[40px] md:text-base font-medium leading-tight ${
                isSelected ? "text-white" : "text-white/70"
              }`}
            >
              {categoryLabel.en}
            </span>
          </button>
        );
      })}
    </div>
  );
}
