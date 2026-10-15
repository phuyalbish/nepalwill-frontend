/** Keys of the four headline stats shown in the home ribbon, in display order. */
export const RIBBON_KEYS = ["students-impacted", "partner-schools", "active-volunteers", "running-programs"];

/** Find one SiteStat by key in the /api/site/ payload; undefined while loading, on error or if missing. */
export function findStat(stats, key) {
  return Array.isArray(stats) ? stats.find((stat) => stat.key === key) : undefined;
}
