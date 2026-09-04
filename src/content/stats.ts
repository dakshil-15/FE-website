/**
 * Company and network scale stats — single source for home, about, and awards.
 * Network figures aligned to creds deck slide 4.
 */

export type NetworkStat = {
  value: number;
  prefix?: string;
  suffix: string;
  decimals?: number;
  label: string;
  description: string;
  /** Show a trailing "+" after the value (deck uses 62+, 85+, etc.). */
  showPlus?: boolean;
  /** Deck labels billings as "BILLINGS*". */
  footnoteMarker?: boolean;
};

/** Local Planet / network scale — animated on home and about. */
export const networkStats: NetworkStat[] = [
  {
    value: 62,
    suffix: "",
    label: "Marketing Agencies",
    description:
      "Backed by one of the world's largest independent agency networks, blending global exposure with agility.",
    showPlus: true,
  },
  {
    value: 85,
    suffix: "",
    label: "Markets",
    description: "A presence that helps brands grow across the globe.",
    showPlus: true,
  },
  {
    value: 225,
    suffix: "",
    label: "Media Awards",
    description: "Recognitions for work that moved markets.",
    showPlus: true,
  },
  {
    value: 17.2,
    prefix: "$",
    suffix: "B",
    decimals: 1,
    label: "Billings",
    description: "Scale that drives better outcomes for our partners.",
    showPlus: true,
    footnoteMarker: true,
  },
];

/** First Economy office scale — referenced in about copy, not shown in stat counters. */
export const companyOfficeScale = {
  people: { value: 300, label: "People", showPlus: false as const },
  cities: { value: 4, label: "Cities", showPlus: false as const },
} as const;

/** Home page company scale strip — cities and team size. */
export const homeOfficeStats: NetworkStat[] = [
  {
    value: companyOfficeScale.cities.value,
    suffix: "",
    label: "Cities",
    description:
      "Strategic hubs across India — Mumbai, Bengaluru, Chattrapati Sambhaji Nagar and Pune.",
  },
  {
    value: companyOfficeScale.people.value,
    suffix: "",
    label: "Employees",
    description:
      "Specialists across strategy, creative, media, technology and data — building as one team.",
  },
];

export function formatNetworkStatValue(stat: NetworkStat): string {
  const formatted = stat.decimals != null ? stat.value.toFixed(stat.decimals) : String(stat.value);
  return `${stat.prefix ?? ""}${formatted}${stat.suffix}${stat.showPlus ? "+" : ""}`;
}
