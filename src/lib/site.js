/** Static site facts shared by the layout and pages. Contact details come from the blueprint. */
export const SITE = {
  name: "NepalWill",
  tagline:
    "Empowering young minds through education, skill development, and community engagement in Nepal.",
  email: "info@nepalwill.com",
  phone: "+977 9876543210",
  phoneHref: "tel:+9779876543210",
  address: "Kirtipur, Kathmandu, Nepal",
};

/** Primary navigation (desktop centre links and mobile drawer). */
export const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/stories", label: "Stories" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
];

/** Used by the footer when /api/programs/ has not loaded yet. Slugs verified against the API. */
export const FALLBACK_PROGRAMS = [
  { slug: "digital-literacy", title: "Digital Literacy" },
  { slug: "english-language", title: "English Language" },
  { slug: "stem-education", title: "STEM Education" },
  { slug: "arts-and-culture", title: "Arts & Culture" },
  { slug: "leadership-training", title: "Leadership Training" },
  { slug: "health-and-hygiene", title: "Health & Hygiene" },
];
