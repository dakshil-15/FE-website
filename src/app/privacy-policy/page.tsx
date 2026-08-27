import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "First Economy's privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-content">
        <p className="text-xs font-semibold uppercase tracking-widest text-red">Legal</p>
        <h1 className="mt-4 font-display text-5xl tracking-wide">Privacy Policy</h1>
        <p className="mt-8 text-muted">
          This page is a placeholder. Final privacy policy copy will be supplied and approved by First Economy&rsquo;s
          legal team before launch.
        </p>
      </div>
    </section>
  );
}
