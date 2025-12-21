/**
 * Helper for GitHub Pages deployments (sub-path hosting).
 *
 * When deploying to GitHub Pages project sites, set:
 *   NEXT_PUBLIC_BASE_PATH=/<repo>
 * Locally, leave it unset/empty.
 */

export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(
  /\/$/,
  ""
);

export function withBasePath(path: string): string {
  if (!path) return BASE_PATH || "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}


