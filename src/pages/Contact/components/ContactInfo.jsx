import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site";

const LINK =
  "rounded-sm font-bold text-ink underline decoration-mint-strong decoration-2 underline-offset-4 outline-none transition-colors hover:text-purple focus-visible:ring-4 focus-visible:ring-mint/60";

function Row({ icon: Icon, label, children }) {
  return (
    <li className="flex items-center gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
        <p className="break-words font-bold text-ink">{children}</p>
      </div>
    </li>
  );
}

/** Left column: address, email, phone, the no-cash policy and office hours. */
export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-display text-3xl text-ink">Contact Information</h2>
      <ul className="flex flex-col gap-5">
        <Row icon={MapPin} label="Address">
          {SITE.address}
        </Row>
        <Row icon={Mail} label="Email">
          <a href={`mailto:${SITE.email}`} className={LINK}>
            {SITE.email}
          </a>
        </Row>
        <Row icon={Phone} label="Phone">
          <a href={SITE.phoneHref} className={LINK}>
            {SITE.phone}
          </a>
        </Row>
        <Row icon={Clock} label="Office hours">
          Sunday to Friday, 10:00 AM to 5:00 PM
          <span className="block text-sm font-normal text-muted">Nepal time. Closed on Saturdays.</span>
        </Row>
      </ul>
      <aside className="rounded-card border border-mint-strong/40 bg-mint-50 p-6" aria-label="Donation policy">
        <h3 className="flex items-center gap-2 font-bold text-ink">
          <ShieldCheck className="h-5 w-5 text-success-strong" aria-hidden="true" />
          Important Note
        </h3>
        <p className="mt-2 leading-7 text-ink-700">
          NepalWill does not accept cash donations. We exclusively accept in-kind contributions such as books, school
          supplies and infrastructure support, to ensure transparency and direct impact.
        </p>
      </aside>
    </div>
  );
}
