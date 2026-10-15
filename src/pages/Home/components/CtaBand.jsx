import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Section from "@/components/ui/Section";
import cta from "@/assets/ctaSmallImg.png";

/** Full-width image call to action closing a page. */
export default function CtaBand({
  eyebrow = "Get involved",
  title = "Join or create an impactful project",
  text = "We do not accept cash donations. Your in-kind contributions go directly to the children who need them most.",
  label = "Initiate a Project",
  to = "/contact",
}) {
  return (
    <Section padded={false} contained={false} className="overflow-hidden bg-ink py-20 text-white md:py-28">
      <ImageWithFallback
        src={cta}
        alt=""
        aria-hidden="true"
        fill
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40" />
      <div className="container-page relative z-10 flex flex-col items-start gap-5">
        <Eyebrow tone="mint">{eyebrow}</Eyebrow>
        <h2 className="h-section max-w-2xl !text-white">{title}</h2>
        <p className="max-w-xl text-lg leading-8 text-white/75">{text}</p>
        <Button to={to} size="lg" magnetic arrow className="mt-2">
          {label}
        </Button>
      </div>
    </Section>
  );
}
