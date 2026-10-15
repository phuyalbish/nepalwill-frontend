import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Section from "@/components/ui/Section";

/** Centred muted green notice that links to the Transparency page. */
export default function TransparencyBanner() {
  return (
    <Section padded={false} className="py-12 md:py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-card border border-mint-strong/25 bg-mint-50/80 px-6 py-8 text-center md:px-12 md:py-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-success-strong shadow-soft">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="text-lg font-bold text-ink">Committed to Transparency</h2>
        <p className="max-w-xl leading-7 text-ink-700">
          We do not promote monetary donations. All contributions are in-kind. Every item is
          logged, so you can follow it from donor to student.
        </p>
        <Link
          to="/transparency"
          className="group inline-flex items-center gap-1.5 rounded font-bold text-purple hover:text-purple-600"
        >
          See the donation record
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </Section>
  );
}
