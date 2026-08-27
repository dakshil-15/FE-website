import Image from "next/image";

const stats = [
  {
    value: "250+",
    label: "Minds",
    description: "Passionate people driving your growth.",
    icon: "/assets/ic-minds.png",
  },
  {
    value: "4",
    label: "Cities",
    description: "Mumbai, Bengaluru, Aurangabad, Pune.",
    icon: "/assets/ic-cities.png",
  },
  {
    value: "225+",
    label: "Media Awards",
    description: "Celebrated for creativity, performance & impact.",
    icon: "/assets/ic-awards.png",
  },
  {
    value: "1",
    label: "Growth System",
    description: "Integrated solutions. One growth objective.",
    icon: "/assets/ic-globe.png",
  },
];

export default function WhyPartnerSection() {
  return (
    <section className="bg-ink px-[var(--gutter)] py-10 text-white sm:py-[42px]" aria-labelledby="why-heading">
      <div className="why">
        <div>
          <p className="text-eyebrow m-0">Why partner with us</p>
          <h2 id="why-heading" className="text-display-sm mt-4 mb-0 sm:mt-[18px]">
            One system.
            <br />
            <span className="text-red">Endless possibilities.</span>
          </h2>
        </div>

        <div className="pillars">
          {stats.map((stat) => (
            <div key={stat.label} className="border-l border-white/20 px-5 sm:px-6">
              <Image
                src={stat.icon}
                alt=""
                aria-hidden
                width={32}
                height={32}
                className="block h-8 w-8 object-contain object-left"
              />
              <p className="mt-3.5 font-display text-[1.875rem] leading-none tracking-[0.005em] sm:text-[30px]">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs font-bold tracking-[0.15em] uppercase sm:text-[13px]">{stat.label}</p>
              <p className="text-body-sm mt-3 max-w-[200px] text-muted-on-dark sm:mt-3.5">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
