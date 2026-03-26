import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import AnimatedBlockchainBg from "./AnimatedBlockchainBg";

/* ═══════════════════════════════════════════
   COLORS - Green=Physical, Gold=Digital, Purple=Blockchain
   ═══════════════════════════════════════════ */
const C = {
  green: { fill: "#2E7D32", stroke: "#1B5E20", text: "#fff" },
  gold: { fill: "#F9A825", stroke: "#F57F17", text: "#333" },
  purple: { fill: "#5E35B1", stroke: "#4527A0", text: "#fff" },
  line: { phy: "#2E7D32", dig: "#F9A825", blk: "#7E57C2" },
};

/* ═══════════════════════════════════════════
   STEP DATA
   ═══════════════════════════════════════════ */
interface StepData {
  step: number; title: string; participants: string[];
  highlightIds: string[]; connectionIds: string[];
  description: string; output: string;
}

const steps: StepData[] = [
  {
    step: 1, title: "Inspection & Certification",
    participants: ["Seller", "Inspector (SGS)", "Traceability (Agrichain)"],
    highlightIds: ["seller", "inspector", "traceability"],
    connectionIds: ["c1a", "c1b"],
    description: "Seller prepares export lot. SGS Vietnam conducts independent quality inspection (moisture, broken grain %, impurities). Agrichain records origin data on blockchain for EU compliance (EUDR).",
    output: "Certificate of Quality + Traceability Record",
  },
  {
    step: 2, title: "Ownership Transfer & Warehousing",
    participants: ["Seller", "Central Clearing Party 1", "Insurance (BIC)", "Warehouse (Gemadept)"],
    highlightIds: ["seller", "ccp1", "insurance", "warehouse"],
    connectionIds: ["c2a", "c2b", "c2c"],
    description: "CCP1 purchases the commodity from Seller, transferring legal ownership. Goods are stored at Gemadept warehouse and 'frozen' - cannot be exported, sold, or pledged outside the system. BIC provides cargo and warehouse coverage.",
    output: "Goods in warehouse, owned by CCP1, insured, immobilized",
  },
  {
    step: 3, title: "Document Aggregation & Custody",
    participants: ["Warehouse (Gemadept)", "Institutional Custody"],
    highlightIds: ["warehouse", "inst-custody"],
    connectionIds: ["c3a"],
    description: "All documents are aggregated at Institutional Custody: Warehouse Receipt, Certificate of Quality, Insurance E-Contract. Everything is cross-verified and digitized.",
    output: "Complete digitized document set under institutional custody",
  },
  {
    step: 4, title: "Tokenization & Mint Ratio",
    participants: ["Bank (MB Bank)", "Tokenization Platform (GOE)"],
    highlightIds: ["bank-center", "tokenization"],
    connectionIds: ["c4a"],
    description: "Bank and Tokenization Platform determine: (a) Mint Ratio - e.g. 105 tons in warehouse = 100 tokens (5% buffer for overcollateralization), and (b) tokenization fee percentage.",
    output: "Proof of Assets - confirmation that all conditions are met",
  },
  {
    step: 5, title: "Token Minting & Receipt",
    participants: ["Tokenization Platform", "Seller"],
    highlightIds: ["tokenization", "seller"],
    connectionIds: ["c5a", "c5b"],
    description: "Tokens are minted (e.g. 100 VNRICE-5B tokens, each = 1 ton of 5% broken white rice). Seller receives receipt tokens representing ownership of the underlying commodity.",
    output: "Receipt tokens issued to Seller",
  },
  {
    step: 6, title: "Trading & Market Making",
    participants: ["Market Maker", "Exchange", "Institutional Custody", "Bank"],
    highlightIds: ["market-maker", "exchange", "inst-custody", "bank-top", "bank-center"],
    connectionIds: ["c6a", "c6b", "c6c"],
    description: "Market Maker provides liquidity on the Exchange. Institutional Custody connects to both the Exchange and Bank for settlement. Tokens can be traded on the secondary market.",
    output: "Liquid secondary market for commodity tokens",
  },
  {
    step: 7, title: "Redemption",
    participants: ["Buyer", "Tokenization Platform", "Institutional Custody"],
    highlightIds: ["buyer", "tokenization", "inst-custody"],
    connectionIds: ["c7a"],
    description: "When Buyer wants physical goods: submit redemption request (minimum 100 tokens = 100 tons). Tokens are sent to Tokenization Platform for processing.",
    output: "Redemption request processed",
  },
  {
    step: 8, title: "Export & Physical Delivery",
    participants: ["Warehouse (Gemadept)", "Buyer"],
    highlightIds: ["warehouse", "buyer"],
    connectionIds: ["c8a"],
    description: "Warehouse releases goods for export. Physical commodity is shipped to the Buyer. Full traceability records accompany the shipment.",
    output: "Physical goods delivered to Buyer",
  },
  {
    step: 9, title: "Token Burn",
    participants: ["Tokenization Platform", "Institutional Custody"],
    highlightIds: ["tokenization", "inst-custody"],
    connectionIds: ["c9a"],
    description: "Once physical delivery is confirmed, corresponding tokens are permanently burned on the Tokenization Platform. This ensures 1:1 backing is maintained at all times.",
    output: "Tokens destroyed, supply reduced to match physical inventory",
  },
];

