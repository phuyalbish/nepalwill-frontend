import { cn } from "@/lib/cn";

/**
 * Label + control + hint/error wrapper. Input, Textarea and Select use it internally;
 * use it directly for custom controls (pass the same `id` to the control and set aria-describedby
 * to `${id}-msg` when there is a hint or error).
 * @param {string} id  control id
 * @param {string} label
 * @param {string} error  error text (also announced via role="alert")
 * @param {string} hint   helper text shown when there is no error
 */
export default function Field({ id, label, error, hint, required, className, children }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
          {required && (
            <span className="ml-0.5 text-coral" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error ? (
        <p id={`${id}-msg`} role="alert" className="text-sm text-coral-700">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
