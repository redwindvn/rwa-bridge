import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function useCountUp(
  end: number,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0
) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as any, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, end, duration, prefix, suffix, decimals]);

  return { ref, display };
}
