/**
 * Subtle blockchain-themed background decoration.
 * Renders faint geometric nodes + connection lines.
 */
const BlockchainBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {/* Grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, hsl(var(--teal)) 1px, transparent 0)
        `,
        backgroundSize: "40px 40px",
      }}
    />
    {/* Hexagonal nodes */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      {/* Scattered connection lines */}
      <line x1="100" y1="150" x2="350" y2="280" stroke="hsl(260,50%,55%)" strokeWidth="0.8" />
      <line x1="350" y1="280" x2="600" y2="200" stroke="hsl(260,50%,55%)" strokeWidth="0.8" />
      <line x1="600" y1="200" x2="900" y2="350" stroke="hsl(260,50%,55%)" strokeWidth="0.8" />
      <line x1="900" y1="350" x2="1100" y2="250" stroke="hsl(260,50%,55%)" strokeWidth="0.8" />
      <line x1="200" y1="500" x2="500" y2="450" stroke="hsl(164,50%,40%)" strokeWidth="0.8" />
      <line x1="500" y1="450" x2="800" y2="550" stroke="hsl(164,50%,40%)" strokeWidth="0.8" />
      <line x1="800" y1="550" x2="1050" y2="480" stroke="hsl(164,50%,40%)" strokeWidth="0.8" />

      {/* Nodes */}
      {[
        [100, 150], [350, 280], [600, 200], [900, 350], [1100, 250],
        [200, 500], [500, 450], [800, 550], [1050, 480],
        [150, 650], [700, 100], [450, 650],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={4} fill="hsl(260,50%,55%)" />
      ))}
    </svg>
  </div>
);

export default BlockchainBackground;
