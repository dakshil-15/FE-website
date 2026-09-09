/** Shared device-mockup config for case studies with a live-site DeviceShowcase (hero and/or Execution section). */

export const MAHINDRA_MANULIFE_LIVE_URL = "https://www.mahindramanulife.com/";
export const MAHINDRA_MANULIFE_SCREENS = [
  { src: "/images/work/gallery/mahindra-manulife/website-full.png", alt: "Mahindra Manulife investor website", width: 2560, height: 4277 },
];

/** Screen bounds measured from the laptop mockup's alpha channel (1536×1024) — the true transparent cutout, not the outer chassis. */
export const LAPTOP_SCREEN_INSET = { top: 9.86, left: 15.3, right: 15.17, bottom: 26.07 };
/**
 * Phone mockup screen bounds (941×1672 canvas) — usable screen 713×1450px at x:113, y:100,
 * with a small safety margin added on every side so content clips inside the frame's own
 * rounded-corner curve instead of spilling onto the metal edge at the corners.
 * The Dynamic Island sits inside this area at the top, so live-site content there can be
 * partially covered — unavoidable for a live embed, just worth knowing.
 */
export const MOBILE_SCREEN_INSET = { top: 7, left: 13, right: 13.2, bottom: 8.3 };
