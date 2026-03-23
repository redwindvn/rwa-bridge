import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import { Building2, Landmark, LineChart, Container, Shield } from "lucide-react";
import AnimatedBlockchainBg from "./AnimatedBlockchainBg";

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
  <section id="benefits" className="section-white py-24 md:py-32 relative overflow-hidden">
    <AnimatedBlockchainBg opacity={0.05} color="green" />
    <div className="container mx-auto relative z-10">
      <SectionTitle>Every Participant Contributes What They Already Do</SectionTitle>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stakeholders.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.06}>
            <div className="p-7 rounded-xl border border-[hsl(var(--green-accent))]/12 bg-white shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <s.icon className="w-7 h-7 mb-5 text-[hsl(var(--green-accent))]" strokeWidth={1.5} />
              <h3 className="font-serif text-xl mb-4">{s.title}</h3>
              <ul className="space-y-2 flex-1">
                {s.points.map((p) => (
                  <li key={p} className="text-sm font-sans text-muted-foreground leading-relaxed flex gap-2.5">
                    <span className="text-[hsl(var(--green-accent))] shrink-0 mt-0.5">—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.4}>
        <p className="mt-14 text-center text-body-lg text-muted-foreground italic font-serif">
          "No one needs to change their business — just connect to the infrastructure."
        </p>
      </ScrollReveal>
    </div>
  </section>
);

export default WhoBenefits;
