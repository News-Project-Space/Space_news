// src/Components/AdminDashboard/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#23120B] text-[#F1F1F1] shadow-md flex flex-col">
      <div className="px-6 py-4 border-b border-[#F1F1F1]/20 flex items-center justify-center">
        <img src={logo} alt="Orbitra Logo" className="h-12 mr-2" />
        <div className="text-xl font-bold text-[#FDB827]">ORBITRA</div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/admin"
          className="block px-4 py-2 rounded hover:bg-[#21209C]/20 transition duration-200 text-[#F1F1F1] hover:text-[#FDB827]"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/articles"
          className="block px-4 py-2 rounded hover:bg-[#21209C]/20 transition duration-200 text-[#F1F1F1] hover:text-[#FDB827]"
        >
          Articles
        </Link>
        <Link
          to="/admin/users"
          className="block px-4 py-2 rounded hover:bg-[#21209C]/20 transition duration-200 text-[#F1F1F1] hover:text-[#FDB827]"
        >
          Users
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
