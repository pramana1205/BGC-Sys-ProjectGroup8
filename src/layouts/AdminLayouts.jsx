import Sidebar from "../component/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayouts() {
  return (
    <div className="bg-gray-50 min-h-screen flex">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}