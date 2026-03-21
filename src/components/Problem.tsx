import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import riceFields from "@/assets/rice-fields.jpg";
import portTrade from "@/assets/port-trade.jpg";
import warehouseImg from "@/assets/warehouse.jpg";

const cards = [
  {
    image: warehouseImg,
    title: "Dead Capital in Warehouses",
    desc: "Goods sit in warehouses waiting for ships. Capital is locked. Bank loan approvals take 2–4 weeks with high discount rates.",
  },
  {
    image: portTrade,
    title: "Price Taker, Not Price Maker",
    desc: "Despite being a top-3 global exporter, Vietnam depends on intermediaries. Prices are set in London and Chicago.",
  },
  {
    image: riceFields,
    title: "Broken Information Chain",
    desc: "Warehouse receipts are paper-based, hard to verify, only locally valid. No single source of truth exists.",
  },
];

const Problem = () => (
  <section id="problem" className="section-white py-20 md:py-28">
    <div className="container mx-auto">
      <SectionTitle>The Liquidity Problem Vietnam's Exporters Face Every Day</SectionTitle>
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {cards.map((card, i) => (
          <ScrollReveal key={card.title} delay={i * 0.08}>
            <div className="group rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Problem;
