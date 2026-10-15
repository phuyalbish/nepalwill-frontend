import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCreateContactMutation } from "@/api/nepalwillApi";
import { buildExtra, INITIAL_EXTRAS, INITIAL_SHARED, isInquiryType, validate } from "./contactConfig";

/** DRF error value (string, array or nested object) -> one readable string. */
const toText = (value) => {
  if (Array.isArray(value)) return value.map(toText).join(" ");
  if (value && typeof value === "object") return Object.values(value).map(toText).join(" ");
  return String(value);
};

/**
 * All contact form state. The active inquiry type lives in the URL (?type=), shared fields persist
 * across tabs, and each tab remembers its own extra fields.
 */
export function useContactForm() {
  const [params, setParams] = useSearchParams();
  const [createContact, { isLoading }] = useCreateContactMutation();
  const requested = params.get("type");
  const type = isInquiryType(requested) ? requested : "volunteer";

  const [shared, setShared] = useState(INITIAL_SHARED);
  const [extras, setExtras] = useState(INITIAL_EXTRAS);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [done, setDone] = useState(false);

  const clear = (key) => setErrors((er) => ({ ...er, [key]: undefined }));

  const setType = (next) => {
    setParams({ type: next }, { replace: true });
    setErrors({});
    setFormError("");
  };
  const setSharedField = (key) => (e) => {
    setShared((s) => ({ ...s, [key]: e.target.value }));
    clear(key);
  };
  const setExtra = (key, value) => {
    setExtras((x) => ({ ...x, [type]: { ...x[type], [key]: value } }));
    clear(key);
  };

  const submit = async (e) => {
    e.preventDefault();
    setFormError("");
    const found = validate(type, shared, extras[type]);
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => document.querySelector('#contact-form [aria-invalid="true"]')?.focus());
      return;
    }
    try {
      await createContact({
        name: shared.name.trim(),
        email: shared.email.trim(),
        phone: shared.phone.trim(),
        inquiry_type: type,
        extra: buildExtra(type, extras[type]),
        message: shared.message.trim(),
      }).unwrap();
      setDone(true);
    } catch (err) {
      const data = err?.data;
      if (err?.status === 400 && data && typeof data === "object") {
        const next = {};
        for (const [key, value] of Object.entries(data)) {
          if (key === "extra" && value && typeof value === "object" && !Array.isArray(value)) {
            for (const [k, v] of Object.entries(value)) next[k] = toText(v);
          } else if (key !== "detail" && key !== "non_field_errors") next[key] = toText(value);
        }
        setErrors(next);
        const general = data.detail ?? data.non_field_errors ?? (next.extra ? next.extra : "");
        setFormError(general ? toText(general) : "Please fix the highlighted fields and try again.");
      } else if (err?.status === "FETCH_ERROR") {
        setFormError("We could not reach the server. Check your connection and try again.");
      } else {
        setFormError("Something went wrong. Please try again in a moment.");
      }
    }
  };

  const reset = () => {
    setShared(INITIAL_SHARED);
    setExtras(INITIAL_EXTRAS);
    setErrors({});
    setFormError("");
    setDone(false);
  };

  return {
    type, setType, shared, setSharedField, extra: extras[type], setExtra,
    errors, formError, isLoading, done, submit, reset,
  };
}
