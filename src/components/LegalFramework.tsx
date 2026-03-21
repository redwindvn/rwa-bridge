import { ScrollReveal, SectionTitle } from "./ScrollReveal";
import { Scale, FileText, Cpu, FlaskConical } from "lucide-react";

const items = [
  {
    icon: Scale,
    title: "Resolution 222/2025/QH15",
    desc: "National Assembly resolution establishing Vietnam's International Financial Centre.",
  },
  {
    icon: FileText,
    title: "Decree 330/2025/NĐ-CP",
    desc: "Government decree specifically governing Commodity Exchanges within VIFC. Effective December 18, 2025. Defines: digital trading platforms, clearing houses (CCP), permitted commodity lists (including agricultural products), establishment requirements, and oversight mechanisms.",
  },
  {
    icon: Cpu,
    title: "Digital Technology Industry Law",
    desc: "Effective January 1, 2026. Recognizes legal validity of digital assets and electronic transactions.",
  },
  {
    icon: FlaskConical,
    title: "VIFC Sandbox",
    desc: "5-year regulatory sandbox enabling pilot implementation of new financial models under controlled conditions.",
  },
];

const LegalFramework = () => (
  <section id="legal" className="section-dark py-24 md:py-32">
    <div className="container mx-auto">
      <SectionTitle light>Operating Under Vietnam's National Legal Framework</SectionTitle>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {items.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.08}>
            <div className="p-7 rounded-lg border border-white/[0.06] bg-white/[0.03]">
              <item.icon className="w-6 h-6 mb-4 text-white/30" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.4}>
        <div className="mt-14 p-8 rounded-lg border border-gold/20 bg-gold/[0.05]">
          <p className="text-body-lg text-white/70 leading-relaxed">
            <span className="text-gold font-semibold">Decree 330 is particularly significant:</span> it mandates a clearing house structure (CCP), defines digital trading platforms, and lists agricultural commodities as permitted assets — matching RWA Hub's architecture exactly. This is not a regulatory workaround.{" "}
            <span className="text-white font-medium">This is building within the framework the government has specifically created.</span>
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default LegalFramework;