/* ═══════════════════════════════════════════
   SVG COMPONENTS
   ═══════════════════════════════════════════ */
const RRect = ({ id, x, y, w, h, label, sub, colors, active, dimmed }: {
  id: string; x: number; y: number; w: number; h: number;
  label: string; sub?: string; colors: { fill: string; stroke: string; text: string };
  active: boolean; dimmed: boolean;
}) => (
  <g data-id={id} style={{ opacity: dimmed ? 0.15 : 1, transition: "opacity 0.4s ease" }}>
    <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={colors.fill}
      stroke={active ? "#fff" : colors.stroke} strokeWidth={active ? 2.5 : 1.2}
      filter={active ? "url(#glow)" : undefined} />
    <text x={x + w / 2} y={sub ? y + h / 2 - 4 : y + h / 2 + 4} textAnchor="middle"
      fill={colors.text} fontSize="11" fontWeight="700" fontFamily="Inter,sans-serif">{label}</text>
    {sub && <text x={x + w / 2} y={y + h / 2 + 10} textAnchor="middle" fill={colors.text}
      fontSize="9" fontFamily="Inter,sans-serif" opacity="0.85">{sub}</text>}
  </g>
);

const Oval = ({ id, cx, cy, rx, ry, label, colors, active, dimmed }: {
  id: string; cx: number; cy: number; rx: number; ry: number;
  label: string; colors: { fill: string; stroke: string; text: string };
  active: boolean; dimmed: boolean;
}) => (
  <g data-id={id} style={{ opacity: dimmed ? 0.15 : 1, transition: "opacity 0.4s ease" }}>
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={colors.fill}
      stroke={active ? "#fff" : colors.stroke} strokeWidth={active ? 2.5 : 1.2}
      filter={active ? "url(#glow)" : undefined} />
    <text x={cx} y={cy + 4} textAnchor="middle" fill={colors.text}
      fontSize="11" fontWeight="700" fontFamily="Inter,sans-serif">{label}</text>
  </g>
);

const GBox = ({ x, y, w, h, color, dimmed }: {
  x: number; y: number; w: number; h: number; color: string; dimmed: boolean;
}) => (
  <rect x={x} y={y} width={w} height={h} rx={8} fill="none"
    stroke={color} strokeWidth={2} strokeDasharray="6,3"
    style={{ opacity: dimmed ? 0.1 : 0.45, transition: "opacity 0.4s ease" }} />
);

const Conn = ({ id, d, color, dashed, label, lx, ly, active, dimmed }: {
  id: string; d: string; color: string; dashed?: boolean;
  label?: string; lx?: number; ly?: number; active: boolean; dimmed: boolean;
}) => (
  <g data-conn={id} style={{ opacity: dimmed ? 0.08 : active ? 1 : 0.3, transition: "opacity 0.4s ease" }}>
    {active ? (
      <motion.path d={d} fill="none" stroke={color} strokeWidth={2}
        strokeDasharray={dashed ? "8,4" : "none"}
        markerEnd={`url(#arr-${color.replace('#', '')})`}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
    ) : (
      <path d={d} fill="none" stroke={color} strokeWidth={1.2}
        strokeDasharray={dashed ? "8,4" : "none"}
        markerEnd={`url(#arr-${color.replace('#', '')})`} />
    )}
    {label && lx !== undefined && ly !== undefined && (
      <g>
        <rect x={lx - 3} y={ly - 9} width={label.length * 5.5 + 12} height={16} rx={3}
          fill={color} opacity={active ? 0.92 : 0.55} />
        <text x={lx + label.length * 2.75 + 3} y={ly + 3} textAnchor="middle" fill="#fff"
          fontSize="8" fontWeight="600" fontFamily="Inter,sans-serif">{label}</text>
      </g>
    )}
  </g>
);

