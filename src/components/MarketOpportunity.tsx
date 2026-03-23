import { ScrollReveal } from "./ScrollReveal";
import AnimatedBlockchainBg from "./AnimatedBlockchainBg";
import { useCountUp } from "@/hooks/useCountUp";

const MarketNumber = () => {
  const { ref, display } = useCountUp(93.3, 2500, "$", "B", 1);
  return (
    <div ref={ref} className="text-7xl md:text-8xl font-serif text-foreground mb-6 tabular-nums">
      {display}
    </div>
  );
};

const MarketOpportunity = () => (
  <section id="market" className="section-white py-24 md:py-32 relative overflow-hidden">
    <AnimatedBlockchainBg opacity={0.04} color="green" />
    <div className="container mx-auto relative z-10">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto">
          <MarketNumber />
          <h2 className="text-heading font-serif mb-5">Southeast Asia's Agricultural Commodity Market</h2>
          <p className="text-body-lg font-sans text-muted-foreground leading-relaxed">
            $200B annual transaction volume across 7 commodities and 4 countries. All storable, standardizable, and tokenizable.
            Phase 1 starts with Vietnamese rice. The infrastructure scales across the region.
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default MarketOpportunity;
