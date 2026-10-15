import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import Eyebrow from "@/components/ui/Eyebrow";
import StaggerGrid, { StaggerItem } from "@/components/ui/StaggerGrid";
import { EASE_OUT } from "@/lib/motion";
import Markdown from "./Markdown";

const STEPS = [
  { n: "01", title: "Identify", text: "We survey schools and partner with communities to find where help is needed most." },
  { n: "02", title: "Match", text: "Volunteers are paired with this program by skill, availability and interest." },
  { n: "03", title: "Deliver", text: "Lessons and donated resources reach students in person and online." },
  { n: "04", title: "Measure", text: "We track outcomes with teachers and share what we learn." },
];

function Block({ eyebrow, title, children }) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      className="mt-14"
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mb-6 mt-2 font-display text-3xl leading-tight text-ink md:text-4xl">{title}</h2>
      {children}
    </motion.section>
  );
}

/** "42+ Students Trained" -> { value: 42, suffix: "+", label: "Students Trained" }. */
function parseStat(text = "") {
  const m = text.match(/^([\d,]+)(\+?)\s+(.+)$/);
  if (!m) return null;
  return { value: Number(m[1].replace(/,/g, "")), suffix: m[2], label: m[3] };
}

function Impact({ program }) {
  const stat = parseStat(program.stat_label);
  const cells = [
    stat && { to: stat.value, suffix: stat.suffix, label: stat.label },
    { to: program.active_volunteers, suffix: "", label: "Active volunteers" },
  ].filter(Boolean);
  return (
    <div className="grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2">
      {cells.map((c) => (
        <div key={c.label} className="bg-ink-gradient px-7 py-8">
          <CountUp to={c.to} suffix={c.suffix} className="font-display text-6xl text-mint" />
          <p className="mt-1 text-sm uppercase tracking-[0.12em] text-white/60">{c.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Left column: about text, highlights checklist, impact numbers and the four-step method. */
export default function ProgramBody({ program }) {
  const highlights = program.highlights || [];
  return (
    <div>
      <Eyebrow>About this program</Eyebrow>
      <h2 className="mb-6 mt-2 font-display text-3xl leading-tight text-ink md:text-4xl">The curriculum, up close</h2>
      <Markdown>{program.full_content}</Markdown>

      {highlights.length > 0 && (
        <Block eyebrow="What students learn" title="Highlights">
          <StaggerGrid className="grid gap-3" stagger={0.07}>
            {highlights.map((item) => (
              <StaggerItem key={item}>
                <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/10 text-success-strong">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <p className="leading-7 text-ink-700">{item}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Block>
      )}

      <Block eyebrow="Our impact" title="By the numbers">
        <Impact program={program} />
      </Block>

      <Block eyebrow="Methodology" title="How we run it">
        <ol className="grid gap-4 sm:grid-cols-2">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-card border border-line bg-white p-5 shadow-soft">
              <span className="font-display text-3xl text-mint-strong">{s.n}</span>
              <h3 className="mt-1 font-bold text-ink">{s.title}</h3>
              <p className="mt-1 text-[15px] leading-7 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Block>
    </div>
  );
}
