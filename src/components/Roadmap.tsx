import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import AnimatedBlockchainBg from "./AnimatedBlockchainBg";

const phases = [
  {
    phase: "Phase 1",
    title: "Prove the Model",
    time: "Q1 2026",
    badge: "Proof: This model works",
    items: [
      "Establish the Digital Agriculture Finance Alliance",
      "Scientific paper publication",
      "RWA Roundtable with stakeholders",
    ],
  },
  {
    phase: "Phase 2",
    title: "Complete the Value Chain",
    time: "Q1–Q2 2026",
    badge: "Proof: Real goods are on-chain",
    items: [
      "Sign partnership agreements",
      "Deploy smart contracts",
      "First on-chain transaction — real goods, tokenized",
    ],
  },
  {
    phase: "Phase 3",
    title: "Scale Operations",
    time: "H2 2026+",
    badge: "Proof: A new market has been created",
    items: [
      "Official RWA Hub launch (July 2026)",
      "Expand to coffee, pepper, cashew, rubber",
      "Scale across Southeast Asia",
    ],
  },
];

const Roadmap = () => (
  <section id="roadmap" className="py-24 md:py-32 relative overflow-hidden bg-[hsl(var(--green-light))]">
    <AnimatedBlockchainBg opacity={0.08} color="green" />
    <div className="container mx-auto relative z-10">
      <SectionTitle>Development Roadmap</SectionTitle>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {phases.map((p, i) => (
          <ScrollReveal key={p.phase} delay={i * 0.1}>
            <div className="flex flex-col p-8 rounded-xl border border-[hsl(var(--green-accent))]/15 bg-white shadow-sm h-full">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[hsl(var(--green-accent))]">{p.phase}</span>
                <span className="text-xs font-sans text-muted-foreground">{p.time}</span>
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-5">{p.title}</h3>
              <ul className="space-y-3 flex-1 mb-6">
                {p.items.map((item) => (
                  <li key={item} className="text-sm font-sans text-muted-foreground leading-relaxed flex gap-2.5">
                    <span className="text-[hsl(var(--green-accent))]/40 shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-5 border-t border-[hsl(var(--green-accent))]/10">
                <span className="text-xs font-sans font-medium text-gold-DEFAULT uppercase tracking-wider">{p.badge}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Roadmap;
