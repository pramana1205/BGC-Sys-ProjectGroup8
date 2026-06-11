


export function DiamondPattern({ className = "", opacity = 0.18, color = "#b8860b" }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
    >
      <g opacity={opacity} stroke={color} strokeWidth="1.2">
        <polygon points="60,8 112,60 60,112 8,60" />
        <polygon points="60,22 98,60 60,98 22,60" />
        <polygon points="60,38 82,60 60,82 38,60" />
        <line x1="60" y1="8" x2="60" y2="112" />
        <line x1="8" y1="60" x2="112" y2="60" />
      </g>
    </svg>
  );
}


export function FloralOrn({ className = "", opacity = 0.22, color = "#b8860b", size = 100 }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
    >
      <g opacity={opacity}>
        
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="50"
            rx="6"
            ry="22"
            fill={color}
            transform={`rotate(${angle} 50 50)`}
            opacity="0.7"
          />
        ))}
        <circle cx="50" cy="50" r="8" fill={color} />
        <circle cx="50" cy="50" r="4" fill="white" opacity="0.6" />
      </g>
    </svg>
  );
}


export function CornerOrn({ className = "", color = "#b8860b", opacity = 0.25, size = 80 }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
    >
      <g opacity={opacity} stroke={color} strokeWidth="1.5" strokeLinecap="round">
        <path d="M8 72 L8 8 L72 8" />
        <path d="M16 72 L16 16 L72 16" />
        <circle cx="8" cy="8" r="3" fill={color} />
        <circle cx="72" cy="8" r="2" fill={color} opacity="0.5" />
        <circle cx="8" cy="72" r="2" fill={color} opacity="0.5" />
        
        <circle cx="30" cy="8" r="1.5" fill={color} />
        <circle cx="50" cy="8" r="1.5" fill={color} />
        <circle cx="8" cy="30" r="1.5" fill={color} />
        <circle cx="8" cy="50" r="1.5" fill={color} />
      </g>
    </svg>
  );
}


export function GoldDivider({ className = "", opacity = 0.35 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none flex items-center gap-3 ${className}`}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg, transparent, rgba(184,134,11,${opacity}))`,
        }}
      />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polygon points="8,1 15,8 8,15 1,8" fill={`rgba(184,134,11,${opacity + 0.1})`} />
      </svg>
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg, rgba(184,134,11,${opacity}), transparent)`,
        }}
      />
    </div>
  );
}


export function Sparkles({ className = "", color = "#b8860b", opacity = 0.2 }) {
  const dots = [
    { cx: 12, cy: 12, r: 2.5 },
    { cx: 35, cy: 5,  r: 1.5 },
    { cx: 60, cy: 18, r: 3   },
    { cx: 85, cy: 8,  r: 1.8 },
    { cx: 100, cy: 30, r: 2  },
    { cx: 20, cy: 45, r: 1.5 },
    { cx: 75, cy: 50, r: 2.5 },
    { cx: 45, cy: 60, r: 1.2 },
    { cx: 90, cy: 70, r: 2   },
    { cx: 15, cy: 80, r: 2   },
    { cx: 55, cy: 90, r: 1.5 },
    { cx: 110, cy: 55, r: 1.2 },
  ];
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      width="120"
      height="100"
      viewBox="0 0 120 100"
      fill="none"
    >
      <g opacity={opacity}>
        {dots.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={color} />
        ))}
      </g>
    </svg>
  );
}


export function BotanicalLine({ className = "", color = "#b8860b", opacity = 0.2, width = 200 }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      width={width}
      height="40"
      viewBox={`0 0 ${width} 40`}
      fill="none"
    >
      <g opacity={opacity} stroke={color} strokeWidth="1.3" strokeLinecap="round">
        <path d={`M0 20 Q${width / 4} 5 ${width / 2} 20 Q${(3 * width) / 4} 35 ${width} 20`} />
        {[0.15, 0.35, 0.55, 0.75].map((t, i) => {
          const x = t * width;
          const y = i % 2 === 0 ? 12 : 28;
          return (
            <g key={i}>
              <ellipse cx={x} cy={y} rx="5" ry="8" fill={color} opacity="0.5" transform={`rotate(${i % 2 === 0 ? -30 : 30} ${x} ${y})`} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}


export function BrandStamp({ className = "", opacity = 0.12 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none text-center ${className}`}
      style={{ opacity }}
    >
      <p
        style={{
          fontFamily: "var(--font-cinzel, serif)",
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          color: "#b8860b",
          textTransform: "uppercase",
        }}
      >
        ✦ BlackGold Cherish ✦
      </p>
      <p
        style={{
          fontFamily: "var(--font-cormorant, serif)",
          fontSize: "0.7rem",
          fontStyle: "italic",
          color: "#6b4a58",
          letterSpacing: "0.1em",
          marginTop: 2,
        }}
      >
        Fashion Pilihan, Kualitas Terbaik
      </p>
    </div>
  );
}


export function HexGrid({ className = "", color = "#b8860b", opacity = 0.12, size = 120 }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
    >
      <g opacity={opacity} stroke={color} strokeWidth="1">
        
        <polygon points="30,10 50,10 60,28 50,46 30,46 20,28" />
        <polygon points="70,10 90,10 100,28 90,46 70,46 60,28" />
        
        <polygon points="10,46 30,46 40,64 30,82 10,82 0,64" />
        <polygon points="50,46 70,46 80,64 70,82 50,82 40,64" />
        <polygon points="90,46 110,46 120,64 110,82 90,82 80,64" />
        
        <polygon points="30,82 50,82 60,100 50,118 30,118 20,100" />
        <polygon points="70,82 90,82 100,100 90,118 70,118 60,100" />
      </g>
    </svg>
  );
}


export function PatternBand({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none relative overflow-hidden ${className}`}
      style={{ height: 48 }}
    >
      <svg
        width="100%"
        height="48"
        viewBox="0 0 800 48"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g opacity="0.15" stroke="#b8860b" strokeWidth="1">
          {Array.from({ length: 25 }, (_, i) => (
            <polygon
              key={i}
              points={`${i * 34},0 ${i * 34 + 17},0 ${i * 34 + 25.5},14.7 ${i * 34 + 17},29.4 ${i * 34},29.4 ${i * 34 - 8.5},14.7`}
              fill="none"
            />
          ))}
        </g>
        <line x1="0" y1="0" x2="800" y2="0" stroke="rgba(184,134,11,0.2)" />
        <line x1="0" y1="47" x2="800" y2="47" stroke="rgba(184,134,11,0.2)" />
      </svg>
    </div>
  );
}
