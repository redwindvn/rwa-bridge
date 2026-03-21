import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import { Building2, Landmark, LineChart, Container, Shield } from "lucide-react";

const stakeholders = [
  {
    icon: Building2,
    title: "Agricultural Enterprises",
    points: [
      "Unlock dead capital trapped in warehouses",
      "Access trade finance in days instead of weeks",
      "Sell fractionally at market price instead of distressed fire sales",
    ],
  },
  {
    icon: Landmark,
    title: "Banks & Financial Institutions",
    points: [
      "Real-time transparent collateral verified by SGS + Gemadept",
      "New digital credit products backed by physical assets",
      "Expanded lending portfolio with lower risk premium",
    ],
  },
  {
    icon: LineChart,
    title: "Investment Funds",
    points: [
      "New asset class: commodity-backed tokens with real goods behind them",
      "High liquidity, instant verification, no intermediaries",
      "Direct access to Southeast Asian agricultural markets",
    ],
  },
  {
    icon: Container,
    title: "Warehousing, Inspection & Insurance",
    points: [
      "Stable recurring custody/inspection/premium revenue",
      "Expanded services into digital asset infrastructure",
      "No operational change — same business, connected to a larger system",
    ],
  },
  {
    icon: Shield,
    title: "Government & Regulators",
    points: [
      "Attract international capital flows with full audit trail",
      "On-chain supervision capability — every transaction verifiable",
      "Regional leadership in commodity finance innovation",
    ],
  },
];

const WhoBenefits = () => (
  <section id="benefits" className="section-white py-24 md:py-32">
    <div className="container mx-auto">
      <SectionTitle>Every Participant Contributes What They Already Do</SectionTitle>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {stakeholders.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.07}>
            <div className="h-full p-7 rounded-lg border border-border bg-card shadow-sm">
              <s.icon className="w-7 h-7 mb-4 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold mb-4">{s.title}</h3>
              <ul className="space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-teal shrink-0 mt-0.5">—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.4}>
        <p className="mt-12 text-center text-body-lg text-muted-foreground italic">
          "No one needs to change their business — just connect to the infrastructure."
        </p>
      </ScrollReveal>
    </div>
  </section>
);

export default WhoBenefits;
