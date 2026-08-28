"use client";

import Link from "next/link";
import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/SocialIcons";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about#team" },
      { label: "Careers", href: "/careers" },
      { label: "Locations", href: "/contact#offices" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Media", href: "/services/media-buying" },
      { label: "Creative", href: "/services/creative" },
      { label: "Technology", href: "/services/technology" },
      { label: "AI Solutions", href: "/services/ai-solutions" },
      { label: "Digital", href: "/services" },
    ],
  },
  {
    title: "Insights",
    links: [
      { label: "Articles", href: "/insights" },
      { label: "Case Studies", href: "/work" },
      { label: "News", href: "/insights" },
      { label: "Resources", href: "/insights" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com", Icon: LinkedInIcon },
  { label: "Instagram", href: "https://www.instagram.com", Icon: InstagramIcon },
  { label: "YouTube", href: "https://www.youtube.com", Icon: YouTubeIcon },
  { label: "Facebook", href: "https://www.facebook.com", Icon: FacebookIcon },
  { label: "X", href: "https://www.x.com", Icon: XIcon },
];

export default function Footer() {
  return (
    <footer id="contact" className="section-shell section-pad-sm bg-ink text-white !pb-0">
      <div className="foot-top">
        <div className="max-w-none sm:max-w-[320px]">
          <h2 className="m-0 font-display text-[clamp(1.625rem,5vw,2rem)] leading-[1.05] tracking-[0.01em] uppercase">
            Ready to engineer your growth system?
          </h2>
          <Link
            href="/contact"
            className="text-cta mt-6 inline-flex min-h-12 items-center gap-3.5 bg-red px-5 py-3.5 pl-6 text-white transition hover:bg-white hover:text-ink sm:mt-8"
          >
            Let&rsquo;s talk
            <span className="grid h-7 w-7 place-items-center rounded-full border border-current" aria-hidden>
              <ArrowRight size={14} strokeWidth={2.25} />
            </span>
          </Link>
        </div>

        <div className="foot-cols">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-eyebrow m-0 !tracking-[0.17em] !text-white">{col.title}</p>
              <ul className="text-body-sm mt-4 flex list-none flex-col gap-2.5 p-0 text-muted-on-dark">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition hover:text-white focus-visible:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="text-eyebrow m-0 !tracking-[0.17em] !text-white">Contact</p>
            <address className="text-body-sm mt-4 flex flex-col gap-3 text-muted-on-dark not-italic">
              <a
                href="tel:+912249772200"
                className="flex min-h-11 items-center gap-2.5 transition hover:text-white focus-visible:text-white"
              >
                <Phone size={14} strokeWidth={2} className="flex-none" aria-hidden />
                <span>+91 22 4977 2200</span>
              </a>
              <a
                href="mailto:hello@firsteconomy.in"
                className="flex min-h-11 items-center gap-2.5 break-all transition hover:text-white focus-visible:text-white"
              >
                <Mail size={14} strokeWidth={2} className="flex-none" aria-hidden />
                <span>hello@firsteconomy.in</span>
              </a>
              <span className="flex items-start gap-2.5">
                <MapPin size={14} strokeWidth={2} className="mt-[3px] flex-none" aria-hidden />
                <span>
                  Mumbai, Bengaluru,
                  <br />
                  Aurangabad, Pune.
                </span>
              </span>
            </address>
          </div>

          <div className="border-t border-white/15 pt-6 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6 lg:pl-7">
            <p className="text-eyebrow m-0 !tracking-[0.17em] !text-white">Follow us</p>
            <ul className="mt-4 flex list-none flex-wrap gap-2.5 p-0">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${label} (opens in a new tab)`}
                    className="tap-target grid h-8 w-8 place-items-center rounded-full border border-white/35 text-white transition hover:border-white hover:bg-white hover:text-ink"
                  >
                    <Icon size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="section-inner text-body-sm flex flex-col items-start justify-between gap-4 border-t border-white/15 py-5 pb-6 text-muted-on-dark sm:flex-row sm:items-center sm:gap-6 sm:pb-7">
        <span suppressHydrationWarning>
          &copy; {new Date().getFullYear()} First Economy. All rights reserved.
        </span>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link href="/privacy-policy" className="hover:text-white focus-visible:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white focus-visible:text-white">
            Terms &amp; Conditions
          </Link>
          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="tap-target grid h-7 w-7 place-items-center rounded-full border border-white/55 text-white transition hover:border-white hover:bg-white hover:text-ink"
          >
            <ArrowUp size={14} strokeWidth={2.25} aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
