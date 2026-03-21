import { ScrollReveal, SectionTitle } from "./ScrollReveal";

const rows = [
  {
    label: "Transparency",
    old: "Paper receipts: easily forged, hard to verify, only locally valid",
    neu: "Digital records on-chain: verifiable by anyone, anywhere, anytime",
  },
  {
    label: "Speed",
    old: "Settlement T+5 to T+30: funds stuck in the banking pipeline",
    neu: "Settlement T+0: transactions confirmed in seconds",
  },
  {
    label: "Liquidity",
    old: "Sell the entire lot or nothing. No fractionalization possible.",
    neu: "Sell in fractions, collateralize instantly, connect to international capital",
  },
  {
    label: "Trust",
    old: "Trust based on relationships and paper signatures",
    neu: "Trust based on data: inspections, insurance, contracts — all embedded in the token",
  },
];

const WhyTokenization = () => (
  <section id="tokenization" className="section-dark py-24 md:py-32">
    <div className="container mx-auto">
      <SectionTitle light>Why Blockchain? Because Paper Doesn't Scale.</SectionTitle>

      <div className="mt-12 space-y-6">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-4 mb-2">
            <div className="text-sm font-semibold uppercase tracking-wider text-white/40 px-6">Traditional System</div>
            <div className="text-sm font-semibold uppercase tracking-wider text-teal px-6">RWA Hub Infrastructure</div>
          </div>
        </ScrollReveal>

        {rows.map((row, i) => (
          <ScrollReveal key={row.label} delay={i * 0.08}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-2">{row.label}</div>
                <p className="text-white/60 leading-relaxed">{row.old}</p>
              </div>
              <div className="p-6 rounded-lg bg-teal/[0.08] border border-teal/20">
                <div className="text-xs font-semibold uppercase tracking-wider text-teal/70 mb-2">{row.label}</div>
                <p className="text-white/80 leading-relaxed">{row.neu}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.4}>
        <div className="mt-14 p-8 rounded-lg border border-white/10 bg-white/[0.03]">
          <p className="text-body-lg text-white/70 leading-relaxed">
            RWA Hub does not replace existing business processes. Warehouses still warehouse. Inspectors still inspect. Banks still lend.{" "}
            <span className="text-white font-medium">We digitize the connections between them</span> — creating a single source of truth that unlocks capital.
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default WhyTokenization;
