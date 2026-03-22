import { useEffect, useRef } from "react";

/**
 * Animated blockchain background with floating hexagons, nodes, and connection lines.
 * Pure canvas animation — no dependencies.
 */
const AnimatedBlockchainBg = ({ className = "", opacity = 0.07 }: { className?: string; opacity?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;

    interface Node {
      x: number; y: number; vx: number; vy: number; r: number; phase: number;
    }

    const nodes: Node[] = [];
    const NODE_COUNT = 35;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      w = rect.width;
      h = rect.height;
      canvas.width = w * 2;
      canvas.height = h * 2;
      ctx.scale(2, 2);
    };

    const init = () => {
      resize();
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: 2 + Math.random() * 3,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const hexPath = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      // Update positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      // Draw connections
      const maxDist = 180;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.5;
            ctx.strokeStyle = `rgba(94, 53, 177, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes as hexagons
      for (const n of nodes) {
        const pulse = 0.8 + 0.2 * Math.sin(time * 0.001 + n.phase);
        ctx.fillStyle = `rgba(94, 53, 177, ${0.4 * pulse})`;
        hexPath(n.x, n.y, n.r * 2.5);
        ctx.fill();

        ctx.fillStyle = `rgba(13, 124, 102, ${0.3 * pulse})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    animId = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
    />
  );
};

export default AnimatedBlockchainBg;
