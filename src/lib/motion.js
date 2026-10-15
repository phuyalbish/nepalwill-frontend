/** Shared easing and spring presets so every component moves the same way. */
export const EASE_OUT = [0.22, 1, 0.36, 1];
export const SPRING = { type: "spring", stiffness: 320, damping: 26 };
export const SOFT_SPRING = { type: "spring", stiffness: 180, damping: 22 };

/** Shared-element id for Lightbox zoom. Give the grid thumbnail the same id. */
export const lightboxLayoutId = (prefix, key) => `${prefix}-${key}`;
