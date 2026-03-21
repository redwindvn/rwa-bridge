import { ScrollReveal } from "./ScrollReveal";

const stats = [
  { value: "$93.3B", label: "Annual agricultural exports across Southeast Asia (7 commodities, 4 countries)" },
  { value: "$5.8B", label: "Vietnam rice exports alone (2024)" },
  { value: "Top 3", label: "Global commodity exporter (rice, coffee, pepper, cashew)" },
  { value: "Decree 330", label: "Legal framework effective Dec 2025" },
];

const partners = [
  "VIFC-HCMC", "GOE Alliance", "MB Bank", "Gemadept", "SGS Vietnam", "BIC Insurance", "Kyber Network", "Agrichain",
];

const Hero = () => {
  return (
    <section className="section-dark min-h-screen flex flex-col justify-center relative pt-20">
      <div className="container mx-auto py-16 md:py-24">
        <div className="max-w-4xl">
          <ScrollReveal>
            <h1 className="text-display md:text-display-lg font-bold text-white mb-6" style={{ lineHeight: 1.05 }}>
              Transforming Agricultural Commodities into Liquid Financial Assets
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-subheading text-white/55 max-w-3xl mb-10">
              RWA Hub is the first Digital Commodity Finance Infrastructure Platform operating within Vietnam's International Financial Centre (VIFC-HCMC), under Decree 330/2025/NĐ-CP.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-4 mb-16">
              <a
                href="#infrastructure"
                className="inline-flex items-center px-7 py-3.5 rounded-md bg-teal text-white font-medium text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
              >
                Explore the Infrastructure
              </a>
              <a
                href="#legal"
                className="inline-flex items-center px-7 py-3.5 rounded-md border border-white/20 text-white font-medium text-sm hover:border-white/40 transition-colors active:scale-[0.97]"
              >
                Read the Framework
              </a>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-12 border-t border-white/10">
            {stats.map((stat) => (
              <div key={stat.value}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/40 leading-relaxed">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.45}>
          <div className="pt-12 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {partners.map((partner) => (
                <span key={partner} className="text-xs font-medium tracking-wider uppercase text-white/25">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Hero;
