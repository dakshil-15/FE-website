"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { ArrowRightCircle } from "lucide-react";
import { contactFormCopy, contactInterests } from "@/content/contact";

const fieldClass =
  "field-control min-h-12 bg-white px-4 py-3.5 transition-[border-color] duration-200";

type FieldName = "name" | "email" | "phone" | "company" | "interest" | "requirement" | "consent";

export default function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const nextErrors: Partial<Record<FieldName, string>> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const requirement = String(data.get("requirement") ?? "").trim();
    const consent = data.get("consent") === "on";

    if (!name) nextErrors.name = "Enter your full name.";
    if (!email) nextErrors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!phone) nextErrors.phone = "Enter your phone number.";
    if (!company) nextErrors.company = "Enter your company name.";
    if (!requirement) nextErrors.requirement = "Tell us about your requirement.";
    if (!consent) nextErrors.consent = "Please agree to the Privacy Policy and Terms & Conditions.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const order: FieldName[] = ["name", "email", "phone", "company", "interest", "requirement", "consent"];
      const firstInvalid = order.find((key) => nextErrors[key]);
      const target = firstInvalid
        ? form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        : null;
      target?.focus();
      return;
    }

    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div
        className="flex min-h-[22rem] flex-col justify-center border border-line bg-white px-6 py-10 sm:px-8"
        role="status"
        aria-live="polite"
      >
        <p className="font-display m-0 text-3xl tracking-wide uppercase">{contactFormCopy.successTitle}</p>
        <p className="text-body mt-3 mb-0 max-w-[28rem] text-muted">{contactFormCopy.successBody}</p>
      </div>
    );
  }

  const consentId = `${formId}-consent`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
      aria-describedby={Object.keys(errors).length ? `${formId}-error-summary` : undefined}
    >
      {Object.keys(errors).length > 0 ? (
        <p id={`${formId}-error-summary`} className="sr-only" role="alert">
          Please fix the highlighted fields and try again.
        </p>
      ) : null}

      <Field
        id={`${formId}-name`}
        name="name"
        label="Full Name"
        required
        autoComplete="name"
        error={errors.name}
      />
      <Field
        id={`${formId}-email`}
        name="email"
        type="email"
        label="Email Address"
        required
        autoComplete="email"
        error={errors.email}
      />
      <Field
        id={`${formId}-phone`}
        name="phone"
        type="tel"
        label="Phone Number"
        required
        autoComplete="tel"
        error={errors.phone}
      />
      <Field
        id={`${formId}-company`}
        name="company"
        label="Company Name"
        required
        autoComplete="organization"
        error={errors.company}
      />

      <div className="relative min-w-0">
        <label htmlFor={`${formId}-interest`} className="mb-1.5 block text-sm font-medium text-ink">
          Your Interest
        </label>
        <select
          id={`${formId}-interest`}
          name="interest"
          defaultValue=""
          className={`${fieldClass} appearance-auto pr-10`}
        >
          <option value="" disabled>
            Select an interest
          </option>
          {contactInterests.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </div>

      <div className="relative min-w-0 sm:col-span-2">
        <label htmlFor={`${formId}-requirement`} className="mb-1.5 block text-sm font-medium text-ink">
          Your requirement <span className="text-red">*</span>
        </label>
        <textarea
          id={`${formId}-requirement`}
          name="requirement"
          required
          rows={5}
          placeholder="Tell us about your requirement"
          aria-invalid={errors.requirement ? true : undefined}
          aria-describedby={errors.requirement ? `${formId}-requirement-error` : undefined}
          className={`${fieldClass} min-h-[8.5rem] resize-y`}
        />
        {errors.requirement ? (
          <p id={`${formId}-requirement-error`} className="mt-1.5 text-sm text-red" role="alert">
            {errors.requirement}
          </p>
        ) : null}
      </div>

      <div className="sm:col-span-2">
        <div className="flex items-start gap-3">
          <input
            id={consentId}
            type="checkbox"
            name="consent"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
            className="contact-check mt-[0.15em]"
          />
          <label htmlFor={consentId} className="min-w-0 cursor-pointer text-sm leading-snug text-muted">
            {contactFormCopy.privacyPrefix}
            <Link
              href="/privacy-policy"
              className="text-red underline-offset-2 transition hover:underline focus-visible:rounded-sm focus-visible:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
            >
              {contactFormCopy.privacyLink}
            </Link>
            {contactFormCopy.privacyJoin}
            <Link
              href="/terms"
              className="text-red underline-offset-2 transition hover:underline focus-visible:rounded-sm focus-visible:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
            >
              {contactFormCopy.termsLink}
            </Link>
          </label>
        </div>
        {errors.consent ? (
          <p id={`${formId}-consent-error`} className="mt-1.5 text-sm text-red" role="alert">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="text-cta inline-flex min-h-12 items-center gap-4 bg-ink px-5 py-3.5 pl-6 text-white transition hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:py-4 sm:pl-7"
        >
          {contactFormCopy.submit}
          <ArrowRightCircle size={32} strokeWidth={1.5} aria-hidden />
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  required,
  type = "text",
  autoComplete,
  error,
}: {
  id: string;
  name: FieldName;
  label: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div className="relative min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-red"> *</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
