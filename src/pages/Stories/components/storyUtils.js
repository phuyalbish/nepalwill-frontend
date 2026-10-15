/** Small pure helpers shared by the stories and blog components. */

export const CATEGORY_LABEL = {
  contributor: "Contributor",
  life_changed: "Life changed",
};

export const FILTERS = [
  { id: "all", label: "All" },
  { id: "contributor", label: "Contributors" },
  { id: "life_changed", label: "Lives Changed" },
];

/** Initials from a name: "Dr. Sunita Maharjan" gives "SM". */
export function initials(name = "") {
  const words = name
    .replace(/\b(dr|mr|mrs|ms|prof)\.?\s/gi, "")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "NW";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}

/**
 * Split "150+ Teaching Hours" into the leading value and the label.
 * Text without a leading number gives an empty value so the whole text becomes the label.
 */
export function splitMetric(text = "") {
  const match = text.trim().match(/^(\d[\d,.]*(?:st|nd|rd|th)?[+%]?)\s+(.+)$/i);
  if (match) return { value: match[1], label: match[2] };
  return { value: "", label: text.trim() };
}

/** "Oct 3, 2026". Date-only and ISO strings are read in UTC so the day never shifts. */
export function formatDate(value, options = { month: "short", day: "numeric", year: "numeric" }) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(date);
}

/** Favorite snapshot for HeartButton. */
export function favoriteItem(story) {
  return {
    type: story.kind === "blog" ? "blog" : "story",
    slug: story.slug,
    title: story.title,
    image_url: story.image_url,
    date: story.published_at,
    subtitle: story.author,
  };
}

export const detailPath = (story) => `/${story.kind === "blog" ? "blog" : "stories"}/${story.slug}`;

/** Metric chips for a story: metric_tag first, then tags that are not just the category name. */
export function metricList(story, max = 3) {
  const skip = new Set(["contributor", "life changed", "life_changed"]);
  const tags = (story.tags || []).filter((tag) => !skip.has(tag.toLowerCase()));
  return [story.metric_tag, ...tags].filter(Boolean).slice(0, max);
}
