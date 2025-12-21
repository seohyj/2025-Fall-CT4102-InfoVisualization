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
    <div className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-20 px-4">
      <div className="flex items-center gap-3 md:gap-4">
        {aboutButton}
        <div className="flex gap-3 bg-black/60 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/10">
          {/* All Categories Button */}
          <button
            onClick={() => onCategorySelect(null)}
            className={`px-4 md:px-6 py-3 md:py-4 rounded-2xl text-2xl font-medium transition-all relative flex flex-col items-center justify-center gap-2 ${
              selectedCategory === null
                ? "bg-white/20 text-white border border-white/30"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <span className="block text-2xl leading-tight">All</span>
            {/* Globe Icon - Below text - Normalized size with padding to match SVG icons */}
            <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0 p-3 md:p-4">
              <Image
                src="/icons/globe.png"
                alt="All"
                width={112}
                height={112}
                className={`w-full h-full object-contain ${
                  selectedCategory === null ? "" : "invert"
                }`}
              />
            </div>
            {selectedCategory === null && (
              <motion.div
                layoutId="categoryIndicator"
                className="absolute inset-0 rounded-2xl bg-white/20 border border-white/30 -z-10"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>

          {/* Category Buttons */}
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onCategorySelect(category)}
                className={`px-4 md:px-6 py-3 md:py-4 rounded-2xl text-2xl font-medium transition-all relative flex flex-col items-center justify-center gap-2 ${
                  isSelected
                    ? "bg-white/20 text-white border border-white/30"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {/* Text Labels */}
                <div className="flex flex-col items-center">
                  <span className="block text-2xl leading-tight">
                    {CATEGORY_LABELS[category].en}
                  </span>
                </div>
                {/* SVG Icon - Below text - Normalized size to match globe */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
                  <Image
                    src={CATEGORY_ICONS[category]}
                    alt={category}
                    width={112}
                    height={112}
                    className={`w-full h-full object-contain ${
                      isSelected ? "invert" : ""
                    }`}
                  />
                </div>
                {isSelected && (
                  <motion.div
                    layoutId="categoryIndicator"
                    className="absolute inset-0 rounded-2xl bg-white/20 border border-white/30 -z-10"
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
