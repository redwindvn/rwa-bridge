import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import techPattern from "@/assets/tech-pattern.jpg";

const rows = [
  {
    label: "Transparency",
    old: "Paper receipts: easily forged, hard to verify",
    neu: "Digital records on-chain: verifiable by anyone, anywhere",
  },
  {
    label: "Speed",
    old: "Settlement T+5 to T+30",
    neu: "Settlement T+0: confirmed in seconds",
  },
  {
    label: "Liquidity",
    old: "Sell the entire lot or nothing",
    neu: "Sell in fractions, collateralize instantly",
  },
  {
    label: "Trust",
    old: "Based on relationships and paper signatures",
    neu: "Based on data: inspections, insurance, contracts in the token",
  },
];

const WhyTokenization = () => (
  <section id="tokenization" className="relative py-20 md:py-28 overflow-hidden">
    <div className="absolute inset-0">
      <img src={techPattern} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,60%,8%)/0.9] via-[hsl(200,55%,12%)/0.85] to-[hsl(180,50%,14%)/0.8]" />
    </div>
    <div className="container mx-auto relative z-10">
      <SectionTitle light>Why Blockchain? Because Paper Doesn't Scale.</SectionTitle>

      {/* Horizontal scrollable comparison */}
      <div className="mt-10 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
        {rows.map((row, i) => (
          <ScrollReveal key={row.label} delay={i * 0.08}>
            <div className="min-w-[280px] max-w-[320px] snap-start flex flex-col gap-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">{row.label}</div>
              <div className="p-5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex-1">
                <div className="text-xs uppercase tracking-wider text-white/30 mb-2">Traditional</div>
                <p className="text-sm text-white/50 leading-relaxed">{row.old}</p>
              </div>
              <div className="p-5 rounded-lg bg-teal/[0.1] border border-teal/20 flex-1">
                <div className="text-xs uppercase tracking-wider text-teal/70 mb-2">RWA Hub</div>
                <p className="text-sm text-white/80 leading-relaxed">{row.neu}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.4}>
        <div className="mt-12 p-6 rounded-lg border border-white/10 bg-white/[0.03]">
          <p className="text-body-lg text-white/70 leading-relaxed">
            We don't replace existing processes. Warehouses still warehouse. Banks still lend.{" "}
            <span className="text-white font-medium">We digitize the connections between them</span> — creating a single source of truth that unlocks capital.
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default WhyTokenization;
