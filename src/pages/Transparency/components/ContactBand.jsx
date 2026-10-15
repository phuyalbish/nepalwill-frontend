import Button from "@/components/ui/Button";

export default function ContactBand() {
  return (
    <section className="bg-ink-gradient py-16 text-white md:py-20">
      <div className="container-page flex flex-col items-center gap-5 text-center">
        <h2 className="font-display text-4xl leading-tight md:text-5xl">
          Want to give, or check a record? <em className="text-mint">Talk to us.</em>
        </h2>
        <p className="max-w-xl text-white/70">
          This report is updated periodically. To verify a specific contribution or to donate
          materials, get in touch and we will answer with receipts and photos.
        </p>
        <Button to="/contact?type=material" magnetic size="lg" arrow>
          Donate materials
        </Button>
      </div>
    </section>
  );
}
