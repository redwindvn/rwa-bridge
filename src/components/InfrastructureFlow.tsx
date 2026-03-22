import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/* ═══════════════════════════════════════════
   COLORS — Green=Physical, Gold=Digital, Purple=Blockchain
   ═══════════════════════════════════════════ */
const C = {
  green: { fill: "#2E7D32", stroke: "#1B5E20", text: "#fff" },
  greenLight: { fill: "#4CAF50", stroke: "#2E7D32", text: "#fff" },
  gold: { fill: "#F9A825", stroke: "#F57F17", text: "#333" },
  goldLight: { fill: "#FFD54F", stroke: "#F9A825", text: "#333" },
  purple: { fill: "#5E35B1", stroke: "#4527A0", text: "#fff" },
  purpleLight: { fill: "#7E57C2", stroke: "#5E35B1", text: "#fff" },
  diamond: { fill: "#4A148C", stroke: "#311B92", text: "#fff" },
  diamondGreen: { fill: "#1B5E20", stroke: "#0D3B0E", text: "#fff" },
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
    step: 0, title: "Enterprise Verification (KYB)",
    participants: ["Seller", "Buyer", "KYB Center"],
    highlightIds: ["kyb-l", "kyb-r", "seller", "seller-w", "buyer", "buyer-w"],
    connectionIds: ["c0a", "c0b"],
    description: "Before any activity, both seller and buyer complete Know Your Business verification. This is a permissioned system — no KYB, no access.",
    output: "Membership status + linked custody wallet",
  },
  {
    step: 1, title: "Inspection & Certification",
    participants: ["Seller", "Inspector (SGS)", "Traceability (Agrichain)"],
    highlightIds: ["seller", "inspector", "cert", "trace"],
    connectionIds: ["c1a", "c1b", "c1c"],
    description: "Seller prepares export lot. SGS Vietnam conducts independent quality inspection (moisture, broken grain %, impurities). Agrichain records origin data on blockchain for EU compliance (EUDR).",
    output: "Certificate of Quality + Traceability Record",
  },
  {
    step: 2, title: "Ownership Transfer & Warehousing",
    participants: ["Seller", "CCP₁", "Warehouse (Gemadept)"],
    highlightIds: ["seller", "contract", "ccp1", "cert", "warehouse"],
    connectionIds: ["c2a", "c2b"],
    description: "CCP₁ purchases the commodity from Seller, transferring legal ownership. Goods are stored at Gemadept warehouse and 'frozen' — cannot be exported, sold, or pledged outside the system. This creates bankruptcy isolation.",
    output: "Goods in warehouse, owned by CCP₁, immobilized",
  },
  {
    step: 3, title: "Document Aggregation & Digitization",
    participants: ["Warehouse", "Institutional Custody", "Insurance (BIC)", "Bank (MB Bank)"],
    highlightIds: ["warehouse", "inst-cust", "insurance", "bank", "cust-w"],
    connectionIds: ["c3a", "c3b"],
    description: "All documents are aggregated: Warehouse Receipt from Gemadept, Certificate of Quality from SGS, Insurance E-Contract from BIC. Everything flows to MB Bank for digitization and cross-verification.",
    output: "Complete digitized document set at Bank",
  },
  {
    step: 4, title: "Mint Ratio Determination",
    participants: ["Bank (MB Bank)", "Tokenization Platform (GOE)"],
    highlightIds: ["bank", "tokenization", "proof"],
    connectionIds: ["c4a", "c4b", "c4c"],
    description: "Bank and Tokenization Platform determine: (a) Mint Ratio — e.g. 105 tons in warehouse = 100 tokens (5% buffer for overcollateralization), and (b) tokenization fee percentage.",
    output: "Proof of Assets — confirmation that all conditions are met",
  },
  {
    step: 5, title: "Token Minting",
    participants: ["Tokenization Platform", "Institutional Custody", "Seller"],
    highlightIds: ["tokenization", "cust-w", "seller-w", "seller"],
    connectionIds: ["c5a", "c5b"],
    description: "Tokens are minted (e.g. 100 VNRICE-5B tokens, each = 1 ton of 5% broken white rice) directly into the Custody Wallet — NOT into Seller's personal wallet.",
    output: "Tokens visible in Seller's app, held by Institutional Custody",
  },
  {
    step: 6, title: "Trading & Finance",
    participants: ["Seller", "Buyer", "Commercial Bank", "Exchange", "CCP₂", "Oracle"],
    highlightIds: ["seller-w", "comm-bank", "cb-w", "ccp2", "exchange", "exch-w", "buyer-w", "buyer", "oracle"],
    connectionIds: ["c6a", "c6b", "c6c", "c6d", "c6e"],
    description: "Seller has three options: (A) Use tokens as collateral at Commercial Bank for trade finance. (B) Sell tokens on Exchange — CCP₂ provides market making, Oracle feeds real-time price. (C) Hold tokens as balance sheet assets.",
    output: "Seller receives liquidity. Buyer acquires tokens.",
  },
  {
    step: 7, title: "Redemption & Export",
    participants: ["Buyer", "Redeem Gateway", "Tokenization Platform (Burn)", "Warehouse"],
    highlightIds: ["buyer", "redeem", "burn", "tokenization", "warehouse", "cert"],
    connectionIds: ["c7a", "c7b", "c7c", "c7d", "c7e"],
    description: "When Buyer wants physical goods: submit redemption request (minimum 100 tokens = 100 tons). Tokens are sent to Tokenization Platform and permanently burned. Warehouse releases goods for export.",
    output: "Tokens destroyed, goods released from warehouse",
  },
];

