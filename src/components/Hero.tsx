import { ScrollReveal } from "./ScrollReveal";
import riceFields from "@/assets/rice-fields.jpg";

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
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden bg-background">
      {/* Subtle agricultural background pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <img src={riceFields} alt="" className="w-full h-full object-cover" />
      </div>
      {/* Decorative gradient orbs - organic/tech feel */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-[hsl(164,60%,90%)] blur-[120px] opacity-40" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[hsl(41,60%,92%)] blur-[100px] opacity-30" />

      <div className="container mx-auto py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 items-center">
          <div>
            <ScrollReveal>
              <p className="text-sm font-medium tracking-widest uppercase text-teal-DEFAULT mb-6">
                Digital Commodity Finance Infrastructure
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h1 className="text-display md:text-display-lg text-foreground mb-8">
                Transforming Agricultural Commodities into Liquid Financial Assets
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.16}>
              <p className="text-subheading text-muted-foreground max-w-xl mb-10">
                RWA Hub is the first Digital Commodity Finance Infrastructure Platform operating within Vietnam's International Financial Centre (VIFC-HCMC).
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.24}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#infrastructure"
                  className="inline-flex items-center px-7 py-3.5 rounded-lg bg-teal-DEFAULT text-white font-sans font-medium text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
                >
                  Explore the Infrastructure
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center px-7 py-3.5 rounded-lg border border-border text-foreground font-sans font-medium text-sm hover:bg-muted transition-colors active:scale-[0.97]"
                >
                  Contact Us
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Stats grid */}
          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.value} className="p-6 rounded-xl bg-white border border-border shadow-sm">
                  <div className="text-2xl md:text-3xl font-serif text-foreground mb-2 tabular-nums">{stat.value}</div>
                  <div className="text-xs font-sans text-muted-foreground leading-relaxed">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.45}>
          <div className="mt-20 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
              {partners.map((partner) => (
                <span key={partner} className="text-xs font-sans font-medium tracking-wider uppercase text-muted-foreground/40">
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
