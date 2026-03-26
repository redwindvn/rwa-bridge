import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import AnimatedBlockchainBg from "./AnimatedBlockchainBg";
import { useCountUp } from "@/hooks/useCountUp";

const MarketNumber = () => {
  const { ref, display } = useCountUp(93, 2500, "$", "B", 0);
  return (
    <div ref={ref} className="text-5xl md:text-6xl font-serif text-foreground tabular-nums">
      {display}
    </div>
  );
};

const commodities = [
  { name: "Palm Oil", value: "$50.1B" },
  { name: "Rubber", value: "$12.3B" },
  { name: "Rice", value: "$12.2B" },
  { name: "Coffee", value: "$7.1B" },
  { name: "Cocoa", value: "$6.0B" },
  { name: "Cashew", value: "$4.4B" },
  { name: "Pepper", value: "$1.3B" },
];

const MarketOpportunity = () => (
  <section id="market" className="section-white py-24 md:py-32 relative overflow-hidden">
    <AnimatedBlockchainBg opacity={0.06} color="green" />
    <div className="container mx-auto relative z-10">
      <SectionTitle>$93 Billion. Seven Commodities. Four Countries.</SectionTitle>

      <div className="mt-12 grid md:grid-cols-2 gap-12 items-start">
        {/* Funnel */}
        <ScrollReveal delay={0.08}>
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-[hsl(var(--green-light))] border border-[hsl(var(--green-accent))]/10">
              <MarketNumber />
              <p className="text-sm font-sans text-muted-foreground mt-2">Total addressable market - annual exports</p>
            </div>
            <div className="p-6 rounded-xl bg-[hsl(var(--green-light))]/60 border border-[hsl(var(--green-accent))]/8 ml-6">
              <div className="text-3xl font-serif text-foreground tabular-nums">10%</div>
              <p className="text-sm font-sans text-muted-foreground mt-1">Target on-chain capture</p>
            </div>
            <div className="p-6 rounded-xl bg-[hsl(var(--green-light))]/40 border border-[hsl(var(--green-accent))]/6 ml-12">
              <div className="text-3xl font-serif text-[hsl(var(--green-accent))] tabular-nums">$9.3B</div>
              <p className="text-sm font-sans text-muted-foreground mt-1">Long-term annual on-chain volume</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Commodity list */}
        <ScrollReveal delay={0.16}>
          <div className="space-y-3">
            {commodities.map((c) => (
              <div key={c.name} className="flex justify-between items-baseline p-4 rounded-lg bg-white border border-border hover:border-[hsl(var(--green-accent))]/20 transition-colors">
                <span className="text-sm font-sans font-medium text-foreground">{c.name}</span>
                <span className="text-sm font-sans tabular-nums text-muted-foreground">{c.value}</span>
              </div>
            ))}
            <p className="text-xs font-sans text-muted-foreground/60 mt-4 px-1">
              National export statistics, 2024. Vietnam, Thailand, Indonesia, Malaysia.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.3}>
        <p className="mt-14 text-center text-body-lg font-sans text-muted-foreground italic font-serif max-w-2xl mx-auto">
          Phase 1: Vietnamese rice. The infrastructure scales to every row in this list.
        </p>
      </ScrollReveal>
    </div>
  </section>
);

export default MarketOpportunity;
