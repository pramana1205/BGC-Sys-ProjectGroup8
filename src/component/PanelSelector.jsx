
import { useNavigate } from "react-router-dom";

const panels = [
  {
    id: "customer",
    title: "Customer Portal",
    subtitle: "Jelajahi koleksi & belanja",
    icon: "🛍️",
    path: "/",
    gradient: "linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)",
    border: "rgba(236,72,153,0.3)",
    glow: "rgba(236,72,153,0.15)",
    badge: "Pelanggan",
    badgeColor: "#db2777",
    badgeBg: "rgba(219,39,119,0.1)",
  },
  {
    id: "admin",
    title: "Admin Dashboard",
    subtitle: "Kelola pesanan & produk",
    icon: "⚙️",
    path: "/dashboard",
    gradient: "linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)",
    border: "rgba(99,102,241,0.3)",
    glow: "rgba(99,102,241,0.15)",
    badge: "Administrator",
    badgeColor: "#4f46e5",
    badgeBg: "rgba(79,70,229,0.1)",
  },
  {
    id: "owner",
    title: "Owner Dashboard",
    subtitle: "Pantau statistik & pertumbuhan",
    icon: "👑",
    path: "/owner-dashboard",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
    border: "rgba(217,119,6,0.3)",
    glow: "rgba(217,119,6,0.15)",
    badge: "Pemilik Toko",
    badgeColor: "#b45309",
    badgeBg: "rgba(180,83,9,0.1)",
  },
];

export default function PanelSelector({ onClose }) {
  const navigate = useNavigate();

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  return (
    
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: "rgba(10,5,15,0.75)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a0a10 0%, #2d1420 60%, #1a0a10 100%)",
          border: "1px solid rgba(184,134,11,0.25)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(184,134,11,0.1)",
        }}
      >
        
        <div className="px-8 pt-8 pb-6 text-center border-b" style={{ borderColor: "rgba(184,134,11,0.15)" }}>
          <div className="text-4xl mb-3">👑</div>
          <h2
            className="text-2xl font-bold mb-1"
            style={{
              fontFamily: "var(--font-playfair, serif)",
              background: "linear-gradient(90deg, #b8860b, #e8c862, #b8860b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Selamat Datang, Owner
          </h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            Pilih panel yang ingin Anda akses
          </p>
        </div>

        
        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {panels.map((panel) => (
            <button
              key={panel.id}
              onClick={() => handleSelect(panel.path)}
              className="group relative flex flex-col items-center gap-3 p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${panel.border}`,
                boxShadow: `0 4px 20px ${panel.glow}`,
              }}
            >
              
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${panel.glow} 0%, transparent 70%)` }}
              />

              
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 relative z-10"
                style={{ background: panel.gradient, boxShadow: `0 8px 24px ${panel.glow}` }}
              >
                {panel.icon}
              </div>

              
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full relative z-10"
                style={{ color: panel.badgeColor, background: panel.badgeBg, border: `1px solid ${panel.border}` }}
              >
                {panel.badge}
              </span>

              
              <div className="relative z-10">
                <p className="font-bold text-sm mb-1" style={{ color: "rgba(255,255,255,0.9)" }}>
                  {panel.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {panel.subtitle}
                </p>
              </div>

              
              <div
                className="mt-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 relative z-10"
                style={{ color: panel.badgeColor }}
              >
                Buka →
              </div>
            </button>
          ))}
        </div>

        
        <div className="px-8 pb-6 text-center space-y-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-full transition-all duration-200"
            style={{
              color: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
          >
            ← Kembali ke Login
          </button>
          <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>
            ✦ BlackGold Cherish — Owner memiliki akses penuh ke semua panel ✦
          </p>
        </div>
      </div>
    </div>
  );
}
