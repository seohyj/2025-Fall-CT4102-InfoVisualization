"use client";

import { motion } from "framer-motion";
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

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: Category | null;
  onCategorySelect: (category: Category | null) => void;
  aboutButton?: React.ReactNode;
  gridButton?: React.ReactNode;
}

export default function CategoryTabs({
  categories,
  selectedCategory,
  onCategorySelect,
  aboutButton,
  gridButton,
}: CategoryTabsProps) {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
      <div className="flex items-center gap-3">
        {aboutButton}
        <div className="flex gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
          {/* All Categories Button */}
          <button
            onClick={() => onCategorySelect(null)}
            className={`px-4 py-2 rounded-full text-base font-medium transition-all ${
              selectedCategory === null
                ? "bg-white text-black"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            All
          </button>

          {/* Category Buttons */}
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onCategorySelect(category)}
                className={`px-4 py-2 rounded-full text-base font-medium transition-all relative ${
                  isSelected
                    ? "bg-white text-black"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="block">{CATEGORY_LABELS[category].en}</span>
                <span className="block text-sm opacity-80">
                  {CATEGORY_LABELS[category].ko}
                </span>
                {isSelected && (
                  <motion.div
                    layoutId="categoryIndicator"
                    className="absolute inset-0 rounded-full bg-white -z-10"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>
        {gridButton}
      </div>
    </div>
  );
}