/* ═══════════════════════════════════════════
   MAIN COMPONENT - matches RWA_Hub_Flow_wrap.png
   viewBox 1500 x 650

   Layout:
   - Main horizontal flow: Seller -> Inspector -> Warehouse -> Inst Custody -> Bank -> Tokenization -> Buyer
   - Top area: Exchange+CCP1 (gold box), Market Maker (purple), Bank (gold box), Oracle (purple)
   - Below Inspector: Traceability
   - Insurance between Inspector and Warehouse area
   - Bottom paths: receipt token return, export, redemption, burn
   ═══════════════════════════════════════════ */
const InfrastructureFlow = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const hi = useCallback((id: string) => activeStep === null || steps[activeStep].highlightIds.includes(id), [activeStep]);
  const ca = useCallback((id: string) => activeStep !== null && steps[activeStep].connectionIds.includes(id), [activeStep]);
  const dim = useCallback((id: string) => activeStep !== null && !steps[activeStep].highlightIds.includes(id), [activeStep]);
  const cdim = useCallback((id: string) => activeStep !== null && !steps[activeStep].connectionIds.includes(id), [activeStep]);

  const goTo = (dir: "prev" | "next") => {
    if (activeStep === null) { setActiveStep(0); return; }
    const n = dir === "prev" ? activeStep - 1 : activeStep + 1;
    if (n >= 0 && n < steps.length) setActiveStep(n);
  };

  return (
    <section id="infrastructure" className="py-24 md:py-32 relative overflow-hidden bg-[hsl(var(--sage))]">
      <AnimatedBlockchainBg opacity={0.06} color="green" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--green-accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--green-accent)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div className="container mx-auto relative z-10">
        <SectionTitle>How It Works: The Complete Infrastructure</SectionTitle>

        {/* Legend */}
        <ScrollReveal delay={0.05}>
          <div className="flex flex-wrap gap-5 mb-6 text-xs font-sans text-muted-foreground">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: C.green.fill }} /><span>Physical Layer</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: C.gold.fill }} /><span>Digital Layer</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: C.purple.fill }} /><span>Blockchain Layer</span></div>
            <div className="flex items-center gap-2 ml-2"><div className="w-5 border-t-2" style={{ borderColor: C.line.phy }} /><span>Physical flow</span></div>
            <div className="flex items-center gap-2"><div className="w-5 border-t-2" style={{ borderColor: C.line.dig }} /><span>Digital flow</span></div>
            <div className="flex items-center gap-2"><div className="w-5 border-t-2 border-dashed" style={{ borderColor: C.line.blk }} /><span>On-chain</span></div>
          </div>
        </ScrollReveal>

        {/* SVG DIAGRAM */}
        <ScrollReveal delay={0.1}>
          <div className="overflow-x-auto rounded-2xl border border-[hsl(var(--green-accent))]/12 bg-white/90 backdrop-blur-sm shadow-sm p-3 md:p-5">
            <svg viewBox="0 0 1500 620" className="w-full min-w-[900px]" style={{ maxHeight: 700 }}>
              <defs>
                <filter id="glow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                {Object.values(C.line).map(c => (
                  <marker key={c} id={`arr-${c.replace('#','')}`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <path d="M0,0 L8,3 L0,6" fill="none" stroke={c} strokeWidth="1.2" />
                  </marker>
                ))}
              </defs>

              {/* ══ GROUP BOXES (gold dashed) ══ */}
              {/* Exchange + CCP1 box */}
              <GBox x={445} y={55} w={250} h={185} color={C.gold.stroke} dimmed={dim("exchange") && dim("ccp1")} />
              {/* Bank top box */}
              <GBox x={870} y={55} w={150} h={115} color={C.gold.stroke} dimmed={dim("bank-top")} />

              {/* ══ CONNECTIONS - all orthogonal ══ */}

              {/* Step 1: Seller -> Inspector */}
              <Conn id="c1a" d="M145,380 H260" color={C.line.phy} label="1" lx={190} ly={370} active={ca("c1a")} dimmed={cdim("c1a")} />
              {/* Inspector <-> Traceability */}
              <Conn id="c1b" d="M330,410 V465" color={C.line.phy} active={ca("c1b")} dimmed={cdim("c1b")} />

              {/* Step 2: Seller -> CCP1 (up-right) */}
              <Conn id="c2a" d="M95,355 V160 H455" color={C.line.phy} label="2" lx={250} ly={150} active={ca("c2a")} dimmed={cdim("c2a")} />
              {/* CCP1 -> Insurance */}
              <Conn id="c2b" d="M530,200 V290 H420" color={C.line.phy} label="2" lx={460} ly={280} active={ca("c2b")} dimmed={cdim("c2b")} />
              {/* CCP1 -> Warehouse */}
              <Conn id="c2c" d="M570,200 V355 H555" color={C.line.phy} active={ca("c2c")} dimmed={cdim("c2c")} />

              {/* Step 3: Warehouse -> Inst Custody */}
              <Conn id="c3a" d="M555,380 H700" color={C.line.phy} label="3" lx={615} ly={370} active={ca("c3a")} dimmed={cdim("c3a")} />

              {/* Step 4: Bank -> Tokenization */}
              <Conn id="c4a" d="M960,380 H1080" color={C.line.dig} label="4. Tokenization" lx={975} ly={370} active={ca("c4a")} dimmed={cdim("c4a")} />

              {/* Step 5: Mint token */}
              <Conn id="c5a" d="M1145,330 V270 H1145" color={C.line.blk} dashed label="5. Mint token" lx={1060} ly={260} active={ca("c5a")} dimmed={cdim("c5a")} />
              {/* Receive receipt token - long path back to Seller at bottom */}
              <Conn id="c5b" d="M1080,400 V560 H100 V405" color={C.line.phy} label="5. Receive receipt token" lx={400} ly={550} active={ca("c5b")} dimmed={cdim("c5b")} />

              {/* Step 6: Market Maker -> Exchange */}
              <Conn id="c6a" d="M700,105 H680" color={C.line.blk} dashed label="6" lx={675} ly={95} active={ca("c6a")} dimmed={cdim("c6a")} />
              {/* Inst Custody -> up to Exchange area */}
              <Conn id="c6b" d="M770,345 V200 V105 H695" color={C.line.blk} dashed label="6" lx={735} ly={225} active={ca("c6b")} dimmed={cdim("c6b")} />
              {/* Inst Custody -> Bank top */}
              <Conn id="c6c" d="M830,360 H870 V130 H880" color={C.line.dig} label="6" lx={860} ly={250} active={ca("c6c")} dimmed={cdim("c6c")} />

              {/* Step 7: Redemption - purple from bottom to Inst Custody */}
              <Conn id="c7a" d="M1310,400 V520 H810 V410" color={C.line.blk} dashed label="7. Redemption" lx={1000} ly={510} active={ca("c7a")} dimmed={cdim("c7a")} />

              {/* Step 8: Export - green from bottom */}
              <Conn id="c8a" d="M510,410 V580 H1260 V400" color={C.line.phy} label="8. Export" lx={850} ly={575} active={ca("c8a")} dimmed={cdim("c8a")} />

              {/* Step 9: Burn token */}
              <Conn id="c9a" d="M810,410 V490 H1100 V400" color={C.line.blk} dashed label="9. Burn token" lx={920} ly={483} active={ca("c9a")} dimmed={cdim("c9a")} />

              {/* Oracle -> Tokenization Platform (dashed) */}
              <path d="M1120,165 V330" fill="none" stroke={C.line.blk} strokeWidth={1.2} strokeDasharray="8,4"
                markerEnd={`url(#arr-${C.line.blk.replace('#','')})`} opacity={0.35} />

              {/* ══ ENTITY CARDS ══ */}

              {/* Seller - far left, green rounded */}
              <RRect id="seller" x={40} y={355} w={105} h={50} label="Seller" colors={C.green}
                active={hi("seller") && activeStep !== null} dimmed={dim("seller")} />

              {/* Inspector - green */}
              <RRect id="inspector" x={260} y={355} w={130} h={50} label="Inspector" colors={C.green}
                active={hi("inspector") && activeStep !== null} dimmed={dim("inspector")} />

              {/* Traceability - below Inspector */}
              <RRect id="traceability" x={275} y={465} w={110} h={40} label="Traceability" colors={C.green}
                active={hi("traceability") && activeStep !== null} dimmed={dim("traceability")} />

              {/* Insurance - between Inspector and Warehouse area */}
              <RRect id="insurance" x={300} y={280} w={120} h={42} label="Insurance" colors={C.green}
                active={hi("insurance") && activeStep !== null} dimmed={dim("insurance")} />

              {/* CCP1 - inside gold box */}
              <RRect id="ccp1" x={460} y={160} w={165} h={50} label="Central Clearing" sub="Party 1" colors={C.green}
                active={hi("ccp1") && activeStep !== null} dimmed={dim("ccp1")} />

              {/* Exchange - inside gold box */}
              <RRect id="exchange" x={470} y={80} w={120} h={42} label="Exchange" colors={C.gold}
                active={hi("exchange") && activeStep !== null} dimmed={dim("exchange")} />

              {/* Market Maker - purple, right of gold box */}
              <Oval id="market-maker" cx={770} cy={100} rx={70} ry={30} label="Market Maker" colors={C.purple}
                active={hi("market-maker") && activeStep !== null} dimmed={dim("market-maker")} />

              {/* Bank - top right, in gold box */}
              <RRect id="bank-top" x={885} y={80} w={120} h={42} label="Bank" colors={C.gold}
                active={hi("bank-top") && activeStep !== null} dimmed={dim("bank-top")} />

              {/* Warehouse - center, green */}
              <RRect id="warehouse" x={450} y={355} w={120} h={50} label="Warehouse" colors={C.green}
                active={hi("warehouse") && activeStep !== null} dimmed={dim("warehouse")} />

              {/* Institutional Custody - large green center */}
              <RRect id="inst-custody" x={700} y={345} w={160} h={65} label="Institutional" sub="Custody" colors={C.green}
                active={hi("inst-custody") && activeStep !== null} dimmed={dim("inst-custody")} />

              {/* Bank - center right */}
              <RRect id="bank-center" x={900} y={355} w={110} h={50} label="Bank" colors={C.gold}
                active={hi("bank-center") && activeStep !== null} dimmed={dim("bank-center")} />

              {/* Oracle - purple oval, top right */}
              <Oval id="oracle" cx={1120} cy={140} rx={55} ry={28} label="Oracle" colors={C.purple}
                active={hi("oracle") && activeStep !== null} dimmed={dim("oracle")} />

              {/* Tokenization Platform - purple */}
              <RRect id="tokenization" x={1080} y={335} w={160} h={65} label="Tokenization" sub="Platform" colors={C.purple}
                active={hi("tokenization") && activeStep !== null} dimmed={dim("tokenization")} />

              {/* Buyer - far right, green */}
              <RRect id="buyer" x={1280} y={355} w={90} h={50} label="Buyer" colors={C.green}
                active={hi("buyer") && activeStep !== null} dimmed={dim("buyer")} />
            </svg>
          </div>
        </ScrollReveal>

        {/* STEP SELECTOR */}
        <ScrollReveal delay={0.2}>
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50">Select a step to explore</span>
              <div className="flex items-center gap-2">
                <button onClick={() => goTo("prev")} disabled={activeStep === null || activeStep === 0}
                  className="p-2 rounded-lg border border-border bg-white text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.95]">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => goTo("next")} disabled={activeStep === steps.length - 1}
                  className="p-2 rounded-lg border border-border bg-white text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.95]">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 mb-6">
              {steps.map((s, i) => (
                <button key={s.step} onClick={() => setActiveStep(activeStep === i ? null : i)}
                  className={`px-3 py-3 rounded-lg text-sm font-sans font-medium transition-all duration-200 active:scale-[0.96] ${
                    activeStep === i
                      ? "bg-[hsl(var(--green-accent))] text-white shadow-sm"
                      : "bg-white border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                  }`}>
                  <span className="block text-xs opacity-60">Step</span>{s.step}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeStep !== null && (
                <motion.div key={activeStep}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 md:p-10 rounded-2xl border border-[hsl(var(--green-accent))]/15 bg-white shadow-sm">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="text-xs font-sans font-semibold text-[hsl(var(--green-accent))] uppercase tracking-wider">Step {steps[activeStep].step}</span>
                      <h3 className="text-2xl font-serif text-foreground mt-1">{steps[activeStep].title}</h3>
                    </div>
                    <button onClick={() => setActiveStep(null)} className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <div className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50 mb-3">Participants</div>
                      <div className="flex flex-wrap gap-2">
                        {steps[activeStep].participants.map(p => (
                          <span key={p} className="text-xs font-sans px-3 py-1.5 rounded-full bg-[hsl(var(--green-light))] text-[hsl(var(--green-accent))]">{p}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50 mb-3">Description</div>
                      <p className="text-sm font-sans text-muted-foreground leading-relaxed">{steps[activeStep].description}</p>
                    </div>
                    <div>
                      <div className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50 mb-3">Output</div>
                      <p className="text-sm font-sans text-[hsl(var(--green-accent))] font-semibold leading-relaxed">{steps[activeStep].output}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {activeStep === null && (
              <div className="p-8 rounded-2xl border border-border bg-white/60 text-center">
                <p className="text-sm font-sans text-muted-foreground">Click a step above to explore the complete infrastructure flow</p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default InfrastructureFlow;
