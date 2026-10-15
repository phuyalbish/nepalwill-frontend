import { useId } from "react";
import { cn } from "@/lib/cn";
import Field from "./Field";
import { controlClass } from "@/lib/fieldStyles";

/**
 * Text input with label, hint and error. className styles the wrapper, inputClassName the <input>.
 * All other props (type, name, value, onChange, register spread, ...) go to the <input>.
 */
export default function Input({
  label,
  error,
  hint,
  required,
  className,
  inputClassName,
  id,
  ...rest
}) {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <Field id={inputId} label={label} error={error} hint={hint} required={required} className={className}>
      <input
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${inputId}-msg` : undefined}
        className={cn(controlClass(error), inputClassName)}
        {...rest}
      />
    </Field>
  );
}
