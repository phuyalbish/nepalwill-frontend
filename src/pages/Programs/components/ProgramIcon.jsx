import {
  BookOpen,
  FlaskConical,
  HeartPulse,
  Languages,
  Laptop,
  Palette,
  Sparkles,
  Users,
} from "lucide-react";

/** Explicit lookup of the lucide icons the API can name on a program. Unknown names fall back to Sparkles. */
const ICONS = { BookOpen, FlaskConical, HeartPulse, Languages, Laptop, Palette, Sparkles, Users };

export default function ProgramIcon({ name, ...rest }) {
  const Icon = ICONS[name] || Sparkles;
  return <Icon aria-hidden="true" {...rest} />;
}
