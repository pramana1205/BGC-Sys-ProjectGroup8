import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="auth-page">
      {/* ── Dot-grid texture overlay ── */}
      <div className="auth-dotgrid" />

      {/* ── Floating colour orbs ── */}
      <div className="auth-orb1 absolute rounded-full blur-3xl animate-float-orb" />
      <div className="auth-orb2 absolute rounded-full blur-3xl animate-float-orb" />
      <div className="auth-orb3 absolute rounded-full blur-3xl animate-float-orb" />
      <div className="auth-orb4 absolute rounded-full blur-3xl animate-float-orb" />

      {/* ── Corner flourishes (SVG) ── */}
      <svg className="auth-corner auth-corner--tl" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10 Q60 10 60 60" stroke="url(#g1)" strokeWidth="1.2" strokeDasharray="4 3" fill="none"/>
        <path d="M10 10 Q10 60 60 60" stroke="url(#g1)" strokeWidth="1.2" strokeDasharray="4 3" fill="none"/>
        <circle cx="10" cy="10" r="4" fill="#c9a227" opacity="0.7"/>
        <circle cx="60" cy="60" r="3" fill="#dc143c" opacity="0.5"/>
        <circle cx="35" cy="12" r="2" fill="#e91e8c" opacity="0.5"/>
        <circle cx="12" cy="35" r="2" fill="#c9a227" opacity="0.5"/>
        <path d="M20 5 L25 15 L15 15 Z" fill="#c9a227" opacity="0.25"/>
        <path d="M5 20 L15 25 L15 15 Z" fill="#e91e8c" opacity="0.2"/>
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c9a227"/>
            <stop offset="100%" stopColor="#dc143c"/>
          </linearGradient>
        </defs>
      </svg>

      <svg className="auth-corner auth-corner--tr" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M110 10 Q60 10 60 60" stroke="url(#g2)" strokeWidth="1.2" strokeDasharray="4 3" fill="none"/>
        <path d="M110 10 Q110 60 60 60" stroke="url(#g2)" strokeWidth="1.2" strokeDasharray="4 3" fill="none"/>
        <circle cx="110" cy="10" r="4" fill="#dc143c" opacity="0.7"/>
        <circle cx="60" cy="60" r="3" fill="#c9a227" opacity="0.5"/>
        <circle cx="85" cy="12" r="2" fill="#c9a227" opacity="0.5"/>
        <circle cx="108" cy="35" r="2" fill="#e91e8c" opacity="0.5"/>
        <path d="M100 5 L105 15 L95 15 Z" fill="#dc143c" opacity="0.25"/>
        <defs>
          <linearGradient id="g2" x1="120" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#dc143c"/>
            <stop offset="100%" stopColor="#c9a227"/>
          </linearGradient>
        </defs>
      </svg>

      <svg className="auth-corner auth-corner--br" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M110 110 Q60 110 60 60" stroke="url(#g3)" strokeWidth="1.2" strokeDasharray="4 3" fill="none"/>
        <path d="M110 110 Q110 60 60 60" stroke="url(#g3)" strokeWidth="1.2" strokeDasharray="4 3" fill="none"/>
        <circle cx="110" cy="110" r="4" fill="#c9a227" opacity="0.7"/>
        <circle cx="60" cy="60" r="3" fill="#dc143c" opacity="0.5"/>
        <circle cx="85" cy="108" r="2" fill="#e91e8c" opacity="0.5"/>
        <path d="M100 115 L105 105 L95 105 Z" fill="#c9a227" opacity="0.25"/>
        <defs>
          <linearGradient id="g3" x1="120" y1="120" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c9a227"/>
            <stop offset="100%" stopColor="#e91e8c"/>
          </linearGradient>
        </defs>
      </svg>

      <svg className="auth-corner auth-corner--bl" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 110 Q60 110 60 60" stroke="url(#g4)" strokeWidth="1.2" strokeDasharray="4 3" fill="none"/>
        <path d="M10 110 Q10 60 60 60" stroke="url(#g4)" strokeWidth="1.2" strokeDasharray="4 3" fill="none"/>
        <circle cx="10" cy="110" r="4" fill="#e91e8c" opacity="0.7"/>
        <circle cx="60" cy="60" r="3" fill="#c9a227" opacity="0.5"/>
        <circle cx="35" cy="108" r="2" fill="#dc143c" opacity="0.5"/>
        <path d="M20 115 L25 105 L15 105 Z" fill="#e91e8c" opacity="0.25"/>
        <defs>
          <linearGradient id="g4" x1="0" y1="120" x2="120" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e91e8c"/>
            <stop offset="100%" stopColor="#c9a227"/>
          </linearGradient>
        </defs>
      </svg>

      {/* ── Floating diamonds ── */}
      <div className="auth-diamond auth-diamond--1" />
      <div className="auth-diamond auth-diamond--2" />
      <div className="auth-diamond auth-diamond--3" />
      <div className="auth-diamond auth-diamond--4" />
      <div className="auth-diamond auth-diamond--5" />

      {/* ── Sparkle dots ── */}
      <div className="auth-sparkle auth-sparkle--1">✦</div>
      <div className="auth-sparkle auth-sparkle--2">✦</div>
      <div className="auth-sparkle auth-sparkle--3">✧</div>
      <div className="auth-sparkle auth-sparkle--4">✦</div>
      <div className="auth-sparkle auth-sparkle--5">✧</div>
      <div className="auth-sparkle auth-sparkle--6">✦</div>

      {/* ── Thin arc lines ── */}
      <svg className="auth-arc auth-arc--left" viewBox="0 0 100 400" fill="none">
        <path d="M80 0 Q-20 200 80 400" stroke="url(#arcL)" strokeWidth="1" fill="none" opacity="0.35"/>
        <path d="M60 0 Q-40 200 60 400" stroke="url(#arcL)" strokeWidth="0.7" fill="none" opacity="0.2"/>
        <defs>
          <linearGradient id="arcL" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c9a227"/>
            <stop offset="50%" stopColor="#dc143c"/>
            <stop offset="100%" stopColor="#e91e8c"/>
          </linearGradient>
        </defs>
      </svg>

      <svg className="auth-arc auth-arc--right" viewBox="0 0 100 400" fill="none">
        <path d="M20 0 Q120 200 20 400" stroke="url(#arcR)" strokeWidth="1" fill="none" opacity="0.35"/>
        <path d="M40 0 Q140 200 40 400" stroke="url(#arcR)" strokeWidth="0.7" fill="none" opacity="0.2"/>
        <defs>
          <linearGradient id="arcR" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e91e8c"/>
            <stop offset="50%" stopColor="#dc143c"/>
            <stop offset="100%" stopColor="#c9a227"/>
          </linearGradient>
        </defs>
      </svg>

      {/* ── Main content ── */}
      <div className="auth-container">
        {/* Brand header */}
        <div className="auth-header">
          <h1 className="auth-brand text-gradient-brand">
            BlackGold Cherish
          </h1>
          <div className="auth-divider" />
          <p className="auth-tagline">
            ✨ Temukan keindahan dalam setiap momen berharga ✨
          </p>
        </div>

        {/* Form card */}
        <div className="auth-card">
          <Outlet />
        </div>

        {/* Footer */}
        <p className="auth-footer">
          © 2025{" "}
          <span className="font-bold text-gradient-brand">
            BlackGold Cherish
          </span>{" "}
          • All rights reserved
        </p>
      </div>
    </div>
  );
}
