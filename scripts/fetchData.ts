/**
 * Mock Data Generator for The Spectrum of Extinction
 *
 * This script generates realistic mock data for 100 species with historical
 * status data from 2009 to 2025. In production, this would fetch from IUCN API.
 */

import * as fs from "fs";
import * as path from "path";
import {
  Species,
  SpeciesData,
  IUCNStatus,
  Category,
  PopulationTrend,
  SpeciesStatusHistory,
} from "../lib/types";

// Sample species names by category
const SPECIES_BY_CATEGORY: Record<
  Category,
  { common: string[]; scientific: string[] }
> = {
  Mammals: {
    common: [
      "African Elephant",
      "Tiger",
      "Giant Panda",
      "Polar Bear",
      "Blue Whale",
      "Gorilla",
      "Orangutan",
      "Snow Leopard",
      "Red Panda",
      "Cheetah",
      "Lion",
      "Jaguar",
      "Gray Wolf",
      "Bison",
      "Rhinoceros",
    ],
    scientific: [
      "Loxodonta africana",
      "Panthera tigris",
      "Ailuropoda melanoleuca",
      "Ursus maritimus",
      "Balaenoptera musculus",
      "Gorilla gorilla",
      "Pongo abelii",
      "Panthera uncia",
      "Ailurus fulgens",
      "Acinonyx jubatus",
      "Panthera leo",
      "Panthera onca",
      "Canis lupus",
      "Bison bison",
      "Rhinocerotidae",
    ],
  },
  Birds: {
    common: [
      "Bald Eagle",
      "California Condor",
      "Kakapo",
      "Whooping Crane",
      "Spoon-billed Sandpiper",
      "Ivory-billed Woodpecker",
      "Hawaiian Crow",
      "Philippine Eagle",
      "Great Indian Bustard",
      "Spix's Macaw",
      "Northern Bald Ibis",
      "Siberian Crane",
      "Waved Albatross",
    ],
    scientific: [
      "Haliaeetus leucocephalus",
      "Gymnogyps californianus",
      "Strigops habroptila",
      "Grus americana",
      "Calidris pygmaea",
      "Campephilus principalis",
      "Corvus hawaiiensis",
      "Pithecophaga jefferyi",
      "Ardeotis nigriceps",
      "Cyanopsitta spixii",
      "Geronticus eremita",
      "Leucogeranus leucogeranus",
      "Phoebastria irrorata",
    ],
  },
  Fish: {
    common: [
      "Bluefin Tuna",
      "Great White Shark",
      "Atlantic Cod",
      "Sturgeon",
      "Salmon",
      "Manta Ray",
      "Hammerhead Shark",
      "Grouper",
      "Barracuda",
      "Marlin",
    ],
    scientific: [
      "Thunnus thynnus",
      "Carcharodon carcharias",
      "Gadus morhua",
      "Acipenseridae",
      "Salmo salar",
      "Manta birostris",
      "Sphyrnidae",
      "Epinephelus",
      "Sphyraena",
      "Istiophoridae",
    ],
  },
  Reptiles: {
    common: [
      "Green Sea Turtle",
      "Komodo Dragon",
      "Gharial",
      "Galapagos Tortoise",
      "King Cobra",
      "Black Mamba",
      "Anaconda",
      "Crocodile",
      "Iguana",
    ],
    scientific: [
      "Chelonia mydas",
      "Varanus komodoensis",
      "Gavialis gangeticus",
      "Chelonoidis nigra",
      "Ophiophagus hannah",
      "Dendroaspis polylepis",
      "Eunectes murinus",
      "Crocodylidae",
      "Iguana iguana",
    ],
  },
  Amphibians: {
    common: [
      "Golden Frog",
      "Axolotl",
      "Poison Dart Frog",
      "Salamander",
      "Toad",
      "Tree Frog",
      "Newt",
      "Caecilian",
    ],
    scientific: [
      "Atelopus zeteki",
      "Ambystoma mexicanum",
      "Dendrobatidae",
      "Salamandridae",
      "Bufonidae",
      "Hylidae",
      "Pleurodelinae",
      "Gymnophiona",
    ],
  },
  Insects: {
    common: [
      "Monarch Butterfly",
      "Honeybee",
      "Bumblebee",
      "Dragonfly",
      "Beetle",
      "Moth",
      "Grasshopper",
      "Ant",
      "Butterfly",
    ],
    scientific: [
      "Danaus plexippus",
      "Apis mellifera",
      "Bombus",
      "Odonata",
      "Coleoptera",
      "Lepidoptera",
      "Caelifera",
      "Formicidae",
      "Rhopalocera",
    ],
  },
  Plants: {
    common: [
      "Baobab Tree",
      "Giant Sequoia",
      "Venus Flytrap",
      "Orchid",
      "Cactus",
      "Fern",
      "Moss",
      "Algae",
      "Mangrove",
    ],
    scientific: [
      "Adansonia",
      "Sequoiadendron giganteum",
      "Dionaea muscipula",
      "Orchidaceae",
      "Cactaceae",
      "Pteridophyta",
      "Bryophyta",
      "Algae",
      "Rhizophora",
    ],
  },
};

