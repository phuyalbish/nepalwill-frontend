import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CircleAlert } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Tabs from "@/components/ui/Tabs";
import Textarea from "@/components/ui/Textarea";
import ContactSuccess from "./ContactSuccess";
import TypeFields from "./TypeFields";
import { TABS } from "./contactConfig";
import { useContactForm } from "./useContactForm";

const MESSAGE_LABEL = {
  volunteer: "Tell us about yourself",
  material: "Anything else we should know",
  partner: "How would you like to work together",
  general: "Your message",
};

/** Tabbed inquiry form. The tab is mirrored in the ?type= query param. */
export default function ContactForm() {
  const f = useContactForm();
  const reduced = useReducedMotion();
  const glide = { duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] };

  return (
    <div className="rounded-hero border border-line bg-white p-5 shadow-soft sm:p-8">
      {f.done ? (
        <ContactSuccess onReset={f.reset} />
      ) : (
        <>
          <Tabs tabs={TABS} value={f.type} onChange={f.setType} label="Type of inquiry" className="-mx-1 mb-3" />
          <form id="contact-form" onSubmit={f.submit} noValidate className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Name" required name="name" autoComplete="name" maxLength={50} value={f.shared.name} onChange={f.setSharedField("name")} error={f.errors.name} />
              <Input label="Email" required type="email" name="email" autoComplete="email" maxLength={100} value={f.shared.email} onChange={f.setSharedField("email")} error={f.errors.email} />
            </div>
            <Input label="Phone (optional)" type="tel" name="phone" autoComplete="tel" maxLength={20} value={f.shared.phone} onChange={f.setSharedField("phone")} error={f.errors.phone} />

            <motion.div layout="position" transition={glide} className="relative">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={f.type}
                  role="tabpanel"
                  aria-label={TABS.find((t) => t.id === f.type).label}
                  initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -10 }}
                  transition={glide}
                >
                  <TypeFields type={f.type} extra={f.extra} errors={f.errors} set={f.setExtra} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div layout="position" transition={glide} className="flex flex-col gap-4">
              <Textarea label={MESSAGE_LABEL[f.type]} required name="message" rows={5} value={f.shared.message} onChange={f.setSharedField("message")} error={f.errors.message} />
              <div aria-live="polite" role="status">
                {f.formError && (
                  <p className="flex items-start gap-2 rounded-xl bg-coral/10 p-3 text-sm text-coral">
                    <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {f.formError}
                  </p>
                )}
              </div>
              <Button type="submit" size="lg" arrow loading={f.isLoading} className="w-full">
                {f.isLoading ? "Sending" : "Send Message"}
              </Button>
            </motion.div>
          </form>
        </>
      )}
    </div>
  );
}
