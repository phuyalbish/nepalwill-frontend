/** "Oct 1, 2026" from a date-only string, read in UTC so the day never shifts. */
export function formatRecordDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function impactText(record) {
  return `${Number(record.impact_number).toLocaleString("en-US")} students impacted`;
}
