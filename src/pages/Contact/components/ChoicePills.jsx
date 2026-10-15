import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * Accessible pill choices built on native inputs: radios for one answer, checkboxes for many.
 * @param {boolean} multiple  value is an array of strings; otherwise a single string
 */
export default function ChoicePills({ legend, name, options, multiple = false, value, onChange, error, required }) {
  const id = useId();
  const isOn = (v) => (multiple ? value.includes(v) : value === v);
  const pick = (v) => {
    if (!multiple) onChange(v);
    else onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };
  return (
    <fieldset className="min-w-0" aria-describedby={error ? `${id}-msg` : undefined}>
      <legend className="mb-2 text-sm font-medium text-ink">
        {legend}
        {required && (
          <span className="ml-0.5 text-coral" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="cursor-pointer">
            <input
              type={multiple ? "checkbox" : "radio"}
              name={name}
              value={o.value}
              checked={isOn(o.value)}
              onChange={() => pick(o.value)}
              aria-invalid={error ? true : undefined}
              className="peer sr-only"
            />
            <span
              className={cn(
                "inline-flex rounded-pill border px-4 py-2 text-sm font-medium transition-colors",
                "border-line bg-white text-ink-700 hover:border-muted-300",
                "peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white",
                "peer-focus-visible:ring-4 peer-focus-visible:ring-mint/60",
                error && "border-coral",
              )}
            >
              {o.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${id}-msg`} role="alert" className="mt-1.5 text-sm text-coral-700">
          {error}
        </p>
      )}
    </fieldset>
  );
}
