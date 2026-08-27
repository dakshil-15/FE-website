const TICK_COUNT = 48;

export default function SunburstDecoration({ className }: { className?: string }) {
  const ticks = Array.from({ length: TICK_COUNT }, (_, i) => (360 / TICK_COUNT) * i);

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <g className="animate-sunburst" stroke="var(--color-line)" strokeWidth="1" opacity="0.85" style={{ transformOrigin: "100px 100px" }}>
        {ticks.map((deg) => (
          <line key={deg} x1={100} y1={18} x2={100} y2={42} transform={`rotate(${deg} 100 100)`} />
        ))}
      </g>
      <circle cx="100" cy="100" r="8" fill="none" stroke="var(--color-line)" strokeWidth="1" />
    </svg>
  );
}
