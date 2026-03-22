import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SectionTitle = ({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) => (
  <ScrollReveal>
    <h2
      className={`text-heading md:text-display font-serif mb-6 ${
        light ? "text-white" : "text-foreground"
      }`}
    >
      {children}
    </h2>
  </ScrollReveal>
);
