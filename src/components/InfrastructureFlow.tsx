import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/* ═══════════════════════════════════════════
   COLORS matching the reference diagram
   Green = Physical, Gold/Yellow = Digital, Purple = Blockchain
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
  line: { physical: "#2E7D32", digital: "#F9A825", blockchain: "#7E57C2", gray: "#9E9E9E" },
};

/* ═══════════════════════════════════════════
   STEP DATA
   ═══════════════════════════════════════════ */
interface StepData {
  step: number;
  title: string;
  participants: string[];
  highlightIds: string[];
  connectionIds: string[];
  description: string;
  output: string;
}

const steps: StepData[] = [
  {
    step: 0, title: "Enterprise Verification (KYB)",
    participants: ["Seller", "Buyer", "KYB Center"],
    highlightIds: ["kyb-left", "kyb-right", "seller", "seller-wallet", "buyer", "buyer-wallet"],
    connectionIds: ["c-kyb-seller", "c-kyb-buyer"],
    description: "Before any activity, both seller and buyer complete Know Your Business verification. This is a permissioned system — no KYB, no access.",
    output: "Membership status + linked custody wallet",
  },
  {
    step: 1, title: "Inspection & Certification",
    participants: ["Seller", "Inspector (SGS)", "Traceability (Agrichain)"],
    highlightIds: ["seller", "inspector", "certification", "traceability"],
    connectionIds: ["c-seller-inspect", "c-inspect-cert", "c-cert-trace"],
    description: "Seller prepares export lot. SGS Vietnam conducts independent quality inspection (moisture, broken grain %, impurities). Agrichain records origin data on blockchain for EU compliance (EUDR).",
    output: "Certificate of Quality + Traceability Record",
  },
  {
    step: 2, title: "Ownership Transfer & Warehousing",
    participants: ["Seller", "CCP₁", "Warehouse (Gemadept)"],
    highlightIds: ["seller", "contract", "ccp1", "certification", "warehouse"],
    connectionIds: ["c-seller-contract", "c-contract-ccp1", "c-cert-warehouse"],
    description: "CCP₁ purchases the commodity from Seller, transferring legal ownership. Goods are stored at Gemadept warehouse and 'frozen' — cannot be exported, sold, or pledged outside the system. This creates bankruptcy isolation.",
    output: "Goods in warehouse, owned by CCP₁, immobilized",
  },
  {
    step: 3, title: "Document Aggregation & Digitization",
    participants: ["Warehouse", "Institutional Custody", "Insurance (BIC)", "Bank (MB Bank)"],
    highlightIds: ["warehouse", "inst-custody", "insurance", "bank", "custody-wallet"],
    connectionIds: ["c-warehouse-invoice", "c-warehouse-insurance", "c-insurance-bank", "c-custody-bank"],
    description: "All documents are aggregated: Warehouse Receipt from Gemadept, Certificate of Quality from SGS, Insurance E-Contract from BIC. Everything flows to MB Bank for digitization and cross-verification.",
    output: "Complete digitized document set at Bank",
  },
  {
    step: 4, title: "Mint Ratio Determination",
    participants: ["Bank (MB Bank)", "Tokenization Platform (GOE)"],
    highlightIds: ["bank", "tokenization", "proof-of-assets"],
    connectionIds: ["c-bank-token", "c-token-proof"],
    description: "Bank and Tokenization Platform determine: (a) Mint Ratio — e.g. 105 tons in warehouse = 100 tokens (5% buffer for overcollateralization), and (b) tokenization fee percentage.",
    output: "Proof of Assets — confirmation that all conditions are met",
  },
  {
    step: 5, title: "Token Minting",
    participants: ["Tokenization Platform", "Institutional Custody", "Seller"],
    highlightIds: ["tokenization", "custody-wallet", "seller-wallet", "seller"],
    connectionIds: ["c-token-mint", "c-custody-receive"],
    description: "Tokens are minted (e.g. 100 VNRICE-5B tokens, each = 1 ton of 5% broken white rice) directly into the Custody Wallet — NOT into Seller's personal wallet.",
    output: "Tokens visible in Seller's app, held by Institutional Custody",
  },
  {
    step: 6, title: "Trading & Finance",
    participants: ["Seller", "Buyer", "Commercial Bank", "Exchange", "CCP₂", "Oracle"],
    highlightIds: ["seller-wallet", "commercial-bank", "cb-wallet", "ccp2", "exchange", "exchange-wallet", "buyer-wallet", "buyer", "oracle"],
    connectionIds: ["c-lending", "c-trading", "c-ccp2-lp", "c-exchange-buyer", "c-oracle-exchange"],
    description: "Seller has three options: (A) Use tokens as collateral at Commercial Bank for trade finance. (B) Sell tokens on Exchange — CCP₂ provides market making, Oracle feeds real-time price. (C) Hold tokens as balance sheet assets.",
    output: "Seller receives liquidity. Buyer acquires tokens.",
  },
  {
    step: 7, title: "Redemption & Export",
    participants: ["Buyer", "Redeem Gateway", "Tokenization Platform (Burn)", "Warehouse"],
    highlightIds: ["buyer", "redeem", "burn", "tokenization", "warehouse", "inspector"],
    connectionIds: ["c-redeem-check", "c-redeem-send", "c-redeem-execute", "c-redeem-export", "c-burn-ship"],
    description: "When Buyer wants physical goods: submit redemption request (minimum 100 tokens = 100 tons). Tokens are sent to Tokenization Platform and permanently burned. Warehouse releases goods for export.",
    output: "Tokens destroyed, goods released from warehouse",
  },
];

