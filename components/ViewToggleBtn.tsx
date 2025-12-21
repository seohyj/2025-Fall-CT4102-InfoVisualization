"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Category } from "@/lib/types";

const CATEGORY_ICONS: Record<Category, string> = {
  Mammals: "/icons/mammals.svg",
  Birds: "/icons/birds.svg",
  Fish: "/icons/fish.svg",
  Reptiles: "/icons/reptiles.svg",
  Amphibians: "/icons/amphibians.svg",
  Insects: "/icons/insects.svg",
  Plants: "/icons/plants.svg",
};

interface ViewToggleBtnProps {
  selectedCategory: Category | null;
  selectedYear: number;
  isVisible: boolean;
}

export default function ViewToggleBtn({
  selectedCategory,
  selectedYear,
  isVisible,
}: ViewToggleBtnProps) {
  const router = useRouter();

  const handleClick = () => {
    if (selectedCategory) {
      // Navigate to gallery page with query parameters
      router.push(`/gallery?category=${selectedCategory}&year=${selectedYear}`);
    } else {
      // If All is selected, navigate to gallery with no category filter
      router.push(`/gallery?year=${selectedYear}`);
    }
  };

  // Determine which icon to show
  const iconSrc = selectedCategory ? CATEGORY_ICONS[selectedCategory] : null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      whileHover={isVisible ? { scale: 1.05 } : {}}
      whileTap={isVisible ? { scale: 0.95 } : {}}
      onClick={handleClick}
      className={`w-14 md:w-16 flex flex-col items-center justify-center gap-0.5 transition-all rounded-full flex-shrink-0 py-1.5 ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-label="More about"
      title="More About"
    >
      {iconSrc && (
        <div className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
          <Image
            src={iconSrc}
            alt="More about"
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <span
        className={`text-[10px] md:text-xs font-medium leading-tight ${
          isVisible ? "text-white/70" : "text-transparent"
        }`}
      >
        More
      </span>
      <span className="sr-only">More about</span>
    </motion.button>
  );
}
