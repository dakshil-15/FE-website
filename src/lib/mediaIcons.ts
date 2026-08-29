import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  Clapperboard,
  Cpu,
  Globe,
  Layers,
  Lightbulb,
  Megaphone,
  Palette,
  Radio,
  Rocket,
  Search,
  Shield,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  CircleDot,
} from "lucide-react";

/** Lucide icons used by MediaSlot.icon (service page placeholders, etc.). */
export const mediaLucideIcons = {
  Target,
  Palette,
  Sparkles,
  Rocket,
  ChartPie: BarChart3,
  TrendingUp,
  Megaphone,
  Cpu,
  Search,
  Bot,
  Clapperboard,
  ShoppingCart,
  Radio,
  Users,
  Layers,
  Lightbulb,
  Shield,
  Workflow,
  Globe,
  CircleDot,
} as const satisfies Record<string, LucideIcon>;

export type MediaLucideName = keyof typeof mediaLucideIcons;

const KEYWORD_ICONS: Array<[RegExp, MediaLucideName]> = [
  [/ai|bot|automat/i, "Bot"],
  [/search|seo|aeo|geo|on-page|technical seo/i, "Search"],
  [/video|film|motion|clapper|play/i, "Clapperboard"],
  [/market|retail|e-?commerce|listing|catalogue|store|cart/i, "ShoppingCart"],
  [/social|community|creator|ugc|megaphone|listening|amplif/i, "Megaphone"],
  [/tech|platform|integrat|erp|workflow|ops|monitor|cpu/i, "Cpu"],
  [/data|analytic|insight|chart|dashboard|report/i, "ChartPie"],
  [/performance|growth|conversion|funnel|billings|scale|optim/i, "TrendingUp"],
  [/strateg|position|target|consult/i, "Target"],
  [/identity|brand|palette|expression/i, "Palette"],
  [/experience|design|spark|innovat|creative craft/i, "Sparkles"],
  [/launch|campaign|rocket/i, "Rocket"],
  [/awareness|consideration|loyalty|engagement|retention|radio/i, "Radio"],
  [/team|people|proven|collaborat/i, "Users"],
  [/system|layer|end-to-end|full.?spectrum|full.?funnel/i, "Layers"],
  [/integrity|trust|govern|shield|transpar/i, "Shield"],
  [/local|globe|presence|omnichannel|multi.?platform/i, "Globe"],
  [/light|idea|content architect/i, "Lightbulb"],
  [/process|workflow/i, "Workflow"],
];

/** Pick a Lucide icon name from a free-text label (service page placeholders). */
export function lucideNameForLabel(label: string): MediaLucideName {
  for (const [pattern, name] of KEYWORD_ICONS) {
    if (pattern.test(label)) return name;
  }
  return "CircleDot";
}
