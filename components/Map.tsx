"use client";

import { useMemo } from "react";
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
}

export default function MapComponent({
  species,
  selectedYear,
  selectedCategory,
  mapboxToken,
}: MapComponentProps) {
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
    <div className="absolute inset-0 w-full h-full">
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
        {filteredSpecies.map((s) => {
          const status = getSpeciesStatusAtYear(s, selectedYear);
          const color = getStatusColor(status);

          return (
            <Marker
              key={s.id}
              longitude={s.location.lng}
              latitude={s.location.lat}
            >
              <div
                className="w-3 h-3 rounded-full border-2 border-white transition-all duration-300 hover:scale-150 cursor-pointer"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}80, 0 0 16px ${color}50, 0 0 24px rgba(255, 255, 255, 0.3)`,
                }}
                title={s.commonName}
              />
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}
