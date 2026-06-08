import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import { Outlet } from "react-router-dom";
import { FiBell, FiUser } from "react-icons/fi";
import { getRole, getToken } from "../utils/auth";

export default function AdminLayouts() {
  const navigate = useNavigate();
  const role = getRole();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (role !== "admin") {
      navigate("/");
    }
  }, [navigate, role, token]);

  return (
    <div className="bg-gray-50 min-h-screen flex">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Dashboard Admin</h1>
            <p className="text-xs text-gray-400 mt-1">Kelola bisnis BlackGold Cherish Anda</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-600">
              <FiBell size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-600">
              <FiUser size={20} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}