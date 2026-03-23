import { ScrollReveal } from "./ScrollReveal";
import AnimatedBlockchainBg from "./AnimatedBlockchainBg";

const FooterSection = () => (
  <section id="contact" className="py-24 md:py-32 bg-[hsl(160,30%,12%)] relative overflow-hidden">
    <AnimatedBlockchainBg opacity={0.15} color="green" />
    <div className="container mx-auto text-center relative z-10">
      <ScrollReveal>
        <h2 className="text-heading md:text-display font-serif text-white mb-6">
          We're not building a technology product. We're creating a new market.
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <p className="text-subheading font-sans text-white/50 max-w-2xl mx-auto mb-10">
          $200 billion in agricultural commodities. Zero on-chain infrastructure — until now.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <a href="mailto:contact@rwahub.io" className="inline-flex items-center px-8 py-4 rounded-lg bg-[hsl(var(--green-accent))] text-white font-sans font-medium hover:opacity-90 transition-opacity active:scale-[0.97]">
          Partner With Us
        </a>
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">VIFC-HCMC</a>
            <a href="#" className="hover:text-white/60 transition-colors">GOE Alliance</a>
          </div>
          <p className="text-xs font-sans text-white/20">RWA Hub operates within the VIFC-HCMC regulatory sandbox.</p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default FooterSection;
