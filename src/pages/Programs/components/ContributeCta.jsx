import Button from "@/components/ui/Button";

/** "Want to contribute?" box. Sticky to the bottom of the left column on desktop. */
export default function ContributeCta({ program }) {
  return (
    <div className="mt-14 rounded-hero bg-ink-gradient p-7 text-white shadow-lift md:p-9 lg:sticky lg:bottom-6 lg:z-10">
      <p className="eyebrow !text-mint">Want to contribute?</p>
      <h2 className="mt-2 font-display text-3xl leading-tight md:text-4xl">
        Help us keep {program.title} <span className="italic text-mint">going.</span>
      </h2>
      <p className="mt-3 max-w-xl text-white/70">
        We never ask for cash. Teach a class, donate materials or partner with us.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button to="/contact?type=volunteer" magnetic>
          Volunteer
        </Button>
        <Button
          to="/contact?type=material"
          variant="outline"
          className="!border-white/30 !bg-transparent !text-white hover:!border-white"
        >
          Donate materials
        </Button>
      </div>
    </div>
  );
}
