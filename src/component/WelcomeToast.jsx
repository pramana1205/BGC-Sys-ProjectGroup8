
import { useEffect, useState } from "react";

const CONFIG = {
  admin: {
    icon: "🛡️",
    title: "Selamat Datang Kembali, Admin!",
    subtitle: "Panel administrator BlackGold Cherish siap digunakan.",
    gradient: "linear-gradient(135deg, #1a0a10 0%, #3d1a28 100%)",
    accent: "#e91e8c",
    border: "rgba(233,30,140,0.35)",
    glow: "rgba(233,30,140,0.18)",
  },
  owner: {
    icon: "👑",
    title: "Selamat Datang Kembali, Owner!",
    subtitle: "Panel pemilik BlackGold Cherish siap digunakan.",
    gradient: "linear-gradient(135deg, #1a0a10 0%, #2d1a00 100%)",
    accent: "#c9a227",
    border: "rgba(201,162,39,0.35)",
    glow: "rgba(201,162,39,0.18)",
  },
};

export default function WelcomeToast() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [role, setRole]       = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("welcomeToast");
    if (!raw) return;

    try {
      const { role: r } = JSON.parse(raw);
      sessionStorage.removeItem("welcomeToast");
      setRole(r);
      setVisible(true);

      
      const t1 = setTimeout(() => setLeaving(true), 3600);
      const t2 = setTimeout(() => setVisible(false), 4200);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } catch {
      sessionStorage.removeItem("welcomeToast");
    }
  }, []);

  if (!visible || !role || !CONFIG[role]) return null;

  const cfg = CONFIG[role];

  return (
    <div
      className="fixed top-5 right-5 z-[9999] flex items-start gap-4 px-6 py-5 rounded-2xl shadow-2xl"
      style={{
        background: cfg.gradient,
        border: `1px solid ${cfg.border}`,
        boxShadow: `0 8px 32px ${cfg.glow}, 0 2px 8px rgba(0,0,0,0.3)`,
        minWidth: 300,
        maxWidth: 360,
        opacity: leaving ? 0 : 1,
        transform: leaving ? "translateX(24px)" : "translateX(0)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        animation: !leaving ? "slideInRight 0.4s cubic-bezier(.16,1,.3,1)" : undefined,
      }}
    >
      
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
        style={{ background: `rgba(255,255,255,0.08)`, border: `1px solid ${cfg.border}` }}
      >
        {cfg.icon}
      </div>

      
      <div className="flex-1 min-w-0">
        <p
          className="font-bold text-sm leading-snug mb-1"
          style={{ color: cfg.accent, fontFamily: "var(--font-cinzel, serif)" }}
        >
          {cfg.title}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,235,245,0.65)" }}>
          {cfg.subtitle}
        </p>
      </div>

      
      <button
        onClick={() => { setLeaving(true); setTimeout(() => setVisible(false), 500); }}
        className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full transition-colors hover:bg-white/10 text-xs"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        ✕
      </button>

      
      <div
        className="absolute bottom-0 left-0 h-[3px] rounded-full"
        style={{
          background: cfg.accent,
          width: "100%",
          transformOrigin: "left",
          animation: "shrinkBar 3.6s linear forwards",
          borderRadius: "0 0 16px 16px",
        }}
      />

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes shrinkBar {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
}
