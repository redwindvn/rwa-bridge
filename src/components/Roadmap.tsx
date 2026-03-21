import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import techPattern from "@/assets/tech-pattern.jpg";

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
  <section id="roadmap" className="relative py-20 md:py-28 overflow-hidden">
    <div className="absolute inset-0">
      <img src={techPattern} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,60%,8%)/0.92] via-[hsl(200,55%,12%)/0.88] to-[hsl(180,50%,14%)/0.85]" />
    </div>
    <div className="container mx-auto relative z-10">
      <SectionTitle light>Development Roadmap</SectionTitle>

      <div className="mt-10 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
        {phases.map((p, i) => (
          <ScrollReveal key={p.phase} delay={i * 0.1}>
            <div className="min-w-[300px] max-w-[340px] snap-start flex flex-col p-7 rounded-lg border border-white/[0.06] bg-white/[0.04]">
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
