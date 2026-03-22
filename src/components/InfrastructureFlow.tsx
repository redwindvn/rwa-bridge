import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import { X } from "lucide-react";

type EntityType = "physical" | "digital" | "blockchain";

interface Entity {
  id: string;
  name: string;
  role: string;
  type: EntityType;
}

const entities: Entity[] = [
  { id: "seller", name: "Seller", role: "Rice Exporter — Owns the commodity", type: "physical" },
  { id: "buyer", name: "Buyer", role: "International Offtaker — Purchases the commodity", type: "physical" },
  { id: "inspector", name: "Inspector (SGS)", role: "Independent quality verification", type: "physical" },
  { id: "warehouse", name: "Warehouse (Gemadept)", role: "Physical storage & custody", type: "physical" },
  { id: "insurance", name: "Insurance (BIC)", role: "Commodity insurance", type: "physical" },
  { id: "traceability", name: "Traceability (Agrichain)", role: "Supply chain data on blockchain", type: "physical" },
  { id: "kyb", name: "KYB Center", role: "Enterprise identity verification", type: "digital" },
  { id: "bank", name: "Bank (MB Bank)", role: "Document digitization & trade finance", type: "digital" },
  { id: "commercial_bank", name: "Commercial Bank", role: "Lending against token collateral", type: "digital" },
  { id: "ccp1", name: "CCP₁ (Clearing)", role: "Takes ownership, ensures bankruptcy isolation", type: "digital" },
  { id: "ccp2", name: "CCP₂ (Market Maker)", role: "Liquidity provider on exchange", type: "digital" },
  { id: "exchange", name: "Exchange", role: "Token trading platform", type: "digital" },
  { id: "tokenization", name: "Tokenization Platform", role: "GOE Alliance SPV — Mints & burns tokens", type: "blockchain" },
  { id: "custody", name: "Institutional Custody", role: "Holds documents + tokens", type: "blockchain" },
  { id: "oracle", name: "Oracle", role: "Real-time commodity price feed", type: "blockchain" },
  { id: "redeem", name: "Redeem Gateway", role: "Token-to-physical redemption", type: "blockchain" },
  { id: "burn", name: "Burn", role: "Permanent token destruction", type: "blockchain" },
];

interface Step {
  step: number;
  title: string;
  participants: string[];
  entityIds: string[];
  description: string;
  output: string;
}

const steps: Step[] = [
  {
    step: 0, title: "Enterprise Verification (KYB)",
    participants: ["Seller", "Buyer", "KYB Center"],
    entityIds: ["seller", "buyer", "kyb"],
    description: "Before any activity, both seller and buyer complete Know Your Business verification. This is a permissioned system — no KYB, no access.",
    output: "Membership status + linked custody wallet",
  },
  {
    step: 1, title: "Inspection & Certification",
    participants: ["Seller", "Inspector (SGS)", "Traceability (Agrichain)"],
    entityIds: ["seller", "inspector", "traceability"],
    description: "Seller prepares export lot. SGS Vietnam conducts independent quality inspection (moisture, broken grain %, impurities). Agrichain records origin data on blockchain for EU compliance (EUDR).",
    output: "Certificate of Quality + Traceability Record",
  },
  {
    step: 2, title: "Ownership Transfer & Warehousing",
    participants: ["Seller", "CCP₁", "Warehouse (Gemadept)"],
    entityIds: ["seller", "ccp1", "warehouse"],
    description: "CCP₁ purchases the commodity from Seller, transferring legal ownership. Goods are stored at Gemadept warehouse and 'frozen' — cannot be exported, sold, or pledged outside the system. This creates bankruptcy isolation.",
    output: "Goods in warehouse, owned by CCP₁, immobilized",
  },
  {
    step: 3, title: "Document Aggregation & Digitization",
    participants: ["Warehouse", "Institutional Custody", "Insurance (BIC)", "Bank (MB Bank)"],
    entityIds: ["warehouse", "custody", "insurance", "bank"],
    description: "All documents are aggregated: Warehouse Receipt from Gemadept, Certificate of Quality from SGS, Insurance E-Contract from BIC. Everything flows to MB Bank for digitization and cross-verification.",
    output: "Complete digitized document set at Bank",
  },
  {
    step: 4, title: "Mint Ratio Determination",
    participants: ["Bank (MB Bank)", "Tokenization Platform (GOE)"],
    entityIds: ["bank", "tokenization"],
    description: "Bank and Tokenization Platform determine: (a) Mint Ratio — e.g. 105 tons in warehouse = 100 tokens (5% buffer for overcollateralization), and (b) tokenization fee percentage.",
    output: "Proof of Assets — confirmation that all conditions are met",
  },
  {
    step: 5, title: "Token Minting",
    participants: ["Tokenization Platform", "Institutional Custody", "Seller"],
    entityIds: ["tokenization", "custody", "seller"],
    description: "Tokens are minted (e.g. 100 VNRICE-5B tokens, each = 1 ton of 5% broken white rice) directly into the Custody Wallet — NOT into Seller's personal wallet.",
    output: "Tokens visible in Seller's app, held by Institutional Custody",
  },
  {
    step: 6, title: "Trading & Finance",
    participants: ["Seller", "Buyer", "Commercial Bank", "Exchange", "CCP₂", "Oracle"],
    entityIds: ["seller", "buyer", "commercial_bank", "exchange", "ccp2", "oracle"],
    description: "Seller has three options: (A) Use tokens as collateral at Commercial Bank for trade finance. (B) Sell tokens on Exchange — CCP₂ provides market making, Oracle feeds real-time price data. (C) Hold tokens as balance sheet assets.",
    output: "Seller receives liquidity. Buyer acquires tokens.",
  },
  {
    step: 7, title: "Redemption & Export",
    participants: ["Buyer", "Redeem Gateway", "Tokenization Platform (Burn)", "Warehouse"],
    entityIds: ["buyer", "redeem", "tokenization", "burn", "warehouse"],
    description: "When Buyer wants physical goods: submit redemption request (minimum 100 tokens = 100 tons). Tokens are sent to Tokenization Platform and permanently burned. Warehouse releases goods for export.",
    output: "Tokens destroyed, goods released from warehouse",
  },
];

