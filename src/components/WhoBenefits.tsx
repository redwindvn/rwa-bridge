import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import { Building2, Landmark, LineChart, Container, Shield } from "lucide-react";

const stakeholders = [
  {
    icon: Building2,
    title: "Agricultural Enterprises",
    points: [
      "Unlock dead capital trapped in warehouses",
      "Access trade finance in days instead of weeks",
      "Sell fractionally at market price",
    ],
  },
  {
    icon: Landmark,
    title: "Banks & Financial Institutions",
    points: [
      "Real-time transparent collateral",
      "New digital credit products backed by physical assets",
      "Lower risk premium",
    ],
  },
  {
    icon: LineChart,
    title: "Investment Funds",
    points: [
      "Commodity-backed tokens with real goods behind them",
      "High liquidity, instant verification",
      "Direct access to SEA agricultural markets",
    ],
  },
  {
    icon: Container,
    title: "Warehousing & Inspection",
    points: [
      "Stable recurring custody revenue",
      "Expanded services into digital infrastructure",
      "No operational change required",
    ],
  },
  {
    icon: Shield,
    title: "Government & Regulators",
    points: [
      "Full audit trail for international capital flows",
      "On-chain supervision capability",
      "Regional leadership in commodity finance",
    ],
  },
];

const WhoBenefits = () => (
  <section id="benefits" className="section-light py-20 md:py-28">
    <div className="container mx-auto">
      <SectionTitle>Every Participant Contributes What They Already Do</SectionTitle>

      {/* Horizontal scrollable row on all screens */}
      <div className="mt-10 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
        {stakeholders.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.07}>
            <div className="min-w-[260px] max-w-[280px] snap-start p-6 rounded-lg border border-border bg-card shadow-sm flex flex-col">
              <s.icon className="w-7 h-7 mb-4 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="text-base font-semibold mb-3">{s.title}</h3>
              <ul className="space-y-1.5 flex-1">
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
        <p className="mt-10 text-center text-body-lg text-muted-foreground italic">
          "No one needs to change their business — just connect to the infrastructure."
        </p>
      </ScrollReveal>
    </div>
  </section>
);

export default WhoBenefits;
