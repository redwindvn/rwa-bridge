import { ScrollReveal, SectionTitle } from "./ScrollReveal";

// Flow diagram based on the whiteboard: entities as nodes with connections
// Color coding: Green = Physical, Yellow = Digital, Blue = Blockchain
// Lines: White = Physical flow, Yellow = Digital flow, Blue dashed = On-chain

const FlowDiagram = () => {
  return (
    <section id="flow-diagram" className="section-white py-20 md:py-28">
      <div className="container mx-auto">
        <SectionTitle>Infrastructure Flow Diagram</SectionTitle>
        <ScrollReveal delay={0.1}>
          <div className="mt-8 overflow-x-auto">
            <svg
              viewBox="0 0 1200 700"
              className="w-full min-w-[900px]"
              style={{ maxHeight: "700px" }}
            >
              <defs>
                <marker id="arrow-white" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="none" stroke="hsl(0,0%,70%)" strokeWidth="1" />
                </marker>
                <marker id="arrow-gold" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="none" stroke="hsl(41,68%,48%)" strokeWidth="1" />
                </marker>
                <marker id="arrow-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="none" stroke="hsl(210,70%,55%)" strokeWidth="1" />
                </marker>
              </defs>

              {/* Legend */}
              <g transform="translate(20, 20)">
                <rect x="0" y="0" width="12" height="12" rx="2" fill="hsl(145,50%,40%)" />
                <text x="18" y="10" fill="hsl(220,10%,40%)" fontSize="11" fontFamily="DM Sans">Physical Layer</text>
                <rect x="120" y="0" width="12" height="12" rx="2" fill="hsl(41,68%,48%)" />
                <text x="138" y="10" fill="hsl(220,10%,40%)" fontSize="11" fontFamily="DM Sans">Digital Layer</text>
                <rect x="240" y="0" width="12" height="12" rx="2" fill="hsl(210,70%,50%)" />
                <text x="258" y="10" fill="hsl(220,10%,40%)" fontSize="11" fontFamily="DM Sans">Blockchain Layer</text>
              </g>

              {/* ---- PHYSICAL LAYER (Green) ---- */}
              {/* Seller */}
              <g>
                <rect x="40" y="100" width="90" height="40" rx="4" fill="hsl(145,50%,40%)" />
                <text x="85" y="124" textAnchor="middle" fill="white" fontSize="12" fontWeight="600" fontFamily="DM Sans">Seller</text>
              </g>
              {/* Seller Wallet */}
              <g>
                <rect x="140" y="100" width="85" height="40" rx="4" fill="hsl(145,40%,50%)" />
                <text x="182" y="120" textAnchor="middle" fill="white" fontSize="10" fontFamily="DM Sans">Seller</text>
                <text x="182" y="132" textAnchor="middle" fill="white" fontSize="10" fontFamily="DM Sans">Wallet</text>
              </g>
              {/* Inspector */}
              <g>
                <rect x="100" y="380" width="90" height="40" rx="4" fill="hsl(145,50%,40%)" />
                <text x="145" y="404" textAnchor="middle" fill="white" fontSize="12" fontWeight="600" fontFamily="DM Sans">Inspector</text>
              </g>
              {/* Certification diamond */}
              <g transform="translate(220, 390)">
                <polygon points="40,0 80,20 40,40 0,20" fill="hsl(240,20%,75%)" stroke="hsl(240,20%,60%)" strokeWidth="1" />
                <text x="40" y="23" textAnchor="middle" fill="hsl(220,30%,20%)" fontSize="9" fontFamily="DM Sans">Certification</text>
              </g>
              {/* Warehouse */}
              <g>
                <rect x="310" y="350" width="100" height="45" rx="4" fill="hsl(145,50%,35%)" />
                <text x="360" y="376" textAnchor="middle" fill="white" fontSize="12" fontWeight="600" fontFamily="DM Sans">Warehouse</text>
              </g>
              {/* Traceability */}
              <g>
                <rect x="100" y="480" width="100" height="40" rx="4" fill="hsl(145,50%,40%)" />
                <text x="150" y="504" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" fontFamily="DM Sans">Traceability</text>
              </g>
              {/* Insurance */}
              <g>
                <rect x="420" y="380" width="90" height="40" rx="4" fill="hsl(145,40%,50%)" />
                <text x="465" y="404" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" fontFamily="DM Sans">Insurance</text>
              </g>
              {/* Contract diamond */}
              <g transform="translate(170, 275)">
                <polygon points="40,0 80,20 40,40 0,20" fill="hsl(240,20%,75%)" stroke="hsl(240,20%,60%)" strokeWidth="1" />
                <text x="40" y="23" textAnchor="middle" fill="hsl(220,30%,20%)" fontSize="9" fontFamily="DM Sans">Contract</text>
              </g>

              {/* ---- DIGITAL LAYER (Gold/Yellow) ---- */}
              {/* KYB Center (top-left) */}
              <g>
                <rect x="90" y="45" width="90" height="35" rx="4" fill="hsl(55,70%,50%)" />
                <text x="135" y="67" textAnchor="middle" fill="hsl(220,30%,15%)" fontSize="11" fontWeight="600" fontFamily="DM Sans">KYB Center</text>
              </g>
              {/* KYB Center (top-right, for buyer) */}
              <g>
                <rect x="910" y="45" width="90" height="35" rx="4" fill="hsl(55,70%,50%)" />
                <text x="955" y="67" textAnchor="middle" fill="hsl(220,30%,15%)" fontSize="11" fontWeight="600" fontFamily="DM Sans">KYB Center</text>
              </g>
              {/* Commercial Bank */}
              <g>
                <rect x="310" y="50" width="110" height="35" rx="4" fill="hsl(55,70%,50%)" />
                <text x="365" y="65" textAnchor="middle" fill="hsl(220,30%,15%)" fontSize="10" fontWeight="600" fontFamily="DM Sans">Commercial</text>
                <text x="365" y="77" textAnchor="middle" fill="hsl(220,30%,15%)" fontSize="10" fontFamily="DM Sans">Bank</text>
              </g>
              {/* Commercial Bank Wallet */}
              <g>
                <rect x="310" y="90" width="110" height="30" rx="4" fill="hsl(55,60%,60%)" />
                <text x="365" y="109" textAnchor="middle" fill="hsl(220,30%,15%)" fontSize="9" fontFamily="DM Sans">CB Wallet</text>
              </g>
              {/* CCP₁ */}
              <g>
                <rect x="280" y="270" width="80" height="40" rx="4" fill="hsl(55,70%,50%)" />
                <text x="320" y="294" textAnchor="middle" fill="hsl(220,30%,15%)" fontSize="12" fontWeight="600" fontFamily="DM Sans">CCP₁</text>
              </g>
              {/* CCP₂ */}
              <g>
                <rect x="440" y="95" width="70" height="35" rx="4" fill="hsl(55,60%,60%)" />
                <text x="475" y="116" textAnchor="middle" fill="hsl(220,30%,15%)" fontSize="11" fontWeight="600" fontFamily="DM Sans">CCP₂</text>
              </g>
              {/* Exchange */}
              <g>
                <rect x="530" y="50" width="100" height="35" rx="4" fill="hsl(55,70%,50%)" />
                <text x="580" y="72" textAnchor="middle" fill="hsl(220,30%,15%)" fontSize="11" fontWeight="600" fontFamily="DM Sans">Exchange</text>
              </g>
              {/* Exchange Wallet */}
              <g>
                <rect x="530" y="90" width="100" height="30" rx="4" fill="hsl(55,60%,60%)" />
                <text x="580" y="109" textAnchor="middle" fill="hsl(220,30%,15%)" fontSize="9" fontFamily="DM Sans">Exchange Wallet</text>
              </g>
              {/* Bank (MB Bank) */}
              <g>
                <rect x="520" y="340" width="80" height="40" rx="4" fill="hsl(145,40%,50%)" />
                <text x="560" y="364" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" fontFamily="DM Sans">Bank</text>
              </g>

              {/* ---- BLOCKCHAIN LAYER (Blue) ---- */}
              {/* Buyer */}
              <g>
                <rect x="880" y="90" width="80" height="40" rx="4" fill="hsl(145,50%,40%)" />
                <text x="920" y="114" textAnchor="middle" fill="white" fontSize="12" fontWeight="600" fontFamily="DM Sans">Buyer</text>
              </g>
              {/* Buyer Wallet */}
              <g>
                <rect x="790" y="95" width="80" height="35" rx="4" fill="hsl(145,40%,50%)" />
                <text x="830" y="112" textAnchor="middle" fill="white" fontSize="10" fontFamily="DM Sans">Buyer</text>
                <text x="830" y="123" textAnchor="middle" fill="white" fontSize="10" fontFamily="DM Sans">Wallet</text>
              </g>
              {/* Oracle */}
              <g>
                <rect x="650" y="185" width="80" height="40" rx="4" fill="hsl(210,70%,50%)" />
                <text x="690" y="209" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" fontFamily="DM Sans">Oracle</text>
              </g>
              {/* Custody Wallet */}
              <g>
                <rect x="480" y="240" width="100" height="35" rx="4" fill="hsl(210,60%,55%)" />
                <text x="530" y="261" textAnchor="middle" fill="white" fontSize="10" fontWeight="600" fontFamily="DM Sans">Custody Wallet</text>
              </g>
              {/* Institutional Custody */}
              <g>
                <rect x="475" y="275" width="110" height="35" rx="4" fill="hsl(210,70%,45%)" />
                <text x="530" y="292" textAnchor="middle" fill="white" fontSize="9" fontWeight="600" fontFamily="DM Sans">Institutional</text>
                <text x="530" y="303" textAnchor="middle" fill="white" fontSize="9" fontFamily="DM Sans">Custody</text>
              </g>
              {/* Tokenization Platform */}
              <g>
                <rect x="650" y="330" width="110" height="45" rx="4" fill="hsl(210,70%,50%)" />
                <text x="705" y="350" textAnchor="middle" fill="white" fontSize="10" fontWeight="600" fontFamily="DM Sans">Tokenization</text>
                <text x="705" y="363" textAnchor="middle" fill="white" fontSize="10" fontFamily="DM Sans">Platform</text>
              </g>
              {/* Proof of Assets diamond */}
              <g transform="translate(660, 385)">
                <polygon points="40,0 80,20 40,40 0,20" fill="hsl(210,60%,60%)" stroke="hsl(210,70%,45%)" strokeWidth="1" />
                <text x="40" y="18" textAnchor="middle" fill="white" fontSize="8" fontFamily="DM Sans">Proof of</text>
                <text x="40" y="28" textAnchor="middle" fill="white" fontSize="8" fontFamily="DM Sans">Assets</text>
              </g>
              {/* Redeem Gateway */}
              <g>
                <rect x="300" y="510" width="100" height="45" rx="4" fill="hsl(210,70%,45%)" />
                <text x="350" y="530" textAnchor="middle" fill="white" fontSize="10" fontWeight="600" fontFamily="DM Sans">Redeem</text>
                <text x="350" y="543" textAnchor="middle" fill="white" fontSize="10" fontFamily="DM Sans">Gateway</text>
              </g>
              {/* Burn */}
              <g>
                <rect x="800" y="550" width="70" height="35" rx="4" fill="hsl(210,70%,50%)" />
                <text x="835" y="572" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" fontFamily="DM Sans">Burn</text>
              </g>

              {/* ---- CONNECTIONS ---- */}
              {/* Physical flow (white/gray) */}
              <line x1="130" y1="120" x2="140" y2="120" stroke="hsl(0,0%,70%)" strokeWidth="1.5" markerEnd="url(#arrow-white)" />
              <line x1="145" y1="400" x2="220" y2="400" stroke="hsl(0,0%,70%)" strokeWidth="1.5" markerEnd="url(#arrow-white)" />
              <line x1="300" y1="400" x2="310" y2="375" stroke="hsl(0,0%,70%)" strokeWidth="1.5" markerEnd="url(#arrow-white)" />
              <line x1="410" y1="375" x2="420" y2="400" stroke="hsl(0,0%,70%)" strokeWidth="1.5" markerEnd="url(#arrow-white)" />

              {/* Seller to Inspector */}
              <path d="M85 140 L85 400 L100 400" fill="none" stroke="hsl(0,0%,70%)" strokeWidth="1.5" markerEnd="url(#arrow-white)" />

              {/* Warehouse to Redeem */}
              <line x1="360" y1="395" x2="360" y2="510" stroke="hsl(0,0%,70%)" strokeWidth="1.5" markerEnd="url(#arrow-white)" />

              {/* Traceability to Warehouse */}
              <path d="M200 500 L360 500 L360 395" fill="none" stroke="hsl(0,0%,70%)" strokeWidth="1.5" markerEnd="url(#arrow-white)" />

              {/* Digital flow (gold) */}
              <line x1="135" y1="80" x2="135" y2="100" stroke="hsl(41,68%,48%)" strokeWidth="1.5" markerEnd="url(#arrow-gold)" />
              <line x1="955" y1="80" x2="920" y2="90" stroke="hsl(41,68%,48%)" strokeWidth="1.5" markerEnd="url(#arrow-gold)" />

              {/* CCP₁ to Warehouse */}
              <line x1="320" y1="310" x2="340" y2="350" stroke="hsl(41,68%,48%)" strokeWidth="1.5" markerEnd="url(#arrow-gold)" />

              {/* Contract to CCP₁ */}
              <line x1="250" y1="295" x2="280" y2="290" stroke="hsl(41,68%,48%)" strokeWidth="1.5" markerEnd="url(#arrow-gold)" />

              {/* Seller to Contract */}
              <path d="M130 140 L130 295 L170 295" fill="none" stroke="hsl(41,68%,48%)" strokeWidth="1.5" markerEnd="url(#arrow-gold)" />

              {/* Insurance to Bank */}
              <line x1="510" y1="400" x2="520" y2="370" stroke="hsl(41,68%,48%)" strokeWidth="1.5" markerEnd="url(#arrow-gold)" />

              {/* Warehouse to Bank */}
              <line x1="410" y1="360" x2="520" y2="355" stroke="hsl(41,68%,48%)" strokeWidth="1.5" markerEnd="url(#arrow-gold)" />

              {/* Bank to Tokenization */}
              <line x1="600" y1="355" x2="650" y2="350" stroke="hsl(41,68%,48%)" strokeWidth="1.5" markerEnd="url(#arrow-gold)" />

              {/* CCP₂ to Exchange */}
              <line x1="510" y1="110" x2="530" y2="105" stroke="hsl(41,68%,48%)" strokeWidth="1.5" markerEnd="url(#arrow-gold)" />

              {/* Commercial Bank to Seller wallet */}
              <path d="M310 100 L225 100 L225 115" fill="none" stroke="hsl(41,68%,48%)" strokeWidth="1.5" markerEnd="url(#arrow-gold)" />

              {/* On-chain operations (blue dashed) */}
              {/* Tokenization to Custody */}
              <line x1="650" y1="340" x2="585" y2="300" stroke="hsl(210,70%,55%)" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arrow-blue)" />

              {/* Custody to Seller wallet */}
              <path d="M475 260 L182 260 L182 140" fill="none" stroke="hsl(210,70%,55%)" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arrow-blue)" />

              {/* Oracle to Exchange */}
              <path d="M690 185 L690 160 L630 120" fill="none" stroke="hsl(210,70%,55%)" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arrow-blue)" />

              {/* Oracle to Tokenization */}
              <line x1="690" y1="225" x2="700" y2="330" stroke="hsl(210,70%,55%)" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arrow-blue)" />

              {/* Custody to CCP₁ */}
              <path d="M475 290 L360 290" fill="none" stroke="hsl(210,70%,55%)" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arrow-blue)" />

              {/* Exchange to Buyer wallet */}
              <path d="M630 105 L790 105" fill="none" stroke="hsl(210,70%,55%)" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arrow-blue)" />

              {/* Redeem to Burn */}
              <path d="M400 540 L800 555" fill="none" stroke="hsl(210,70%,55%)" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arrow-blue)" />

              {/* Burn to Tokenization */}
              <path d="M835 550 L835 450 L760 400" fill="none" stroke="hsl(210,70%,55%)" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arrow-blue)" />

              {/* Buyer to Redeem */}
              <path d="M920 130 L920 540 L400 540" fill="none" stroke="hsl(0,0%,70%)" strokeWidth="1.5" markerEnd="url(#arrow-white)" />

            </svg>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="mt-6 flex flex-wrap gap-6 justify-center text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-[hsl(0,0%,70%)]" />
              <span>Physical flow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-[hsl(41,68%,48%)]" />
              <span>Digital flow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 border-t-2 border-dashed border-[hsl(210,70%,55%)]" />
              <span>On-chain operation</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FlowDiagram;
