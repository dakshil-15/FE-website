import type { Metadata } from "next";
import { Archivo, Barlow_Condensed } from "next/font/google";
import "./globals.css";

/**
 * Minimal root layout. The public site's chrome (Preloader, Header, Footer)
 * lives in `(site)/layout.tsx` so the admin panel at `/admin` can render its
 * own shell without inheriting it.
 */

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "First Economy — Growth Systems",
    template: "%s | First Economy",
  },
  description:
    "First Economy is an integrated growth partner combining media, creative, technology, SEO, social, influencer marketing and AI into one growth system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-paper text-ink">{children}</body>
    </html>
  );
}
