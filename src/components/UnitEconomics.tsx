import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import AnimatedBlockchainBg from "./AnimatedBlockchainBg";

const traditional = [
  { metric: "Time to Capital", value: "2-4 weeks" },
  { metric: "Loan-to-Value", value: "40-60%" },
  { metric: "Collateral Monitoring", value: "Periodic visits" },
  { metric: "Settlement", value: "2-5 business days" },
];

const rwaHub = [
  { metric: "Time to Capital", value: "Minutes" },
  { metric: "Loan-to-Value", value: "80-90%" },
  { metric: "Collateral Monitoring", value: "Continuous on-chain" },
  { metric: "Settlement", value: "Instant" },
];

const GainCallout = () => {
  const { ref, display } = useCountUp(190000, 2500, "+$", "", 0);
  return (
    <div ref={ref} className="text-5xl md:text-6xl font-serif text-[hsl(var(--green-accent))] tabular-nums">
      {display}
    </div>
  );
};

const UnitEconomics = () => (
  <section id="economics" className="py-24 md:py-32 relative overflow-hidden section-sage">
    <AnimatedBlockchainBg opacity={0.05} color="green" />
    <div className="container mx-auto relative z-10">
      <SectionTitle>Same Shipment. Different Outcome.</SectionTitle>
      <ScrollReveal>
        <p className="text-subheading text-muted-foreground mb-12 -mt-2">
          1,000 tonnes of rice, ~$550,000
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <ScrollReveal delay={0.08}>
          <div className="p-7 rounded-xl border border-border bg-white shadow-sm h-full">
            <h3 className="font-serif text-xl mb-6 text-muted-foreground">Traditional</h3>
            <div className="space-y-5">
              {traditional.map((r) => (
                <div key={r.metric} className="flex justify-between items-baseline border-b border-border pb-3 last:border-0">
                  <span className="text-sm font-sans text-muted-foreground">{r.metric}</span>
                  <span className="text-sm font-sans font-medium text-foreground">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <div className="p-7 rounded-xl border border-[hsl(var(--green-accent))]/20 bg-white shadow-sm h-full ring-1 ring-[hsl(var(--green-accent))]/10">
            <h3 className="font-serif text-xl mb-6 text-[hsl(var(--green-accent))]">RWA Hub</h3>
            <div className="space-y-5">
              {rwaHub.map((r) => (
                <div key={r.metric} className="flex justify-between items-baseline border-b border-[hsl(var(--green-accent))]/10 pb-3 last:border-0">
                  <span className="text-sm font-sans text-muted-foreground">{r.metric}</span>
                  <span className="text-sm font-sans font-semibold text-[hsl(var(--green-accent))]">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.3}>
        <div className="mt-16 text-center">
          <GainCallout />
          <p className="text-body-lg font-sans text-muted-foreground mt-3 mb-2">additional working capital per shipment</p>
          <p className="text-sm font-sans text-muted-foreground max-w-lg mx-auto">
            Multiply by dozens of annual shipments per enterprise. That's the difference between surviving and scaling.
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default UnitEconomics;
