import { useEffect, useRef } from "react";

interface Props {
  className?: string;
  opacity?: number;
  color?: "teal" | "purple" | "mixed";
}

const COLORS = {
  teal: { node: [13, 124, 102], line: [13, 124, 102] },
  purple: { node: [94, 53, 177], line: [94, 53, 177] },
  mixed: { node: [13, 124, 102], line: [94, 53, 177] },
};

const AnimatedBlockchainBg = ({ className = "", opacity = 0.07, color = "mixed" }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;
    const pal = COLORS[color];

    interface Node { x: number; y: number; vx: number; vy: number; r: number; phase: number; }
    const nodes: Node[] = [];
    const COUNT = 40;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      w = rect.width; h = rect.height;
      canvas.width = w * 2; canvas.height = h * 2;
      ctx.setTransform(2, 0, 0, 2, 0, 0);
    };

    const init = () => {
      resize();
      nodes.length = 0;
      for (let i = 0; i < COUNT; i++) {
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
          r: 2 + Math.random() * 3, phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const hex = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const px = cx + r * Math.cos(a), py = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
      }

      const [lr, lg, lb] = pal.line;
      ctx.lineWidth = 0.7;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 200) {
            ctx.strokeStyle = `rgba(${lr},${lg},${lb},${(1 - d / 200) * 0.4})`;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          }
        }
      }

      const [nr, ng, nb] = pal.node;
      for (const n of nodes) {
        const p = 0.8 + 0.2 * Math.sin(t * 0.001 + n.phase);
        ctx.fillStyle = `rgba(${nr},${ng},${nb},${0.35 * p})`;
        hex(n.x, n.y, n.r * 2.5); ctx.fill();
        ctx.fillStyle = `rgba(${lr},${lg},${lb},${0.25 * p})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    animId = requestAnimationFrame(draw);
    const onR = () => resize();
    window.addEventListener("resize", onR);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onR); };
  }, [color]);

  return (
    <canvas ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }} />
  );
};

export default AnimatedBlockchainBg;
