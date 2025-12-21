"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Species } from "@/lib/types";
import { getSpeciesStatusAtYear } from "@/lib/data";
import { getStatusColor, STATUS_LABELS } from "@/lib/colors";
import {
  X,
  ExternalLink,
  TrendingDown,
  TrendingUp,
  Minus,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

interface DetailModalProps {
  species: Species | null;
  selectedYear: number;
  onClose: () => void;
}

// Map threat titles to icons
const getThreatIcon = (threatTitle: string): string => {
  const title = threatTitle.toLowerCase();
  if (title.includes("housing") || title.includes("urban")) return "🏘️";
  if (title.includes("crop") || title.includes("agriculture")) return "🌾";
  if (title.includes("mining") || title.includes("quarrying")) return "⛏️";
  if (title.includes("road") || title.includes("railroad")) return "🛤️";
  if (title.includes("hunting") || title.includes("trapping")) return "🔫";
  if (title.includes("recreational")) return "🎣";
  if (title.includes("fire")) return "🔥";
  if (title.includes("invasive")) return "🦠";
  if (title.includes("pollution")) return "☢️";
  if (title.includes("habitat") || title.includes("shifting")) return "🌲";
  if (title.includes("climate")) return "🌡️";
  return "⚠️";
};

export default function DetailModal({
  species,
  selectedYear,
  onClose,
}: DetailModalProps) {
  const status = useMemo(() => {
    if (!species) return null;
    return getSpeciesStatusAtYear(species, selectedYear);
  }, [species, selectedYear]);

  const statusColor = status ? getStatusColor(status) : null;

  const getPopulationTrendIcon = (trend: string) => {
    switch (trend) {
      case "decreasing":
        return <TrendingDown className="w-5 h-5 text-red-400" />;
      case "increasing":
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case "stable":
        return <Minus className="w-5 h-5 text-yellow-400" />;
      default:
        return <Minus className="w-5 h-5 text-gray-400" />;
    }
  };

  if (!species) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-black/60 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Left Panel - Image (Desktop) */}
          <div className="w-full md:w-1/2 relative bg-gray-900 flex-shrink-0 flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-0">
            {species.imageUrl ? (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <div className="relative w-full h-full max-h-[90vh] flex items-center justify-center">
                  <Image
                    src={species.imageUrl}
                    alt={species.commonName}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <span className="text-white/30 text-lg text-center px-4">
                  {species.commonName}
                </span>
              </div>
            )}
            {/* Status Badge Overlay */}
            {statusColor && (
              <div className="absolute top-4 left-4 z-10">
                <div
                  className="px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg"
                  style={{ backgroundColor: statusColor }}
                >
                  {status && STATUS_LABELS[status]}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Content */}
          <div className="w-full md:w-1/2 flex flex-col overflow-y-auto bg-black/60 backdrop-blur-md max-h-[90vh]">
            <div className="p-6 md:p-8 space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                  {species.commonName}
                </h1>
                <p className="text-xl md:text-2xl text-white/60 italic leading-relaxed">
                  {species.scientificName}
                </p>
              </div>

              {/* Key Metrics */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  {getPopulationTrendIcon(species.populationTrend)}
                  <span className="text-white/80 text-sm capitalize">
                    {species.populationTrend}
                  </span>
                </div>
                {species.location.country && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-white/60" />
                    <span className="text-white/80 text-sm">
                      {species.location.country}
                    </span>
                  </div>
                )}
              </div>

              {/* Threats Section */}
              {species.threats && species.threats.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Main Threats
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {species.threats.map((threat, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10"
                      >
                        <span className="text-lg">
                          {getThreatIcon(threat.title)}
                        </span>
                        <span className="text-white/80 text-sm">
                          {threat.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Narrative */}
              {species.description && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                    Why is this species disappearing?
                  </h3>
                  <p className="text-white/70 leading-relaxed text-base">
                    {species.description}
                  </p>
                </div>
              )}

              {/* Call to Action */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={species.iucnUrl || "https://www.iucnredlist.org"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 border-2 border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
                >
                  <span>Check out more at IUCN Red List</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
