import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import riceFields from "@/assets/rice-fields.jpg";
import portTrade from "@/assets/port-trade.jpg";
import warehouseImg from "@/assets/warehouse.jpg";

const cards = [
  {
    image: warehouseImg,
    title: "Dead Capital in Warehouses",
    desc: "Goods sit in warehouses waiting for ships. Capital is locked. Bank loan approvals take 2–4 weeks with high discount rates because banks have no visibility into warehouse inventory.",
  },
  {
    image: portTrade,
    title: "Price Taker, Not Price Maker",
    desc: "Despite being a top-3 global exporter, Vietnam depends on intermediaries. Prices are set in London and Chicago — Vietnamese producers accept whatever they're given.",
  },
  {
    image: riceFields,
    title: "Broken Information Chain",
    desc: "Warehouse receipts are paper-based, hard to verify, only locally valid. No single source of truth exists across the value chain.",
  },
];

const Problem = () => (
  <section id="problem" className="section-sage py-24 md:py-32">
    <div className="container mx-auto">
      <SectionTitle>The Liquidity Problem Vietnam's Exporters Face Every Day</SectionTitle>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {cards.map((card, i) => (
          <ScrollReveal key={card.title} delay={i * 0.08}>
            <div className="group rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-7">
                <h3 className="font-serif text-xl mb-3">{card.title}</h3>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Problem;
