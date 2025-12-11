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

  if (!isVisible) return null;

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
  const iconSrc = selectedCategory
    ? CATEGORY_ICONS[selectedCategory]
    : "/icons/document.svg";

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="px-6 py-4 bg-black/80 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/90 hover:border-white/40 transition-all shadow-lg flex flex-col items-center justify-center gap-2"
      aria-label="More about"
    >
      <span className="text-white text-2xl font-medium">More About</span>
      {/* SVG Icon - Below text */}
      <div className="relative w-32 h-32 flex-shrink-0">
        <Image
          src={iconSrc}
          alt="More about"
          width={128}
          height={128}
          className="w-full h-full object-contain"
        />
      </div>
      <span className="sr-only">More about</span>
    </motion.button>
  );
}
