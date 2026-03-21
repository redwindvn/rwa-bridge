import { ScrollReveal } from "./ScrollReveal";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "$93.3B", label: "Annual agricultural exports across Southeast Asia" },
  { value: "$5.8B", label: "Vietnam rice exports alone (2024)" },
  { value: "Top 3", label: "Global commodity exporter" },
  { value: "48%", label: "CAGR — fastest-growing RWA segment" },
];

const partners = [
  "VIFC-HCMC", "GOE Alliance", "MB Bank", "Gemadept", "SGS Vietnam", "BIC Insurance", "Kyber Network", "Agrichain",
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      {/* Background image + gradient overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,60%,8%)/0.85] via-[hsl(200,55%,12%)/0.8] to-[hsl(180,50%,14%)/0.7]" />
      </div>

      <div className="container mx-auto py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <ScrollReveal>
              <h1 className="text-display md:text-display-lg font-bold text-white mb-6" style={{ lineHeight: 1.05 }}>
                Transforming Agricultural Commodities into Liquid Financial Assets
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-subheading text-white/55 max-w-2xl mb-10">
                RWA Hub is the first Digital Commodity Finance Infrastructure Platform operating within Vietnam's International Financial Centre (VIFC-HCMC).
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#flow-diagram"
                  className="inline-flex items-center px-7 py-3.5 rounded-md bg-teal text-white font-medium text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
                >
                  Explore the Infrastructure
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center px-7 py-3.5 rounded-md border border-white/20 text-white font-medium text-sm hover:border-white/40 transition-colors active:scale-[0.97]"
                >
                  Contact Us
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Stats grid on right */}
          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat) => (
                <div key={stat.value} className="p-5 rounded-lg bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1.5 tabular-nums">{stat.value}</div>
                  <div className="text-xs text-white/40 leading-relaxed">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.45}>
          <div className="mt-16 pt-8 border-t border-white/10">
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
