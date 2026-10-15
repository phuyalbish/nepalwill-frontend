/** Helpers for Unsplash-hosted photos (the API serves them at w=1600). Other hosts pass through untouched. */

const HOST = "images.unsplash.com";
const STEPS = [400, 800, 1200, 1600];

/** Parse an Unsplash URL, or return null for anything else (local assets, other hosts, bad input). */
function parse(src) {
  if (typeof src !== "string" || !src.startsWith("https://")) return null;
  try {
    const url = new URL(src);
    return url.hostname === HOST ? url : null;
  } catch {
    return null;
  }
}

/** Rewrite the `w=` parameter of an Unsplash URL; returns `src` unchanged for non-Unsplash sources. */
export function unsplashWidth(src, width) {
  const url = parse(src);
  if (!url) return src;
  url.searchParams.set("w", String(width));
  return url.toString();
}

/** srcSet for an Unsplash URL, topping out at `max` pixels wide; undefined for non-Unsplash sources. */
export function unsplashSrcSet(src, max = 800) {
  if (!parse(src)) return undefined;
  const widths = STEPS.filter((w) => w < max);
  widths.push(max);
  return widths.map((w) => `${unsplashWidth(src, w)} ${w}w`).join(", ");
}
