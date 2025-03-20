import React from 'react';

function ProfileSidebar({ activeTab, setActiveTab, handleLogout }) {
  return (
    <div className="w-64 bg-white p-6 shadow-md">
      <div className="mb-8 text-center">
        <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
          <img
            src="https://braverplayers.org/wp-content/uploads/2022/09/blank-pfp.png"
            alt="pfp"
            className="h-full w-full object-cover rounded-full"
          />
        </div>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab('user-details')}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'user-details' ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
            >
              <span className="mr-3">👤</span> User Details
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('saved-articles')}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'saved-articles' ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
            >
              <span className="mr-3">📑</span> Saved Articles
            </button>
          </li>
        </ul>
      </nav>
      <div className="mt-8 pt-8 border-t border-gray-200" onClick={handleLogout}>
        <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200">
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default ProfileSidebar;
