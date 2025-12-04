"use client";

import { Species } from "@/lib/types";
import { getSpeciesStatusAtYear } from "@/lib/data";
import { getStatusColor, STATUS_LABELS } from "@/lib/colors";
import { motion } from "framer-motion";
import Image from "next/image";

interface SpeciesGridProps {
  species: Species[];
  selectedYear: number;
  selectedStatus: string | null;
  onSpeciesClick: (species: Species) => void;
}

export default function SpeciesGrid({
  species,
  selectedYear,
  selectedStatus,
  onSpeciesClick,
}: SpeciesGridProps) {
  // Filter by status if selected
  const filteredSpecies = species.filter((s) => {
    if (!selectedStatus) return true;
    const status = getSpeciesStatusAtYear(s, selectedYear);
    return status === selectedStatus;
  });

  if (filteredSpecies.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-white/50">
        <p>No species found for the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredSpecies.map((s, index) => {
          const status = getSpeciesStatusAtYear(s, selectedYear);
          const statusColor = getStatusColor(status);

          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-900 border border-white/10 hover:border-white/30 transition-all"
              onClick={() => onSpeciesClick(s)}
            >
              {/* Image */}
              {s.imageUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={s.imageUrl}
                    alt={s.commonName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-white/30 text-xs text-center px-2">
                    {s.commonName}
                  </span>
                </div>
              )}

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h4 className="text-white font-semibold text-sm mb-1">
                  {s.commonName}
                </h4>
                <p className="text-white/70 text-xs italic mb-2">
                  {s.scientificName}
                </p>
                <div
                  className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-white"
                  style={{ backgroundColor: statusColor }}
                >
                  {STATUS_LABELS[status]}
                </div>
              </div>

              {/* Status Badge (Always visible, subtle) */}
              <div className="absolute top-2 right-2">
                <div
                  className="w-3 h-3 rounded-full border border-white/50 shadow-lg"
                  style={{ backgroundColor: statusColor }}
                  title={STATUS_LABELS[status]}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
