import { ScrollReveal } from "./ScrollReveal";
import AnimatedBlockchainBg from "./AnimatedBlockchainBg";

const proofPoints = [
  { value: "$2.5T", label: "Global trade finance gap" },
  { value: "50%", label: "SME applications rejected" },
  { value: "<1%", label: "Actual default rate" },
];

const Hero = () => (
  <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden bg-background">
    <AnimatedBlockchainBg opacity={0.18} color="green" />
    <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-[hsl(140,55%,85%)] blur-[120px] opacity-50" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[hsl(142,60%,88%)] blur-[100px] opacity-40" />

    <div className="container mx-auto py-16 md:py-24 relative z-10">
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 items-center">
        <div>
          <ScrollReveal>
            <p className="text-sm font-medium tracking-widest uppercase text-[hsl(var(--green-accent))] mb-6">
              Digital Commodity Finance Infrastructure
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h1 className="text-display md:text-display-lg text-foreground mb-8">
              Transforming Agricultural Commodities into Liquid Financial Assets
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <p className="text-subheading text-muted-foreground max-w-xl mb-10">
              The first Digital Commodity Finance Infrastructure in Southeast Asia. We turn warehouse inventory into working capital - in minutes, not weeks.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.24}>
            <div className="flex flex-wrap gap-4">
              <a href="#infrastructure" className="inline-flex items-center px-7 py-3.5 rounded-lg bg-[hsl(var(--green-accent))] text-white font-sans font-medium text-sm hover:opacity-90 transition-opacity active:scale-[0.97]">
                Explore the Infrastructure
              </a>
              <a href="#contact" className="inline-flex items-center px-7 py-3.5 rounded-lg border border-[hsl(var(--green-accent))]/30 text-foreground font-sans font-medium text-sm hover:bg-[hsl(var(--green-light))] transition-colors active:scale-[0.97]">
                Partner With Us
              </a>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col gap-8">
            {/* Animated concept flow */}
            <div className="flex items-center justify-center gap-3 md:gap-5">
              {[
                { color: "hsl(var(--green-accent))", label: "Warehouse", shape: "hexagon" },
                { color: "hsl(var(--gold))", label: "Token", shape: "diamond" },
                { color: "hsl(270,50%,55%)", label: "Capital", shape: "circle" },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-3 md:gap-5">
                  <div className="flex flex-col items-center gap-2">
                    <svg width="56" height="56" viewBox="0 0 56 56" className="animate-pulse" style={{ animationDelay: `${i * 0.4}s`, animationDuration: "3s" }}>
                      {item.shape === "hexagon" && (
                        <polygon points="28,4 50,16 50,40 28,52 6,40 6,16" fill="none" stroke={item.color} strokeWidth="2" opacity="0.8" />
                      )}
                      {item.shape === "diamond" && (
                        <polygon points="28,4 52,28 28,52 4,28" fill="none" stroke={item.color} strokeWidth="2" opacity="0.8" />
                      )}
                      {item.shape === "circle" && (
                        <circle cx="28" cy="28" r="24" fill="none" stroke={item.color} strokeWidth="2" opacity="0.8" />
                      )}
                      <circle cx="28" cy="28" r="4" fill={item.color} opacity="0.6" />
                    </svg>
                    <span className="text-xs font-sans text-muted-foreground">{item.label}</span>
                  </div>
                  {i < 2 && (
                    <svg width="32" height="12" viewBox="0 0 32 12" className="text-muted-foreground/40 mb-5">
                      <line x1="0" y1="6" x2="24" y2="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
                      <polygon points="24,2 32,6 24,10" fill="currentColor" />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            {/* Proof points bar */}
            <div className="grid grid-cols-3 gap-3">
              {proofPoints.map((p) => (
                <div key={p.label} className="text-center p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[hsl(var(--green-accent))]/15 shadow-sm">
                  <div className="text-2xl md:text-3xl font-serif text-foreground mb-1 tabular-nums">{p.value}</div>
                  <div className="text-xs font-sans text-muted-foreground leading-snug">{p.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default Hero;