// Sample locations (lat, lng)
const SAMPLE_LOCATIONS = [
  { lat: 40.7128, lng: -74.006, country: "USA" }, // New York
  { lat: 51.5074, lng: -0.1278, country: "UK" }, // London
  { lat: -33.8688, lng: 151.2093, country: "Australia" }, // Sydney
  { lat: -22.9068, lng: -43.1729, country: "Brazil" }, // Rio
  { lat: 35.6762, lng: 139.6503, country: "Japan" }, // Tokyo
  { lat: 28.6139, lng: 77.209, country: "India" }, // Delhi
  { lat: -1.2921, lng: 36.8219, country: "Kenya" }, // Nairobi
  { lat: -25.7461, lng: 28.1881, country: "South Africa" }, // Pretoria
  { lat: 55.7558, lng: 37.6173, country: "Russia" }, // Moscow
  { lat: 39.9042, lng: 116.4074, country: "China" }, // Beijing
  { lat: -15.7975, lng: -47.8919, country: "Brazil" }, // Brasilia
  { lat: 19.4326, lng: -99.1332, country: "Mexico" }, // Mexico City
  { lat: -34.6037, lng: -58.3816, country: "Argentina" }, // Buenos Aires
  { lat: 1.3521, lng: 103.8198, country: "Singapore" }, // Singapore
  { lat: 30.0444, lng: 31.2357, country: "Egypt" }, // Cairo
];

// IUCN Status progression (simulating worsening over time)
const STATUS_PROGRESSION: IUCNStatus[] = [
  "LC",
  "NT",
  "VU",
  "EN",
  "CR",
  "EW",
  "EX",
];

// Threats
const THREAT_TYPES = [
  { code: "1.1", title: "Housing & urban areas" },
  { code: "2.1", title: "Annual & perennial non-timber crops" },
  { code: "3.2", title: "Mining & quarrying" },
  { code: "4.1", title: "Roads & railroads" },
  { code: "5.1", title: "Hunting & trapping" },
  { code: "6.1", title: "Recreational activities" },
  { code: "7.1", title: "Fire & fire suppression" },
  { code: "8.1", title: "Invasive species" },
  { code: "9.1", title: "Pollution" },
  { code: "11.1", title: "Habitat shifting & alteration" },
];

/**
 * Generate status history for a species
 * Logic: If assessed in year X, fill gap years with that status until next assessment
 */
function generateStatusHistory(
  startYear: number = 2009,
  endYear: number = 2025
): SpeciesStatusHistory[] {
  const history: SpeciesStatusHistory[] = [];

  // Random initial status (biased towards more common statuses)
  const initialStatusWeights = [0.3, 0.2, 0.2, 0.15, 0.1, 0.04, 0.01]; // LC, NT, VU, EN, CR, EW, EX
  const random = Math.random();
  let cumulative = 0;
  let initialStatusIndex = 0;
  for (let i = 0; i < initialStatusWeights.length; i++) {
    cumulative += initialStatusWeights[i];
    if (random <= cumulative) {
      initialStatusIndex = i;
      break;
    }
  }

  let currentStatus = STATUS_PROGRESSION[initialStatusIndex];
  const assessmentYears: number[] = [];

  // Generate 1-3 assessment years randomly
  const numAssessments = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < numAssessments; i++) {
    const year = startYear + Math.floor(Math.random() * (endYear - startYear));
    if (!assessmentYears.includes(year)) {
      assessmentYears.push(year);
    }
  }
  assessmentYears.sort((a, b) => a - b);

  // Fill history: status can only worsen or stay the same
  let statusIndex = initialStatusIndex;
  for (let year = startYear; year <= endYear; year++) {
    if (assessmentYears.includes(year)) {
      // New assessment: status can worsen (or stay same, rarely improve)
      const worsenChance = Math.random();
      if (worsenChance > 0.7 && statusIndex < STATUS_PROGRESSION.length - 1) {
        statusIndex += Math.floor(Math.random() * 2) + 1; // Worsen by 1-2 levels
        if (statusIndex >= STATUS_PROGRESSION.length) {
          statusIndex = STATUS_PROGRESSION.length - 1;
        }
      }
      currentStatus = STATUS_PROGRESSION[statusIndex];
    }

    history.push({
      year,
      status: currentStatus,
      assessedDate: assessmentYears.includes(year)
        ? `${year}-01-01`
        : undefined,
    });
  }

  return history;
}

