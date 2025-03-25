import React from "react";

function ProfileSidebar({ activeTab, setActiveTab, handleLogout }) {
  return (
    <div className="w-64 bg-white p-6 shadow-md rounded-lg border-l-4 border-[#FDB827]">
      <div className="mb-8 text-center">
        <div className="h-24 w-24 rounded-full bg-[#F1F1F1] flex items-center justify-center mx-auto mb-4 border-2 border-[#FDB827] overflow-hidden">
          <img
            src="https://braverplayers.org/wp-content/uploads/2022/09/blank-pfp.png"
            alt="pfp"
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        <h3 className="text-[#23120B] font-bold">My Profile</h3>
      </div>

      <nav>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => setActiveTab("user-details")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-200 ${
                activeTab === "user-details"
                  ? "bg-[#23120B] text-white font-medium"
                  : "hover:bg-[#F1F1F1] text-[#23120B]"
              }`}
            >
              <svg
                className={`w-5 h-5 mr-3 ${
                  activeTab === "user-details"
                    ? "text-[#FDB827]"
                    : "text-[#23120B]"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              User Details
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("saved-articles")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-200 ${
                activeTab === "saved-articles"
                  ? "bg-[#23120B] text-white font-medium"
                  : "hover:bg-[#F1F1F1] text-[#23120B]"
              }`}
            >
              <svg
                className={`w-5 h-5 mr-3 ${
                  activeTab === "saved-articles"
                    ? "text-[#FDB827]"
                    : "text-[#23120B]"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
              </svg>
              Saved Articles
            </button>
          </li>
        </ul>
      </nav>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full bg-white text-[#23120B] py-3 px-4 rounded-lg border border-[#23120B] hover:bg-[#F1F1F1] transition-colors font-medium flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default ProfileSidebar;
