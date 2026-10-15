/** Date and time helpers for events. API dates are "YYYY-MM-DD", times "HH:MM:SS" (venue local time). */

const pad = (n) => String(n).padStart(2, "0");

/** Date at UTC midnight, so formatting never shifts a day with the viewer's timezone. */
const parseDate = (iso) => new Date(`${iso}T00:00:00Z`);

const fmt = (iso, options) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...options }).format(parseDate(iso));

/** "Saturday, 15 Nov 2026" */
export function formatLongDate(iso) {
  if (!iso) return "";
  const weekday = fmt(iso, { weekday: "long" });
  return `${weekday}, ${fmt(iso, { day: "numeric", month: "short", year: "numeric" })}`;
}

/** { month: "NOV", day: "15" } for the small date badge. */
export function formatShortDate(iso) {
  if (!iso) return { month: "", day: "" };
  return { month: fmt(iso, { month: "short" }).toUpperCase(), day: fmt(iso, { day: "numeric" }) };
}

/** "14:30:00" -> "2:30 PM" */
export function formatTime(value) {
  if (!value) return "";
  const [h, m] = value.split(":").map(Number);
  return `${h % 12 || 12}:${pad(m)} ${h >= 12 ? "PM" : "AM"}`;
}

/** "10:00 AM to 2:00 PM", or the start only, or "" */
export function formatTimeRange(start, end) {
  if (start && end) return `${formatTime(start)} to ${formatTime(end)}`;
  return formatTime(start);
}

const compact = (iso, time) => `${iso.replaceAll("-", "")}T${time.slice(0, 8).replaceAll(":", "")}`;

/**
 * Google Calendar "add event" link. Uses floating local times with the Nepal timezone,
 * or an all-day span when the event has no start time.
 */
export function googleCalendarUrl(event) {
  let dates;
  if (event.start_time) {
    const end = event.end_time || event.start_time;
    dates = `${compact(event.date, event.start_time)}/${compact(event.date, end)}`;
  } else {
    const next = new Date(parseDate(event.date).getTime() + 86400000).toISOString().slice(0, 10);
    dates = `${event.date.replaceAll("-", "")}/${next.replaceAll("-", "")}`;
  }
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates,
    location: event.location || "",
    details: `${event.description || ""}\n\nOrganised by NepalWill.`.trim(),
    ctz: "Asia/Kathmandu",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
