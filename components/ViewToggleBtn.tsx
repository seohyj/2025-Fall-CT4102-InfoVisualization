"use client";

import { LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Category } from "@/lib/types";

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

  if (!isVisible || !selectedCategory) return null;

  const handleClick = () => {
    // Navigate to gallery page with query parameters
    router.push(`/gallery?category=${selectedCategory}&year=${selectedYear}`);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="p-3 bg-black/80 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/90 hover:border-white/40 transition-all shadow-lg"
      aria-label="Open grid view"
    >
      <LayoutGrid className="w-5 h-5 text-white" />
      <span className="sr-only">Open Grid View</span>
    </motion.button>
  );
}
