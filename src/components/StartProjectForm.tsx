"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { User, Building2, Mail, Phone, Globe, DollarSign, Calendar, type LucideIcon } from "lucide-react";
import { services } from "@/content/services";
import { offices } from "@/content/site";

const inputClass =
  "field-control w-full py-3 pl-11 pr-4";

function Field({
  id,
  label,
  icon: Icon,
  children,
}: {
  id: string;
  label: string;
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="relative min-w-0">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {Icon ? (
        <Icon
          size={16}
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
      ) : null}
      {children}
    </div>
  );
}

export default function StartProjectForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const formId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div className="border border-line bg-mist p-10 text-center" role="status" aria-live="polite">
        <p className="font-display text-3xl tracking-wide">Thank you.</p>
        <p className="mt-3 text-muted">
          We&rsquo;ve received your brief. A member of the team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
      <Field id={`${formId}-name`} label="Full name" icon={User}>
        <input
          id={`${formId}-name`}
          required
          name="name"
          autoComplete="name"
          placeholder="Full Name"
          className={inputClass}
        />
      </Field>
      <Field id={`${formId}-company`} label="Company" icon={Building2}>
        <input
          id={`${formId}-company`}
          required
          name="company"
          autoComplete="organization"
          placeholder="Company"
          className={inputClass}
        />
      </Field>
      <Field id={`${formId}-email`} label="Business email" icon={Mail}>
        <input
          id={`${formId}-email`}
          required
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Business Email"
          className={inputClass}
        />
      </Field>
      <Field id={`${formId}-phone`} label="Phone" icon={Phone}>
        <input
          id={`${formId}-phone`}
          required
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder="Phone"
          className={inputClass}
        />
      </Field>
      <Field id={`${formId}-website`} label="Website" icon={Globe}>
        <input
          id={`${formId}-website`}
          name="website"
          type="url"
          autoComplete="url"
          placeholder="Website"
          className={inputClass}
        />
      </Field>
      <Field id={`${formId}-service`} label="Service required">
        <select
          id={`${formId}-service`}
          required
          name="service"
          defaultValue=""
          className="field-control px-4 py-3"
        >
          <option value="" disabled>
            Service Required
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </Field>
      <Field id={`${formId}-budget`} label="Approximate budget" icon={DollarSign}>
        <input id={`${formId}-budget`} name="budget" placeholder="Approx. Budget" className={inputClass} />
      </Field>
      <Field id={`${formId}-timeline`} label="Expected timeline" icon={Calendar}>
        <input
          id={`${formId}-timeline`}
          name="timeline"
          placeholder="Expected Timeline"
          className={inputClass}
        />
      </Field>
      <div className="relative min-w-0 sm:col-span-2">
        <label htmlFor={`${formId}-office`} className="sr-only">
          Preferred location (optional)
        </label>
        <select
          id={`${formId}-office`}
          name="office"
          defaultValue=""
          className="field-control px-4 py-3"
        >
          <option value="">Preferred Location (optional)</option>
          {offices.map((o) => (
            <option key={o.slug} value={o.slug}>
              {o.city}
            </option>
          ))}
        </select>
      </div>
      <div className="relative min-w-0 sm:col-span-2">
        <label htmlFor={`${formId}-message`} className="sr-only">
          Tell us about the business challenge
        </label>
        <textarea
          id={`${formId}-message`}
          required
          name="message"
          placeholder="Tell us about the business challenge"
          rows={5}
          className="field-control px-4 py-3"
        />
      </div>
      <button
        type="submit"
        className="inline-flex min-h-12 w-fit items-center border border-ink bg-ink px-8 py-3 text-sm font-semibold tracking-wide text-paper uppercase transition hover:border-red hover:bg-red sm:col-span-2"
      >
        Submit Brief
      </button>
    </form>
  );
}
