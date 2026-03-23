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
  <section className="py-20 md:py-28 bg-foreground relative overflow-hidden">
    <div className="container mx-auto relative z-10">
      <ScrollReveal>
        <p className="text-center text-sm font-sans font-medium tracking-widest uppercase text-white/40 mb-12">
          Strategic Partners & Ecosystem
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center gap-3 px-6 py-8 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-colors"
            >
              {p.logo && (
                <img src={p.logo} alt="" className="w-6 h-6 brightness-0 invert opacity-80" />
              )}
              <span className="text-sm md:text-base font-sans font-semibold text-white/80 tracking-wide">
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
