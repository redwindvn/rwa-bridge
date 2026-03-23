import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import AnimatedBlockchainBg from "./AnimatedBlockchainBg";

/* ═══════════════════════════════════════════
   COLORS — Green=Physical, Gold=Digital, Purple=Blockchain
   ═══════════════════════════════════════════ */
const C = {
  green: { fill: "#2E7D32", stroke: "#1B5E20", text: "#fff" },
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
    highlightIds: ["warehouse", "inst-cust", "insurance", "bank"],
    connectionIds: ["c3a", "c3b"],
    description: "All documents are aggregated: Warehouse Receipt from Gemadept, Certificate of Quality from SGS, Insurance E-Contract from BIC. Everything flows to MB Bank for digitization and cross-verification.",
    output: "Complete digitized document set at Bank",
  },
  {
    step: 4, title: "Mint Ratio Determination",
    participants: ["Bank (MB Bank)", "Tokenization Platform (GOE)"],
    highlightIds: ["bank", "tokenization", "proof", "inst-cust"],
    connectionIds: ["c4a", "c4b", "c4c"],
    description: "Bank and Tokenization Platform determine: (a) Mint Ratio — e.g. 105 tons in warehouse = 100 tokens (5% buffer for overcollateralization), and (b) tokenization fee percentage.",
    output: "Proof of Assets — confirmation that all conditions are met",
  },
  {
    step: 5, title: "Token Minting",
    participants: ["Tokenization Platform", "Custody Wallet", "Seller"],
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
      fill={colors.text} fontSize="10" fontWeight="700" fontFamily="Inter,sans-serif">{label}</text>
    {sub && <text x={x + w / 2} y={y + h / 2 + 9} textAnchor="middle" fill={colors.text}
      fontSize="8" fontFamily="Inter,sans-serif" opacity="0.85">{sub}</text>}
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
      fontSize="8" fontWeight="700" fontFamily="Inter,sans-serif">{label}</text>
    {sub && <text x={cx} y={cy + 10} textAnchor="middle" fill={colors.text}
      fontSize="7" fontFamily="Inter,sans-serif">{sub}</text>}
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
        <rect x={lx - 3} y={ly - 9} width={label.length * 5 + 10} height={15} rx={3}
          fill={color} opacity={active ? 0.92 : 0.55} />
        <text x={lx + label.length * 2.5 + 2} y={ly + 2} textAnchor="middle" fill="#fff"
          fontSize="7" fontWeight="600" fontFamily="Inter,sans-serif">{label}</text>
      </g>
    )}
  </g>
);

