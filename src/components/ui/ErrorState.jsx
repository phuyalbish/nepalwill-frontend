import { RotateCw, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/cn";
import { getErrorMessage } from "@/lib/errors";
import Button from "./Button";

/**
 * Error panel with an optional retry button.
 * @param {object} error          RTK Query error; message is derived from it when `message` is absent
 * @param {string} title          default "Something went wrong"
 * @param {string} message
 * @param {()=>void} onRetry      shows a Try again button (pass query.refetch)
 */
export default function ErrorState({
  error,
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try again",
  className,
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center gap-3 rounded-card border border-coral/20 bg-white px-6 py-14 text-center",
        className,
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-coral/10 text-coral">
        <TriangleAlert className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="max-w-md text-muted">{message ?? getErrorMessage(error)}</p>
      {onRetry && (
        <Button variant="dark" size="sm" onClick={onRetry} className="mt-2">
          <RotateCw className="mr-1.5 inline h-4 w-4" aria-hidden="true" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
