import type { Metadata } from "next";
import { Archivo, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ButtonMotion from "@/components/ButtonMotion";
import Preloader from "@/components/Preloader";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${barlow.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-paper text-ink">
        <Preloader />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ButtonMotion />
      </body>
    </html>
  );
}
