import { ScrollReveal } from "./ScrollReveal";

const partners = [
  { name: "Avalanche", logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg" },
  { name: "Dragon Capital" },
  { name: "On-Chain Academy" },
  { name: "Republic" },
  { name: "SkyMavis" },
  { name: "Tether", logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg" },
  { name: "Viettel Digital" },
  { name: "KyberSwap" },
];

const Partners = () => (
  <section className="py-12 md:py-16 bg-[hsl(var(--green-light))] border-y border-[hsl(var(--green-accent))]/10 relative overflow-hidden">
    <div className="container mx-auto relative z-10">
      <ScrollReveal>
        <p className="text-center text-xs font-sans font-medium tracking-widest uppercase text-[hsl(var(--green-accent))]/60 mb-8">
          Strategic Partners & Ecosystem
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center gap-3 px-5 py-6 rounded-xl bg-white/80 border border-[hsl(var(--green-accent))]/10 hover:border-[hsl(var(--green-accent))]/25 hover:shadow-sm transition-all"
            >
              {p.logo && (
                <img src={p.logo} alt="" className="w-5 h-5 opacity-70" />
              )}
              <span className="text-sm font-sans font-semibold text-foreground/75 tracking-wide">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default Partners;
