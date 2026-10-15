import { useState } from "react";
import { CalendarPlus, CircleAlert } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import ProgressBar from "@/components/ui/ProgressBar";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import RegistrationSuccess from "./RegistrationSuccess";
import { googleCalendarUrl } from "./eventFormat";
import { useRegistration } from "./useRegistration";

/** Sticky sidebar: registration form, live capacity bar and the Google Calendar link. */
export default function RegistrationCard({ event }) {
  const r = useRegistration(event);
  const [lastSubmitted, setLastSubmitted] = useState({ name: "", attendees: 1 });
  const full = r.spotsLeft === 0;
  const options = Array.from({ length: Math.min(5, r.spotsLeft) }, (_, i) => ({
    value: String(i + 1),
    label: i === 0 ? "1 person" : `${i + 1} people`,
  }));

  const onSubmit = (e) => {
    setLastSubmitted({ name: r.values.name.trim().split(/\s+/)[0], attendees: Number(r.values.attendees) });
    r.submit(e);
  };

  return (
    <Card hover={false} id="register" className="scroll-mt-24 p-6 lg:sticky lg:top-24">
      <h2 className="font-display text-3xl text-ink">Reserve your spot</h2>
      <p className="mb-5 mt-1 text-sm text-muted">Free to attend. Registration takes under a minute.</p>

      {r.done ? (
        <RegistrationSuccess name={lastSubmitted.name} attendees={lastSubmitted.attendees} onReset={r.reset} />
      ) : full ? (
        <div role="status" className="rounded-2xl bg-sage-50 p-5 text-center">
          <p className="font-bold text-ink">Event is full</p>
          <p className="mt-1 text-sm text-muted">All spots are taken. Save the event to your favorites and check back.</p>
          <Button disabled className="mt-4 w-full">
            Event is full
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
          <Input label="Name" required name="name" autoComplete="name" value={r.values.name} onChange={r.setField("name")} error={r.errors.name} />
          <Input label="Email" required type="email" name="email" autoComplete="email" value={r.values.email} onChange={r.setField("email")} error={r.errors.email} />
          <Select
            label="Attendees"
            name="attendees"
            options={options}
            value={r.values.attendees}
            onChange={r.setField("attendees")}
            error={r.errors.attendees}
            hint={r.spotsLeft <= 10 ? `Only ${r.spotsLeft} spots left` : undefined}
          />
          <Textarea label="Message (optional)" name="message" rows={3} value={r.values.message} onChange={r.setField("message")} error={r.errors.message} />
          <div aria-live="polite" role="status">
            {r.formError && (
              <p className="flex items-start gap-2 rounded-xl bg-coral/10 p-3 text-sm text-coral">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {r.formError}
              </p>
            )}
          </div>
          <Button type="submit" size="lg" loading={r.isLoading} className="w-full">
            {r.isLoading ? "Registering" : "Register"}
          </Button>
        </form>
      )}

      <ProgressBar
        className="mt-6 border-t border-line pt-5"
        label={`${r.registered} registered of ${r.capacity} spots`}
        valueLabel={full ? "Full" : `${r.spotsLeft} left`}
        value={r.registered}
        max={r.capacity}
      />
      <Button
        href={googleCalendarUrl(event)}
        variant="outline"
        size="md"
        className="mt-5 w-full"
        aria-label="Add to Google Calendar (opens in a new tab)"
      >
        <CalendarPlus className="mr-2 inline h-4 w-4 align-[-3px]" aria-hidden="true" />
        Add to calendar
      </Button>
    </Card>
  );
}
