import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Mail, MapPin, Phone } from "lucide-react";
import { useGetProgramsQuery } from "@/api/nepalwillApi";
import { FALLBACK_PROGRAMS, NAV_LINKS, SITE } from "@/lib/site";
import Logo from "./Logo";

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/nepalwill", Icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/nepalwill", Icon: FaInstagram },
  { label: "X", href: "https://www.twitter.com/nepalwill", Icon: FaXTwitter },
  { label: "YouTube", href: "https://www.youtube.com/@nepalwill", Icon: FaYoutube },
];

const linkClass = "text-sm text-white/70 transition-colors hover:text-mint";

function Column({ title, children }) {
  return (
    <div>
      <h2 className="mb-5 text-base font-bold text-mint">{title}</h2>
      {children}
    </div>
  );
}

/** Dark gradient footer: brand + socials, quick links, programs (API with static fallback), contact. */
export default function Footer() {
  const { data } = useGetProgramsQuery();
  const programs = data?.length ? data : FALLBACK_PROGRAMS;

  return (
    <footer className="grain relative mt-8 overflow-hidden bg-ink-gradient text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-mint via-purple to-mint"
      />
      <div className="container-page relative z-10 pb-8 pt-16 md:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/70">{SITE.tagline}</p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-chip bg-white/10 text-white/70 transition-colors hover:bg-mint hover:text-ink"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <Column title="Quick Links">
            <ul className="flex flex-col gap-3">
              {[...NAV_LINKS, { to: "/contact", label: "Contact" }].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Programs">
            <ul className="flex flex-col gap-3">
              {programs.map((p) => (
                <li key={p.slug}>
                  <Link to={`/programs/${p.slug}`} className={linkClass}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Connect">
            <ul className="flex flex-col gap-4">
              <li>
                <a href={`mailto:${SITE.email}`} className={`${linkClass} inline-flex items-center gap-3`}>
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.phoneHref} className={`${linkClass} inline-flex items-center gap-3`}>
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {SITE.phone}
                </a>
              </li>
              <li className="inline-flex items-start gap-3 text-sm text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {SITE.address}
              </li>
            </ul>
          </Column>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/transparency" className="transition-colors hover:text-mint">
              Transparency
            </Link>
            <Link to="/favorites" className="transition-colors hover:text-mint">
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
