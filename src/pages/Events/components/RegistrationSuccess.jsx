import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";

/** Animated confirmation shown after a successful registration. */
export default function RegistrationSuccess({ name, attendees, onReset }) {
  const reduced = useReducedMotion();
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-4 text-center">
      <motion.span
        className="flex h-16 w-16 items-center justify-center rounded-full bg-mint text-ink shadow-glow"
        initial={{ scale: reduced ? 1 : 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
      >
        <motion.span
          initial={{ scale: reduced ? 1 : 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: reduced ? 0 : 0.25, duration: 0.3 }}
          className="inline-flex"
        >
          <Check className="h-8 w-8" strokeWidth={3} aria-hidden="true" />
        </motion.span>
      </motion.span>
      <h3 className="font-display text-3xl text-ink">You&apos;re registered</h3>
      <p className="max-w-xs text-muted">
        Thank you, {name}. We have saved {attendees === 1 ? "your spot" : `${attendees} spots`} for you.
      </p>
      <Button variant="outline" size="sm" onClick={onReset} className="mt-2">
        Register someone else
      </Button>
    </div>
  );
}