/**
 * Generate a single species
 */
function generateSpecies(id: number, category: Category): Species {
  const categoryData = SPECIES_BY_CATEGORY[category];
  const speciesIndex = id % categoryData.common.length;

  const commonName = categoryData.common[speciesIndex];
  const scientificName = categoryData.scientific[speciesIndex];
  const location =
    SAMPLE_LOCATIONS[Math.floor(Math.random() * SAMPLE_LOCATIONS.length)];

  const statusHistory = generateStatusHistory(2009, 2025);
  const currentStatus = statusHistory[statusHistory.length - 1].status;

  // Population trend
  const trendOptions: PopulationTrend[] = [
    "decreasing",
    "stable",
    "increasing",
    "unknown",
  ];
  const populationTrend =
    trendOptions[Math.floor(Math.random() * trendOptions.length)];

  // Threats (1-3 random threats)
  const numThreats = Math.floor(Math.random() * 3) + 1;
  const selectedThreats = THREAT_TYPES.sort(() => Math.random() - 0.5)
    .slice(0, numThreats)
    .map((threat) => ({
      code: threat.code,
      title: threat.title,
      timing: "Ongoing",
      scope: "Majority",
      severity: "Slow, Significant Declines",
    }));

  // Image placeholder (in production, would fetch from Wikimedia/other APIs)
  const imageUrl = `https://via.placeholder.com/400x300/4A1F1F/FFFFFF?text=${encodeURIComponent(
    commonName
  )}`;

  return {
    id: `species-${id}`,
    scientificName,
    commonName,
    category,
    status: currentStatus,
    statusHistory,
    location: {
      ...location,
      region: location.country,
    },
    imageUrl,
    populationTrend,
    threats: selectedThreats,
    description: `The ${commonName} (${scientificName}) faces significant threats due to habitat loss, climate change, and human activities. This species has experienced a ${populationTrend} population trend, with its range primarily located in ${
      location.country || "various regions"
    }. Conservation efforts including habitat protection, anti-poaching measures, and community engagement are critical to prevent further decline and ensure the survival of this remarkable species for future generations.`,
    iucnUrl: `https://www.iucnredlist.org/species/${id}`,
  };
}

/**
 * Main function to generate mock data
 */
function generateMockData(): SpeciesData {
  const categories: Category[] = [
    "Mammals",
    "Birds",
    "Fish",
    "Reptiles",
    "Amphibians",
    "Insects",
    "Plants",
  ];
  const species: Species[] = [];

  // Generate ~100 species, distributed across categories
  const speciesPerCategory = Math.floor(100 / categories.length);
  let speciesId = 1;

  categories.forEach((category, categoryIndex) => {
    const count =
      categoryIndex === categories.length - 1
        ? 100 - speciesPerCategory * (categories.length - 1) // Last category gets remainder
        : speciesPerCategory;

    for (let i = 0; i < count; i++) {
      species.push(generateSpecies(speciesId++, category));
    }
  });

  return {
    species,
    metadata: {
      totalCount: species.length,
      lastUpdated: new Date().toISOString(),
      yearRange: {
        min: 2009,
        max: 2025,
      },
    },
  };
}

/**
 * Save data to JSON file
 */
function saveData(data: SpeciesData, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✅ Generated ${data.species.length} species`);
  console.log(`✅ Saved to ${outputPath}`);
}

// Main execution
if (require.main === module) {
  console.log("🌱 Generating mock species data...");
  const data = generateMockData();
  const outputPath = path.join(__dirname, "../public/data/species_data.json");
  saveData(data, outputPath);
  console.log("✨ Done!");
}

export { generateMockData };
