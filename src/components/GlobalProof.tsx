import { ScrollReveal, SectionTitle } from "./ScrollReveal";

const benchmarks = [
  {
    name: "Paxos",
    country: "USA",
    points: [
      "Physical gold tokenization",
      "~$2.5B market cap",
      "Regulated by NYDFS → OCC (federal banking regulator)",
      "Partners: PayPal, Revolut, Interactive Brokers",
    ],
    quote: "Gold standard for regulatory compliance in tokenized assets",
  },
  {
    name: "Komgo",
    country: "Switzerland",
    points: [
      "Digitizing commodity trade finance",
      "10,000+ corporations, 60+ banks",
      "Founded by: Citi, BNP Paribas, ING, Shell, SGS",
    ],
    quote: "Reduced letter of credit issuance from 10 days to 1 hour",
  },
  {
    name: "JusToken",
    country: "Argentina",
    points: [
      "Agricultural commodity tokenization",
      "$1.5B+ value tokenized",
      "Backed by Bunge Ventures, Visa, Accenture",
    ],
    quote: "The only platform globally that has tokenized agricultural commodities at scale",
  },
];

const GlobalProof = () => (
  <section id="proof" className="section-white py-24 md:py-32">
    <div className="container mx-auto">
      <SectionTitle>Built on Models Already Operating at Billion-Dollar Scale</SectionTitle>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {benchmarks.map((b, i) => (
          <ScrollReveal key={b.name} delay={i * 0.08}>
            <div className="h-full flex flex-col p-8 rounded-lg border border-border bg-card shadow-sm">
              <div className="flex items-baseline gap-2 mb-5">
                <h3 className="text-xl font-bold">{b.name}</h3>
                <span className="text-xs text-muted-foreground">({b.country})</span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {b.points.map((p) => (
                  <li key={p} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-teal mt-1 shrink-0">·</span>
                    {p}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-medium text-foreground/80 italic border-t border-border pt-5">
                "{b.quote}"
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.35}>
        <div className="mt-14 p-8 rounded-lg bg-muted">
          <p className="text-body-lg text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Total RWA market: $30B+ on-chain today.</span>{" "}
            Projected $2–18 trillion by 2030 (McKinsey, BCG). Agricultural commodities: fastest-growing segment (CAGR 48%) — but still nearly empty.{" "}
            <span className="font-medium text-foreground">The market is waiting to be shaped.</span>
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default GlobalProof;
