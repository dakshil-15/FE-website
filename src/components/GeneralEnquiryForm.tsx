"use client";

import { useId, useState, type FormEvent } from "react";
import { User, Mail, Phone } from "lucide-react";

const inputClass = "field-control w-full py-3 pl-11 pr-4";

export default function GeneralEnquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const formId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div className="border border-line bg-mist p-8 text-center" role="status" aria-live="polite">
        <p className="font-display text-2xl tracking-wide">Thanks for reaching out.</p>
        <p className="mt-2 text-sm text-muted">We&rsquo;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="relative">
        <label htmlFor={`${formId}-name`} className="sr-only">
          Name
        </label>
        <User size={16} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" aria-hidden />
        <input
          id={`${formId}-name`}
          required
          name="name"
          autoComplete="name"
          placeholder="Name"
          className={inputClass}
        />
      </div>
      <div className="relative">
        <label htmlFor={`${formId}-email`} className="sr-only">
          Email
        </label>
        <Mail size={16} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" aria-hidden />
        <input
          id={`${formId}-email`}
          required
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email"
          className={inputClass}
        />
      </div>
      <div className="relative">
        <label htmlFor={`${formId}-phone`} className="sr-only">
          Phone
        </label>
        <Phone size={16} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" aria-hidden />
        <input
          id={`${formId}-phone`}
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder="Phone"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor={`${formId}-message`} className="sr-only">
          Message
        </label>
        <textarea
          id={`${formId}-message`}
          required
          name="message"
          placeholder="Message"
          rows={4}
          className="field-control px-4 py-3"
        />
      </div>
      <button
        type="submit"
        className="inline-flex min-h-12 w-fit items-center border border-ink px-6 py-3 text-sm font-semibold tracking-wide uppercase transition hover:border-red hover:bg-red hover:text-paper"
      >
        Send Message
      </button>
    </form>
  );
}
