import { Home } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-page relative flex min-h-[70vh] flex-col items-center justify-center gap-5 py-24 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-blob rounded-full bg-mint/40 blur-3xl"
      />
      <Eyebrow className="relative">Error 404</Eyebrow>
      <h1 className="h-display relative">
        This page <span className="italic text-purple">wandered off.</span>
      </h1>
      <p className="relative max-w-md text-lg text-muted">
        The page you are looking for does not exist or has moved. Let us get you back on track.
      </p>
      <Button to="/" size="lg" className="relative mt-2">
        <Home className="mr-1 h-4 w-4" aria-hidden="true" />
        Back to home
      </Button>
    </section>
  );
}