/* ═══════════════════════════════════════════
   SVG FLOW DIAGRAM — matches reference exactly
   ═══════════════════════════════════════════ */

/** Rounded rect entity card */
const Card = ({
  id, x, y, w, h, label, sublabel, colors, active, dimmed,
}: {
  id: string; x: number; y: number; w: number; h: number;
  label: string; sublabel?: string;
  colors: { fill: string; stroke: string; text: string };
  active: boolean; dimmed: boolean;
}) => (
  <g
    data-id={id}
    style={{
      opacity: dimmed ? 0.15 : 1,
      transition: "opacity 0.4s ease",
    }}
  >
    <rect
      x={x} y={y} width={w} height={h} rx={6}
      fill={colors.fill}
      stroke={active ? "#fff" : colors.stroke}
      strokeWidth={active ? 3 : 1.5}
      filter={active ? "url(#glow)" : undefined}
    />
    <text x={x + w / 2} y={sublabel ? y + h / 2 - 5 : y + h / 2 + 4} textAnchor="middle" fill={colors.text} fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">
      {label}
    </text>
    {sublabel && (
      <text x={x + w / 2} y={y + h / 2 + 10} textAnchor="middle" fill={colors.text} fontSize="9" fontFamily="Inter, sans-serif" opacity="0.85">
        {sublabel}
      </text>
    )}
  </g>
);

/** Diamond shape */
const Diamond = ({
  id, cx, cy, size, label, sublabel, colors, active, dimmed,
}: {
  id: string; cx: number; cy: number; size: number;
  label: string; sublabel?: string;
  colors: { fill: string; stroke: string; text: string };
  active: boolean; dimmed: boolean;
}) => {
  const s = size;
  return (
    <g data-id={id} style={{ opacity: dimmed ? 0.15 : 1, transition: "opacity 0.4s ease" }}>
      <polygon
        points={`${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`}
        fill={colors.fill} stroke={active ? "#fff" : colors.stroke} strokeWidth={active ? 3 : 1.5}
        filter={active ? "url(#glow)" : undefined}
      />
      <text x={cx} y={sublabel ? cy - 2 : cy + 4} textAnchor="middle" fill={colors.text} fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif">
        {label}
      </text>
      {sublabel && (
        <text x={cx} y={cy + 10} textAnchor="middle" fill={colors.text} fontSize="8" fontFamily="Inter, sans-serif">
          {sublabel}
        </text>
      )}
    </g>
  );
};