/* ═══════════════════════════════════════════
   SVG COMPONENTS
   ═══════════════════════════════════════════ */
const Card = ({ id, x, y, w, h, label, sub, colors, active, dimmed }: {
  id: string; x: number; y: number; w: number; h: number;
  label: string; sub?: string; colors: { fill: string; stroke: string; text: string };
  active: boolean; dimmed: boolean;
}) => (
  <g data-id={id} style={{ opacity: dimmed ? 0.15 : 1, transition: "opacity 0.4s ease" }}>
    <rect x={x} y={y} width={w} height={h} rx={6} fill={colors.fill}
      stroke={active ? "#fff" : colors.stroke} strokeWidth={active ? 2.5 : 1.2}
      filter={active ? "url(#glow)" : undefined} />
    <text x={x + w / 2} y={sub ? y + h / 2 - 5 : y + h / 2 + 4} textAnchor="middle"
      fill={colors.text} fontSize="10.5" fontWeight="700" fontFamily="Inter,sans-serif">{label}</text>
    {sub && <text x={x + w / 2} y={y + h / 2 + 9} textAnchor="middle" fill={colors.text}
      fontSize="8.5" fontFamily="Inter,sans-serif" opacity="0.85">{sub}</text>}
  </g>
);

const Diamond = ({ id, cx, cy, size, label, sub, colors, active, dimmed }: {
  id: string; cx: number; cy: number; size: number;
  label: string; sub?: string; colors: { fill: string; stroke: string; text: string };
  active: boolean; dimmed: boolean;
}) => (
  <g data-id={id} style={{ opacity: dimmed ? 0.15 : 1, transition: "opacity 0.4s ease" }}>
    <polygon points={`${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}`}
      fill={colors.fill} stroke={active ? "#fff" : colors.stroke} strokeWidth={active ? 2.5 : 1.2}
      filter={active ? "url(#glow)" : undefined} />
    <text x={cx} y={sub ? cy - 2 : cy + 4} textAnchor="middle" fill={colors.text}
      fontSize="8.5" fontWeight="700" fontFamily="Inter,sans-serif">{label}</text>
    {sub && <text x={cx} y={cy + 10} textAnchor="middle" fill={colors.text}
      fontSize="7.5" fontFamily="Inter,sans-serif">{sub}</text>}
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
        <rect x={lx - 3} y={ly - 9} width={label.length * 5.2 + 10} height={15} rx={3}
          fill={color} opacity={active ? 0.92 : 0.55} />
        <text x={lx + label.length * 2.6 + 2} y={ly + 2} textAnchor="middle" fill="#fff"
          fontSize="7" fontWeight="600" fontFamily="Inter,sans-serif">{label}</text>
      </g>
    )}
  </g>
);

