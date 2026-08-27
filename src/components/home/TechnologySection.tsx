import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const platforms = [
  {
    title: "CRM & CDP",
    description: "Customer data platforms that connect acquisition, retention and experience.",
    icon: "/assets/ic-tech.png",
  },
  {
    title: "ERP Integration",
    description: "Systems for businesses that have outgrown off-the-shelf software.",
    icon: "/assets/ic-marketplace.png",
  },
  {
    title: "Dashboarding",
    description: "Live reporting so decisions are made on current data, not static decks.",
    icon: "/assets/ic-ai-analytics.png",
  },
  {
    title: "Automation",
    description: "Connected operations across platforms, without manual glue.",
    icon: "/assets/ic-ai-optimization.png",
  },
  {
    title: "Reporting",
    description: "Attribution, brand lift and performance reporting built into the stack.",
    icon: "/assets/ic-media.png",
  },
  {
    title: "Custom Solutions",
    description: "Web, mobile and workflow products built for how your teams actually work.",
    icon: "/assets/ic-creative.png",
  },
];

export default function TechnologySection() {
  return (
    <section
      id="technology"
      className="bg-paper px-[var(--gutter)] py-12 sm:py-[72px] sm:pb-[84px]"
      aria-labelledby="technology-heading"
    >
      <div className="mx-auto max-w-[var(--content)]">
        <p className="text-eyebrow m-0">Technology &amp; Platforms</p>
        <div className="mt-5 grid grid-cols-1 items-start gap-8 sm:mt-[22px] md:grid-cols-2 md:gap-[60px]">
          <h2 id="technology-heading" className="text-display-md m-0">
            Built to scale.
            <br />
            Engineered to perform.
          </h2>
          <div className="pt-0 md:pt-1.5">
            <p className="text-body m-0 max-w-[400px] text-[#333]">
              The platforms campaigns, commerce and intelligence depend on — designed as part of one growth system.
            </p>
            <Link
              href="/services/technology"
              className="text-cta mt-5 inline-flex items-center gap-3.5 border-b border-ink pb-[9px] transition hover:border-red hover:text-red sm:mt-6"
            >
              Explore tech solutions
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>

        <ul className="mt-11 grid list-none grid-cols-1 gap-2.5 p-0 xs:grid-cols-2 lg:grid-cols-3">
          {platforms.map((item) => (
            <li key={item.title} className="min-w-0">
              <div className="relative flex min-h-[158px] flex-col justify-between border border-line bg-white p-4 transition-[border-color] duration-200 hover:border-ink sm:p-5">
                <Image
                  src={item.icon}
                  alt=""
                  aria-hidden
                  width={40}
                  height={40}
                  className="block h-9 w-9 object-contain object-left sm:h-10 sm:w-10"
                />
                <div className="mt-5 min-w-0 sm:mt-6">
                  <span className="font-display text-sm leading-[1.12] font-bold tracking-[0.01em] uppercase sm:text-[15px]">
                    {item.title}
                  </span>
                  <p className="text-body-sm mt-2 mb-0 text-[#4a4a4a]">{item.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