/* ═══════════════════════════════════════════
   MAIN COMPONENT — layout matches RWA_Hub_Flow_update.pdf exactly
   viewBox 1400 x 820
   
   Row layout (Y coords):
   - KYB row: y=20
   - Top entities (Seller/Buyer/CommBank/Exchange): y=80
   - Wallets: y=130  
   - Step 6 lines: y=270
   - Custody wallet row: y=340
   - Middle row (Contract/CCP1/InstCustody): y=420
   - Inspector/Cert/Warehouse/Bank row: y=500
   - Insurance/Traceability row: y=590
   - Export/Redeem row: y=700
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
            <svg viewBox="0 0 1400 820" className="w-full min-w-[900px]" style={{ maxHeight: 820 }}>
              <defs>
                <filter id="glow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                {Object.values(C.line).map(c => (
                  <marker key={c} id={`arr-${c.replace('#','')}`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <path d="M0,0 L8,3 L0,6" fill="none" stroke={c} strokeWidth="1.2" />
                  </marker>
                ))}
              </defs>

              {/* ══ GROUP BOXES ══ */}
              {/* Seller group */}
              <GBox x={48} y={78} w={220} h={100} color={C.gold.stroke} dimmed={dim("seller")} />
              {/* Commercial Bank group */}
              <GBox x={395} y={60} w={170} h={125} color={C.gold.stroke} dimmed={dim("comm-bank")} />
              {/* Exchange group */}
              <GBox x={780} y={55} w={165} h={130} color={C.purple.stroke} dimmed={dim("exchange")} />
              {/* Buyer group */}
              <GBox x={1140} y={78} w={220} h={100} color={C.gold.stroke} dimmed={dim("buyer")} />
              {/* Custody group */}
              <GBox x={580} y={325} w={165} h={130} color={C.purple.stroke} dimmed={dim("cust-w")} />
              {/* Tokenization group */}
              <GBox x={940} y={470} w={170} h={175} color={C.purple.stroke} dimmed={dim("tokenization")} />

              {/* ══ CONNECTIONS — all orthogonal ══ */}

              {/* Step 0: KYB → Seller/Buyer */}
              <Conn id="c0a" d="M130,55 V78" color={C.line.phy} label="0" lx={117} ly={65} active={ca("c0a")} dimmed={cdim("c0a")} />
              <Conn id="c0b" d="M1280,55 V78" color={C.line.phy} label="0" lx={1267} ly={65} active={ca("c0b")} dimmed={cdim("c0b")} />

              {/* Step 1: Seller→Inspector (down), Inspector→Cert, Cert→Trace */}
              <Conn id="c1a" d="M100,178 V510" color={C.line.phy} label="1" lx={86} ly={340} active={ca("c1a")} dimmed={cdim("c1a")} />
              <Conn id="c1b" d="M195,525 H260" color={C.line.phy} active={ca("c1b")} dimmed={cdim("c1b")} />
              <Conn id="c1c" d="M310,555 V610 H210" color={C.line.phy} active={ca("c1c")} dimmed={cdim("c1c")} />

              {/* Step 2: Contract→CCP1, Cert→Warehouse */}
              <Conn id="c2a" d="M345,435 H440" color={C.line.dig} label="2. Transfer Ownership" lx={348} ly={425} active={ca("c2a")} dimmed={cdim("c2a")} />
              <Conn id="c2b" d="M345,525 H440" color={C.line.phy} label="2. Storage" lx={365} ly={515} active={ca("c2b")} dimmed={cdim("c2b")} />

              {/* Step 3: Warehouse→InstCustody (Invoice), Warehouse→Insurance (Contract) */}
              <Conn id="c3a" d="M520,510 H580 V440 H590" color={C.line.dig} label="3. Invoice" lx={530} ly={475} active={ca("c3a")} dimmed={cdim("c3a")} />
              <Conn id="c3b" d="M500,545 V600 H580" color={C.line.phy} label="3. Contract" lx={510} ly={575} active={ca("c3b")} dimmed={cdim("c3b")} />

              {/* Step 4: InstCustody→Bank (E-invoice), Insurance→Bank (E-contract), Bank→Tokenization */}
              <Conn id="c4a" d="M745,435 H800" color={C.line.dig} label="4. E-invoice" lx={748} ly={425} active={ca("c4a")} dimmed={cdim("c4a")} />
              <Conn id="c4b" d="M730,610 H800 V535" color={C.line.dig} label="4. E-contract" lx={733} ly={600} active={ca("c4b")} dimmed={cdim("c4b")} />
              <Conn id="c4c" d="M885,515 H940" color={C.line.dig} label="4. Request" lx={888} ly={505} active={ca("c4c")} dimmed={cdim("c4c")} />

              {/* Step 5: Tokenization→CustodyWallet (Mint), CustodyWallet→SellerWallet (Receive) */}
              <Conn id="c5a" d="M940,490 H760 V365 H745" color={C.line.blk} dashed label="5. Mint token" lx={800} ly={480} active={ca("c5a")} dimmed={cdim("c5a")} />
              <Conn id="c5b" d="M580,365 H270 V155 H260" color={C.line.blk} dashed label="5. Receive token" lx={390} ly={355} active={ca("c5b")} dimmed={cdim("c5b")} />

              {/* Step 6: Lending, Trading paths, LP, Exchange→Buyer, Oracle */}
              <Conn id="c6a" d="M268,130 V280 H395" color={C.line.dig} label="6. Lending" lx={300} ly={270} active={ca("c6a")} dimmed={cdim("c6a")} />
              <Conn id="c6b" d="M268,145 V300 H620 V300 H790" color={C.line.dig} label="6. Trading" lx={500} ly={290} active={ca("c6b")} dimmed={cdim("c6b")} />
              <Conn id="c6c" d="M730,130 H780" color={C.line.dig} label="6. LP" lx={738} ly={120} active={ca("c6c")} dimmed={cdim("c6c")} />
              <Conn id="c6d" d="M945,130 H1140" color={C.line.dig} label="6. Trading" lx={1010} ly={120} active={ca("c6d")} dimmed={cdim("c6d")} />
              <Conn id="c6e" d="M1150,300 V185 H945" color={C.line.blk} dashed active={ca("c6e")} dimmed={cdim("c6e")} />

              {/* Step 7-8: Redemption paths */}
              <Conn id="c7a" d="M310,555 V735 H440" color={C.line.phy} label="7. Check data" lx={320} ly={725} active={ca("c7a")} dimmed={cdim("c7a")} />
              <Conn id="c7b" d="M570,730 H940" color={C.line.blk} dashed label="7. Send token" lx={700} ly={720} active={ca("c7b")} dimmed={cdim("c7b")} />
              <Conn id="c7c" d="M570,750 H940" color={C.line.blk} dashed label="9. Execute" lx={700} ly={755} active={ca("c7c")} dimmed={cdim("c7c")} />
              <Conn id="c7d" d="M480,710 V555 H465" color={C.line.phy} label="8. Export" lx={468} ly={630} active={ca("c7d")} dimmed={cdim("c7d")} />
              <Conn id="c7e" d="M1060,745 H1350 V175 H1340" color={C.line.phy} label="8. Shipment" lx={1160} ly={750} active={ca("c7e")} dimmed={cdim("c7e")} />

              {/* ══ ENTITY CARDS ══ */}

              {/* KYB Centers */}
              <Card id="kyb-l" x={72} y={18} w={115} h={36} label="KYB Center" colors={C.green} active={hi("kyb-l") && activeStep===0} dimmed={dim("kyb-l")} />
              <Card id="kyb-r" x={1222} y={18} w={115} h={36} label="KYB Center" colors={C.green} active={hi("kyb-r") && activeStep===0} dimmed={dim("kyb-r")} />

              {/* Seller + Wallet */}
              <Card id="seller" x={55} y={88} w={90} h={48} label="Seller" colors={C.green} active={hi("seller") && activeStep!==null} dimmed={dim("seller")} />
              <Card id="seller-w" x={155} y={95} w={105} h={36} label="Seller Wallet" colors={C.goldLight} active={hi("seller-w") && activeStep!==null} dimmed={dim("seller-w")} />

              {/* Commercial Bank group */}
              <Card id="comm-bank" x={405} y={68} w={150} h={42} label="Commercial" sub="Bank" colors={C.gold} active={hi("comm-bank") && activeStep!==null} dimmed={dim("comm-bank")} />
              <Card id="cb-w" x={405} y={118} w={150} h={36} label="Commercial Bank Wallet" colors={C.goldLight} active={hi("cb-w") && activeStep!==null} dimmed={dim("cb-w")} />

              {/* CCP2 */}
              <Card id="ccp2" x={620} y={85} w={140} h={55} label="Central Clearing" sub="Party 2" colors={C.gold} active={hi("ccp2") && activeStep!==null} dimmed={dim("ccp2")} />

              {/* Exchange group */}
              <Card id="exchange" x={790} y={63} w={145} h={38} label="Exchange" colors={C.gold} active={hi("exchange") && activeStep!==null} dimmed={dim("exchange")} />
              <Card id="exch-w" x={790} y={110} w={145} h={42} label="Exchange Wallet" colors={C.goldLight} active={hi("exch-w") && activeStep!==null} dimmed={dim("exch-w")} />

              {/* Buyer + Wallet */}
              <Card id="buyer-w" x={1148} y={95} w={105} h={36} label="Buyer Wallet" colors={C.goldLight} active={hi("buyer-w") && activeStep!==null} dimmed={dim("buyer-w")} />
              <Card id="buyer" x={1265} y={88} w={85} h={48} label="Buyer" colors={C.green} active={hi("buyer") && activeStep!==null} dimmed={dim("buyer")} />

              {/* Oracle — circle */}
              <g data-id="oracle" style={{ opacity: dim("oracle") ? 0.15 : 1, transition: "opacity 0.4s ease" }}>
                <circle cx={1140} cy={310} r={42} fill={C.purple.fill} stroke={hi("oracle") && activeStep!==null ? "#fff" : C.purple.stroke} strokeWidth={hi("oracle") && activeStep!==null ? 2.5 : 1.2} filter={hi("oracle") && activeStep!==null ? "url(#glow)" : undefined} />
                <text x={1140} y={314} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700" fontFamily="Inter,sans-serif">Oracle</text>
              </g>

              {/* Custody Wallet */}
              <Card id="cust-w" x={590} y={335} w={145} h={40} label="Custody Wallet" colors={C.purple} active={hi("cust-w") && activeStep!==null} dimmed={dim("cust-w")} />
              {/* Institutional Custody */}
              <Card id="inst-cust" x={590} y={390} w={145} h={50} label="Institutional" sub="Custody" colors={C.purpleLight} active={hi("inst-cust") && activeStep!==null} dimmed={dim("inst-cust")} />

              {/* Contract diamond */}
              <Diamond id="contract" cx={310} cy={435} size={34} label="Contract" colors={C.diamond} active={hi("contract") && activeStep!==null} dimmed={dim("contract")} />

              {/* CCP1 */}
              <Card id="ccp1" x={440} y={410} w={140} h={50} label="Central Clearing" sub="Party 1" colors={C.green} active={hi("ccp1") && activeStep!==null} dimmed={dim("ccp1")} />

              {/* Inspector */}
              <Card id="inspector" x={75} y={500} w={120} h={45} label="Inspector" sub="SGS" colors={C.green} active={hi("inspector") && activeStep!==null} dimmed={dim("inspector")} />

              {/* Certification diamond */}
              <Diamond id="cert" cx={310} cy={525} size={32} label="Certification" colors={C.diamondGreen} active={hi("cert") && activeStep!==null} dimmed={dim("cert")} />

              {/* Warehouse */}
              <Card id="warehouse" x={440} y={500} w={125} h={48} label="Warehouse" sub="Gemadept" colors={C.green} active={hi("warehouse") && activeStep!==null} dimmed={dim("warehouse")} />

              {/* Bank */}
              <Card id="bank" x={800} y={495} w={120} h={48} label="Bank" sub="MB Bank" colors={C.gold} active={hi("bank") && activeStep!==null} dimmed={dim("bank")} />

              {/* Tokenization Platform */}
              <Card id="tokenization" x={950} y={480} w={150} h={55} label="Tokenization" sub="Platform" colors={C.purple} active={hi("tokenization") && activeStep!==null} dimmed={dim("tokenization")} />

              {/* Proof of Assets diamond */}
              <Diamond id="proof" cx={1025} cy={580} size={36} label="Proof of" sub="Assets" colors={C.diamond} active={hi("proof") && activeStep!==null} dimmed={dim("proof")} />

              {/* Traceability */}
              <Card id="trace" x={75} y={600} w={135} h={40} label="Traceability" sub="Agrichain" colors={C.green} active={hi("trace") && activeStep!==null} dimmed={dim("trace")} />

              {/* Insurance */}
              <Card id="insurance" x={580} y={588} w={150} h={46} label="Insurance" sub="BIC" colors={C.green} active={hi("insurance") && activeStep!==null} dimmed={dim("insurance")} />

              {/* Burn */}
              <Card id="burn" x={960} y={630} w={130} h={48} label="Burn" colors={C.purple} active={hi("burn") && activeStep!==null} dimmed={dim("burn")} />

              {/* Redeem Gateway */}
              <Card id="redeem" x={440} y={710} w={130} h={55} label="Redeem" sub="Gateway" colors={C.purple} active={hi("redeem") && activeStep!==null} dimmed={dim("redeem")} />

              {/* 7. Oracle Update label near warehouse */}
              <text x={508} y={575} fontSize="7" fill={C.line.dig} fontFamily="Inter,sans-serif" fontWeight="600" opacity={0.5}>7. Oracle Update</text>
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
