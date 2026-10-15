import { Inbox } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Centred "nothing here" panel.
 * @param {import('react').ElementType} icon  lucide icon component (default Inbox)
 * @param {string} title
 * @param {import('react').ElementType} as  heading element (default h3; use h1 when the panel is the whole page)
 * @param {string} description
 * @param {import('react').ReactNode} action  usually a <Button>
 */
export default function EmptyState({ icon: Icon = Inbox, title, description, action, className, as: Heading = "h3" }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-card border border-dashed border-line bg-white/60 px-6 py-14 text-center",
        className,
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint-50 text-ink-700">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <Heading className="font-display text-2xl text-ink">{title}</Heading>
      {description && <p className="max-w-md text-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
