"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface YearSliderProps {
  minYear: number;
  maxYear: number;
  currentYear: number;
  onYearChange: (year: number) => void;
}

export default function YearSlider({
  minYear,
  maxYear,
  currentYear,
  onYearChange,
}: YearSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const percentage = ((currentYear - minYear) / (maxYear - minYear)) * 100;

  const calculateYear = (clientY: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const y = clientY - rect.top;
    const height = rect.height;
    const ratio = Math.max(0, Math.min(1, 1 - y / height)); // Invert for bottom-up
    const year = Math.round(minYear + ratio * (maxYear - minYear));
    onYearChange(year);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    calculateYear(e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    calculateYear(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center">
      {/* Year Display */}
      <motion.div
        className="mb-4 text-4xl font-bold text-white drop-shadow-lg"
        animate={{ scale: isDragging ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {currentYear}
      </motion.div>

      {/* Vertical Slider Container */}
      <div
        ref={sliderRef}
        className="relative h-[400px] w-12 flex flex-col items-center cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        {/* Track */}
        <div className="absolute h-full w-1 bg-gray-800 rounded-full" />

        {/* Filled Track */}
        <motion.div
          className="absolute bottom-0 w-1 bg-gradient-to-t from-extinction-lc via-extinction-cr to-extinction-ex3 rounded-full"
          style={{ height: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />

        {/* Thumb */}
        <motion.div
          className="absolute w-4 h-4 bg-white rounded-full shadow-lg z-10"
          style={{
            bottom: `${percentage}%`,
            transform: "translateY(50%)",
          }}
          animate={{
            scale: isDragging ? 1.3 : 1,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Year Labels */}
        <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-400 pointer-events-none">
          <span>{maxYear}</span>
          <span className="opacity-0">{minYear}</span>
          <span>{minYear}</span>
        </div>
      </div>

      {/* Year Range Label */}
      <div className="mt-4 text-xs text-gray-500">
        {minYear} - {maxYear}
      </div>
    </div>
  );
}
