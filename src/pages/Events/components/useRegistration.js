import { useState } from "react";
import { useRegisterForEventMutation } from "@/api/nepalwillApi";
import { hasEnded } from "./eventFormat";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { name: "", email: "", attendees: "1", message: "" };

/** First message of a DRF field error (array or string). */
const firstMessage = (value) => (Array.isArray(value) ? value[0] : value);

/**
 * Registration form state: values, client validation, submit, and live counts taken from the
 * server response (201 or 409) so the progress bar reflects the new total immediately.
 */
export function useRegistration(event) {
  const [register, { isLoading }] = useRegisterForEventMutation();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [done, setDone] = useState(false);
  const [counts, setCounts] = useState(null);

  const registered = counts?.registered_count ?? event.registered_count;
  const capacity = counts?.capacity ?? event.capacity;
  const spotsLeft = Math.max(capacity - registered, 0);
  const ended = hasEnded(event.date);

  const setField = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL.test(values.email.trim())) next.email = "Enter a valid email address.";
    const n = Number(values.attendees);
    if (!Number.isInteger(n) || n < 1 || n > Math.min(5, spotsLeft)) next.attendees = "Choose a valid number of attendees.";
    return next;
  };

  const submit = async (e) => {
    e.preventDefault();
    setFormError("");
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => document.querySelector('#register [aria-invalid="true"]')?.focus());
      return;
    }
    try {
      const res = await register({
        slug: event.slug,
        name: values.name.trim(),
        email: values.email.trim(),
        attendees: Number(values.attendees),
        message: values.message.trim(),
      }).unwrap();
      setCounts({ registered_count: res.registered_count, capacity: res.capacity });
      setDone(true);
    } catch (err) {
      const data = err?.data;
      if (err?.status === 409) {
        if (data?.registered_count != null) {
          setCounts({ registered_count: data.registered_count, capacity: data.capacity });
        }
        setFormError(data?.detail || "Not enough spots left for this event.");
        setValues((v) => ({ ...v, attendees: "1" }));
      } else if (err?.status === 400 && data && typeof data === "object") {
        const fieldErrors = {};
        for (const key of ["name", "email", "attendees", "message"]) {
          if (data[key]) fieldErrors[key] = firstMessage(data[key]);
        }
        setErrors(fieldErrors);
        if (!Object.keys(fieldErrors).length) setFormError(firstMessage(data.detail) || "Please check the form and try again.");
      } else {
        setFormError(
          err?.status === "FETCH_ERROR"
            ? "We could not reach the server. Check your connection and try again."
            : "Something went wrong. Please try again.",
        );
      }
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setFormError("");
    setDone(false);
  };

  return { values, errors, formError, done, isLoading, registered, capacity, spotsLeft, ended, setField, submit, reset };
}