const typeStyles: Record<EntityType, { bg: string; border: string; label: string; dot: string }> = {
  physical: { bg: "bg-[hsl(145,45%,96%)]", border: "border-[hsl(145,40%,75%)]", label: "Physical Layer", dot: "bg-[hsl(145,50%,40%)]" },
  digital: { bg: "bg-[hsl(41,60%,96%)]", border: "border-[hsl(41,50%,78%)]", label: "Digital Layer", dot: "bg-[hsl(41,68%,48%)]" },
  blockchain: { bg: "bg-[hsl(210,60%,96%)]", border: "border-[hsl(210,50%,78%)]", label: "Blockchain Layer", dot: "bg-[hsl(210,70%,50%)]" },
};

const InfrastructureFlow = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const activeEntities = activeStep !== null ? steps[activeStep].entityIds : [];

  const getEntityClass = (entityId: string) => {
    if (activeStep === null) return "opacity-100";
    return activeEntities.includes(entityId)
      ? "opacity-100 ring-2 ring-teal-DEFAULT/40 shadow-md"
      : "opacity-25";
  };

  return (
    <section id="infrastructure" className="section-sage py-24 md:py-32">
      <div className="container mx-auto">
        <SectionTitle>How It Works: The Complete Infrastructure</SectionTitle>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-6 mt-2 mb-10">
            {(Object.entries(typeStyles) as [EntityType, typeof typeStyles.physical][]).map(([, colors]) => (
              <div key={colors.label} className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider">{colors.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Entity Grid */}
          <ScrollReveal delay={0.15}>
            <div className="space-y-8">
              {(["physical", "digital", "blockchain"] as EntityType[]).map((type) => (
                <div key={type}>
                  <div className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50 mb-3">
                    {typeStyles[type].label}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {entities
                      .filter((e) => e.type === type)
                      .map((entity) => (
                        <div
                          key={entity.id}
                          className={`p-4 rounded-lg ${typeStyles[type].bg} border ${typeStyles[type].border} transition-all duration-300 ${getEntityClass(entity.id)}`}
                        >
                          <div className="text-sm font-sans font-semibold text-foreground mb-1">{entity.name}</div>
                          <div className="text-xs font-sans text-muted-foreground leading-relaxed">{entity.role}</div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Step Selector + Detail */}
          <ScrollReveal delay={0.25}>
            <div className="lg:sticky lg:top-24">
              <div className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50 mb-3">Select a step</div>
              <div className="grid grid-cols-4 lg:grid-cols-4 gap-2 mb-6">
                {steps.map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setActiveStep(activeStep === s.step ? null : s.step)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-sans font-medium transition-all duration-200 active:scale-[0.96] ${
                      activeStep === s.step
                        ? "bg-teal-DEFAULT text-white shadow-sm"
                        : "bg-white border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                    }`}
                  >
                    Step {s.step}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeStep !== null && (
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="p-7 rounded-xl border border-border bg-white shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <div className="text-xs font-sans text-teal-DEFAULT font-semibold uppercase tracking-wider mb-1">
                          Step {steps[activeStep].step}
                        </div>
                        <h3 className="text-xl font-serif text-foreground">{steps[activeStep].title}</h3>
                      </div>
                      <button
                        onClick={() => setActiveStep(null)}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="mb-5">
                      <div className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50 mb-2">Participants</div>
                      <div className="flex flex-wrap gap-1.5">
                        {steps[activeStep].participants.map((p) => (
                          <span key={p} className="text-xs font-sans px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50 mb-2">What happens</div>
                      <p className="text-sm font-sans text-muted-foreground leading-relaxed">{steps[activeStep].description}</p>
                    </div>

                    <div>
                      <div className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50 mb-2">Output</div>
                      <p className="text-sm font-sans text-teal-DEFAULT font-medium">{steps[activeStep].output}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {activeStep === null && (
                <div className="p-7 rounded-xl border border-border bg-white text-center">
                  <p className="text-sm font-sans text-muted-foreground">Click a step to explore the infrastructure flow</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureFlow;
