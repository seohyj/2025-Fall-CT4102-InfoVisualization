/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Multi-Color Spectrum Scale - New Palette
        extinction: {
          lc: "#4B8F54", // Least Concern - Green
          nt: "#F7C948", // Near Threatened - Yellow
          vu: "#E9692C", // Vulnerable - Orange
          en: "#C42F40", // Endangered - Dark Red
          cr: "#3A3A3A", // Critically Endangered - Dark Grey
          ew: "#A4A4A4", // Extinct in the Wild - Grey
          ex: "#EFEFEF", // Extinct - Light Grey
        },
        // Status mapping for easier access
        status: {
          LC: "#4B8F54",
          NT: "#F7C948",
          VU: "#E9692C",
          EN: "#C42F40",
          CR: "#3A3A3A",
          EW: "#A4A4A4",
          EX: "#EFEFEF",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
