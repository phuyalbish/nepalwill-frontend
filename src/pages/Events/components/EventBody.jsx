import { motion, useReducedMotion } from "framer-motion";
import { Users } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { EASE_OUT } from "@/lib/motion";

function Block({ eyebrow, title, children }) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      className="mt-12 first:mt-0"
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mb-5 mt-2 font-display text-3xl leading-tight text-ink md:text-4xl">{title}</h2>
      {children}
    </motion.section>
  );
}

function Timeline({ agenda }) {
  return (
    <ol className="relative ml-2 border-l-2 border-mint pl-0">
      {agenda.map((item, i) => (
        <li key={`${item.time}-${i}`} className="relative pb-7 pl-8 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-[3px] border-white bg-mint-strong shadow-soft"
          />
          <p className="text-sm font-bold tracking-wide text-purple">{item.time}</p>
          <p className="mt-0.5 font-medium text-ink">{item.title}</p>
        </li>
      ))}
    </ol>
  );
}

/** Left column: description, agenda timeline, house rules and audience. */
export default function EventBody({ event }) {
  const agenda = event.agenda || [];
  const rules = event.rules || [];
  return (
    <div>
      <Block eyebrow="About this event" title="What to expect">
        <p className="whitespace-pre-line text-lg leading-9 text-ink-700">{event.description}</p>
      </Block>
      {agenda.length > 0 && (
        <Block eyebrow="The day" title="Agenda">
          <Timeline agenda={agenda} />
        </Block>
      )}
      {rules.length > 0 && (
        <Block eyebrow="Good to know" title="Guidelines">
          <ul className="flex flex-col gap-3">
            {rules.map((rule) => (
              <li key={rule} className="flex gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
                <span className="leading-7 text-ink-700">{rule}</span>
              </li>
            ))}
          </ul>
        </Block>
      )}
      {event.audience && (
        <Block eyebrow="Who it is for" title="Audience">
          <p className="flex items-start gap-3 rounded-2xl bg-mint-50 p-5 text-ink-700">
            <Users className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden="true" />
            {event.audience}
          </p>
        </Block>
      )}
    </div>
  );
}
