import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import {
  LuTag,
  LuShoppingCart,
  LuHistory,
  LuCircleUserRound,
  LuHeart,
  LuMapPin,
  LuMail,
  LuPhone,
} from "react-icons/lu";
import { FaTiktok, FaInstagram, FaWhatsapp } from "react-icons/fa";

const NAV_ITEMS = [
  { path: "/koleksi", icon: LuTag, title: "Koleksi" },
  { path: "/wishlist", icon: LuHeart, title: "Wishlist" },
  { path: "/order", icon: LuShoppingCart, title: "Order" },
  { path: "/riwayat", icon: LuHistory, title: "Riwayat Pesanan" },
  { path: "/akun", icon: LuCircleUserRound, title: "Akun Saya" },
];

const SOCIAL_LINKS = [
  {
    id: "tiktok",
    icon: FaTiktok,
    label: "TikTok",
    href: "https://www.tiktok.com/@blackgold_cherish",
    hoverColor: "#ffffff",
    glowColor: "rgba(255,255,255,0.35)",
    bg: "rgba(255,255,255,0.06)",
    hoverBg: "rgba(255,255,255,0.14)",
  },
  {
    id: "instagram",
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/blackgold_cherish",
    hoverColor: "#f58529",
    glowColor: "rgba(245,133,41,0.45)",
    bg: "rgba(245,133,41,0.06)",
    hoverBg: "rgba(245,133,41,0.14)",
  },
  {
    id: "whatsapp",
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/6285761004981",
    hoverColor: "#25D366",
    glowColor: "rgba(37,211,102,0.45)",
    bg: "rgba(37,211,102,0.06)",
    hoverBg: "rgba(37,211,102,0.14)",
  },
];

function SocialIcon({ id, icon: Icon, label, href, hoverColor, glowColor, bg, hoverBg }) {
  return (
    <a
      id={`footer-social-${id}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Kunjungi ${label} BlackGold Cherish`}
      title={label}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
        padding: "10px 16px",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: bg,
        color: "rgba(255,255,255,0.5)",
        textDecoration: "none",
        transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: "pointer",
        minWidth: "64px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = hoverColor;
        e.currentTarget.style.background = hoverBg;
        e.currentTarget.style.borderColor = hoverColor;
        e.currentTarget.style.boxShadow = `0 0 18px ${glowColor}, 0 4px 14px rgba(0,0,0,0.3)`;
        e.currentTarget.style.transform = "translateY(-5px) scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "rgba(255,255,255,0.5)";
        e.currentTarget.style.background = bg;
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0) scale(1)";
      }}
    >
      <Icon size={20} />
      <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {label}
      </span>
    </a>
  );
}

// ── Footer column helper ──────────────────────────────────────────
const COL_HEADING = {
  fontSize: "11px",
  fontWeight: 800,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  background: "linear-gradient(90deg, #b8860b, #e8c862, #b8860b)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  marginBottom: "14px",
  display: "block",
};

const COL_DIVIDER = {
  width: "100%",
  height: "1px",
  background: "linear-gradient(90deg, rgba(184,134,11,0.35), transparent)",
  marginBottom: "14px",
};

