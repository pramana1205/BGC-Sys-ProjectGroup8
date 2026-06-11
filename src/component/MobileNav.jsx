/**
 * MobileNav.jsx
 * ─────────────────────────────────────────────
 * Hamburger button + slide-in drawer for admin/owner on mobile.
 * Accepts same props as Sidebar/SidebarOwner.
 */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard, MdInventory2, MdBarChart } from "react-icons/md";
import { TbFileDescription, TbMessageStar, TbChartLine, TbUsers } from "react-icons/tb";
import { FiUsers, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { clearAuth } from "../utils/auth";

const ADMIN_MENU = [
  { to: "/dashboard",     icon: MdDashboard,       label: "Ringkasan Statistik" },
  { to: "/orders",        icon: TbFileDescription, label: "Kelola Pesanan" },
  { to: "/manage-produk", icon: MdInventory2,       label: "Kelola Produk" },
  { to: "/customers",     icon: FiUsers,            label: "Data Pelanggan" },
  { to: "/feedback-admin",icon: TbMessageStar,      label: "Pantau Feedback" },
  { to: "/akun-admin",    icon: FiUser,             label: "Profil Saya" },
];

const OWNER_MENU = [
  { to: "/owner-dashboard",  icon: MdDashboard,  label: "Ringkasan Statistik" },
  { to: "/owner-grafik",     icon: TbChartLine,  label: "Grafik Pertumbuhan" },
  { to: "/owner-statistik",  icon: TbUsers,      label: "Statistik Pelanggan" },
  { to: "/akun-owner",       icon: FiUser,       label: "Profil Saya" },
];

export default function MobileNav({ role = "admin" }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menu = role === "owner" ? OWNER_MENU : ADMIN_MENU;
  const accent = role === "owner" ? "#c9a227" : "#e91e8c";
  const accentBg = role === "owner" ? "rgba(201,162,39,0.1)" : "rgba(233,30,140,0.1)";
  const accentBorder = role === "owner" ? "border-amber-500" : "border-pink-500";

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? `bg-gradient-to-r ${role === "owner" ? "from-amber-100 to-yellow-50 text-amber-700" : "from-pink-100 to-pink-50 text-pink-700"} font-semibold border-l-4 ${accentBorder} shadow-sm`
        : "text-gray-600 hover:bg-gray-50"
    }`;

  return (
    <>
      {/* Hamburger button — only visible on mobile (md:hidden) */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors"
        style={{ color: "#374151" }}
        aria-label="Buka menu"
      >
        <FiMenu size={20} />
      </button>

      {/* Drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={() => setOpen(false)}
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}
        >
          {/* Drawer panel */}
          <div
            className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col px-5 py-8"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <div>
                <div
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "var(--font-cinzel, serif)",
                    background: "linear-gradient(90deg, #b8860b, #c9a227)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  BlackGold Cherish
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {role === "owner" ? "Panel Pemilik Toko" : "Panel Administrator"}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Menu items */}
            <nav className="flex-1 space-y-1 overflow-y-auto">
              {menu.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={menuClass}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="text-lg shrink-0" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Logout */}
            <button
              onClick={() => { clearAuth(); navigate("/login"); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-all duration-200 font-medium mt-4"
            >
              <FiLogOut className="text-lg shrink-0" />
              Keluar dari Akun
            </button>

            <div
              className="mt-4 py-3 px-3 text-center rounded-xl"
              style={{
                background: "linear-gradient(135deg, #1a0a10 0%, #2d1020 50%, #1a0a10 100%)",
                border: "1px solid rgba(184,134,11,0.2)",
              }}
            >
              <p
                className="font-bold text-xs mb-0.5"
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
                className="text-[9px] italic"
                style={{ fontFamily: "var(--font-cormorant, serif)", color: "rgba(255,210,230,0.5)" }}
              >
                Koleksi Fashion Eksklusif
              </p>
              <p
                className="text-[8px] mt-1"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                © 2023 BlackGold Cherish
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
