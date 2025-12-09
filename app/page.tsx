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
import { loadSpeciesData, getCategories } from "@/lib/data";
import { SpeciesData, Category, Species } from "@/lib/types";

const MIN_YEAR = 2009;
const MAX_YEAR = 2025;

function HomeContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<SpeciesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2025);
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
          <div className="text-center bg-black/80 p-8 rounded-lg border border-white/10">
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
        />

        {/* Title */}
        <div className="absolute top-8 left-8 z-20">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg mb-2">
            The Spectrum
          </h1>
          <h2 className="text-4xl font-light text-white/90 drop-shadow-lg">
            of Extinction
          </h2>
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={(category) => {
            setSelectedCategory(category);
          }}
          aboutButton={
            <Link
              href="/about"
              className="p-3 bg-black/80 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/90 hover:border-white/40 transition-all shadow-lg"
              aria-label="About"
            >
              <span className="text-white text-base font-medium">About</span>
            </Link>
          }
          gridButton={
            <ViewToggleBtn
              selectedCategory={selectedCategory}
              selectedYear={selectedYear}
              isVisible={selectedCategory !== null}
            />
          }
        />

        {/* Year Slider */}
        <YearSlider
          minYear={MIN_YEAR}
          maxYear={MAX_YEAR}
          currentYear={selectedYear}
          onYearChange={setSelectedYear}
        />

        {/* Info Overlay (Bottom Left) - Only show when no category selected */}
        {!selectedCategory && (
          <div className="absolute bottom-8 left-8 z-20 bg-black/60 backdrop-blur-sm rounded-lg p-6 border border-white/10 max-w-sm">
            <div className="text-xl text-white/80 space-y-2">
              <div>
                <span className="font-semibold">Year:</span> {selectedYear}
              </div>
              <div>
                <span className="font-semibold">Category:</span> All
              </div>
              <div>
                <span className="font-semibold">Species:</span>{" "}
                {data.species.length}
              </div>
            </div>
          </div>
        )}

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
