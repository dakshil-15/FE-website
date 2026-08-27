export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-red">{eyebrow}</p>
      )}
      <h2 className="mt-3 font-display text-4xl leading-tight tracking-wide md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base text-muted">{description}</p>}
    </div>
  );
}
