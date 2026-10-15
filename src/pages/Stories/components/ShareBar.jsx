import { useEffect, useRef, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { cn } from "@/lib/cn";

const pill =
  "inline-flex h-10 items-center gap-2 rounded-pill border border-ink/10 bg-white px-4 text-sm font-medium text-ink-700 transition-colors hover:border-ink/30 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple";

function XGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  );
}

function FacebookGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.52l.48-3H13.5V8.62c0-.87.28-1.45 1.5-1.45h1.6V4.46A21 21 0 0 0 14.27 4C12 4 10.5 5.38 10.5 7.9v2.6H8v3h2.5V21h3Z" />
    </svg>
  );
}

/** Copy link (visible Copied state, aria-live) plus plain share links for X and Facebook. */
export default function ShareBar({ title, className }) {
  const [status, setStatus] = useState("idle");
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const url = typeof window === "undefined" ? "" : window.location.href;
  const flash = (next) => {
    setStatus(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2400);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      flash("copied");
    } catch {
      flash("failed");
    }
  };

  const encoded = encodeURIComponent(url);
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="mr-1 text-sm font-medium text-muted">Share</span>
      <button type="button" onClick={copy} className={cn(pill, status === "copied" && "!border-success/40 !text-success-strong")}>
        {status === "copied" ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Link2 className="h-4 w-4" aria-hidden="true" />
        )}
        {status === "copied" ? "Copied" : "Copy link"}
      </button>
      <a
        className={pill}
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (opens in a new tab)"
      >
        <XGlyph />
        <span>X</span>
      </a>
      <a
        className={pill}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook (opens in a new tab)"
      >
        <FacebookGlyph />
        <span>Facebook</span>
      </a>
      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied" && "Link copied to clipboard"}
        {status === "failed" && "Could not copy the link"}
      </span>
      {status === "failed" && (
        <span className="text-sm text-coral" aria-hidden="true">
          Copy failed, use the address bar.
        </span>
      )}
    </div>
  );
}
