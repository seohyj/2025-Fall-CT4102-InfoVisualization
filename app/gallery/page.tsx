"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { loadSpeciesData } from "@/lib/data";
import { SpeciesData, Category, IUCNStatus, Species } from "@/lib/types";
import { getCategoryStats, getSpeciesForYear } from "@/lib/data";
import StatsChart from "@/components/StatsChart";
import SpeciesGrid from "@/components/SpeciesGrid";
import DetailModal from "@/components/DetailModal";
import YearSlider from "@/components/YearSlider";

function GalleryContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<SpeciesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<IUCNStatus | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  // Get category and year from URL params
  const categoryParam = searchParams.get("category");
  const yearParam = searchParams.get("year");

  const [selectedYear, setSelectedYear] = useState(
    yearParam ? parseInt(yearParam) : 2025
  );
  const selectedCategory = categoryParam as Category | null;

  // Update URL when year changes
  useEffect(() => {
    if (selectedCategory) {
      const newUrl = `/gallery?category=${selectedCategory}&year=${selectedYear}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [selectedYear, selectedCategory]);

  useEffect(() => {
    loadSpeciesData()
      .then((loadedData) => {
        setData(loadedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load data:", error);
        setLoading(false);
      });
  }, []);

  // Reset status filter when category or year changes
  useEffect(() => {
    setSelectedStatus(null);
  }, [selectedCategory, selectedYear]);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Loading...</div>
        </div>
      </div>
    );
  }

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Category Required</h2>
          <p className="text-white/70 mb-6">
            Please select a category from the map view.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Map</span>
          </Link>
        </div>
      </div>
    );
  }

  // Get stats for the selected category and year
  const stats = getCategoryStats(data, selectedCategory, selectedYear);

  // Get species for the selected category and year
  const categorySpecies = getSpeciesForYear(
    data,
    selectedYear,
    selectedCategory
  );

  // Build back URL with year parameter
  const backUrl = `/?year=${selectedYear}${
    selectedCategory ? `&category=${selectedCategory}` : ""
  }`;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href={backUrl}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Map</span>
          </Link>
          <h1 className="text-2xl font-bold">{selectedCategory}</h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="h-[calc(100vh-73px)] flex flex-col md:flex-row">
        {/* Left Panel - Stats Chart */}
        <div className="w-full md:w-[35%] lg:w-[30%] p-8 md:p-10 lg:p-12 border-b md:border-b-0 md:border-r border-white/10 bg-black/50 flex-shrink-0 flex flex-col">
          <div className="flex-shrink-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
              {selectedCategory}
            </h2>
          </div>
          <div className="flex-1 min-h-0" style={{ minHeight: "300px" }}>
            <StatsChart
              stats={stats}
              selectedStatus={selectedStatus}
              onStatusClick={setSelectedStatus}
            />
          </div>
          {/* Year Slider - Horizontal below chart */}
          <div className="flex-shrink-0 mt-6">
            <YearSlider
              minYear={2009}
              maxYear={2025}
              currentYear={selectedYear}
              onYearChange={setSelectedYear}
              orientation="horizontal"
            />
          </div>
        </div>

        {/* Right Panel - Photo Grid */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="p-8 md:p-10 lg:p-12 border-b border-white/10 flex-shrink-0">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">
              Species Gallery
            </h3>
            <p className="text-white/60 text-sm md:text-base">
              {categorySpecies.length} species found
              {selectedStatus && ` • Filtered by ${selectedStatus}`}
            </p>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden px-8 md:px-10 lg:px-12 pb-8 md:pb-10 lg:pb-12">
            <SpeciesGrid
              species={categorySpecies}
              selectedYear={selectedYear}
              selectedStatus={selectedStatus}
              onSpeciesClick={setSelectedSpecies}
            />
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal
        species={selectedSpecies}
        selectedYear={selectedYear}
        onClose={() => setSelectedSpecies(null)}
      />
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">Loading...</div>
          </div>
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}
