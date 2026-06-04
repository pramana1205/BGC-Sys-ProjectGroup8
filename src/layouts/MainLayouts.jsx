import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LuTag,
  LuShoppingCart,
  LuHistory,
  LuCircleUserRound,
} from "react-icons/lu";

const NAV_ITEMS = [
  { path: "/koleksi", icon: LuTag, title: "Koleksi" },
  { path: "/order", icon: LuShoppingCart, title: "Order" },
  { path: "/riwayat", icon: LuHistory, title: "Riwayat Pesanan" },
  { path: "/akun", icon: LuCircleUserRound, title: "Akun Saya" },
];

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[#fffafb]">
      {!isLanding && (
        <nav className="kol-navbar sticky top-0 z-40 bg-white flex items-center justify-between px-6 sm:px-10 py-4">
          {/* Brand */}
          <button
            onClick={() => navigate("/")}
            className="text-gradient-brand font-bold text-xl tracking-tight"
            style={{ fontFamily: "var(--font-cinzel, serif)" }}
          >
            BlackGold Cherish
          </button>

          {/* Icons */}
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
                    style={{
                      transition: "transform 0.2s, color 0.2s",
                      transform: "scale(1)",
                    }}
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
                  {/* Active indicator dot */}
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
      )}
      <Outlet />
    </div>
  );
}
