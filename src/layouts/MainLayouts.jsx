import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LuTag,
  LuShoppingCart,
  LuHistory,
  LuCircleUserRound,
  LuHeart,
} from "react-icons/lu";

const NAV_ITEMS = [
  { path: "/koleksi", icon: LuTag, title: "Koleksi" },
  { path: "/wishlist", icon: LuHeart, title: "Wishlist" },
  { path: "/order", icon: LuShoppingCart, title: "Order" },
  { path: "/riwayat", icon: LuHistory, title: "Riwayat Pesanan" },
  { path: "/akun", icon: LuCircleUserRound, title: "Akun Saya" },
];

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #1a0a10 0%, #2d1020 50%, #1a0a10 100%)",
        borderTop: "1px solid rgba(184,134,11,0.2)",
      }}
      className="mt-auto py-6 px-6 text-center"
    >
      <p
        className="font-bold text-lg mb-1"
        style={{
          fontFamily: "var(--font-cinzel, serif)",
          background: "linear-gradient(90deg, #b8860b, #e8c862, #b8860b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        BlackGold Cherish
      </p>
      <p
        className="text-sm italic"
        style={{
          fontFamily: "var(--font-cormorant, serif)",
          color: "rgba(255,210,230,0.6)",
        }}
      >
        Koleksi Fashion Eksklusif untuk Wanita Modern dan Elegan
      </p>
      <p
        className="text-[10px] mt-2"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        © 2023 BlackGold Cherish. All rights reserved.
      </p>
    </footer>
  );
}

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === "/";

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
                return (
                  <button
                    key={path}
                    onClick={() => navigate(path)}
                    title={title}
                    className="relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 group"
                    style={{
                      color: isActive ? "#b8860b" : "#1a0a10",
                      background: isActive
                        ? "rgba(184,134,11,0.08)"
                        : "transparent",
                    }}
                  >
                    <Icon
                      size={22}
                      style={{ transition: "transform 0.2s, color 0.2s" }}
                      className="group-hover:scale-110 group-hover:text-[#b8860b]"
                    />
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

      
      <div className={`flex-1 ${!isLanding ? "pb-20 sm:pb-0" : ""}`}>
        <Outlet />
      </div>

      {!isLanding && (
        <div className="hidden sm:block">
          <Footer />
        </div>
      )}

      
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
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                title={title}
                className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200"
                style={{
                  color: isActive ? "#b8860b" : "#9e8a7a",
                  background: isActive
                    ? "rgba(184,134,11,0.08)"
                    : "transparent",
                  minWidth: "52px",
                }}
              >
                <Icon
                  size={22}
                  style={{ transition: "transform 0.2s, color 0.2s" }}
                />
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
