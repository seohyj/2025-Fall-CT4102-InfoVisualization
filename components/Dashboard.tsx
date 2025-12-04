"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpeciesData, Category, IUCNStatus } from "@/lib/types";
import { getCategoryStats, getSpeciesForYear } from "@/lib/data";
import StatsChart from "./StatsChart";
import SpeciesGrid from "./SpeciesGrid";
import { X } from "lucide-react";

interface DashboardProps {
  data: SpeciesData;
  selectedCategory: Category;
  selectedYear: number;
  isOpen: boolean;
  onClose: () => void;
  onSpeciesClick: (species: any) => void;
}

export default function Dashboard({
  data,
  selectedCategory,
  selectedYear,
  isOpen,
  onClose,
  onSpeciesClick,
}: DashboardProps) {
  const [selectedStatus, setSelectedStatus] = useState<IUCNStatus | null>(null);

  // Get stats for the selected category and year
  const stats = getCategoryStats(data, selectedCategory, selectedYear);

  // Get species for the selected category and year
  const categorySpecies = getSpeciesForYear(
    data,
    selectedYear,
    selectedCategory
  );

  // Reset status filter when category or year changes
  useEffect(() => {
    setSelectedStatus(null);
  }, [selectedCategory, selectedYear]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute inset-y-0 left-0 w-full md:w-[90%] lg:w-[85%] xl:w-[80%] bg-black/95 border-r border-white/10 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-40 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close dashboard"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Dashboard Content */}
          <div className="h-full flex flex-col md:flex-row">
            {/* Left Panel - Stats Chart */}
            <div className="w-full md:w-[35%] lg:w-[30%] p-4 md:p-6 border-b md:border-b-0 md:border-r border-white/10 bg-black/50 flex-shrink-0">
              <div className="h-full flex flex-col">
                <h2 className="text-xl md:text-2xl font-bold mb-2 text-white">
                  {selectedCategory}
                </h2>
                <p className="text-white/60 text-sm mb-4 md:mb-6">
                  Year: {selectedYear}
                </p>
                <div className="flex-1 min-h-0" style={{ minHeight: "300px" }}>
                  <StatsChart
                    stats={stats}
                    selectedStatus={selectedStatus}
                    onStatusClick={setSelectedStatus}
                  />
                </div>
              </div>
            </div>

            {/* Right Panel - Photo Grid */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="p-4 md:p-6 border-b border-white/10 flex-shrink-0">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
                  Species Gallery
                </h3>
                <p className="text-white/60 text-xs md:text-sm">
                  {categorySpecies.length} species found
                  {selectedStatus && ` • Filtered by ${selectedStatus}`}
                </p>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                <SpeciesGrid
                  species={categorySpecies}
                  selectedYear={selectedYear}
                  selectedStatus={selectedStatus}
                  onSpeciesClick={onSpeciesClick}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
