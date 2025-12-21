/**
 * Data loading utilities for The Spectrum of Extinction
 */

import { Species, SpeciesData, Category, IUCNStatus } from "./types";

let cachedData: SpeciesData | null = null;

/**
 * Load species data from JSON file
 */
export async function loadSpeciesData(): Promise<SpeciesData> {
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch("/data/species_data.json");
    if (!response.ok) {
      throw new Error("Failed to load species data");
    }
    cachedData = (await response.json()) as SpeciesData;
    return cachedData;
  } catch (error) {
    console.error("Error loading species data:", error);
    throw error;
  }
}

/**
 * Get species for a specific year and category
 */
export function getSpeciesForYear(
  data: SpeciesData,
  year: number,
  category?: Category
): Species[] {
  return data.species.filter((species) => {
    // Filter by category if provided
    if (category && species.category !== category) {
      return false;
    }

    // Check if species has status for this year
    return species.statusHistory.some((history) => history.year === year);
  });
}

/**
 * Get status for a species at a specific year
 */
export function getSpeciesStatusAtYear(
  species: Species,
  year: number
): IUCNStatus {
  const history = species.statusHistory.find((h) => h.year === year);
  return history?.status || species.statusHistory[0]?.status || "LC";
}

/**
 * Get statistics for a category at a specific year
 */
export function getCategoryStats(
  data: SpeciesData,
  category: Category,
  year: number
): Record<IUCNStatus, number> {
  const stats: Record<IUCNStatus, number> = {
    LC: 0,
    NT: 0,
    VU: 0,
    EN: 0,
    CR: 0,
    EW: 0,
    EX: 0,
  };

  const categorySpecies = data.species.filter((s) => s.category === category);

  categorySpecies.forEach((species) => {
    const status = getSpeciesStatusAtYear(species, year);
    stats[status]++;
  });

  return stats;
}

/**
 * Get all unique categories from data
 */
export function getCategories(data: SpeciesData): Category[] {
  const categories = new Set<Category>();
  data.species.forEach((species) => {
    categories.add(species.category);
  });
  return Array.from(categories).sort();
}
