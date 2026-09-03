/**
 * Contact page content.
 * Office cards keep the About card layout and use live office addresses.
 */

import type { MediaSlot } from "@/content/about";
import { officeLocations } from "@/content/offices";
import { contactInfo } from "@/content/site";

export const contactHero = {
  eyebrow: "Contact Us",
  headlineBefore: "Let's engineer your next",
  headlineAccent: "growth system.",
  body: "Tell us about your challenge and our experts will get back to you within 24 hours.",
  cta: { label: "Send a message", href: "#contact-form" },
  image: {
    src: "/images/contact/hero/team-meeting.jpg",
    alt: "First Economy team in a glass meeting room",
    label: "Contact hero meeting photo",
    grayscale: false,
  } satisfies MediaSlot,
  verticalMark: "CALL  ·  EMAIL  ·  VISIT  ·  PARTNER",
  burst: "/images/about/hero/radial-burst.svg",
  arrow: "/images/about/ui/arrow-right-circle.svg",
};

export const contactFormCopy = {
  title: "Send us a message",
  privacyPrefix: "I agree to the ",
  privacyLink: "Privacy Policy",
  termsLink: "Terms & Conditions",
  privacyJoin: " and ",
  submit: "Send message",
  successTitle: "Message sent.",
  successBody: "Thank you. Our team will get back to you within 24 working hours.",
};

export const contactInterests = [
  "360° Media Buying",
  "Creative Solutions",
  "Technology",
  "AI Solutions",
  "SEO",
  "Social Media",
  "Influencer Marketing",
  "Video Production",
  "Project Innovation & Branding",
  "Marketplace Management",
  "Careers",
  "Partnership",
  "Other",
];

export const contactTouch = {
  title: "Get in touch",
  items: [
    {
      label: "Call us",
      value: contactInfo.phone,
      href: contactInfo.phoneHref,
      icon: "phone" as const,
    },
    {
      label: "Email us",
      value: contactInfo.email,
      href: contactInfo.emailHref,
      icon: "email" as const,
    },
    {
      label: "Business hours",
      value: "Mon - Sat: 10:00 AM – 7:00 PM",
      icon: "hours" as const,
    },
    {
      label: "Response time",
      value: "Within 24 working hours",
      icon: "response" as const,
    },
  ],
};

export const contactOfficesCopy = {
  eyebrow: "Our Offices",
  title: "We are where you are.",
  body: "Four cities. One mission. Building growth systems that drive real impact.",
};

export const contactOffices = officeLocations.map(({ slug, city, isHq, address, contact }) => ({
  slug,
  city,
  ...(isHq ? { isHq: true as const } : {}),
  address,
  ...(contact ? { contact } : {}),
}));
