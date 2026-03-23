import { useCountUp } from "@/hooks/useCountUp";

interface Props {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  duration?: number;
}

const CountUpStat = ({ end, prefix = "", suffix = "", decimals = 0, label, duration = 2000 }: Props) => {
  const { ref, display } = useCountUp(end, duration, prefix, suffix, decimals);

  return (
    <div className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-border shadow-sm">
      <div ref={ref} className="text-2xl md:text-3xl font-serif text-foreground mb-2 tabular-nums">
        {display}
      </div>
      <div className="text-xs font-sans text-muted-foreground leading-relaxed">{label}</div>
    </div>
  );
};

export default CountUpStat;
