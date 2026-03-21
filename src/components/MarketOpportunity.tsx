import { ScrollReveal, SectionTitle } from "./ScrollReveal";

const data = [
  { commodity: "Palm Oil", vn: "—", th: "—", id: "$27.8B", my: "$22.3B", total: "$50.1B" },
  { commodity: "Rice", vn: "$5.8B", th: "$6.4B", id: "—", my: "—", total: "$12.2B" },
  { commodity: "Rubber", vn: "$3.4B", th: "$5.0B", id: "$2.9B", my: "$1.0B", total: "$12.3B" },
  { commodity: "Coffee", vn: "$5.5B", th: "—", id: "$1.6B", my: "—", total: "$7.1B" },
  { commodity: "Cocoa", vn: "—", th: "—", id: "$2.6B", my: "$3.4B", total: "$6.0B" },
  { commodity: "Cashew", vn: "$4.4B", th: "—", id: "—", my: "—", total: "$4.4B" },
  { commodity: "Pepper", vn: "$1.3B", th: "—", id: "—", my: "—", total: "$1.3B" },
];

const totals = { vn: "$20.3B", th: "$11.4B", id: "$34.9B", my: "$26.7B", total: "$93.3B" };

const MarketOpportunity = () => (
  <section id="market" className="section-white py-24 md:py-32">
    <div className="container mx-auto">
      <SectionTitle>Southeast Asia's $93 Billion Opportunity</SectionTitle>

      <ScrollReveal delay={0.1}>
        <div className="mt-12 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Commodity</th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">Vietnam</th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">Thailand</th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">Indonesia</th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">Malaysia</th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.commodity} className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium">{row.commodity}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{row.vn}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{row.th}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{row.id}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{row.my}</td>
                  <td className="py-3 px-4 text-right font-semibold tabular-nums">{row.total}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-foreground/20">
                <td className="py-3 px-4 font-bold">Total</td>
                <td className="py-3 px-4 text-right font-bold tabular-nums">{totals.vn}</td>
                <td className="py-3 px-4 text-right font-bold tabular-nums">{totals.th}</td>
                <td className="py-3 px-4 text-right font-bold tabular-nums">{totals.id}</td>
                <td className="py-3 px-4 text-right font-bold tabular-nums">{totals.my}</td>
                <td className="py-3 px-4 text-right font-bold tabular-nums text-teal">{totals.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.25}>
        <div className="mt-12 p-8 rounded-lg bg-muted">
          <p className="text-body-lg text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">$200B annual transaction volume</span> across these markets. All storable, standardizable, and tokenizable commodities.{" "}
            Phase 1 starts with Vietnamese rice. The infrastructure scales to all seven commodities across four countries.
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default MarketOpportunity;
