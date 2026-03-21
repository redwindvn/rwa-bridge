import { ScrollReveal, SectionTitle } from "./ScrollReveal";

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
      "VIFC Sandbox Seminar",
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
      "Launch RWA Investment Fund",
    ],
  },
  {
    phase: "Phase 3",
    title: "Scale Operations",
    time: "H2 2026+",
    badge: "Proof: A new market has been created",
    items: [
      "Official RWA Hub launch (July 2026, during HCMC 50th anniversary)",
      "Expand to coffee, pepper, cashew, rubber",
      "Connect international investment funds",
      "Scale across Southeast Asia",
    ],
  },
];

const Roadmap = () => (
  <section id="roadmap" className="section-dark py-24 md:py-32">
    <div className="container mx-auto">
      <SectionTitle light>Development Roadmap</SectionTitle>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {phases.map((p, i) => (
          <ScrollReveal key={p.phase} delay={i * 0.1}>
            <div className="h-full flex flex-col p-7 rounded-lg border border-white/[0.06] bg-white/[0.03]">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal">{p.phase}</span>
                <span className="text-xs text-white/30">{p.time}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{p.title}</h3>
              <ul className="space-y-2 flex-1 mb-6">
                {p.items.map((item) => (
                  <li key={item} className="text-sm text-white/55 leading-relaxed flex gap-2">
                    <span className="text-white/20 shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-xs font-medium text-gold/80 uppercase tracking-wider">{p.badge}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Roadmap;
