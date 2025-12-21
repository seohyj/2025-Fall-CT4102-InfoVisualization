"use client";

import { useMemo, useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Species, Category } from "@/lib/types";
import { getSpeciesStatusAtYear } from "@/lib/data";
import { getStatusColor } from "@/lib/colors";

interface MapComponentProps {
  species: Species[];
  selectedYear: number;
  selectedCategory: Category | null;
  mapboxToken: string;
  onSpeciesClick?: (species: Species) => void;
}

export default function MapComponent({
  species,
  selectedYear,
  selectedCategory,
  mapboxToken,
  onSpeciesClick,
}: MapComponentProps) {
  const [hoveredSpecies, setHoveredSpecies] = useState<Species | null>(null);

  // Filter species by category
  const filteredSpecies = useMemo(() => {
    if (!selectedCategory) return species;
    return species.filter((s) => s.category === selectedCategory);
  }, [species, selectedCategory]);

  // Map style - Realistic Earth (Satellite)
  const mapStyle = "mapbox://styles/mapbox/standard-satellite";

  // Initial viewport
  const initialViewState = {
    longitude: 0,
    latitude: 20,
    zoom: 2,
  };

  return (
    <div className="absolute inset-0 w-full h-full z-10">
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={initialViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        projection={{ name: "globe" }}
        reuseMaps
      >
        {/* Custom styling overlay */}
        <style>{`
          .mapboxgl-ctrl-logo {
            display: none !important;
          }
          .mapboxgl-ctrl-attrib {
            background-color: rgba(0, 0, 0, 0.5) !important;
            color: rgba(255, 255, 255, 0.5) !important;
          }
        `}</style>

        {/* Species Markers */}
        {filteredSpecies
          .filter((s) => {
            // Validate coordinates before rendering
            const lat = s.location?.lat;
            const lng = s.location?.lng;
            return (
              typeof lat === "number" &&
              !isNaN(lat) &&
              lat >= -90 &&
              lat <= 90 &&
              typeof lng === "number" &&
              !isNaN(lng) &&
              lng >= -180 &&
              lng <= 180
            );
          })
          .map((s) => {
            const status = getSpeciesStatusAtYear(s, selectedYear);
            const color = getStatusColor(status);
            const isHovered = hoveredSpecies?.id === s.id;

            return (
              <Marker
                key={s.id}
                longitude={s.location.lng}
                latitude={s.location.lat}
              >
              <div
                className="relative"
                onMouseEnter={() => setHoveredSpecies(s)}
                onMouseLeave={() => setHoveredSpecies(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onSpeciesClick?.(s);
                }}
              >
                <div
                  className="w-3 h-3 rounded-full border-2 border-white transition-all duration-300 hover:scale-150 cursor-pointer"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 8px ${color}80, 0 0 16px ${color}50, 0 0 24px rgba(255, 255, 255, 0.3)`,
                  }}
                />
                {/* Tooltip - Clickable */}
                {isHovered && (
                  <div 
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 whitespace-nowrap z-50 cursor-pointer hover:bg-black/95 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSpeciesClick?.(s);
                    }}
                  >
                    <span className="text-white text-xl font-medium">
                      {s.commonName}
                    </span>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                      <div className="w-2 h-2 bg-black/90 border-r border-b border-white/20 transform rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>
            </Marker>
            );
          })}
      </Map>
    </div>
  );
}
