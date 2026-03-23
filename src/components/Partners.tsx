import { ScrollReveal } from "./ScrollReveal";
import { Container, ClipboardCheck, Landmark, Shield, Cpu, Building2 } from "lucide-react";

const partners = [
  { icon: Container, name: "Gemadept", role: "Warehouse & Port Custody" },
  { icon: ClipboardCheck, name: "SGS Vietnam", role: "Quality Inspection" },
  { icon: Landmark, name: "MB Bank", role: "Trade Finance" },
  { icon: Shield, name: "BIC Insurance", role: "Cargo & Warehouse Coverage" },
  { icon: Cpu, name: "Kyber Network", role: "On-chain Infrastructure" },
  { icon: Building2, name: "VIFC-HCMC", role: "Regulatory Framework" },
];

const Partners = () => (
  <section className="py-10 md:py-14 section-sage border-y border-border">
    <div className="container mx-auto">
      <ScrollReveal>
        <p className="text-center text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-8">
          Ecosystem Partners
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <div className="flex flex-wrap justify-center gap-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-3 px-5 py-3 rounded-full border border-[hsl(var(--green-accent))]/12 bg-white shadow-sm"
            >
              <p.icon className="w-4 h-4 text-[hsl(var(--green-accent))] shrink-0" strokeWidth={1.5} />
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-sans font-semibold text-foreground">{p.name}</span>
                <span className="text-xs font-sans text-muted-foreground hidden sm:inline">{p.role}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default Partners;
