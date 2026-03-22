import { ScrollReveal } from "./ScrollReveal";

const FooterSection = () => (
  <section id="contact" className="py-24 md:py-32 bg-foreground">
    <div className="container mx-auto text-center">
      <ScrollReveal>
        <h2 className="text-heading md:text-display font-serif text-white mb-6">
          Building Financial Infrastructure for the Next Century of Vietnamese Trade
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <p className="text-subheading font-sans text-white/50 max-w-2xl mx-auto mb-10">
          RWA Hub is developed by GOE Alliance in partnership with VIFC-HCMC. For partnership inquiries, contact us.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <a
          href="mailto:contact@rwahub.io"
          className="inline-flex items-center px-8 py-4 rounded-lg bg-teal-DEFAULT text-white font-sans font-medium hover:opacity-90 transition-opacity active:scale-[0.97]"
        >
          Contact the Team
        </a>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">VIFC-HCMC</a>
            <a href="#" className="hover:text-white/60 transition-colors">GOE Alliance</a>
          </div>
          <p className="text-xs font-sans text-white/20">
            RWA Hub operates within the VIFC-HCMC regulatory sandbox.
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default FooterSection;
