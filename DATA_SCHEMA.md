# Species Data JSON Schema Specification

## Overview

This document defines the exact JSON structure required for `public/data/species_data.json` used by "The Spectrum of Extinction" visualization.

---

## Root Structure

```json
{
  "species": Species[],
  "metadata": {
    "totalCount": number,
    "lastUpdated": string (ISO 8601),
    "yearRange": {
      "min": number,
      "max": number
    }
  }
}
```

---

## Field Definitions

### Root Level

| Field      | Type        | Required | Description                |
| ---------- | ----------- | -------- | -------------------------- |
| `species`  | `Species[]` | Yes      | Array of species objects   |
| `metadata` | `Metadata`  | Yes      | Metadata about the dataset |

### Metadata Object

| Field           | Type     | Required | Description                          | Example                  |
| --------------- | -------- | -------- | ------------------------------------ | ------------------------ |
| `totalCount`    | `number` | Yes      | Total number of species in the array | `100`                    |
| `lastUpdated`   | `string` | Yes      | ISO 8601 timestamp of last update    | `"2025-01-15T10:30:00Z"` |
| `yearRange.min` | `number` | Yes      | Minimum year in status history       | `2009`                   |
| `yearRange.max` | `number` | Yes      | Maximum year in status history       | `2025`                   |

### Species Object

| Field             | Type                     | Required | Description                                        |
| ----------------- | ------------------------ | -------- | -------------------------------------------------- |
| `id`              | `string`                 | Yes      | Unique identifier for the species                  |
| `scientificName`  | `string`                 | Yes      | Binomial scientific name (e.g., "Panthera tigris") |
| `commonName`      | `string`                 | Yes      | Common name (e.g., "Tiger")                        |
| `category`        | `Category`               | Yes      | Taxonomic category (see Enum Values)               |
| `status`          | `IUCNStatus`             | Yes      | Current IUCN status (latest year)                  |
| `statusHistory`   | `SpeciesStatusHistory[]` | Yes      | Array of status records by year                    |
| `location`        | `SpeciesLocation`        | Yes      | Geographic coordinates and location info           |
| `imageUrl`        | `string`                 | No       | URL to species image (optional)                    |
| `populationTrend` | `PopulationTrend`        | Yes      | Population trend indicator                         |
| `threats`         | `Threat[]`               | Yes      | Array of threats (at least 1 required)             |
| `description`     | `string`                 | No       | Narrative description of species status            |
| `iucnUrl`         | `string`                 | No       | URL to IUCN Red List page                          |

### SpeciesStatusHistory Object

| Field          | Type         | Required | Description                 | Example        |
| -------------- | ------------ | -------- | --------------------------- | -------------- |
| `year`         | `number`     | Yes      | Year of assessment          | `2020`         |
| `status`       | `IUCNStatus` | Yes      | IUCN status for this year   | `"EN"`         |
| `assessedDate` | `string`     | No       | ISO 8601 date of assessment | `"2020-03-15"` |

**Important:** The `statusHistory` array must contain entries for **every year** from `metadata.yearRange.min` to `metadata.yearRange.max` (e.g., 2009-2025). If a species was assessed in 2010 and 2015, fill the gap years (2011-2014) with the 2010 status.

### SpeciesLocation Object

| Field     | Type     | Required | Description             | Example   |
| --------- | -------- | -------- | ----------------------- | --------- |
| `lat`     | `number` | Yes      | Latitude (-90 to 90)    | `28.6139` |
| `lng`     | `number` | Yes      | Longitude (-180 to 180) | `77.2090` |
| `country` | `string` | No       | Country name            | `"India"` |
| `region`  | `string` | No       | Region/subdivision      | `"Delhi"` |

### Threat Object

| Field      | Type     | Required | Description          | Example                        |
| ---------- | -------- | -------- | -------------------- | ------------------------------ |
| `code`     | `string` | Yes      | IUCN threat code     | `"1.1"`                        |
| `title`    | `string` | Yes      | Threat description   | `"Housing & urban areas"`      |
| `timing`   | `string` | No       | Timing of threat     | `"Ongoing"`                    |
| `scope`    | `string` | No       | Scope of threat      | `"Majority"`                   |
| `severity` | `string` | No       | Severity description | `"Slow, Significant Declines"` |

---

## Enum Values

### Category

**Type:** `string` (exact match required)

Allowed values:

- `"Mammals"`
- `"Birds"`
- `"Fish"`
- `"Reptiles"`
- `"Amphibians"`
- `"Insects"`
- `"Plants"`

### IUCNStatus

**Type:** `string` (exact match required)

Allowed values (ordered by severity):

- `"LC"` - Least Concern
- `"NT"` - Near Threatened
- `"VU"` - Vulnerable
- `"EN"` - Endangered
- `"CR"` - Critically Endangered
- `"EW"` - Extinct in the Wild
- `"EX"` - Extinct

### PopulationTrend

**Type:** `string` (exact match required)

Allowed values:

- `"decreasing"`
- `"stable"`
- `"increasing"`
- `"unknown"`

