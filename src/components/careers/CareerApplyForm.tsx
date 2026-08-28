"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRightCircle, Upload } from "lucide-react";

const fieldClass = "field-control min-h-12 bg-white px-4 py-3.5 transition-[border-color] duration-200";

type FieldName = "name" | "email" | "phone" | "resume" | "coverLetter";

export default function CareerApplyForm({
  roleTitle,
  roleSlug,
}: {
  roleTitle: string;
  roleSlug?: string;
}) {
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
    const resume = data.get("resume");

    if (!name) nextErrors.name = "Enter your full name.";
    if (!email) nextErrors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!phone) nextErrors.phone = "Enter your phone number.";
    if (!resume || !(resume instanceof File) || !resume.size) nextErrors.resume = "Upload your resume.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const order: FieldName[] = ["name", "email", "phone", "resume"];
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
        className="flex min-h-[20rem] flex-col justify-center border border-line bg-white px-6 py-10 sm:px-8"
        role="status"
        aria-live="polite"
      >
        <h3 className="font-display m-0 text-2xl tracking-wide uppercase">Application received</h3>
        <p className="text-body mt-3 mb-0 max-w-[24rem] text-muted">
          Thank you for applying for the {roleTitle} role. Our team will review your application and get back to you
          soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-4 sm:gap-5"
      aria-label={`Application for ${roleTitle}`}
      data-role-slug={roleSlug}
    >
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

      <div className="relative min-w-0">
        <label htmlFor={`${formId}-resume`} className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">
            Resume / CV <span className="text-red">*</span>
          </span>
          <span
            className={`flex min-h-[7.5rem] cursor-pointer flex-col items-center justify-center gap-2 border border-dashed bg-white px-4 py-6 text-center transition hover:border-ink ${
              errors.resume ? "border-red" : "border-line"
            }`}
          >
            <Upload size={24} className="text-muted" aria-hidden />
            <span className="text-body-sm text-ink">
              <span className="text-red">Click to upload</span> or drag and drop
            </span>
            <span className="text-body-sm text-muted">PDF, DOC, DOCX (Max. 5MB)</span>
          </span>
        </label>
        <input
          id={`${formId}-resume`}
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          aria-invalid={errors.resume ? true : undefined}
          aria-describedby={errors.resume ? `${formId}-resume-error` : undefined}
        />
        {errors.resume ? (
          <p id={`${formId}-resume-error`} className="mt-1.5 text-sm text-red" role="alert">
            {errors.resume}
          </p>
        ) : null}
      </div>

      <div className="relative min-w-0">
        <label htmlFor={`${formId}-cover-letter`} className="mb-1.5 block text-sm font-medium text-ink">
          Cover Letter <span className="font-normal text-muted">(Optional)</span>
        </label>
        <textarea
          id={`${formId}-cover-letter`}
          name="coverLetter"
          rows={4}
          placeholder="Tell us why you're a great fit for this role"
          className={`${fieldClass} min-h-[6.5rem] resize-y`}
        />
      </div>

      <button
        type="submit"
        className="text-cta tap-target inline-flex min-h-12 w-full items-center justify-center gap-3 bg-red px-5 py-3.5 text-white transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:gap-4"
      >
        Submit application
        <ArrowRightCircle size={28} strokeWidth={1.5} aria-hidden />
      </button>

      <p className="text-body-sm m-0 text-muted">
        Your information is secure and will only be used to process your application in line with our privacy policy.
      </p>
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
        aria-required={required ? true : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClass}${error ? " border-red" : ""}`}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
