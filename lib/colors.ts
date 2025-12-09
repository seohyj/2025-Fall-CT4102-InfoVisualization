/**
 * Multi-Color Spectrum Color System
 * Seaborn-style modern palette with distinct colors for each IUCN status
 *
 * This color scale uses distinct, easily distinguishable colors
 * to represent the spectrum of extinction risk.
 */

export const EXTINCTION_COLORS = {
  // IUCN Red List Categories - New Color Palette
  LC: "#4B8F54", // Least Concern - Green
  NT: "#F7C948", // Near Threatened - Yellow
  VU: "#E9692C", // Vulnerable - Orange
  EN: "#C42F40", // Endangered - Dark Red
  CR: "#3A3A3A", // Critically Endangered - Dark Grey
  EW: "#A4A4A4", // Extinct in the Wild - Grey
  EX: "#EFEFEF", // Extinct - Light Grey
} as const;

/**
 * Color array for gradient mapping (ordered by severity)
 */
export const COLOR_SCALE = [
  EXTINCTION_COLORS.LC, // 0 - Least Concern
  EXTINCTION_COLORS.NT, // 1 - Near Threatened
  EXTINCTION_COLORS.VU, // 2 - Vulnerable
  EXTINCTION_COLORS.EN, // 3 - Endangered
  EXTINCTION_COLORS.CR, // 4 - Critically Endangered
  EXTINCTION_COLORS.EW, // 5 - Extinct in the Wild
  EXTINCTION_COLORS.EX, // 6 - Extinct
] as const;

/**
 * Get color for IUCN status code
 */
export function getStatusColor(status: string): string {
  const upperStatus = status.toUpperCase();
  return (
    EXTINCTION_COLORS[upperStatus as keyof typeof EXTINCTION_COLORS] ||
    EXTINCTION_COLORS.LC
  );
}

/**
 * Get color index for sorting/filtering
 */
export function getStatusIndex(status: string): number {
  const statusMap: Record<string, number> = {
    LC: 0,
    NT: 1,
    VU: 2,
    EN: 3,
    CR: 4,
    EW: 5,
    EX: 6,
  };
  return statusMap[status.toUpperCase()] || 0;
}

/**
 * IUCN Status Labels
 */
export const STATUS_LABELS: Record<string, string> = {
  LC: "Least Concern",
  NT: "Near Threatened",
  VU: "Vulnerable",
  EN: "Endangered",
  CR: "Critically Endangered",
  EW: "Extinct in the Wild",
  EX: "Extinct",
};
