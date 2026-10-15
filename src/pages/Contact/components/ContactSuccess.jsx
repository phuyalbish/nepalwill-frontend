import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";

/** Shown in place of the form after a successful submission. */
export default function ContactSuccess({ onReset }) {
  const reduced = useReducedMotion();
  const headingRef = useRef(null);

  // Move focus to the confirmation: the submit button that had it is gone.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 px-4 py-14 text-center">
      <motion.span
        className="flex h-16 w-16 items-center justify-center rounded-full bg-mint text-ink shadow-glow"
        initial={{ scale: reduced ? 1 : 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
      >
        <Check className="h-8 w-8" strokeWidth={3} aria-hidden="true" />
      </motion.span>
      <h2 ref={headingRef} tabIndex={-1} className="font-display text-3xl text-ink outline-none">Message sent</h2>
      <p className="max-w-sm text-muted">
        Thank you for reaching out. A member of the team will reply to the email you gave us.
      </p>
      <Button variant="outline" onClick={onReset} className="mt-3">
        Send another message
      </Button>
    </div>
  );
}
