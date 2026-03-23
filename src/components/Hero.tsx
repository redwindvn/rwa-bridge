import { ScrollReveal } from "./ScrollReveal";
import AnimatedBlockchainBg from "./AnimatedBlockchainBg";
import CountUpStat from "./CountUpStat";
import riceFields from "@/assets/rice-fields.jpg";

const stats = [
  { end: 93.3, prefix: "$", suffix: "B", decimals: 1, label: "Annual agricultural exports across Southeast Asia" },
  { end: 20, prefix: "$", suffix: "B", decimals: 0, label: "Vietnam's export turnover for 4 key dried agricultural products" },
  { end: 48, prefix: "", suffix: "%", decimals: 0, label: "CAGR — fastest-growing RWA segment" },
  { end: 200, prefix: "$", suffix: "B", decimals: 0, label: "Annual transaction volume" },
];

const Hero = () => (
  <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden bg-background">
    <AnimatedBlockchainBg opacity={0.18} color="green" />
    <div className="absolute inset-0 opacity-[0.03]">
      <img src={riceFields} alt="" className="w-full h-full object-cover" />
    </div>
    <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-[hsl(140,55%,85%)] blur-[120px] opacity-50" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[hsl(142,60%,88%)] blur-[100px] opacity-40" />
    <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-[hsl(100,40%,88%)] blur-[80px] opacity-30" />

    <div className="container mx-auto py-16 md:py-24 relative z-10">
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 items-center">
        <div>
          <ScrollReveal>
            <p className="text-sm font-medium tracking-widest uppercase text-[hsl(var(--green-accent))] mb-6">
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
              <a href="#infrastructure" className="inline-flex items-center px-7 py-3.5 rounded-lg bg-[hsl(var(--green-accent))] text-white font-sans font-medium text-sm hover:opacity-90 transition-opacity active:scale-[0.97]">
                Explore the Infrastructure
              </a>
              <a href="#contact" className="inline-flex items-center px-7 py-3.5 rounded-lg border border-[hsl(var(--green-accent))]/30 text-foreground font-sans font-medium text-sm hover:bg-[hsl(var(--green-light))] transition-colors active:scale-[0.97]">
                Contact Us
              </a>
            </div>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <CountUpStat
                key={stat.label}
                end={stat.end}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
                label={stat.label}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default Hero;
