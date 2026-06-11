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
      
      <div className="mb-8 pb-4 border-b border-gray-100 flex items-center gap-3">
        <img src="/Logo BGC.jpg" alt="Logo" className="w-10 h-10 object-contain rounded-lg border border-pink-100 shrink-0" />
        <div>
          <div
            className="text-gradient-brand text-sm font-bold"
            style={{ fontFamily: "var(--font-cinzel, serif)", lineHeight: "1.2" }}
          >
            BlackGold Cherish
          </div>
          <p className="text-[10px] text-gray-400 mt-1">Panel Pemilik Toko</p>
        </div>
      </div>

      
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

      <p className="text-[10px] text-gray-300 text-center mt-6">
        © 2023 BlackGold Cherish
      </p>
    </div>
  );
}