/** Grouped box (yellow/purple border around related entities) */
const GroupBox = ({
  x, y, w, h, color, dimmed,
}: {
  x: number; y: number; w: number; h: number; color: string; dimmed: boolean;
}) => (
  <rect
    x={x} y={y} width={w} height={h} rx={8}
    fill="none" stroke={color} strokeWidth={2} strokeDasharray="6,3"
    style={{ opacity: dimmed ? 0.1 : 0.5, transition: "opacity 0.4s ease" }}
  />
);

/** Connection line with label */
const Conn = ({
  id, d, color, dashed, label, labelX, labelY, active, dimmed,
}: {
  id: string; d: string; color: string; dashed?: boolean;
  label?: string; labelX?: number; labelY?: number;
  active: boolean; dimmed: boolean;
}) => (
  <g data-conn={id} style={{ opacity: dimmed ? 0.08 : active ? 1 : 0.35, transition: "opacity 0.4s ease" }}>
    {active ? (
      <motion.path
        d={d} fill="none" stroke={color} strokeWidth={2}
        strokeDasharray={dashed ? "8,4" : "none"}
        markerEnd={`url(#arrow-${color.replace('#', '')})`}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    ) : (
      <path
        d={d} fill="none" stroke={color} strokeWidth={1.5}
        strokeDasharray={dashed ? "8,4" : "none"}
        markerEnd={`url(#arrow-${color.replace('#', '')})`}
      />
    )}
    {label && labelX !== undefined && labelY !== undefined && (
      <g>
        <rect x={labelX - 2} y={labelY - 9} width={label.length * 5.5 + 8} height={14} rx={3} fill={color} opacity={active ? 0.9 : 0.6} />
        <text x={labelX + label.length * 2.75 + 2} y={labelY + 1} textAnchor="middle" fill="#fff" fontSize="7.5" fontWeight="600" fontFamily="Inter, sans-serif">
          {label}
        </text>
      </g>
    )}
  </g>
);

