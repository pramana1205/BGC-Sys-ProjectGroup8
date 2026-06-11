import { MdDashboard, MdBarChart } from "react-icons/md";
import { TbChartLine, TbUsers } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function SidebarOwner() {

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-amber-100 to-yellow-50 text-amber-700 font-semibold border-l-4 border-amber-500 shadow-sm"
        : "text-gray-600 hover:bg-amber-50 hover:text-amber-600"
    }`;

  return (
    <div className="flex flex-col w-64 min-h-screen bg-white shadow-md px-5 py-8">
      {/* Brand */}
      <div className="mb-8 pb-4 border-b border-gray-100">
        <div
          className="text-gradient-brand text-lg font-bold"
          style={{ fontFamily: "var(--font-cinzel, serif)" }}
        >
          BlackGold Cherish
        </div>
        <p className="text-xs text-gray-400 mt-2">Panel Pemilik Toko</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
          📊 Analitik
        </p>

        <NavLink to="/owner-dashboard" className={menuClass}>
          <MdDashboard className="text-lg shrink-0" />
          <span>Ringkasan Statistik</span>
        </NavLink>

        <NavLink to="/owner-grafik" className={menuClass}>
          <TbChartLine className="text-lg shrink-0" />
          <span>Grafik Pertumbuhan</span>
        </NavLink>

        <NavLink to="/owner-statistik" className={menuClass}>
          <TbUsers className="text-lg shrink-0" />
          <span>Statistik Pelanggan</span>
        </NavLink>

        <div className="pt-6 mt-6 border-t border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
            ⚙️ Pengaturan
          </p>
          <NavLink to="/akun-owner" className={menuClass}>
            <FiUser className="text-lg shrink-0" />
            <span>Profil Saya</span>
          </NavLink>
        </div>
      </nav>

      <div
        className="mt-6 py-3 px-3 text-center rounded-xl"
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
  );
}
