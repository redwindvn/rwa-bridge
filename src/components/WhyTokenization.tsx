import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import { ArrowRight } from "lucide-react";
import AnimatedBlockchainBg from "./AnimatedBlockchainBg";

const challenges = [
  {
    problem: "The Verification Gap",
    traditional: "Paper warehouse receipts are easily forged, hard to verify, and only locally valid. Banks must send physical teams to verify inventory — a process that takes weeks.",
    solution: "On-chain records link inspection certificates (SGS), insurance (BIC), and warehouse receipts (Gemadept) into a single verifiable digital asset. Any counterparty can audit provenance in seconds.",
  },
  {
    problem: "The Liquidity Trap",
    traditional: "Commodity owners must sell entire lots or nothing. Trade finance takes 2–4 weeks for approval. Urgent cash needs force distressed sales at below-market prices.",
    solution: "Tokenization enables fractional ownership — sell 10 tons out of 100 without moving goods. Tokens serve as instant collateral for trade finance, reducing approval from weeks to days.",
  },
  {
    problem: "The Trust Deficit",
    traditional: "Trust relies on relationships, paper signatures, and manual reconciliation across disconnected systems. Disputes are common, resolution is slow and expensive.",
    solution: "Every token embeds its proof chain: inspection data, insurance coverage, ownership history, and custody status. Trust is programmatic — verified by code, not by handshakes.",
  },
  {
    problem: "The Settlement Delay",
    traditional: "International commodity settlement runs T+5 to T+30. Capital is trapped in transit. Multiple intermediaries each add cost and delay.",
    solution: "Blockchain settlement is T+0. Atomic swaps ensure delivery-versus-payment. The clearing house (CCP) provides bankruptcy isolation without adding settlement latency.",
  },
];

const WhyTokenization = () => (
  <section id="tokenization" className="section-white py-24 md:py-32">
    <div className="container mx-auto">
      <SectionTitle>Why Blockchain? Because Paper Doesn't Scale.</SectionTitle>
      <ScrollReveal delay={0.05}>
        <p className="text-body-lg text-muted-foreground max-w-3xl mb-14">
          The "hard problem" of commodity tokenization isn't technology — it's bridging the physical and digital worlds.
          Every token must maintain a provable, auditable link to real goods in a real warehouse. Here's how RWA Hub solves this.
        </p>
      </ScrollReveal>

      <div className="space-y-6">
        {challenges.map((c, i) => (
          <ScrollReveal key={c.problem} delay={i * 0.06}>
            <div className="rounded-xl border border-border bg-white p-8 md:p-10">
              <h3 className="font-serif text-2xl text-foreground mb-6">{c.problem}</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-[hsl(0,60%,65%)]" />
                    <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground">Traditional System</span>
                  </div>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed">{c.traditional}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-teal-DEFAULT" />
                    <span className="text-xs font-sans font-semibold uppercase tracking-wider text-teal-DEFAULT">RWA Hub Infrastructure</span>
                  </div>
                  <p className="text-sm font-sans text-foreground leading-relaxed">{c.solution}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.35}>
        <div className="mt-14 p-8 rounded-xl bg-[hsl(var(--teal-light))] border border-[hsl(var(--teal))]/10">
          <p className="text-body-lg text-foreground leading-relaxed">
            We don't replace existing processes. Warehouses still warehouse. Banks still lend. Inspectors still inspect.{" "}
            <span className="font-semibold">We digitize the connections between them</span> — creating a single source of truth that unlocks capital trapped in physical goods.
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default WhyTokenization;
