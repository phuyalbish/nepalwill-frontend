import { useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useGetProgramsQuery } from "@/api/nepalwillApi";
import ContributeCards from "./components/ContributeCards";
import ProgramsGrid from "./components/ProgramsGrid";

/** Decorative drifting glows behind the header. Static under reduced motion. */
function Glows() {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-mint/40 blur-3xl ${reduced ? "" : "animate-blob"}`}
      />
      <div
        className={`absolute -bottom-32 left-1/3 h-[320px] w-[320px] rounded-full bg-purple/10 blur-3xl ${reduced ? "" : "animate-blob-alt"}`}
      />
    </div>
  );
}

export default function Programs() {
  const programsQuery = useGetProgramsQuery();
  return (
    <>
      <header className="relative">
        <Glows />
        <div className="container-page relative py-16 md:py-24">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Programs & Events"
            title="Every skill taught is a"
            accent="future built."
            subtitle="Our programs are designed around what communities actually need. Here's what we do, and how you can be part of it."
            className="max-w-3xl"
          />
        </div>
      </header>
      <ContributeCards />
      <ProgramsGrid query={programsQuery} />
    </>
  );
}