const InfrastructureFlow = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const isHighlighted = useCallback(
    (id: string) => activeStep === null || steps[activeStep].highlightIds.includes(id),
    [activeStep]
  );
  const isConnActive = useCallback(
    (id: string) => activeStep !== null && steps[activeStep].connectionIds.includes(id),
    [activeStep]
  );
  const isDimmed = useCallback(
    (id: string) => activeStep !== null && !steps[activeStep].highlightIds.includes(id),
    [activeStep]
  );
  const isConnDimmed = useCallback(
    (id: string) => activeStep !== null && !steps[activeStep].connectionIds.includes(id),
    [activeStep]
  );

  const goToStep = (dir: "prev" | "next") => {
    if (activeStep === null) { setActiveStep(0); return; }
    const next = dir === "prev" ? activeStep - 1 : activeStep + 1;
    if (next >= 0 && next < steps.length) setActiveStep(next);
  };

  return (
    <section id="infrastructure" className="py-24 md:py-32 relative overflow-hidden bg-[hsl(var(--sage))]">
      {/* Grid background */}
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
            <div className="flex items-center gap-2 ml-2"><div className="w-5 border-t-2" style={{ borderColor: C.line.physical }} /><span>Physical flow</span></div>
            <div className="flex items-center gap-2"><div className="w-5 border-t-2" style={{ borderColor: C.line.digital }} /><span>Digital flow</span></div>
            <div className="flex items-center gap-2"><div className="w-5 border-t-2 border-dashed" style={{ borderColor: C.line.blockchain }} /><span>On-chain</span></div>
          </div>
        </ScrollReveal>

        {/* ════════ SVG DIAGRAM ════════ */}
        <ScrollReveal delay={0.1}>
          <div className="overflow-x-auto rounded-2xl border border-border bg-white/90 backdrop-blur-sm shadow-sm p-3 md:p-5">
            <svg viewBox="0 0 1200 720" className="w-full min-w-[900px]" style={{ maxHeight: 720 }}>
              <defs>
                <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                {/* Arrow markers for each color */}
                {Object.entries(C.line).map(([, color]) => (
                  <marker key={color} id={`arrow-${color.replace('#', '')}`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <path d="M0,0 L8,3 L0,6" fill="none" stroke={color} strokeWidth="1.2" />
                  </marker>
                ))}
              </defs>

              {/* ── GROUP BOXES (dashed borders) ── */}
              {/* Commercial Bank group */}
              <GroupBox x={385} y={30} w={155} h={145} color={C.gold.stroke} dimmed={isDimmed("commercial-bank")} />
              {/* Exchange + Exchange Wallet group */}
              <GroupBox x={680} y={30} w={155} h={145} color={C.purple.stroke} dimmed={isDimmed("exchange")} />
              {/* Buyer group */}
              <GroupBox x={1015} y={80} w={165} h={70} color={C.green.stroke} dimmed={isDimmed("buyer")} />
              {/* Seller group */}
              <GroupBox x={55} y={100} w={160} h={60} color={C.gold.stroke} dimmed={isDimmed("seller")} />
              {/* Custody group */}
              <GroupBox x={545} y={310} w={140} h={120} color={C.gold.stroke} dimmed={isDimmed("custody-wallet")} />

              {/* ── ALL CONNECTION LINES ── */}

              {/* Step 0: KYB → Seller, KYB → Buyer */}
              <Conn id="c-kyb-seller" d="M105,70 L105,100" color={C.line.physical} label="0" labelX={92} labelY={85} active={isConnActive("c-kyb-seller")} dimmed={isConnDimmed("c-kyb-seller")} />
              <Conn id="c-kyb-buyer" d="M1135,70 L1135,100" color={C.line.physical} label="0" labelX={1122} labelY={85} active={isConnActive("c-kyb-buyer")} dimmed={isConnDimmed("c-kyb-buyer")} />

              {/* Step 1: Seller → Inspector → Certification → Traceability */}
              <Conn id="c-seller-inspect" d="M80,170 L80,445 L115,445" color={C.line.physical} label="1" labelX={65} labelY={300} active={isConnActive("c-seller-inspect")} dimmed={isConnDimmed("c-seller-inspect")} />
              <Conn id="c-inspect-cert" d="M175,450 L230,450" color={C.line.physical} active={isConnActive("c-inspect-cert")} dimmed={isConnDimmed("c-inspect-cert")} />
              <Conn id="c-cert-trace" d="M145,475 L145,530" color={C.line.physical} active={isConnActive("c-cert-trace")} dimmed={isConnDimmed("c-cert-trace")} />

              {/* Step 2: Contract → CCP1, Certification → Warehouse */}
              <Conn id="c-seller-contract" d="M105,170 L105,365 L230,365" color={C.line.physical} active={isConnActive("c-seller-contract")} dimmed={isConnDimmed("c-seller-contract")} />
              <Conn id="c-contract-ccp1" d="M320,365 L380,365" color={C.line.digital} label="2. Transfer" labelX={322} labelY={355} active={isConnActive("c-contract-ccp1")} dimmed={isConnDimmed("c-contract-ccp1")} />
              <Conn id="c-cert-warehouse" d="M310,450 L395,450" color={C.line.physical} label="2. Storage" labelX={330} labelY={440} active={isConnActive("c-cert-warehouse")} dimmed={isConnDimmed("c-cert-warehouse")} />

              {/* Step 3: Warehouse → Custody (invoice), Warehouse → Insurance, Insurance → Bank, Custody → Bank */}
              <Conn id="c-warehouse-invoice" d="M495,440 L565,380" color={C.line.digital} label="3. Invoice" labelX={500} labelY={405} active={isConnActive("c-warehouse-invoice")} dimmed={isConnDimmed("c-warehouse-invoice")} />
              <Conn id="c-warehouse-insurance" d="M470,475 L530,510" color={C.line.physical} label="3. Contract" labelX={470} labelY={493} active={isConnActive("c-warehouse-insurance")} dimmed={isConnDimmed("c-warehouse-insurance")} />
              <Conn id="c-insurance-bank" d="M650,510 L730,480" color={C.line.digital} label="4. E-contract" labelX={660} labelY={490} active={isConnActive("c-insurance-bank")} dimmed={isConnDimmed("c-insurance-bank")} />
              <Conn id="c-custody-bank" d="M680,380 L730,440" color={C.line.digital} label="4. E-invoice" labelX={688} labelY={405} active={isConnActive("c-custody-bank")} dimmed={isConnDimmed("c-custody-bank")} />

              {/* Step 4: Bank → Tokenization */}
              <Conn id="c-bank-token" d="M830,460 L915,400" color={C.line.digital} label="4. Mint Ratio" labelX={845} labelY={425} active={isConnActive("c-bank-token")} dimmed={isConnDimmed("c-bank-token")} />
              <Conn id="c-token-proof" d="M970,420 L970,480" color={C.line.blockchain} dashed active={isConnActive("c-token-proof")} dimmed={isConnDimmed("c-token-proof")} />

              {/* Step 5: Tokenization → Custody Wallet (mint), Custody → Seller Wallet (receive) */}
              <Conn id="c-token-mint" d="M915,375 L690,335" color={C.line.blockchain} dashed label="5. Mint token" labelX={760} labelY={348} active={isConnActive("c-token-mint")} dimmed={isConnDimmed("c-token-mint")} />
              <Conn id="c-custody-receive" d="M555,325 L215,140" color={C.line.blockchain} dashed label="5. Receive token" labelX={340} labelY={220} active={isConnActive("c-custody-receive")} dimmed={isConnDimmed("c-custody-receive")} />

              {/* Step 6: Lending, Trading, LP, Oracle */}
              <Conn id="c-lending" d="M215,115 L385,90" color={C.line.digital} label="6. Lending" labelX={280} labelY={95} active={isConnActive("c-lending")} dimmed={isConnDimmed("c-lending")} />
              <Conn id="c-trading" d="M215,130 L680,100" color={C.line.digital} label="6. Trading" labelX={440} labelY={105} active={isConnActive("c-trading")} dimmed={isConnDimmed("c-trading")} />
              <Conn id="c-ccp2-lp" d="M630,195 L700,130" color={C.line.digital} label="6. LP" labelX={645} labelY={155} active={isConnActive("c-ccp2-lp")} dimmed={isConnDimmed("c-ccp2-lp")} />
              <Conn id="c-exchange-buyer" d="M835,100 L1015,110" color={C.line.digital} label="6. Trading" labelX={900} labelY={95} active={isConnActive("c-exchange-buyer")} dimmed={isConnDimmed("c-exchange-buyer")} />
              <Conn id="c-oracle-exchange" d="M980,240 L820,130" color={C.line.blockchain} dashed active={isConnActive("c-oracle-exchange")} dimmed={isConnDimmed("c-oracle-exchange")} />

              {/* Step 7: Redemption */}
              <Conn id="c-redeem-check" d="M310,450 L310,620 L530,640" color={C.line.physical} label="7. Check data" labelX={350} labelY={630} active={isConnActive("c-redeem-check")} dimmed={isConnDimmed("c-redeem-check")} />
              <Conn id="c-redeem-send" d="M680,640 L850,620" color={C.line.blockchain} dashed label="7. Send token" labelX={720} labelY={620} active={isConnActive("c-redeem-send")} dimmed={isConnDimmed("c-redeem-send")} />
              <Conn id="c-redeem-execute" d="M680,660 L850,660" color={C.line.blockchain} dashed label="9. Execute" labelX={730} labelY={655} active={isConnActive("c-redeem-execute")} dimmed={isConnDimmed("c-redeem-execute")} />
              <Conn id="c-redeem-export" d="M590,620 L495,460" color={C.line.physical} label="8. Export" labelX={525} labelY={540} active={isConnActive("c-redeem-export")} dimmed={isConnDimmed("c-redeem-export")} />
              <Conn id="c-burn-ship" d="M950,660 L1100,670 L1100,170" color={C.line.physical} label="8. Shipment" labelX={1050} labelY={660} active={isConnActive("c-burn-ship")} dimmed={isConnDimmed("c-burn-ship")} />

              {/* ── ENTITY CARDS ── */}

              {/* KYB Centers (Green) */}
              <Card id="kyb-left" x={65} y={35} w={85} h={35} label="KYB Center" colors={C.green} active={isHighlighted("kyb-left") && activeStep === 0} dimmed={isDimmed("kyb-left")} />
              <Card id="kyb-right" x={1090} y={35} w={85} h={35} label="KYB Center" colors={C.green} active={isHighlighted("kyb-right") && activeStep === 0} dimmed={isDimmed("kyb-right")} />

              {/* Seller + Wallet */}
              <Card id="seller" x={60} y={105} w={75} h={45} label="Seller" colors={C.green} active={isHighlighted("seller") && activeStep !== null} dimmed={isDimmed("seller")} />
              <Card id="seller-wallet" x={140} y={110} w={70} h={35} label="Seller Wallet" colors={C.greenLight} active={isHighlighted("seller-wallet") && activeStep !== null} dimmed={isDimmed("seller-wallet")} />

              {/* Buyer + Wallet */}
              <Card id="buyer" x={1100} y={90} w={75} h={45} label="Buyer" colors={C.green} active={isHighlighted("buyer") && activeStep !== null} dimmed={isDimmed("buyer")} />
              <Card id="buyer-wallet" x={1020} y={95} w={75} h={35} label="Buyer Wallet" colors={C.greenLight} active={isHighlighted("buyer-wallet") && activeStep !== null} dimmed={isDimmed("buyer-wallet")} />

              {/* Commercial Bank group */}
              <Card id="commercial-bank" x={405} y={45} w={115} h={40} label="Commercial" sublabel="Bank" colors={C.gold} active={isHighlighted("commercial-bank") && activeStep !== null} dimmed={isDimmed("commercial-bank")} />
              <Card id="cb-wallet" x={405} y={95} w={115} h={35} label="CB Wallet" colors={C.goldLight} active={isHighlighted("cb-wallet") && activeStep !== null} dimmed={isDimmed("cb-wallet")} />

              {/* CCP2 */}
              <Card id="ccp2" x={575} y={175} w={110} h={45} label="Central Clearing" sublabel="Party 2" colors={C.gold} active={isHighlighted("ccp2") && activeStep !== null} dimmed={isDimmed("ccp2")} />

              {/* Exchange group */}
              <Card id="exchange" x={700} y={45} w={110} h={35} label="Exchange" colors={C.gold} active={isHighlighted("exchange") && activeStep !== null} dimmed={isDimmed("exchange")} />
              <Card id="exchange-wallet" x={695} y={90} w={120} h={40} label="Exchange Wallet" colors={C.goldLight} active={isHighlighted("exchange-wallet") && activeStep !== null} dimmed={isDimmed("exchange-wallet")} />

              {/* Oracle */}
              <Card id="oracle" x={940} y={220} w={100} h={45} label="Oracle" colors={C.purple} active={isHighlighted("oracle") && activeStep !== null} dimmed={isDimmed("oracle")} />

              {/* Inspector */}
              <Card id="inspector" x={115} y={430} w={90} h={40} label="Inspector" colors={C.green} active={isHighlighted("inspector") && activeStep !== null} dimmed={isDimmed("inspector")} />

              {/* Certification (diamond) */}
              <Diamond id="certification" cx={275} cy={450} size={30} label="Certification" colors={C.diamondGreen} active={isHighlighted("certification") && activeStep !== null} dimmed={isDimmed("certification")} />

              {/* Traceability */}
              <Card id="traceability" x={95} y={530} w={110} h={40} label="Traceability" sublabel="Agrichain" colors={C.green} active={isHighlighted("traceability") && activeStep !== null} dimmed={isDimmed("traceability")} />

              {/* Contract (diamond) */}
              <Diamond id="contract" cx={275} cy={365} size={28} label="Contract" colors={C.diamond} active={isHighlighted("contract") && activeStep !== null} dimmed={isDimmed("contract")} />

              {/* CCP1 */}
              <Card id="ccp1" x={385} y={345} w={110} h={45} label="Central Clearing" sublabel="Party 1" colors={C.green} active={isHighlighted("ccp1") && activeStep !== null} dimmed={isDimmed("ccp1")} />

              {/* Warehouse */}
              <Card id="warehouse" x={395} y={430} w={100} h={45} label="Warehouse" sublabel="Gemadept" colors={C.green} active={isHighlighted("warehouse") && activeStep !== null} dimmed={isDimmed("warehouse")} />

              {/* Custody Wallet */}
              <Card id="custody-wallet" x={560} y={320} w={110} h={38} label="Custody Wallet" colors={C.purple} active={isHighlighted("custody-wallet") && activeStep !== null} dimmed={isDimmed("custody-wallet")} />

              {/* Institutional Custody */}
              <Card id="inst-custody" x={560} y={370} w={110} h={45} label="Institutional" sublabel="Custody" colors={C.purpleLight} active={isHighlighted("inst-custody") && activeStep !== null} dimmed={isDimmed("inst-custody")} />

              {/* Bank (MB Bank) */}
              <Card id="bank" x={730} y={440} w={100} h={45} label="Bank" sublabel="MB Bank" colors={C.gold} active={isHighlighted("bank") && activeStep !== null} dimmed={isDimmed("bank")} />

              {/* Insurance */}
              <Card id="insurance" x={530} y={495} w={120} h={40} label="Insurance" sublabel="BIC" colors={C.green} active={isHighlighted("insurance") && activeStep !== null} dimmed={isDimmed("insurance")} />

              {/* Tokenization Platform */}
              <Card id="tokenization" x={905} y={370} w={130} h={50} label="Tokenization" sublabel="Platform" colors={C.purple} active={isHighlighted("tokenization") && activeStep !== null} dimmed={isDimmed("tokenization")} />

              {/* Proof of Assets (diamond) */}
              <Diamond id="proof-of-assets" cx={970} cy={510} size={35} label="Proof of" sublabel="Assets" colors={C.diamond} active={isHighlighted("proof-of-assets") && activeStep !== null} dimmed={isDimmed("proof-of-assets")} />

              {/* Redeem Gateway */}
              <Card id="redeem" x={530} y={620} w={130} h={50} label="Redeem" sublabel="Gateway" colors={C.purple} active={isHighlighted("redeem") && activeStep !== null} dimmed={isDimmed("redeem")} />

              {/* Burn */}
              <Card id="burn" x={860} y={630} w={100} h={45} label="Burn" colors={C.purple} active={isHighlighted("burn") && activeStep !== null} dimmed={isDimmed("burn")} />
            </svg>
          </div>
        </ScrollReveal>

        {/* ════════ STEP SELECTOR ════════ */}
        <ScrollReveal delay={0.2}>
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground/50">
                Select a step to explore
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => goToStep("prev")} disabled={activeStep === null || activeStep === 0} className="p-2 rounded-lg border border-border bg-white text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.95]">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => goToStep("next")} disabled={activeStep === steps.length - 1} className="p-2 rounded-lg border border-border bg-white text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.95]">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

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
                        {steps[activeStep].participants.map((p) => (
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
