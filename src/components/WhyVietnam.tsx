import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import AnimatedBlockchainBg from "./AnimatedBlockchainBg";

const cards = [
  {
    title: "Agricultural Superpower",
    stat: "$62.5B exports in 2024",
    body: "Number 1 globally in cashew and pepper. Number 2 in coffee. Top-3 in rice. This isn't a bet on potential - it's infrastructure for an industry that already exists at scale.",
  },
  {
    title: "Digital-Ready Population",
    stat: "#4 globally in crypto adoption",
    body: "21 million digital asset users. A generation of enterprises ready for programmable finance - waiting for the right infrastructure.",
  },
  {
    title: "The Regulatory Window Is Open",
    stat: "2026 - VIFC-HCMC launch year",
    body: "Vietnam's International Financial Centre is creating Southeast Asia's first regulatory sandbox for digital commodity finance. The framework is built. The window is now.",
  },
];

const WhyVietnam = () => (
  <section id="vietnam" className="py-24 md:py-32 relative overflow-hidden bg-background">
    <AnimatedBlockchainBg opacity={0.05} color="green" />
    <div className="container mx-auto relative z-10">
      <SectionTitle>Why Vietnam. Why Now.</SectionTitle>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {cards.map((card, i) => (
          <ScrollReveal key={card.title} delay={i * 0.08}>
            <div className="p-7 rounded-xl border border-[hsl(var(--green-accent))]/12 bg-white shadow-sm h-full flex flex-col">
              <h3 className="font-serif text-xl mb-1">{card.title}</h3>
              <p className="text-sm font-sans font-semibold text-[hsl(var(--green-accent))] mb-4">{card.stat}</p>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed flex-1">{card.body}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.3}>
        <div className="mt-14 p-8 md:p-10 rounded-2xl bg-[hsl(var(--green-light))] border border-[hsl(var(--green-accent))]/15 text-center max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl font-serif text-foreground leading-snug tracking-tight">
            Three forces converging for the first time:
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-5">
            {["real commodities at global scale", "a digital-ready market", "a purpose-built regulatory framework"].map((item, i) => (
              <span key={i} className="text-sm md:text-base font-sans font-medium text-[hsl(var(--green-accent))] uppercase tracking-wider">
                {i > 0 && <span className="text-muted-foreground/30 mr-6">/</span>}
                {item}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default WhyVietnam;
