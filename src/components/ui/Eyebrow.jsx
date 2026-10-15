import { cn } from "@/lib/cn";

/**
 * Small uppercase label above a heading.
 * @param {'purple'|'mint'} tone  mint for dark sections
 * @param {string} as             element tag, default 'p'
 */
export default function Eyebrow({ tone = "purple", as: Tag = "p", className, children, ...rest }) {
  return (
    <Tag className={cn("eyebrow", tone === "mint" && "!text-mint", className)} {...rest}>
      {children}
    </Tag>
  );
}
