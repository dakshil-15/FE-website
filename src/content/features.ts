/**
 * Feature switches for content that is written but not yet shown.
 *
 * FAQS_ENABLED gates BOTH the visible FAQ sections (service pages, home, about) and their FAQPage JSON-LD together.
 * They must never be split: FAQPage markup for text that is not visible on the page breaks Google's structured-data
 * rules. The copy stays in `servicePages/faqs.ts` and `siteFaqs.ts`; set this to `true` to publish it.
 */
export const FAQS_ENABLED = false;
