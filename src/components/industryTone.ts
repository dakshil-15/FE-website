import type { IndustryTone } from "@/content/types";

export const toneStyles: Record<IndustryTone, { wrapper: string; title: string; label: string }> = {
  campaign: { wrapper: "bg-ink text-paper", title: "text-paper", label: "text-red" },
  restrained: { wrapper: "bg-paper text-ink border border-line", title: "text-ink", label: "text-muted" },
  fast: { wrapper: "bg-red text-paper", title: "text-paper", label: "text-paper/70" },
  cinematic: { wrapper: "bg-mist text-ink", title: "text-ink", label: "text-red" },
  premium: { wrapper: "bg-paper text-ink border border-line", title: "text-ink", label: "text-muted" },
  technical: { wrapper: "bg-ink text-paper", title: "text-paper", label: "text-paper/60" },
};

export const toneLabels: Record<IndustryTone, string> = {
  campaign: "Campaign-led",
  restrained: "Structured & restrained",
  fast: "Fast-moving",
  cinematic: "Cinematic",
  premium: "Premium & clean",
  technical: "Technical",
};
