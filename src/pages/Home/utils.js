export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Parse "YYYY-MM-DD" without timezone shifts. month is zero based. */
export function parseISODate(iso) {
  const [year, month, day] = String(iso).split("-").map(Number);
  return { year, month: (month || 1) - 1, day: day || 1 };
}

/** "10:00:00" to "10:00 AM". */
export function formatTime(value) {
  if (!value) return "";
  const [h, m] = String(value).split(":").map(Number);
  const hour = Number.isFinite(h) ? h : 0;
  const minutes = String(Number.isFinite(m) ? m : 0).padStart(2, "0");
  return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
}

/** "Priya Sharma" to "PS". */
export function initials(name = "") {
  return (
    String(name)
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "NW"
  );
}

/** "150+ Teaching Hours" to { value: "150+", label: "Teaching Hours" }. */
export function splitMetric(tag = "") {
  const match = /^(\S*\d\S*)\s+(.+)$/.exec(String(tag).trim());
  return match ? { value: match[1], label: match[2] } : { value: String(tag).trim(), label: "" };
}

export const CATEGORY_LABELS = { contributor: "Contributor", life_changed: "Life changed" };
