import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import Field from "./Field";
import { controlClass } from "@/lib/fieldStyles";

/**
 * Native select with label, hint and error.
 * @param {{value:string,label:string}[]} options  or pass <option> children instead
 * @param {string} placeholder  disabled first option, e.g. "Choose one"
 */
export default function Select({
  label,
  error,
  hint,
  required,
  className,
  inputClassName,
  id,
  options,
  placeholder,
  children,
  ...rest
}) {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <Field id={inputId} label={label} error={error} hint={hint} required={required} className={className}>
      <div className="relative">
        <select
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? `${inputId}-msg` : undefined}
          className={cn(controlClass(error), "appearance-none pr-11", inputClassName)}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))
            : children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
      </div>
    </Field>
  );
}
