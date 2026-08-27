import type { ReactNode } from "react";

export default function SectionIntro({
  eyebrow,
  title,
  description,
  action,
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  action?: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,22rem)] lg:items-end lg:gap-12">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-red">{eyebrow}</p>
        <h2
          className={`mt-3 font-heading text-3xl uppercase leading-tight tracking-tight md:text-4xl ${
            tone === "dark" ? "text-paper" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </div>
      <div className="min-w-0">
        <p className={`text-sm leading-relaxed ${tone === "dark" ? "text-paper/60" : "text-muted"}`}>{description}</p>
        {action}
      </div>
    </div>
  );
}
