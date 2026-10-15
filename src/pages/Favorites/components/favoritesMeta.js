/** Route and label per favorite type. */
export const TYPE_META = {
  event: { label: "Event", base: "/events", variant: "coral" },
  program: { label: "Program", base: "/programs", variant: "mint" },
  story: { label: "Story", base: "/stories", variant: "purple" },
  blog: { label: "Blog", base: "/blog", variant: "ink" },
};

export const favoritePath = (item) => `${TYPE_META[item.type].base}/${item.slug}`;

/** Format ISO dates; show anything else (e.g. "Apr 15") exactly as saved. */
export function formatFavoriteDate(value) {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(date);
    }
  }
  return String(value);
}
