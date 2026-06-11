import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarOwner from "../component/SidebarOwner";
import { Outlet } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { getRole, getToken, clearAuth } from "../utils/auth";
import MobileNav from "../component/MobileNav";

export default function OwnerLayouts() {
  const navigate = useNavigate();
  const role = getRole();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (role !== "owner") {
      navigate("/");
    }
  }, [navigate, role, token]);

  return (
    <div className="bg-gray-50 min-h-screen flex">
      
      <div className="hidden md:block">
        <SidebarOwner />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center justify-between shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            
            <MobileNav role="owner" />
            <div>
              <h1 className="text-base sm:text-lg font-semibold text-gray-800">Panel Pemilik Toko</h1>
              <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">Pantau pertumbuhan dan statistik bisnis Anda</p>
            </div>
          </div>

          
          <button
            onClick={() => { clearAuth(); navigate("/login"); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 border border-red-100 hover:border-red-200 transition-all duration-200"
          >
            <FiLogOut size={15} />
            Keluar
          </button>
        </header>

        
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