---

## Complete Example

```json
{
  "species": [
    {
      "id": "species-1",
      "scientificName": "Panthera tigris",
      "commonName": "Tiger",
      "category": "Mammals",
      "status": "EN",
      "statusHistory": [
        {
          "year": 2009,
          "status": "EN",
          "assessedDate": "2009-01-01"
        },
        {
          "year": 2010,
          "status": "EN"
        },
        {
          "year": 2011,
          "status": "EN"
        },
        {
          "year": 2012,
          "status": "EN"
        },
        {
          "year": 2013,
          "status": "EN"
        },
        {
          "year": 2014,
          "status": "EN"
        },
        {
          "year": 2015,
          "status": "EN",
          "assessedDate": "2015-06-15"
        },
        {
          "year": 2016,
          "status": "EN"
        },
        {
          "year": 2017,
          "status": "EN"
        },
        {
          "year": 2018,
          "status": "EN"
        },
        {
          "year": 2019,
          "status": "EN"
        },
        {
          "year": 2020,
          "status": "EN"
        },
        {
          "year": 2021,
          "status": "EN"
        },
        {
          "year": 2022,
          "status": "EN"
        },
        {
          "year": 2023,
          "status": "EN"
        },
        {
          "year": 2024,
          "status": "EN"
        },
        {
          "year": 2025,
          "status": "EN"
        }
      ],
      "location": {
        "lat": 28.6139,
        "lng": 77.209,
        "country": "India",
        "region": "Delhi"
      },
      "imageUrl": "https://example.com/images/tiger.jpg",
      "populationTrend": "decreasing",
      "threats": [
        {
          "code": "1.1",
          "title": "Housing & urban areas",
          "timing": "Ongoing",
          "scope": "Majority",
          "severity": "Slow, Significant Declines"
        },
        {
          "code": "5.1",
          "title": "Hunting & trapping",
          "timing": "Ongoing",
          "scope": "Majority",
          "severity": "Rapid Declines"
        },
        {
          "code": "11.1",
          "title": "Habitat shifting & alteration",
          "timing": "Ongoing",
          "scope": "Majority",
          "severity": "Slow, Significant Declines"
        }
      ],
      "description": "The Tiger (Panthera tigris) faces significant threats due to habitat loss, climate change, and human activities. This species has experienced a decreasing population trend, with its range primarily located in India. Conservation efforts including habitat protection, anti-poaching measures, and community engagement are critical to prevent further decline and ensure the survival of this remarkable species for future generations.",
      "iucnUrl": "https://www.iucnredlist.org/species/15955"
    }
  ],
  "metadata": {
    "totalCount": 1,
    "lastUpdated": "2025-01-15T10:30:00Z",
    "yearRange": {
      "min": 2009,
      "max": 2025
    }
  }
}
```

---

## Data Quality Requirements

### Status History

- **MUST** contain exactly 17 entries (one for each year from 2009 to 2025)
- Years MUST be consecutive (2009, 2010, 2011, ..., 2025)
- Status values MUST be valid `IUCNStatus` enum values
- Status can only worsen or stay the same over time (cannot improve)

### Location

- `lat` MUST be between -90 and 90
- `lng` MUST be between -180 and 180
- Coordinates should represent the species' primary range or a representative location

### Threats

- Each species MUST have at least 1 threat
- Recommended: 1-3 threats per species
- Threat codes should follow IUCN threat classification scheme

### Images

- `imageUrl` is optional but recommended
- URLs should be publicly accessible
- Recommended format: JPG or PNG
- Recommended dimensions: 800x600 or larger

---

## Validation Checklist

Before submitting data, ensure:

- [ ] Root object has `species` array and `metadata` object
- [ ] `metadata.totalCount` matches the length of `species` array
- [ ] `metadata.yearRange.min` = 2009
- [ ] `metadata.yearRange.max` = 2025
- [ ] Each species has a unique `id`
- [ ] Each species has exactly 17 entries in `statusHistory` (2009-2025)
- [ ] All `category` values are valid enum values
- [ ] All `status` values are valid enum values
- [ ] All `populationTrend` values are valid enum values
- [ ] Each species has at least 1 threat
- [ ] All coordinates are within valid ranges
- [ ] JSON is valid and parseable

---

## Notes for Data Engineers

1. **Status History Logic:** If a species was assessed in 2010 and 2015, all years 2011-2014 should use the 2010 status. The status can only worsen or remain the same over time.

2. **Performance:** The application loads the entire JSON file at once. For large datasets (>10,000 species), consider pagination or data splitting strategies.

3. **Image URLs:** If images are not available, omit the `imageUrl` field. The application will display a placeholder.

4. **IUCN URLs:** If available, include the specific species page URL. Otherwise, omit the field and the app will link to the general IUCN Red List site.

5. **Threat Codes:** Use standard IUCN threat classification codes (e.g., "1.1", "2.1", "5.1") when available.

---

## Contact

For questions about this schema, refer to the TypeScript definitions in `lib/types.ts`.
