import { useId } from "react";
import { cn } from "@/lib/cn";
import Field from "./Field";
import { controlClass } from "@/lib/fieldStyles";

/** Multi-line input with label, hint and error. Same props as Input; `rows` defaults to 5. */
export default function Textarea({
  label,
  error,
  hint,
  required,
  className,
  inputClassName,
  id,
  rows = 5,
  ...rest
}) {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <Field id={inputId} label={label} error={error} hint={hint} required={required} className={className}>
      <textarea
        id={inputId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${inputId}-msg` : undefined}
        className={cn(controlClass(error), "resize-y", inputClassName)}
        {...rest}
      />
    </Field>
  );
}
