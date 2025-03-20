// src/Components/AdminDashboard/TopNav.jsx
import React from "react";

const TopNav = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-[#21209C] text-[#F1F1F1] shadow-sm">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-[#FDB827] text-[#23120B] px-4 py-2 rounded hover:bg-[#FDB827]/80 transition duration-300 font-medium"
      >
        Logout
      </button>
    </header>
  );
};

export default TopNav;
