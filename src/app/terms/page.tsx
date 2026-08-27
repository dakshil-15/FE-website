import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "First Economy's terms and conditions.",
};

export default function TermsPage() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-content">
        <p className="text-xs font-semibold uppercase tracking-widest text-red">Legal</p>
        <h1 className="mt-4 font-display text-5xl tracking-wide">Terms &amp; Conditions</h1>
        <p className="mt-8 text-muted">
          This page is a placeholder. Final terms and conditions copy will be supplied and approved by First
          Economy&rsquo;s legal team before launch.
        </p>
      </div>
    </section>
  );
}
