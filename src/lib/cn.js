import clsx from "clsx";

/** Join class names, skipping falsy values. Thin alias over clsx. */
export const cn = (...inputs) => clsx(inputs);