/* ═══════════════════════════════════════════
   MAIN COMPONENT
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

  /* ── POSITIONS ── */
  // viewBox 1340 x 760
  // Y rows: KYB=25, TopCards=85, Wallets=140, Mid=290, Row3=355, Row4=460, Row5=555, Bottom=660

  return (
    <section id="infrastructure" className="py-24 md:py-32 relative overflow-hidden bg-[hsl(var(--sage))]">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--teal)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--teal)) 1px, transparent 1px)`,
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
          <div className="overflow-x-auto rounded-2xl border border-border bg-white/90 backdrop-blur-sm shadow-sm p-3 md:p-5">
            <svg viewBox="0 0 1340 760" className="w-full min-w-[900px]" style={{ maxHeight: 760 }}>
              <defs>
                <filter id="glow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                {Object.values(C.line).map(c => (
                  <marker key={c} id={`arr-${c.replace('#','')}`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <path d="M0,0 L8,3 L0,6" fill="none" stroke={c} strokeWidth="1.2" />
                  </marker>
                ))}
              </defs>

              {/* ══ GROUP BOXES ══ */}
              <GBox x={38} y={98} w={230} h={62} color={C.gold.stroke} dimmed={dim("seller")} />
              <GBox x={375} y={72} w={175} h={112} color={C.gold.stroke} dimmed={dim("comm-bank")} />
              <GBox x={738} y={68} w={172} h={116} color={C.purple.stroke} dimmed={dim("exchange")} />
              <GBox x={1078} y={98} w={230} h={62} color={C.green.stroke} dimmed={dim("buyer")} />
              <GBox x={570} y={325} w={162} h={125} color={C.gold.stroke} dimmed={dim("cust-w")} />

              {/* ══ CONNECTIONS — all orthogonal ══ */}

              {/* Step 0: KYB → Seller/Buyer (vertical) */}
              <Conn id="c0a" d="M120,58 V98" color={C.line.phy} label="0" lx={107} ly={78} active={ca("c0a")} dimmed={cdim("c0a")} />
              <Conn id="c0b" d="M1220,58 V98" color={C.line.phy} label="0" lx={1207} ly={78} active={ca("c0b")} dimmed={cdim("c0b")} />

              {/* Step 1: Seller → Inspector (down), Inspector → Cert (right), Cert → Trace (down+left) */}
              <Conn id="c1a" d="M88,160 V460" color={C.line.phy} label="1" lx={74} ly={300} active={ca("c1a")} dimmed={cdim("c1a")} />
              <Conn id="c1b" d="M178,480 H240" color={C.line.phy} active={ca("c1b")} dimmed={cdim("c1b")} />
              <Conn id="c1c" d="M270,510 V580 H198" color={C.line.phy} active={ca("c1c")} dimmed={cdim("c1c")} />

              {/* Step 2: Contract→CCP1 (right), Cert→Warehouse (right) */}
              <Conn id="c2a" d="M318,378 H425" color={C.line.dig} label="2. Transfer" lx={340} ly={368} active={ca("c2a")} dimmed={cdim("c2a")} />
              <Conn id="c2b" d="M300,480 H395" color={C.line.phy} label="2. Storage" lx={320} ly={470} active={ca("c2b")} dimmed={cdim("c2b")} />

              {/* Step 3: Warehouse→Custody (up+right), Warehouse→Insurance (down+right) */}
              <Conn id="c3a" d="M460,460 V408 H572" color={C.line.dig} label="3. Invoice" lx={485} ly={430} active={ca("c3a")} dimmed={cdim("c3a")} />
              <Conn id="c3b" d="M460,505 V568 H575" color={C.line.phy} label="3. Contract" lx={485} ly={540} active={ca("c3b")} dimmed={cdim("c3b")} />

              {/* Step 4: Custody→Bank (right+down), Insurance→Bank (right+up), Bank→Token (right) */}
              <Conn id="c4a" d="M732,408 H752 V480 H760" color={C.line.dig} label="4. E-invoice" lx={735} ly={440} active={ca("c4a")} dimmed={cdim("c4a")} />
              <Conn id="c4b" d="M715,568 H780 V505" color={C.line.dig} label="4. E-contract" lx={720} ly={540} active={ca("c4b")} dimmed={cdim("c4b")} />
              <Conn id="c4c" d="M880,480 H900" color={C.line.dig} label="4. Mint Ratio" lx={860} ly={470} active={ca("c4c")} dimmed={cdim("c4c")} />

              {/* Step 5: Token→CustodyWallet (left+up), CustodyWallet→SellerWallet (left+up) */}
              <Conn id="c5a" d="M900,455 H740 V365 H732" color={C.line.blk} dashed label="5. Mint token" lx={790} ly={448} active={ca("c5a")} dimmed={cdim("c5a")} />
              <Conn id="c5b" d="M570,350 H260 V148" color={C.line.blk} dashed label="5. Receive token" lx={370} ly={340} active={ca("c5b")} dimmed={cdim("c5b")} />

              {/* Step 6: Lending, Trading, LP, Exchange→Buyer, Oracle */}
              <Conn id="c6a" d="M268,118 H375" color={C.line.dig} label="6. Lending" lx={295} ly={108} active={ca("c6a")} dimmed={cdim("c6a")} />
              <Conn id="c6b" d="M268,140 V270 H748 V148" color={C.line.dig} label="6. Trading" lx={490} ly={262} active={ca("c6b")} dimmed={cdim("c6b")} />
              <Conn id="c6c" d="M718,145 H748" color={C.line.dig} label="6. LP" lx={722} ly={135} active={ca("c6c")} dimmed={cdim("c6c")} />
              <Conn id="c6d" d="M910,148 H1085" color={C.line.dig} label="6. Trading" lx={970} ly={138} active={ca("c6d")} dimmed={cdim("c6d")} />
              <Conn id="c6e" d="M1112,283 V170 H910" color={C.line.blk} dashed active={ca("c6e")} dimmed={cdim("c6e")} />

              {/* Step 7-8: Redemption */}
              <Conn id="c7a" d="M270,510 V688 H560" color={C.line.phy} label="7. Check data" lx={350} ly={680} active={ca("c7a")} dimmed={cdim("c7a")} />
              <Conn id="c7b" d="M710,682 H900" color={C.line.blk} dashed label="7. Send token" lx={770} ly={672} active={ca("c7b")} dimmed={cdim("c7b")} />
              <Conn id="c7c" d="M710,700 H900" color={C.line.blk} dashed label="9. Execute" lx={775} ly={705} active={ca("c7c")} dimmed={cdim("c7c")} />
              <Conn id="c7d" d="M595,660 V510 H525" color={C.line.phy} label="8. Export" lx={535} ly={580} active={ca("c7d")} dimmed={cdim("c7d")} />
              <Conn id="c7e" d="M1025,697 H1300 V155 H1295" color={C.line.phy} label="8. Shipment" lx={1120} ly={700} active={ca("c7e")} dimmed={cdim("c7e")} />

              {/* ══ ENTITY CARDS ══ */}

              {/* KYB Centers */}
              <Card id="kyb-l" x={62} y={22} w={115} h={36} label="KYB Center" colors={C.green} active={hi("kyb-l") && activeStep===0} dimmed={dim("kyb-l")} />
              <Card id="kyb-r" x={1162} y={22} w={115} h={36} label="KYB Center" colors={C.green} active={hi("kyb-r") && activeStep===0} dimmed={dim("kyb-r")} />

              {/* Seller + Wallet */}
              <Card id="seller" x={45} y={104} w={85} h={50} label="Seller" colors={C.green} active={hi("seller") && activeStep!==null} dimmed={dim("seller")} />
              <Card id="seller-w" x={145} y={110} w={115} h={38} label="Seller Wallet" colors={C.goldLight} active={hi("seller-w") && activeStep!==null} dimmed={dim("seller-w")} />

              {/* Commercial Bank group */}
              <Card id="comm-bank" x={385} y={80} w={155} h={42} label="Commercial" sub="Bank" colors={C.gold} active={hi("comm-bank") && activeStep!==null} dimmed={dim("comm-bank")} />
              <Card id="cb-w" x={385} y={132} w={155} h={40} label="Bank Wallet" colors={C.goldLight} active={hi("cb-w") && activeStep!==null} dimmed={dim("cb-w")} />

              {/* CCP2 */}
              <Card id="ccp2" x={568} y={118} w={150} h={52} label="Central Clearing" sub="Party 2" colors={C.gold} active={hi("ccp2") && activeStep!==null} dimmed={dim("ccp2")} />

              {/* Exchange group */}
              <Card id="exchange" x={748} y={76} w={155} h={38} label="Exchange" colors={C.gold} active={hi("exchange") && activeStep!==null} dimmed={dim("exchange")} />
              <Card id="exch-w" x={748} y={122} w={155} h={48} label="Exchange Wallet" colors={C.goldLight} active={hi("exch-w") && activeStep!==null} dimmed={dim("exch-w")} />

              {/* Buyer + Wallet */}
              <Card id="buyer-w" x={1085} y={110} w={115} h={38} label="Buyer Wallet" colors={C.goldLight} active={hi("buyer-w") && activeStep!==null} dimmed={dim("buyer-w")} />
              <Card id="buyer" x={1212} y={104} w={85} h={50} label="Buyer" colors={C.green} active={hi("buyer") && activeStep!==null} dimmed={dim("buyer")} />

              {/* Oracle */}
              <Card id="oracle" x={1050} y={278} w={125} h={50} label="Oracle" colors={C.purple} active={hi("oracle") && activeStep!==null} dimmed={dim("oracle")} />

              {/* Contract diamond */}
              <Diamond id="contract" cx={285} cy={378} size={34} label="Contract" colors={C.diamond} active={hi("contract") && activeStep!==null} dimmed={dim("contract")} />

              {/* CCP1 */}
              <Card id="ccp1" x={425} y={356} w={140} h={50} label="Central Clearing" sub="Party 1" colors={C.green} active={hi("ccp1") && activeStep!==null} dimmed={dim("ccp1")} />

              {/* Custody Wallet + Institutional Custody */}
              <Card id="cust-w" x={580} y={333} w={145} h={40} label="Custody Wallet" colors={C.purple} active={hi("cust-w") && activeStep!==null} dimmed={dim("cust-w")} />
              <Card id="inst-cust" x={580} y={385} w={145} h={50} label="Institutional" sub="Custody" colors={C.purpleLight} active={hi("inst-cust") && activeStep!==null} dimmed={dim("inst-cust")} />

              {/* Inspector */}
              <Card id="inspector" x={68} y={460} w={110} h={42} label="Inspector" sub="SGS" colors={C.green} active={hi("inspector") && activeStep!==null} dimmed={dim("inspector")} />

              {/* Certification diamond */}
              <Diamond id="cert" cx={270} cy={480} size={30} label="Certification" colors={C.diamondGreen} active={hi("cert") && activeStep!==null} dimmed={dim("cert")} />

              {/* Warehouse */}
              <Card id="warehouse" x={395} y={458} w={130} h={48} label="Warehouse" sub="Gemadept" colors={C.green} active={hi("warehouse") && activeStep!==null} dimmed={dim("warehouse")} />

              {/* Bank */}
              <Card id="bank" x={760} y={458} w={120} h={48} label="Bank" sub="MB Bank" colors={C.gold} active={hi("bank") && activeStep!==null} dimmed={dim("bank")} />

              {/* Tokenization Platform */}
              <Card id="tokenization" x={900} y={432} w={155} h={55} label="Tokenization" sub="Platform" colors={C.purple} active={hi("tokenization") && activeStep!==null} dimmed={dim("tokenization")} />

              {/* Traceability */}
              <Card id="trace" x={68} y={575} w={130} h={40} label="Traceability" sub="Agrichain" colors={C.green} active={hi("trace") && activeStep!==null} dimmed={dim("trace")} />

              {/* Insurance */}
              <Card id="insurance" x={575} y={548} w={140} h={46} label="Insurance" sub="BIC" colors={C.green} active={hi("insurance") && activeStep!==null} dimmed={dim("insurance")} />

              {/* Proof of Assets diamond */}
              <Diamond id="proof" cx={978} cy={560} size={38} label="Proof of" sub="Assets" colors={C.diamond} active={hi("proof") && activeStep!==null} dimmed={dim("proof")} />

              {/* Redeem Gateway */}
              <Card id="redeem" x={560} y={662} w={150} h={55} label="Redeem" sub="Gateway" colors={C.purple} active={hi("redeem") && activeStep!==null} dimmed={dim("redeem")} />

              {/* Burn */}
              <Card id="burn" x={900} y={674} w={125} h={48} label="Burn" colors={C.purple} active={hi("burn") && activeStep!==null} dimmed={dim("burn")} />
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

            <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-6">
              {steps.map(s => (
                <button key={s.step} onClick={() => setActiveStep(activeStep === s.step ? null : s.step)}
                  className={`px-3 py-3 rounded-lg text-sm font-sans font-medium transition-all duration-200 active:scale-[0.96] ${
                    activeStep === s.step
                      ? "bg-teal-DEFAULT text-white shadow-sm"
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
                  className="p-8 md:p-10 rounded-2xl border border-border bg-white shadow-sm">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="text-xs font-sans font-semibold text-teal-DEFAULT uppercase tracking-wider">Step {steps[activeStep].step}</span>
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
                          <span key={p} className="text-xs font-sans px-3 py-1.5 rounded-full bg-muted text-muted-foreground">{p}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50 mb-3">Description</div>
                      <p className="text-sm font-sans text-muted-foreground leading-relaxed">{steps[activeStep].description}</p>
                    </div>
                    <div>
                      <div className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50 mb-3">Output</div>
                      <p className="text-sm font-sans text-teal-DEFAULT font-semibold leading-relaxed">{steps[activeStep].output}</p>
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
