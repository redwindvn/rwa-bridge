import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/* ─── Types ─── */
type LayerType = "physical" | "digital" | "blockchain";

interface Entity {
  id: string;
  name: string;
  role: string;
  layer: LayerType;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Connection {
  from: string;
  to: string;
  type: "physical" | "digital" | "blockchain";
  label?: string;
  path?: string; // custom SVG path
}

interface Step {
  step: number;
  title: string;
  participants: string[];
  entityIds: string[];
  connections: Connection[];
  description: string;
  output: string;
}

/* ─── Layer styles ─── */
const layerColors: Record<LayerType, { fill: string; border: string; text: string; accent: string }> = {
  physical: {
    fill: "hsl(145, 45%, 95%)",
    border: "hsl(145, 50%, 40%)",
    text: "hsl(145, 50%, 25%)",
    accent: "hsl(145, 50%, 40%)",
  },
  digital: {
    fill: "hsl(41, 60%, 95%)",
    border: "hsl(41, 68%, 48%)",
    text: "hsl(41, 68%, 30%)",
    accent: "hsl(41, 68%, 48%)",
  },
  blockchain: {
    fill: "hsl(260, 50%, 95%)",
    border: "hsl(260, 55%, 55%)",
    text: "hsl(260, 55%, 30%)",
    accent: "hsl(260, 55%, 55%)",
  },
};

/* ─── Entities positioned to match the uploaded flow diagram ─── */
const entities: Entity[] = [
  // Physical (Green) — left side
  { id: "seller", name: "Seller", role: "Rice Exporter", layer: "physical", x: 30, y: 120, w: 100, h: 50 },
  { id: "inspector", name: "Inspector", role: "SGS Vietnam", layer: "physical", x: 30, y: 370, w: 100, h: 50 },
  { id: "traceability", name: "Traceability", role: "Agrichain", layer: "physical", x: 30, y: 460, w: 110, h: 50 },
  { id: "warehouse", name: "Warehouse", role: "Gemadept", layer: "physical", x: 310, y: 370, w: 110, h: 50 },
  { id: "insurance", name: "Insurance", role: "BIC", layer: "physical", x: 440, y: 460, w: 100, h: 50 },
  { id: "buyer", name: "Buyer", role: "Int'l Offtaker", layer: "physical", x: 970, y: 120, w: 100, h: 50 },

  // Digital (Gold/Yellow) — upper area
  { id: "kyb", name: "KYB Center", role: "Identity Verification", layer: "digital", x: 30, y: 40, w: 110, h: 45 },
  { id: "kyb2", name: "KYB Center", role: "Identity Verification", layer: "digital", x: 970, y: 40, w: 110, h: 45 },
  { id: "commercial_bank", name: "Commercial Bank", role: "Trade Finance", layer: "digital", x: 310, y: 40, w: 130, h: 45 },
  { id: "ccp1", name: "CCP₁", role: "Clearing Party", layer: "digital", x: 200, y: 290, w: 100, h: 50 },
  { id: "ccp2", name: "CCP₂", role: "Market Maker", layer: "digital", x: 500, y: 100, w: 100, h: 50 },
  { id: "exchange", name: "Exchange", role: "Token Trading", layer: "digital", x: 650, y: 40, w: 110, h: 45 },
  { id: "bank", name: "Bank", role: "MB Bank", layer: "digital", x: 570, y: 330, w: 100, h: 50 },

  // Blockchain (Purple)
  { id: "custody", name: "Custody Wallet", role: "Institutional", layer: "blockchain", x: 460, y: 240, w: 120, h: 50 },
  { id: "tokenization", name: "Tokenization", role: "GOE Alliance SPV", layer: "blockchain", x: 740, y: 300, w: 130, h: 55 },
  { id: "oracle", name: "Oracle", role: "Price Feed", layer: "blockchain", x: 850, y: 180, w: 100, h: 50 },
  { id: "redeem", name: "Redeem Gateway", role: "Token → Physical", layer: "blockchain", x: 440, y: 560, w: 130, h: 50 },
  { id: "burn", name: "Burn", role: "Token Destruction", layer: "blockchain", x: 740, y: 560, w: 100, h: 50 },
];

/* ─── Steps ─── */
const steps: Step[] = [
  {
    step: 0,
    title: "Enterprise Verification (KYB)",
    participants: ["Seller", "Buyer", "KYB Center"],
    entityIds: ["seller", "buyer", "kyb", "kyb2"],
    connections: [
      { from: "kyb", to: "seller", type: "digital", label: "0. KYB" },
      { from: "kyb2", to: "buyer", type: "digital", label: "0. KYB" },
    ],
    description: "Before any activity, both seller and buyer complete Know Your Business verification. This is a permissioned system — no KYB, no access.",
    output: "Membership status + linked custody wallet",
  },
  {
    step: 1,
    title: "Inspection & Certification",
    participants: ["Seller", "Inspector (SGS)", "Traceability (Agrichain)"],
    entityIds: ["seller", "inspector", "traceability"],
    connections: [
      { from: "seller", to: "inspector", type: "physical", label: "1. Inspect" },
      { from: "inspector", to: "traceability", type: "physical", label: "1. Record" },
    ],
    description: "Seller prepares export lot. SGS Vietnam conducts independent quality inspection (moisture, broken grain %, impurities). Agrichain records origin data on blockchain for EU compliance (EUDR).",
    output: "Certificate of Quality + Traceability Record",
  },
  {
    step: 2,
    title: "Ownership Transfer & Warehousing",
    participants: ["Seller", "CCP₁", "Warehouse (Gemadept)"],
    entityIds: ["seller", "ccp1", "warehouse"],
    connections: [
      { from: "seller", to: "ccp1", type: "digital", label: "2. Transfer" },
      { from: "ccp1", to: "warehouse", type: "physical", label: "2. Storage" },
    ],
    description: "CCP₁ purchases the commodity from Seller, transferring legal ownership. Goods are stored at Gemadept warehouse and 'frozen' — cannot be exported, sold, or pledged outside the system. This creates bankruptcy isolation.",
    output: "Goods in warehouse, owned by CCP₁, immobilized",
  },
  {
    step: 3,
    title: "Document Aggregation & Digitization",
    participants: ["Warehouse", "Institutional Custody", "Insurance (BIC)", "Bank (MB Bank)"],
    entityIds: ["warehouse", "custody", "insurance", "bank"],
    connections: [
      { from: "warehouse", to: "custody", type: "digital", label: "3. Invoice" },
      { from: "warehouse", to: "insurance", type: "physical", label: "3. Contract" },
      { from: "insurance", to: "bank", type: "digital", label: "4. E-contract" },
      { from: "custody", to: "bank", type: "digital", label: "4. E-invoice" },
    ],
    description: "All documents are aggregated: Warehouse Receipt from Gemadept, Certificate of Quality from SGS, Insurance E-Contract from BIC. Everything flows to MB Bank for digitization and cross-verification.",
    output: "Complete digitized document set at Bank",
  },
  {
    step: 4,
    title: "Mint Ratio Determination",
    participants: ["Bank (MB Bank)", "Tokenization Platform (GOE)"],
    entityIds: ["bank", "tokenization"],
    connections: [
      { from: "bank", to: "tokenization", type: "digital", label: "4. Mint Ratio" },
    ],
    description: "Bank and Tokenization Platform determine: (a) Mint Ratio — e.g. 105 tons in warehouse = 100 tokens (5% buffer for overcollateralization), and (b) tokenization fee percentage.",
    output: "Proof of Assets — confirmation that all conditions are met",
  },
  {
    step: 5,
    title: "Token Minting",
    participants: ["Tokenization Platform", "Institutional Custody", "Seller"],
    entityIds: ["tokenization", "custody", "seller"],
    connections: [
      { from: "tokenization", to: "custody", type: "blockchain", label: "5. Mint" },
      { from: "custody", to: "seller", type: "blockchain", label: "5. Receive" },
    ],
    description: "Tokens are minted (e.g. 100 VNRICE-5B tokens, each = 1 ton of 5% broken white rice) directly into the Custody Wallet — NOT into Seller's personal wallet.",
    output: "Tokens visible in Seller's app, held by Institutional Custody",
  },
  {
    step: 6,
    title: "Trading & Finance",
    participants: ["Seller", "Buyer", "Commercial Bank", "Exchange", "CCP₂", "Oracle"],
    entityIds: ["seller", "buyer", "commercial_bank", "exchange", "ccp2", "oracle"],
    connections: [
      { from: "seller", to: "commercial_bank", type: "digital", label: "6. Lending" },
      { from: "seller", to: "exchange", type: "digital", label: "6. Trading" },
      { from: "ccp2", to: "exchange", type: "digital", label: "6. LP" },
      { from: "oracle", to: "exchange", type: "blockchain", label: "Price" },
      { from: "exchange", to: "buyer", type: "digital", label: "6. Trading" },
    ],
    description: "Seller has three options: (A) Use tokens as collateral at Commercial Bank for trade finance. (B) Sell tokens on Exchange — CCP₂ provides market making, Oracle feeds real-time price. (C) Hold tokens as balance sheet assets.",
    output: "Seller receives liquidity. Buyer acquires tokens.",
  },
  {
    step: 7,
    title: "Redemption & Export",
    participants: ["Buyer", "Redeem Gateway", "Tokenization Platform (Burn)", "Warehouse"],
    entityIds: ["buyer", "redeem", "tokenization", "burn", "warehouse"],
    connections: [
      { from: "buyer", to: "redeem", type: "blockchain", label: "7. Redeem" },
      { from: "redeem", to: "burn", type: "blockchain", label: "9. Execute" },
      { from: "burn", to: "tokenization", type: "blockchain", label: "Burn" },
      { from: "redeem", to: "warehouse", type: "physical", label: "8. Export" },
    ],
    description: "When Buyer wants physical goods: submit redemption request (minimum 100 tokens = 100 tons). Tokens are sent to Tokenization Platform and permanently burned. Warehouse releases goods for export.",
    output: "Tokens destroyed, goods released from warehouse",
  },
];

/* ─── Helper: get center of entity ─── */
const getCenter = (e: Entity) => ({ cx: e.x + e.w / 2, cy: e.y + e.h / 2 });

/* ─── Connection line colors ─── */
const lineStyles: Record<string, { stroke: string; dash?: string }> = {
  physical: { stroke: "hsl(220, 10%, 70%)" },
  digital: { stroke: "hsl(41, 68%, 48%)" },
  blockchain: { stroke: "hsl(260, 55%, 55%)", dash: "8,4" },
};

/* ─── Component ─── */
const InfrastructureFlow = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const activeEntities = activeStep !== null ? steps[activeStep].entityIds : [];
  const activeConnections = activeStep !== null ? steps[activeStep].connections : [];

