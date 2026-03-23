import { ScrollReveal } from "./ScrollReveal";
import partnersImage from "@/assets/partners-logos.png";

const Partners = () => (
  <section className="py-12 md:py-16 bg-[#1a1a2e] relative overflow-hidden">
    <div className="container mx-auto relative z-10">
      <ScrollReveal>
        <p className="text-center text-xs font-sans font-medium tracking-widest uppercase text-white/50 mb-8">
          Strategic Partners & Ecosystem
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <img
          src={partnersImage}
          alt="Strategic Partners: Avalanche, Dragon Capital, On-Chain Academy, Republic, SkyMavis, Tether, Viettel Digital, KyberSwap"
          className="w-full max-w-5xl mx-auto"
        />
      </ScrollReveal>
    </div>
  </section>
);

export default Partners;
