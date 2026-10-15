/** Static options, initial values and validation for the contact form. */

export const TABS = [
  { id: "volunteer", label: "Volunteer" },
  { id: "material", label: "Donate Materials" },
  { id: "partner", label: "Partner" },
  { id: "general", label: "General" },
];

export const isInquiryType = (value) => TABS.some((t) => t.id === value);

const opts = (labels) => labels.map((label) => ({ value: label, label }));

export const SKILLS = opts([
  "Teaching",
  "English",
  "Computers and coding",
  "Science and maths",
  "Arts and music",
  "Mentoring",
  "Translation",
  "Photography",
]);

export const AVAILABILITY = [
  { value: "weekdays", label: "Weekdays" },
  { value: "weekends", label: "Weekends" },
  { value: "remote", label: "Remote" },
];

export const ITEM_CATEGORIES = opts([
  "Laptops and devices",
  "Books",
  "Stationery",
  "Art supplies",
  "Sports equipment",
  "Other",
]);

export const CONDITIONS = opts(["New", "Like new", "Good", "Needs minor repair"]);

export const HANDOVER = [
  { value: "pickup", label: "Pickup" },
  { value: "drop_off", label: "Drop off" },
];

export const ORG_TYPES = opts(["School", "Non-profit", "Company", "University", "Community group", "Other"]);

export const INITIAL_SHARED = { name: "", email: "", phone: "", message: "" };

export const INITIAL_EXTRAS = {
  volunteer: { skills: [], availability: "", hours_per_month: "" },
  material: { item_category: "", quantity: "", condition: "", handover: "" },
  partner: { organisation_name: "", organisation_type: "", partnership_idea: "" },
  general: {},
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const positiveInt = (v) => /^\d+$/.test(String(v).trim()) && Number(v) >= 1;

/** Returns { fieldKey: message } for the shared fields and the active type's fields. */
export function validate(type, shared, extra) {
  const e = {};
  if (!shared.name.trim()) e.name = "Please enter your name.";
  if (!EMAIL.test(shared.email.trim())) e.email = "Enter a valid email address.";
  if (!shared.message.trim()) e.message = "Please write a short message.";
  if (type === "volunteer") {
    if (!extra.skills.length) e.skills = "Pick at least one skill.";
    if (!extra.availability) e.availability = "Choose when you are available.";
    if (extra.hours_per_month && !positiveInt(extra.hours_per_month)) e.hours_per_month = "Enter a whole number of hours.";
  }
  if (type === "material") {
    if (!extra.item_category) e.item_category = "Choose a category.";
    if (!positiveInt(extra.quantity || "")) e.quantity = "Enter a quantity of 1 or more.";
    if (!extra.condition) e.condition = "Choose the condition.";
    if (!extra.handover) e.handover = "Choose pickup or drop off.";
  }
  if (type === "partner") {
    if (!extra.organisation_name.trim()) e.organisation_name = "Enter your organisation name.";
    if (!extra.organisation_type) e.organisation_type = "Choose an organisation type.";
  }
  return e;
}

/** Cleans the active type's extra values for the API (numbers as numbers, text trimmed, blanks dropped). */
export function buildExtra(type, extra) {
  const out = {};
  for (const [key, value] of Object.entries(extra)) {
    if (Array.isArray(value)) out[key] = value;
    else if (key === "quantity" || key === "hours_per_month") {
      if (String(value).trim()) out[key] = Number(value);
    } else if (String(value).trim()) out[key] = String(value).trim();
  }
  return type === "general" ? {} : out;
}
