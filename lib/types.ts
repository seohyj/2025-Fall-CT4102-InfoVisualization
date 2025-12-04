/**
 * Type definitions for the Spectrum of Extinction project
 */

export type IUCNStatus = "LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX";

export type Category =
  | "Mammals"
  | "Birds"
  | "Fish"
  | "Reptiles"
  | "Amphibians"
  | "Insects"
  | "Plants";

export type PopulationTrend =
  | "decreasing"
  | "stable"
  | "increasing"
  | "unknown";

export interface SpeciesLocation {
  lat: number;
  lng: number;
  country?: string;
  region?: string;
}

export interface SpeciesStatusHistory {
  year: number;
  status: IUCNStatus;
  assessedDate?: string;
}

export interface Threat {
  code: string;
  title: string;
  timing?: string;
  scope?: string;
  severity?: string;
}

export interface Species {
  id: string;
  scientificName: string;
  commonName: string;
  category: Category;
  status: IUCNStatus;
  statusHistory: SpeciesStatusHistory[];
  location: SpeciesLocation;
  imageUrl?: string;
  populationTrend: PopulationTrend;
  threats: Threat[];
  description?: string;
  iucnUrl?: string;
}

export interface SpeciesData {
  species: Species[];
  metadata: {
    totalCount: number;
    lastUpdated: string;
    yearRange: {
      min: number;
      max: number;
    };
  };
}

export interface CategoryStats {
  category: Category;
  statusCounts: Record<IUCNStatus, number>;
  total: number;
}
