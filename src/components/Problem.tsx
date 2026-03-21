import { Warehouse, TrendingDown, Unlink } from "lucide-react";
import { ScrollReveal, SectionTitle } from "./ScrollReveal";

const cards = [
  {
    icon: Warehouse,
    title: "Dead Capital in Warehouses",
    desc: "Goods sit in warehouses waiting for ships. Capital is locked. Bank loan approvals take 2–4 weeks with high discount rates because banks have no visibility into warehouse inventory. Businesses miss trade windows and bear inflated capital costs.",
  },
  {
    icon: TrendingDown,
    title: "Price Taker, Not Price Maker",
    desc: "Despite being a top-3 global exporter, Vietnam depends on intermediaries and foreign exchanges for pricing. Urgent cash needs force distressed sales. Prices are set in London and Chicago — Vietnamese producers accept whatever they're given.",
  },
  {
    icon: Unlink,
    title: "Broken Information Chain",
    desc: "Warehouse receipts are paper-based, hard to verify, only locally valid. Insurance, inspection certificates, and ownership records live in disconnected systems. No single source of truth exists across the value chain.",
  },
];

const Problem = () => (
  <section id="problem" className="section-white py-24 md:py-32">
    <div className="container mx-auto">
      <SectionTitle>The Liquidity Problem Vietnam's Exporters Face Every Day</SectionTitle>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {cards.map((card, i) => (
          <ScrollReveal key={card.title} delay={i * 0.08}>
            <div className="p-8 rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
              <card.icon className="w-8 h-8 mb-5 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
              <p className="text-body-lg text-muted-foreground">{card.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Problem;
