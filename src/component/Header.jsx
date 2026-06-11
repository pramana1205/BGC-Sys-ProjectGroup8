import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { BsChatLeftDots } from "react-icons/bs";
import { IoGiftOutline } from "react-icons/io5";

export default function Header() {
  return (
    <div
      id="header-container"
      className="flex justify-between items-center p-4"
    >
      <div id="search-bar" className="relative w-250 max-w-lg">
        <input
          id="search-input"
          type="text"
          placeholder="Search Here..."
          className="border border-gray-100 p-2 pr-10 bg-white 
          w-full max-w-lg rounded-md outline-none"
        />
        <FaSearch
          id="search-icon"
          className="absolute right-4 
        top-1/2 transform -translate-y-1/2 text-gray-300"
        />
      </div>

      <div id="icons-container" className="flex items-center space-x-4">
        
        <div
          id="notification-icon"
          className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer"
        >
          <FaBell />
          <span
            id="notification-badge"
            className="absolute top-0 right-0 transform translate-x-1/2 
            -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs"
          >
            50
          </span>
        </div>
        <div
          id="message-icon"
          className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer"
        >
          <BsChatLeftDots />
          <span
            id="message-badge"
            className="absolute top-0 right-0 transform translate-x-1/2 
            -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs"
          >
            50
          </span>
        </div>
        <div
          id="gift-icon"
          className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer"
        >
          <IoGiftOutline />
          <span
            id="gift-badge"
            className="absolute top-0 right-0 transform translate-x-1/2 
            -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs"
          >
            50
          </span>
        </div>
        <div
          id="chart-icon"
          className="p-3 bg-blue-100 rounded-2xl cursor-pointer"
        >
          <FcAreaChart />
        </div>
        <div
          id="settings-icon"
          className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer"
        >
          <SlSettings />
        </div>

        <div
          id="profile-container"
          className="flex items-center space-x-4 border-l pl-4 border-gray-300"
        >
          <span id="profile-text">
            Hello, <b>M. Pramana Nugraha</b>
          </span>
          <img
            id="profile-avatar"
            src="https://th.bing.com/th/id/OIP.pOS9pa74mD-QIt0sChXMOgHaHa?w=218&h=218&c=7&r=0&o=7&pid=1.7&rm=3"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
