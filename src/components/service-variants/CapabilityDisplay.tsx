import type { ServiceFamily } from "@/content/types";

export default function CapabilityDisplay({
  capabilities,
  family,
}: {
  capabilities: string[];
  family: ServiceFamily;
}) {
  if (family === "performance-data") {
    return (
      <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, i) => (
          <div key={capability} className="bg-paper p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 text-sm font-medium text-ink">{capability}</p>
            <div className="mt-3 h-1.5 w-full bg-mist">
              <div className="h-full bg-red" style={{ width: `${55 + ((i * 13) % 40)}%` }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (family === "visual-creative") {
    return (
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {capabilities.map((capability, i) => (
          <div
            key={capability}
            className="mb-4 break-inside-avoid border border-line p-6"
            style={{ minHeight: i % 3 === 0 ? "9rem" : "6rem" }}
          >
            <p className="font-display text-xl tracking-wide leading-snug">{capability}</p>
          </div>
        ))}
      </div>
    );
  }

  if (family === "social-creator") {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {capabilities.map((capability) => (
          <div
            key={capability}
            className="flex h-56 w-40 shrink-0 flex-col justify-between border border-line bg-ink p-4 text-paper"
          >
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-red" />
              <span className="h-2 w-12 bg-paper/30" />
            </div>
            <p className="text-sm font-medium leading-snug">{capability}</p>
          </div>
        ))}
      </div>
    );
  }

  if (family === "product-tech") {
    return (
      <div className="border border-line">
        {capabilities.map((capability, i) => (
          <div
            key={capability}
            className={`flex items-center gap-4 px-5 py-4 ${i % 2 === 0 ? "bg-mist" : "bg-paper"} ${
              i !== capabilities.length - 1 ? "border-b border-line" : ""
            }`}
          >
            <span className="font-mono text-xs text-muted">{`0x${(i + 10).toString(16).toUpperCase()}`}</span>
            <span className="text-sm font-medium text-ink">{capability}</span>
          </div>
        ))}
      </div>
    );
  }

  // AI
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {capabilities.map((capability) => (
        <div key={capability} className="relative border border-line bg-gradient-to-br from-mist to-paper p-5">
          <span className="absolute right-4 top-4 text-2xl text-red/30">&#10022;</span>
          <p className="max-w-[85%] text-sm font-medium text-ink">{capability}</p>
        </div>
      ))}
    </div>
  );
}
