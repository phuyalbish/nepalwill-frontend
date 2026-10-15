/** Aspect ratios used when every photo has the same size, so the masonry still has rhythm. */
const RHYTHM = [1.5, 0.8, 1, 1.25, 0.75, 1.5, 1, 0.8];

/**
 * Aspect ratio (width / height) per item. Real width and height win; when the whole set shares one
 * ratio (the seed data does) a repeating rhythm is used so the columns do not look like a flat grid.
 */
export function ratiosFor(items) {
  const real = items.map((item) => (item.width && item.height ? item.width / item.height : 1.5));
  const uniform = new Set(real.map((r) => r.toFixed(2))).size <= 1;
  return uniform && items.length > 3 ? items.map((_, i) => RHYTHM[i % RHYTHM.length]) : real;
}

/** Distinct categories in first-seen order. */
export function categoriesOf(items) {
  return [...new Set(items.map((item) => item.category).filter(Boolean))];
}
