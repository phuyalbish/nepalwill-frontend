import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import ChoicePills from "./ChoicePills";
import { AVAILABILITY, CONDITIONS, HANDOVER, ITEM_CATEGORIES, ORG_TYPES, SKILLS } from "./contactConfig";

/** Fields that depend on the active inquiry type. `set(key, value)` writes into that type's extras. */
export default function TypeFields({ type, extra, errors, set }) {
  const on = (key) => (e) => set(key, e.target.value);

  if (type === "volunteer")
    return (
      <div className="flex flex-col gap-4">
        <ChoicePills legend="Skills you can share" name="skills" required multiple options={SKILLS} value={extra.skills} onChange={(v) => set("skills", v)} error={errors.skills} />
        <ChoicePills legend="Availability" name="availability" required options={AVAILABILITY} value={extra.availability} onChange={(v) => set("availability", v)} error={errors.availability} />
        <Input label="Hours per month (optional)" type="number" inputMode="numeric" min="1" max="200" name="hours_per_month" value={extra.hours_per_month} onChange={on("hours_per_month")} error={errors.hours_per_month} />
      </div>
    );

  if (type === "material")
    return (
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Item category" required placeholder="Choose one" options={ITEM_CATEGORIES} name="item_category" value={extra.item_category} onChange={on("item_category")} error={errors.item_category} />
          <Input label="Quantity" required type="number" inputMode="numeric" min="1" name="quantity" value={extra.quantity} onChange={on("quantity")} error={errors.quantity} />
        </div>
        <Select label="Condition" required placeholder="Choose one" options={CONDITIONS} name="condition" value={extra.condition} onChange={on("condition")} error={errors.condition} />
        <ChoicePills legend="Pickup or drop off" name="handover" required options={HANDOVER} value={extra.handover} onChange={(v) => set("handover", v)} error={errors.handover} />
      </div>
    );

  if (type === "partner")
    return (
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Organisation name" required maxLength={120} name="organisation_name" value={extra.organisation_name} onChange={on("organisation_name")} error={errors.organisation_name} />
          <Select label="Organisation type" required placeholder="Choose one" options={ORG_TYPES} name="organisation_type" value={extra.organisation_type} onChange={on("organisation_type")} error={errors.organisation_type} />
        </div>
        <Textarea label="Partnership idea (optional)" rows={3} name="partnership_idea" value={extra.partnership_idea} onChange={on("partnership_idea")} error={errors.partnership_idea} />
      </div>
    );

  return null;
}
