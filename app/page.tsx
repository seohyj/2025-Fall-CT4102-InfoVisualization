"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/Layout";
import MapComponent from "@/components/Map";
import YearSlider from "@/components/YearSlider";
import CategoryTabs from "@/components/CategoryTabs";
import DetailModal from "@/components/DetailModal";
import ViewToggleBtn from "@/components/ViewToggleBtn";
import { loadSpeciesData, getCategories, getSpeciesForYear } from "@/lib/data";
import { SpeciesData, Category, Species } from "@/lib/types";
import Image from "next/image";

const MIN_YEAR = 2009;
const MAX_YEAR = 2024;

function HomeContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<SpeciesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");

  // Read URL parameters on mount
  useEffect(() => {
    const yearParam = searchParams.get("year");
    const categoryParam = searchParams.get("category");

    if (yearParam) {
      const year = parseInt(yearParam);
      if (year >= MIN_YEAR && year <= MAX_YEAR) {
        setSelectedYear(year);
      }
    }

    if (categoryParam) {
      const validCategories: Category[] = [
        "Mammals",
        "Birds",
        "Fish",
        "Reptiles",
        "Amphibians",
        "Insects",
        "Plants",
      ];
      if (validCategories.includes(categoryParam as Category)) {
        setSelectedCategory(categoryParam as Category);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    // Load Mapbox token from environment
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
    setMapboxToken(token);

    // Load species data
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

  if (loading || !data) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">Loading...</div>
            <div className="text-gray-400 text-sm">
              {!mapboxToken && "⚠️ Please set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN"}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!mapboxToken) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center bg-black/60 backdrop-blur-md p-8 rounded-lg border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Mapbox Token Required</h2>
            <p className="text-gray-400 mb-4">
              Please set your Mapbox access token in the environment variables.
            </p>
            <p className="text-sm text-gray-500">
              Create a{" "}
              <code className="bg-gray-900 px-2 py-1 rounded">.env.local</code>{" "}
              file with:
              <br />
              <code className="bg-gray-900 px-2 py-1 rounded">
                NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here
              </code>
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const categories = getCategories(data);

  return (
    <>
      <Layout>
        {/* Map Background */}
        <MapComponent
          species={data.species}
          selectedYear={selectedYear}
          selectedCategory={selectedCategory}
          mapboxToken={mapboxToken}
          onSpeciesClick={setSelectedSpecies}
        />

        {/* Title - Compact Logo */}
        <div className="fixed top-6 left-6 md:left-8 z-50">
          <div className="flex flex-col leading-none">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-white drop-shadow-lg tracking-tight">
              The Spectrum of
            </h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg tracking-tight">
              Extinction
            </h2>
          </div>
        </div>

        {/* Unified Navigation Bar - Center Anchor */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-full px-4 md:px-8 py-4 md:py-5 flex items-center gap-4 md:gap-8 shadow-2xl">
            {/* About Icon Button */}
            <Link
              href="/about"
              className="w-[84px] md:w-24 flex flex-col items-center justify-center gap-0.5 transition-all hover:scale-105 rounded-full flex-shrink-0 py-2"
              aria-label="About"
              title="About"
            >
              <div className="relative w-12 h-12 md:w-[60px] md:h-[60px] flex-shrink-0">
                <Image
                  src="/icons/about.svg"
                  alt="About"
                  width={72}
                  height={72}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[40px] md:text-base font-medium leading-tight text-white/70">
                About
              </span>
            </Link>

            {/* Divider */}
            <div className="w-px h-9 md:h-12 bg-white/20 flex-shrink-0"></div>

            {/* Category Tabs */}
            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={(category) => {
                setSelectedCategory(category);
              }}
            />

            {/* Divider - Always rendered to maintain layout */}
            <div className="w-px h-9 md:h-12 bg-white/20 flex-shrink-0"></div>

            {/* More About Icon Button - Always rendered, visibility controlled by opacity */}
            <ViewToggleBtn
              selectedCategory={selectedCategory}
              selectedYear={selectedYear}
              isVisible={selectedCategory !== null}
            />
          </div>
        </nav>

        {/* Year Slider */}
        <YearSlider
          minYear={MIN_YEAR}
          maxYear={MAX_YEAR}
          currentYear={selectedYear}
          onYearChange={setSelectedYear}
        />

        {/* Info Overlay (Bottom Left) - Show for all categories */}
        <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 z-20 bg-black/60 backdrop-blur-md rounded-lg p-6 md:p-8 border border-white/10 max-w-sm">
          <div className="text-xl text-white/80 space-y-2">
            <div>
              <span className="font-semibold">Year:</span> {selectedYear}
            </div>
            <div>
              <span className="font-semibold">Category:</span>{" "}
              {selectedCategory || "All"}
            </div>
            <div>
              <span className="font-semibold">Species:</span>{" "}
              {selectedCategory
                ? getSpeciesForYear(data, selectedYear, selectedCategory).length
                : getSpeciesForYear(data, selectedYear).length}
            </div>
          </div>
        </div>

        {/* Detail Modal */}
        <DetailModal
          species={selectedSpecies}
          selectedYear={selectedYear}
          onClose={() => setSelectedSpecies(null)}
        />
      </Layout>
    </>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <Layout>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">Loading...</div>
            </div>
          </div>
        </Layout>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
