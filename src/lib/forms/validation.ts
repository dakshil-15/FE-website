const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function trimRequired(value: unknown, fieldLabel: string): string | { error: string } {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return { error: `Enter your ${fieldLabel.toLowerCase()}.` };
  return trimmed;
}

export function isHoneypotFilled(value: unknown): boolean {
  return String(value ?? "").trim().length > 0;
}

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

export const RESUME_ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export function validateResume(file: File | null): string | null {
  if (!file || !file.size) return "Upload your resume.";
  if (file.size > RESUME_MAX_BYTES) return "Resume must be 5MB or smaller.";
  if (!RESUME_ALLOWED_TYPES.has(file.type)) return "Upload a PDF, DOC, or DOCX file.";
  return null;
}
