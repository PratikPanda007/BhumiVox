/**
 * Stylised sacred-geography map of Bharat.
 * Not a precise SVG of India — a cinematic abstraction with glowing nodes
 * and animated route lines, suited to the documentary aesthetic.
 */
export function IndiaMap({ className = "" }: { className?: string }) {
  const nodes = [
    { id: "dwarka",     x: 120, y: 280, label: "Dwarka" },
    { id: "kurukshetra",x: 280, y: 200, label: "Kurukshetra" },
    { id: "braj",       x: 305, y: 250, label: "Braj" },
    { id: "ayodhya",    x: 360, y: 270, label: "Ayodhya" },
    { id: "prayag",     x: 380, y: 295, label: "Prayagraj" },
    { id: "kashi",      x: 410, y: 300, label: "Kashi" },
    { id: "chitrakoot", x: 345, y: 320, label: "Chitrakoot" },
    { id: "puri",       x: 460, y: 380, label: "Puri" },
    { id: "udupi",      x: 260, y: 480, label: "Udupi" },
    { id: "guruvayur",  x: 290, y: 520, label: "Guruvayur" },
    { id: "rameshwaram",x: 340, y: 555, label: "Rameshwaram" },
    { id: "lanka",      x: 370, y: 620, label: "Sri Lanka" },
  ];

  const routes: [string, string][] = [
    ["dwarka", "kurukshetra"],
    ["kurukshetra", "braj"],
    ["braj", "ayodhya"],
    ["ayodhya", "prayag"],
    ["prayag", "kashi"],
    ["ayodhya", "chitrakoot"],
    ["chitrakoot", "udupi"],
    ["udupi", "guruvayur"],
    ["guruvayur", "rameshwaram"],
    ["rameshwaram", "lanka"],
    ["kashi", "puri"],
  ];

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 600 720"
      className={className}
      aria-label="Sacred geography of Bharat"
    >
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="oklch(0.62 0.09 55)" stopOpacity="0.18" />
          <stop offset="60%" stopColor="oklch(0.13 0.008 60)" stopOpacity="0" />
        </radialGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      <rect width="600" height="720" fill="url(#bgGlow)" />

      {/* Abstract subcontinent outline */}
      <path
        d="M 95 230 Q 80 280 110 320 Q 130 360 110 410 Q 140 450 180 470 Q 220 510 260 555 Q 300 605 340 645 Q 365 665 380 640 Q 395 600 400 540 Q 420 480 460 430 Q 510 380 500 320 Q 490 260 440 220 Q 380 180 300 175 Q 220 175 160 195 Q 120 210 95 230 Z"
        fill="none"
        stroke="oklch(0.62 0.09 55 / 0.35)"
        strokeWidth="0.8"
      />
      <path
        d="M 95 230 Q 80 280 110 320 Q 130 360 110 410 Q 140 450 180 470 Q 220 510 260 555 Q 300 605 340 645 Q 365 665 380 640 Q 395 600 400 540 Q 420 480 460 430 Q 510 380 500 320 Q 490 260 440 220 Q 380 180 300 175 Q 220 175 160 195 Q 120 210 95 230 Z"
        fill="oklch(0.17 0.01 60 / 0.4)"
        stroke="none"
      />

      {/* Topo-like contour hints */}
      {[0.65, 0.5, 0.35, 0.2].map((s, i) => (
        <path
          key={i}
          d="M 130 280 Q 200 250 280 270 Q 360 290 440 280"
          fill="none"
          stroke="oklch(0.62 0.09 55)"
          strokeOpacity={s * 0.18}
          strokeWidth="0.5"
          transform={`translate(0 ${i * 60})`}
        />
      ))}

      {/* Routes */}
      {routes.map(([a, b], i) => (
        <line
          key={i}
          x1={byId[a].x}
          y1={byId[a].y}
          x2={byId[b].x}
          y2={byId[b].y}
          stroke="oklch(0.78 0.12 80)"
          strokeOpacity="0.55"
          strokeWidth="0.8"
          className="draw-line"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r="8"
            fill="oklch(0.78 0.12 80)"
            opacity="0.25"
            filter="url(#soft)"
            className="pulse-node"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r="2.2"
            fill="oklch(0.95 0.015 85)"
            stroke="oklch(0.78 0.12 80)"
            strokeWidth="0.6"
          />
          <text
            x={n.x + 10}
            y={n.y + 3}
            fontFamily="Inter, sans-serif"
            fontSize="8"
            letterSpacing="0.22em"
            fill="oklch(0.85 0.02 80 / 0.7)"
            style={{ textTransform: "uppercase" }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
