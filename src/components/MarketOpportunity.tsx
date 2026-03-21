import { ScrollReveal } from "./ScrollReveal";

const MarketOpportunity = () => (
  <section id="market" className="section-white py-20 md:py-28">
    <div className="container mx-auto">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-7xl md:text-8xl font-bold text-foreground mb-4 tabular-nums">$93.3B</div>
          <h2 className="text-heading font-bold mb-4">Southeast Asia's Agricultural Commodity Market</h2>
          <p className="text-body-lg text-muted-foreground leading-relaxed">
            $200B annual transaction volume across 7 commodities and 4 countries. All storable, standardizable, and tokenizable.
            Phase 1 starts with Vietnamese rice. The infrastructure scales across the region.
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default MarketOpportunity;