function FooterLink({ to, href, children }) {
  const base = {
    fontSize: "12px",
    color: "rgba(255,220,235,0.55)",
    textDecoration: "none",
    display: "block",
    paddingBottom: "7px",
    transition: "color 0.2s",
    cursor: "pointer",
  };
  const hover = { color: "#e8c862" };
  const [hov, setHov] = React.useState(false);
  const style = { ...base, ...(hov ? hover : {}) };
  if (to)
    return (
      <Link to={to} style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
        {children}
      </Link>
    );
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(160deg, #140608 0%, #2a0e18 45%, #140608 100%)",
        borderTop: "1px solid rgba(184,134,11,0.25)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "48px 32px 32px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "36px 28px",
          alignItems: "start",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-cinzel, serif)",
              background: "linear-gradient(90deg, #b8860b, #e8c862, #b8860b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 800,
              fontSize: "16px",
              marginBottom: "8px",
            }}
          >
            BlackGold Cherish
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant, serif)",
              color: "rgba(255,210,230,0.5)",
              fontSize: "12px",
              fontStyle: "italic",
              lineHeight: 1.6,
              marginBottom: "16px",
            }}
          >
            Koleksi Fashion Eksklusif untuk Wanita Modern dan Elegan.
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {SOCIAL_LINKS.map((s) => (
              <SocialIcon key={s.id} {...s} />
            ))}
          </div>
        </div>

        <div>
          <span style={COL_HEADING}>Hubungi Kami</span>
          <div style={COL_DIVIDER} />
          <a
            href="https://wa.me/6285761004981"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "10px", textDecoration: "none" }}
          >
            <LuPhone size={13} style={{ color: "#25D366", marginTop: "2px", flexShrink: 0 }} />
            <span style={{ fontSize: "12px", color: "rgba(255,220,235,0.6)", lineHeight: 1.5 }}>
              0857-6100-4981
              <br />
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>(WhatsApp / Retail)</span>
            </span>
          </a>
          <a
            href="mailto:blackgoldcherish@gmail.com"
            style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "10px", textDecoration: "none" }}
          >
            <LuMail size={13} style={{ color: "#e8c862", marginTop: "2px", flexShrink: 0 }} />
            <span style={{ fontSize: "12px", color: "rgba(255,220,235,0.6)", lineHeight: 1.5 }}>
              blackgoldcherish@gmail.com
            </span>
          </a>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <LuMapPin size={13} style={{ color: "#e8c862", marginTop: "2px", flexShrink: 0 }} />
            <span style={{ fontSize: "12px", color: "rgba(255,220,235,0.6)", lineHeight: 1.6 }}>
              Jl. Contoh No. 1,<br />
              Kota Anda, Indonesia
            </span>
          </div>
        </div>

        <div>
          <span style={COL_HEADING}>Telusuri</span>
          <div style={COL_DIVIDER} />
          <FooterLink to="/koleksi">Koleksi</FooterLink>
          <FooterLink to="/wishlist">Wishlist</FooterLink>
          <FooterLink to="/order">Buat Pesanan</FooterLink>
          <FooterLink to="/riwayat">Riwayat Pesanan</FooterLink>
          <FooterLink to="/akun">Akun Saya</FooterLink>
          <FooterLink to="/feedback">Testimoni</FooterLink>
        </div>

        <div>
          <span style={COL_HEADING}>Bantuan</span>
          <div style={COL_DIVIDER} />
          <FooterLink to="/terms">Syarat &amp; Ketentuan</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/panduan-pembayaran">Panduan Pembayaran</FooterLink>
          <FooterLink to="/panduan-pengiriman">Info Pengiriman</FooterLink>
          <FooterLink to="/size-guide">Size Guide</FooterLink>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(184,134,11,0.12)",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", margin: 0 }}>
          © 2025 BlackGold Cherish. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

const CART_KEY = "bgc_cart";

