/**
 * 9-Step Red Gradient Color System
 * From Dark/Muted Red (Least Concern) to Bright/Neon Red (Extinct)
 *
 * This color scale represents the spectrum of extinction risk,
 * NOT based on opacity but on actual color intensity.
 */

export const EXTINCTION_COLORS = {
  // IUCN Red List Categories
  LC: "#4A1F1F", // Least Concern - Dark Muted Red
  NT: "#5A2A2A", // Near Threatened
  VU: "#6B3535", // Vulnerable
  EN: "#7D4040", // Endangered
  CR: "#8F4B4B", // Critically Endangered
  EW: "#A15656", // Extinct in the Wild
  EX: "#FF1744", // Extinct - Bright Neon Red
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
