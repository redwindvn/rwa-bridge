import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import AnimatedBlockchainBg from "./AnimatedBlockchainBg";

const phases = [
  {
    phase: "Phase 1",
    title: "Proof of Concept",
    time: "2026",
    badge: "Weeks to minutes",
    items: [
      "One commodity: rice",
      "First end-to-end tokenized transaction",
    ],
  },
  {
    phase: "Phase 2",
    title: "Multi-Commodity",
    time: "2027",
    badge: "Multiple commodities on-chain",
    items: [
      "Coffee, pepper, cashew, rubber",
      "Secondary market trading",
    ],
  },
  {
    phase: "Phase 3",
    title: "Southeast Asia",
    time: "2028-2029",
    badge: "A regional market forming",
    items: [
      "Thailand, Indonesia, Malaysia",
      "Cross-border warehouse network",
    ],
  },
  {
    phase: "Phase 4",
    title: "Open Market",
    time: "2029+",
    badge: "A new market created",
    items: [
      "Formal exchange structure",
      "Commodity funds and derivatives",
    ],
  },
];

const Roadmap = () => (
  <section id="roadmap" className="py-24 md:py-32 relative overflow-hidden bg-[hsl(var(--green-light))]">
    <AnimatedBlockchainBg opacity={0.08} color="green" />
    <div className="container mx-auto relative z-10">
      <SectionTitle>Development Roadmap</SectionTitle>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {phases.map((p, i) => (
          <ScrollReveal key={p.phase} delay={i * 0.08}>
            <div className="flex flex-col p-7 rounded-xl border border-[hsl(var(--green-accent))]/15 bg-white shadow-sm h-full">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[hsl(var(--green-accent))]">{p.phase}</span>
                <span className="text-xs font-sans text-muted-foreground">{p.time}</span>
              </div>
              <h3 className="text-xl font-serif text-foreground mb-5">{p.title}</h3>
              <ul className="space-y-3 flex-1 mb-6">
                {p.items.map((item) => (
                  <li key={item} className="text-sm font-sans text-muted-foreground leading-relaxed flex gap-2.5">
                    <span className="text-[hsl(var(--green-accent))]/40 shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-5 border-t border-[hsl(var(--green-accent))]/10">
                <span className="text-xs font-sans font-medium text-[hsl(var(--gold))] uppercase tracking-wider">{p.badge}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Roadmap;
