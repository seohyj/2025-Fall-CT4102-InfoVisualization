/**
 * Transform species_data.json to match the expected format
 * Converts from direct array to { species: [...], metadata: {...} } format
 */

import * as fs from "fs";
import * as path from "path";
import { SpeciesData, Category, IUCNStatus, PopulationTrend } from "../lib/types";

interface OldSpeciesFormat {
  scientificName: string;
  commonName: string;
  category: string;
  iucnUrl?: string;
  imgUrl?: string | null;
  location: {
    lat: number;
    lng: number;
    country?: string;
    region?: string;
  };
  statusHistory: Array<{
    year: number;
    status: string;
  }>;
}

/**
 * Map category string to valid Category type
 */
function normalizeCategory(category: string): Category {
  const categoryMap: Record<string, Category> = {
    "mammalia": "Mammals",
    "mammals": "Mammals",
    "aves": "Birds",
    "birds": "Birds",
    "actinopterygii": "Fish",
    "fish": "Fish",
    "reptilia": "Reptiles",
    "reptiles": "Reptiles",
    "amphibia": "Amphibians",
    "amphibians": "Amphibians",
    "insecta": "Insects",
    "insects": "Insects",
    "plantae": "Plants",
    "plants": "Plants",
  };

  const normalized = category.toLowerCase().trim();
  return categoryMap[normalized] || "Mammals"; // Default to Mammals if unknown
}

/**
 * Get current status from statusHistory
 */
function getCurrentStatus(
  statusHistory: Array<{ year: number; status: string }>
): IUCNStatus {
  if (statusHistory.length === 0) return "LC";
  
  // Get the latest status
  const latest = statusHistory[statusHistory.length - 1];
  const status = latest.status.toUpperCase();
  
  // Validate it's a valid IUCN status
  const validStatuses: IUCNStatus[] = ["LC", "NT", "VU", "EN", "CR", "EW", "EX"];
  if (validStatuses.includes(status as IUCNStatus)) {
    return status as IUCNStatus;
  }
  
  return "LC"; // Default
}

/**
 * Transform old format to new format
 */
function transformSpecies(
  oldSpecies: OldSpeciesFormat,
  index: number
): any {
  const currentStatus = getCurrentStatus(oldSpecies.statusHistory);
  const category = normalizeCategory(oldSpecies.category || "");
  
  // Get year range from statusHistory
  const years = oldSpecies.statusHistory.map((h) => h.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  return {
    id: `species-${index + 1}`,
    scientificName: oldSpecies.scientificName,
    commonName: oldSpecies.commonName,
    category: category,
    status: currentStatus,
    statusHistory: oldSpecies.statusHistory.map((h) => ({
      year: h.year,
      status: h.status.toUpperCase() as IUCNStatus,
    })),
    location: {
      lat: oldSpecies.location.lat,
      lng: oldSpecies.location.lng,
      country: oldSpecies.location.country || "",
      region: oldSpecies.location.region || oldSpecies.location.country || "",
    },
    imageUrl: oldSpecies.imgUrl || undefined,
    populationTrend: "unknown" as PopulationTrend,
    threats: [],
    description: undefined,
    iucnUrl: oldSpecies.iucnUrl || undefined,
  };
}

/**
 * Main transformation function
 */
function transformData(inputPath: string, outputPath: string) {
  console.log("📖 Reading input file...");
  const inputData = JSON.parse(
    fs.readFileSync(inputPath, "utf-8")
  ) as OldSpeciesFormat[];

  console.log(`📊 Found ${inputData.length} species`);

  console.log("🔄 Transforming data...");
  const transformedSpecies = inputData.map((species, index) => {
    if ((index + 1) % 1000 === 0) {
      console.log(`  Processed ${index + 1}/${inputData.length} species...`);
    }
    return transformSpecies(species, index);
  });

  // Calculate metadata (use reduce to avoid stack overflow with large arrays)
  let minYear = Infinity;
  let maxYear = -Infinity;
  
  transformedSpecies.forEach((species) => {
    species.statusHistory.forEach((history) => {
      if (history.year < minYear) minYear = history.year;
      if (history.year > maxYear) maxYear = history.year;
    });
  });

  const transformedData: SpeciesData = {
    species: transformedSpecies,
    metadata: {
      totalCount: transformedSpecies.length,
      lastUpdated: new Date().toISOString(),
      yearRange: {
        min: minYear,
        max: maxYear,
      },
    },
  };

  console.log("💾 Writing output file...");
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to a temporary file first, then replace
  const tempPath = outputPath + ".tmp";
  fs.writeFileSync(tempPath, JSON.stringify(transformedData, null, 2), "utf-8");
  
  // Replace original file
  fs.renameSync(tempPath, outputPath);

  console.log("✅ Transformation complete!");
  console.log(`   - Total species: ${transformedData.species.length}`);
  console.log(`   - Year range: ${minYear} - ${maxYear}`);
  console.log(`   - Output: ${outputPath}`);
}

// Main execution
if (require.main === module) {
  const inputPath = path.join(
    __dirname,
    "../public/data/species_data.json"
  );
  const outputPath = path.join(
    __dirname,
    "../public/data/species_data.json"
  );

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Input file not found: ${inputPath}`);
    process.exit(1);
  }

  transformData(inputPath, outputPath);
}

export { transformData };

