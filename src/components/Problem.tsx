import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import riceFields from "@/assets/rice-fields.jpg";
import portTrade from "@/assets/port-trade.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import AnimatedBlockchainBg from "./AnimatedBlockchainBg";

const cards = [
  {
    image: warehouseImg,
    title: "Dead Capital",
    desc: "$550,000 worth of rice sits in a warehouse waiting for a ship. The exporter can't touch it. Bank approval takes 2–4 weeks, and they'll only lend 40–60% of value. The rest is dead capital.",
  },
  {
    image: portTrade,
    title: "No Pricing Power",
    desc: "Prices are set in London and Chicago. Vietnamese exporters — despite being top-3 globally — accept whatever they're given. Urgent cash needs force distressed sales below market.",
  },
  {
    image: riceFields,
    title: "Paper Everywhere",
    desc: "One shipment. 50 documents. 30 parties. 56–70% of submissions rejected on first try. The system runs on fax-era infrastructure in a digital-era economy.",
  },
];

const Problem = () => (
  <section id="problem" className="section-sage py-24 md:py-32 relative overflow-hidden">
    <AnimatedBlockchainBg opacity={0.06} color="green" />
    <div className="container mx-auto relative z-10">
      <SectionTitle>The Liquidity Problem Exporters Face Every Day</SectionTitle>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {cards.map((card, i) => (
          <ScrollReveal key={card.title} delay={i * 0.08}>
            <div className="group rounded-xl border border-[hsl(var(--green-accent))]/15 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
              <div className="aspect-[16/10] overflow-hidden flex-shrink-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <h3 className="font-serif text-xl mb-3">{card.title}</h3>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed flex-1">{card.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Problem;
