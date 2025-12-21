/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // GitHub Pages uses a sub-path like /<repo>. When deploying there, set:
  //   NEXT_PUBLIC_BASE_PATH=/<repo>
  // For local dev, keep it empty (default).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // GitHub Pages serves static files best with trailing slashes (/about/ -> /about/index.html)
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