  const isActive = useCallback(
    (id: string) => activeStep === null || activeEntities.includes(id),
    [activeStep, activeEntities]
  );

  const goToStep = (dir: "prev" | "next") => {
    if (activeStep === null) { setActiveStep(0); return; }
    const next = dir === "prev" ? activeStep - 1 : activeStep + 1;
    if (next >= 0 && next < steps.length) setActiveStep(next);
  };

  return (
    <section id="infrastructure" className="py-24 md:py-32 relative overflow-hidden bg-[hsl(var(--sage))]">
      {/* Subtle blockchain grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(hsl(var(--teal)) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--teal)) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />
      <div className="absolute top-40 right-0 w-[500px] h-[500px] rounded-full bg-[hsl(260,50%,92%)] blur-[150px] opacity-30" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full bg-[hsl(164,60%,90%)] blur-[120px] opacity-25" />

      <div className="container mx-auto relative z-10">
        <SectionTitle>How It Works: The Complete Infrastructure</SectionTitle>

        {/* Legend */}
        <ScrollReveal delay={0.05}>
          <div className="flex flex-wrap gap-6 mb-8">
            {([
              { color: layerColors.physical.accent, label: "Physical Layer" },
              { color: layerColors.digital.accent, label: "Digital Layer" },
              { color: layerColors.blockchain.accent, label: "Blockchain Layer" },
            ]).map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
                <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider">{l.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 ml-4">
              <div className="w-6 h-0 border-t-2 border-[hsl(220,10%,70%)]" />
              <span className="text-xs font-sans text-muted-foreground">Physical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0 border-t-2 border-[hsl(41,68%,48%)]" />
              <span className="text-xs font-sans text-muted-foreground">Digital</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0 border-t-2 border-dashed border-[hsl(260,55%,55%)]" />
              <span className="text-xs font-sans text-muted-foreground">On-chain</span>
            </div>
          </div>
        </ScrollReveal>

        {/* SVG Flow Diagram */}
        <ScrollReveal delay={0.1}>
          <div className="overflow-x-auto rounded-2xl border border-border bg-white/80 backdrop-blur-sm shadow-sm p-4 md:p-6">
            <svg viewBox="0 0 1120 640" className="w-full min-w-[800px]" style={{ maxHeight: 640 }}>
              <defs>
                <marker id="arr-phy" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="none" stroke="hsl(220,10%,70%)" strokeWidth="1.2" />
                </marker>
                <marker id="arr-dig" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="none" stroke="hsl(41,68%,48%)" strokeWidth="1.2" />
                </marker>
                <marker id="arr-blk" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="none" stroke="hsl(260,55%,55%)" strokeWidth="1.2" />
                </marker>
              </defs>

              {/* Connection lines when a step is active */}
              {activeStep !== null && activeConnections.map((conn, i) => {
                const fromEntity = entities.find(e => e.id === conn.from);
                const toEntity = entities.find(e => e.id === conn.to);
                if (!fromEntity || !toEntity) return null;
                const from = getCenter(fromEntity);
                const to = getCenter(toEntity);
                const style = lineStyles[conn.type];
                const markerId = conn.type === "physical" ? "arr-phy" : conn.type === "digital" ? "arr-dig" : "arr-blk";

                // Simple curved path
                const dx = to.cx - from.cx;
                const dy = to.cy - from.cy;
                const cx1 = from.cx + dx * 0.3;
                const cy1 = from.cy;
                const cx2 = to.cx - dx * 0.3;
                const cy2 = to.cy;
                const pathD = `M${from.cx},${from.cy} C${cx1},${cy1} ${cx2},${cy2} ${to.cx},${to.cy}`;

                const midX = (from.cx + to.cx) / 2;
                const midY = (from.cy + to.cy) / 2 - 12;

                return (
                  <g key={`conn-${i}`}>
                    <motion.path
                      d={pathD}
                      fill="none"
                      stroke={style.stroke}
                      strokeWidth={2}
                      strokeDasharray={style.dash || "none"}
                      markerEnd={`url(#${markerId})`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    />
                    {conn.label && (
                      <motion.text
                        x={midX}
                        y={midY}
                        textAnchor="middle"
                        fill={style.stroke}
                        fontSize="9"
                        fontFamily="Inter, sans-serif"
                        fontWeight="600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      >
                        {conn.label}
                      </motion.text>
                    )}
                  </g>
                );
              })}

              {/* Entity cards */}
              {entities.map((entity) => {
                const colors = layerColors[entity.layer];
                const active = isActive(entity.id);

                return (
                  <g
                    key={entity.id}
                    style={{
                      opacity: active ? 1 : 0.15,
                      transition: "opacity 0.4s ease, transform 0.4s ease",
                      transform: active && activeStep !== null ? "scale(1.02)" : "scale(1)",
                      transformOrigin: `${entity.x + entity.w / 2}px ${entity.y + entity.h / 2}px`,
                    }}
                  >
                    {/* Card background */}
                    <rect
                      x={entity.x}
                      y={entity.y}
                      width={entity.w}
                      height={entity.h}
                      rx={8}
                      fill={active && activeStep !== null ? colors.fill : "white"}
                      stroke={colors.border}
                      strokeWidth={active && activeStep !== null ? 2.5 : 1.5}
                    />
                    {/* Left border accent */}
                    <rect
                      x={entity.x}
                      y={entity.y}
                      width={4}
                      height={entity.h}
                      rx={2}
                      fill={colors.border}
                    />
                    {/* Name */}
                    <text
                      x={entity.x + 14}
                      y={entity.y + entity.h / 2 - 5}
                      fill={colors.text}
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="Inter, sans-serif"
                    >
                      {entity.name}
                    </text>
                    {/* Role */}
                    <text
                      x={entity.x + 14}
                      y={entity.y + entity.h / 2 + 10}
                      fill="hsl(220, 10%, 55%)"
                      fontSize="9"
                      fontFamily="Inter, sans-serif"
                    >
                      {entity.role}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </ScrollReveal>

        {/* Step selector + navigation */}
        <ScrollReveal delay={0.2}>
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50">
                Select a step to explore
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToStep("prev")}
                  disabled={activeStep === null || activeStep === 0}
                  className="p-2 rounded-lg border border-border bg-white text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.95]"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => goToStep("next")}
                  disabled={activeStep === steps.length - 1}
                  className="p-2 rounded-lg border border-border bg-white text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.95]"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Step buttons */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-6">
              {steps.map((s) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(activeStep === s.step ? null : s.step)}
                  className={`px-3 py-3 rounded-lg text-sm font-sans font-medium transition-all duration-200 active:scale-[0.96] ${
                    activeStep === s.step
                      ? "bg-teal-DEFAULT text-white shadow-sm"
                      : "bg-white border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                  }`}
                >
                  <span className="block text-xs opacity-60">Step</span>
                  {s.step}
                </button>
              ))}
            </div>

            {/* Detail Panel */}
            <AnimatePresence mode="wait">
              {activeStep !== null && (
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 md:p-10 rounded-2xl border border-border bg-white shadow-sm"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="text-xs font-sans font-semibold text-teal-DEFAULT uppercase tracking-wider">
                        Step {steps[activeStep].step}
                      </span>
                      <h3 className="text-2xl font-serif text-foreground mt-1">{steps[activeStep].title}</h3>
                    </div>
                    <button
                      onClick={() => setActiveStep(null)}
                      className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <div className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50 mb-3">
                        Participants
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {steps[activeStep].participants.map((p) => (
                          <span
                            key={p}
                            className="text-xs font-sans px-3 py-1.5 rounded-full bg-muted text-muted-foreground"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50 mb-3">
                        Description
                      </div>
                      <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                        {steps[activeStep].description}
                      </p>
                    </div>
                    <div>
                      <div className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50 mb-3">
                        Output
                      </div>
                      <p className="text-sm font-sans text-teal-DEFAULT font-semibold leading-relaxed">
                        {steps[activeStep].output}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {activeStep === null && (
              <div className="p-8 rounded-2xl border border-border bg-white/60 text-center">
                <p className="text-sm font-sans text-muted-foreground">
                  Click a step above to explore the complete infrastructure flow
                </p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default InfrastructureFlow;