function useCartCount() {
  const getCount = () => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]").length;
    } catch {
      return 0;
    }
  };
  const [count, setCount] = useState(getCount);
  useEffect(() => {
    const onStorage = () => setCount(getCount());
    window.addEventListener("storage", onStorage);
    const interval = setInterval(() => setCount(getCount()), 500);
    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
  }, []);
  return count;
}

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const cartCount = useCartCount();

  return (
    <div className="min-h-screen bg-[#fffafb] flex flex-col overflow-x-hidden">
      {!isLanding && (
        <>
          <nav
            className="kol-navbar sticky top-0 z-40 bg-white hidden sm:flex items-center justify-between px-10 py-4"
            style={{ borderBottom: "1px solid rgba(184,134,11,0.12)" }}
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 text-gradient-brand font-bold text-xl tracking-tight shrink-0"
              style={{ fontFamily: "var(--font-cinzel, serif)" }}
            >
              <img src="/Logo BGC.jpg" alt="Logo" className="w-9 h-9 object-contain rounded-lg border border-pink-100" />
              <span>BlackGold Cherish</span>
            </button>

            <div className="flex items-center gap-1">
              {NAV_ITEMS.map(({ path, icon: Icon, title }) => {
                const isActive = location.pathname === path;
                const isOrder = path === "/order";
                return (
                  <button
                    key={path}
                    onClick={() => navigate(path)}
                    title={title}
                    className="relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 group"
                    style={{
                      color: isActive ? "#b8860b" : "#1a0a10",
                      background: isActive ? "rgba(184,134,11,0.08)" : "transparent",
                    }}
                  >
                    <span className="relative">
                      <Icon
                        size={22}
                        style={{ transition: "transform 0.2s, color 0.2s" }}
                        className="group-hover:scale-110 group-hover:text-[#b8860b]"
                      />
                      {isOrder && cartCount > 0 && (
                        <span
                          className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 rounded-full flex items-center justify-center text-white font-extrabold"
                          style={{
                            fontSize: "9px",
                            background: "linear-gradient(135deg, #e91e8c, #c9a227)",
                            padding: "0 3px",
                            lineHeight: 1,
                          }}
                        >
                          {cartCount > 9 ? "9+" : cartCount}
                        </span>
                      )}
                    </span>
                    <span
                      className="text-[10px] font-medium leading-none"
                      style={{
                        color: isActive ? "#b8860b" : "#6b4c2a",
                        opacity: isActive ? 1 : 0.75,
                        transition: "color 0.2s, opacity 0.2s",
                      }}
                    >
                      {title}
                    </span>
                    {isActive && (
                      <span
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: "#b8860b" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Bar Mobile*/}
          <div
            className="sm:hidden sticky top-0 z-40 bg-white flex items-center justify-center px-4 py-3"
            style={{ borderBottom: "1px solid rgba(184,134,11,0.15)" }}
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gradient-brand font-bold text-lg tracking-tight"
              style={{ fontFamily: "var(--font-cinzel, serif)" }}
            >
              <img src="/Logo BGC.jpg" alt="Logo" className="w-8 h-8 object-contain rounded-lg border border-pink-100" />
              <span>BlackGold Cherish</span>
            </button>
          </div>
        </>
      )}

      {/* Bagian Halaman */}
      <div className={`flex-1 ${!isLanding ? "pb-20 sm:pb-0" : ""}`}>
        <Outlet />
      </div>

      {/* Footer Desktop */}
      {!isLanding && (
        <div className="hidden sm:block">
          <Footer />
        </div>
      )}

      {/* Mobile Bottom Nav*/}
      {!isLanding && (
        <nav
          className="sm:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2"
          style={{
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(184,134,11,0.2)",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
          }}
        >
          {NAV_ITEMS.map(({ path, icon: Icon, title }) => {
            const isActive = location.pathname === path;
            const isOrder = path === "/order";
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                title={title}
                className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200"
                style={{
                  color: isActive ? "#b8860b" : "#9e8a7a",
                  background: isActive ? "rgba(184,134,11,0.08)" : "transparent",
                  minWidth: "52px",
                }}
              >
                <span className="relative">
                  <Icon size={22} style={{ transition: "transform 0.2s, color 0.2s" }} />
                  {isOrder && cartCount > 0 && (
                    <span
                      className="absolute -top-1.5 -right-2 min-w-[16px] h-4 rounded-full flex items-center justify-center text-white font-extrabold animate-pulse"
                      style={{
                        fontSize: "9px",
                        background: "linear-gradient(135deg, #e91e8c, #c9a227)",
                        padding: "0 3px",
                        lineHeight: 1,
                      }}
                    >
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </span>
                <span
                  className="text-[9px] font-semibold leading-none text-center w-full"
                  style={{
                    color: isActive ? "#b8860b" : "#9e8a7a",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {title === "Riwayat Pesanan" ? "Riwayat" : title === "Akun Saya" ? "Akun" : title}
                </span>
                {isActive && (
                  <span
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                    style={{ background: "#b8860b" }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
