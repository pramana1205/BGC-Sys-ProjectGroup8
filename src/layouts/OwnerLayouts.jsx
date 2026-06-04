import SidebarOwner from "../component/SidebarOwner";
import { Outlet } from "react-router-dom";

export default function OwnerLayouts() {
  return (
    <div className="bg-gray-50 min-h-screen flex">
      <SidebarOwner />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
