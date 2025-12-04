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
        // 9-step Red Gradient Scale
        extinction: {
          lc: "#4A1F1F", // Least Concern - Dark Muted Red
          nt: "#5A2A2A", // Near Threatened
          vu: "#6B3535", // Vulnerable
          en: "#7D4040", // Endangered
          cr: "#8F4B4B", // Critically Endangered
          ew: "#A15656", // Extinct in the Wild
          ex: "#B36161", // Extinct (Intermediate)
          ex2: "#C56C6C", // Extinct (Bright)
          ex3: "#FF1744", // Extinct (Neon Red)
        },
        // Status mapping for easier access
        status: {
          LC: "#4A1F1F",
          NT: "#5A2A2A",
          VU: "#6B3535",
          EN: "#7D4040",
          CR: "#8F4B4B",
          EW: "#A15656",
          EX: "#FF1744",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
