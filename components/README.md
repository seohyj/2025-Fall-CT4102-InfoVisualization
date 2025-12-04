# Components

## Map Component (`Map.tsx`)

Renders the interactive Mapbox map with species data points.

**Props:**

- `species`: Array of species data
- `selectedYear`: Currently selected year (2009-2025)
- `selectedCategory`: Currently selected category filter (or null for all)
- `mapboxToken`: Mapbox access token

**Features:**

- Dark theme map style
- Dynamic point colors based on IUCN status for selected year
- Smooth color transitions when year changes
- Responsive to category filtering

## Year Slider (`YearSlider.tsx`)

Vertical slider for selecting the year.

**Props:**

- `minYear`: Minimum year (2009)
- `maxYear`: Maximum year (2025)
- `currentYear`: Currently selected year
- `onYearChange`: Callback when year changes

**Features:**

- Vertical slider with gradient track
- Large year display
- Smooth animations with Framer Motion
- Drag interaction

## Category Tabs (`CategoryTabs.tsx`)

Horizontal navigation bar for filtering by category.

**Props:**

- `categories`: Array of available categories
- `selectedCategory`: Currently selected category (or null for all)
- `onCategorySelect`: Callback when category is selected

**Features:**

- Bilingual labels (English + Korean)
- Smooth selection animation
- Glassmorphism design

## Layout (`Layout.tsx`)

Full-screen layout wrapper for the map interface.

**Features:**

- Full viewport coverage
- Black background
- Overflow handling
