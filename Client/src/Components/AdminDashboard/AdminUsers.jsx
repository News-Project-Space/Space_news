import React, { useEffect, useState } from "react";
import axios from "axios";
import UserMetrics from "./UserMetrics";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [pendingJournalists, setPendingJournalists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        // Get all users from the User model
        const resUsers = await axios.get(
          "http://localhost:8000/api/admin/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Get pending journalist requests from the separate Journalist model
        const resJournalists = await axios.get(
          "http://localhost:8000/api/admin/journalists",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(resUsers.data.users);
        setPendingJournalists(resJournalists.data.journalists);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter users based on role:
  const admins = users.filter((user) => user.role === "admin");
  const approvedJournalists = users.filter(
    (user) => user.role === "journalist"
  );
  const readers = users.filter((user) => user.role === "reader");

  // Chart data for user distribution
  const chartData = [
    { category: "Admins", count: admins.length, color: "#3B82F6" },
    {
      category: "Journalists",
      count: approvedJournalists.length,
      color: "#10B981",
    },
    { category: "Pending", count: pendingJournalists.length, color: "#F59E0B" },
    { category: "Readers", count: readers.length, color: "#8B5CF6" },
  ];

  // Calculate total users for percentage
  const totalUsers =
    admins.length +
    approvedJournalists.length +
    readers.length +
    pendingJournalists.length;

  // User Card Component
  const UserCard = ({ user, badgeText, badgeColor }) => (
    <div className="flex items-center p-4 bg-white border rounded-lg shadow-sm mb-2 hover:shadow transition-shadow duration-200">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
        <span className="text-lg font-semibold text-gray-700">
          {user.fullName.charAt(0)}
        </span>
      </div>
      <div className="flex-grow">
        <h3 className="font-medium">{user.fullName}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${badgeColor}`}
      >
        {badgeText}
      </span>
    </div>
  );

  // Donut Chart Component
  const DonutChart = ({ data, size = 160 }) => {
    let cumulativePercent = 0;
    const radius = size / 2;
    const mid = size / 2;

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={mid} cy={mid} r={radius - 10} fill="white" />
        {data.map((segment) => {
          const percent = segment.count / totalUsers;
          if (percent === 0) return null;

          // Calculate start and end angles
          const startPercent = cumulativePercent;
          cumulativePercent += percent;
          const endPercent = cumulativePercent;

          const startX =
            mid + (radius - 10) * Math.cos(2 * Math.PI * startPercent);
          const startY =
            mid + (radius - 10) * Math.sin(2 * Math.PI * startPercent);
          const endX = mid + (radius - 10) * Math.cos(2 * Math.PI * endPercent);
          const endY = mid + (radius - 10) * Math.sin(2 * Math.PI * endPercent);

          // Create arc flag
          const largeArcFlag = percent > 0.5 ? 1 : 0;

          const pathData = [
            `M ${mid} ${mid}`,
            `L ${startX} ${startY}`,
            `A ${radius - 10} ${
              radius - 10
            } 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            "Z",
          ].join(" ");

          return (
            <path key={segment.category} d={pathData} fill={segment.color} />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <UserMetrics />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-gray-600">
              Manage platform users and access requests
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* Dashboard Cards and Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow col-span-2">
                <h2 className="text-xl font-semibold mb-4">
                  User Distribution
                </h2>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DonutChart data={chartData} />
                  </div>
                  <div className="ml-8 grid grid-cols-2 gap-4 flex-grow">
                    {chartData.map((item) => (
                      <div key={item.category} className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <div>
                          <p className="font-medium">{item.category}</p>
                          <p className="text-lg font-semibold">{item.count}</p>
                          <p className="text-sm text-gray-500">
                            {totalUsers > 0
                              ? Math.round((item.count / totalUsers) * 100)
                              : 0}
                            %
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-lg shadow text-white">
                <h2 className="text-xl font-semibold mb-6">User Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-400">
                    <span>Total Users</span>
                    <span className="text-2xl font-bold">{totalUsers}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-blue-400">
                    <span>Pending Approvals</span>
                    <span className="text-2xl font-bold">
                      {pendingJournalists.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Journalists Ratio</span>
                    <span className="text-2xl font-bold">
                      {totalUsers > 0
                        ? Math.round(
                            (approvedJournalists.length / totalUsers) * 100
                          )
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Admins */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    Administrators
                  </h2>
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
                    {admins.length} users
                  </span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {admins.length === 0 ? (
                    <p className="text-gray-500 italic py-4">
                      No administrators found
                    </p>
                  ) : (
                    admins.map((admin) => (
                      <UserCard
                        key={admin._id}
                        user={admin}
                        badgeText="Admin"
                        badgeColor="bg-blue-100 text-blue-800"
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Approved Journalists */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    Journalists
                  </h2>
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
                    {approvedJournalists.length} users
                  </span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {approvedJournalists.length === 0 ? (
                    <p className="text-gray-500 italic py-4">
                      No journalists found
                    </p>
                  ) : (
                    approvedJournalists.map((journalist) => (
                      <UserCard
                        key={journalist._id}
                        user={journalist}
                        badgeText="Journalist"
                        badgeColor="bg-green-100 text-green-800"
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Pending Journalists */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                    Pending Approvals
                  </h2>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold">
                    {pendingJournalists.length} requests
                  </span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {pendingJournalists.length === 0 ? (
                    <p className="text-gray-500 italic py-4">
                      No pending requests
                    </p>
                  ) : (
                    pendingJournalists.map((journalist) => (
                      <UserCard
                        key={journalist._id}
                        user={journalist}
                        badgeText={journalist.status}
                        badgeColor="bg-yellow-100 text-yellow-800"
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Readers */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                    Readers
                  </h2>
                  <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-semibold">
                    {readers.length} users
                  </span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {readers.length === 0 ? (
                    <p className="text-gray-500 italic py-4">
                      No readers found
                    </p>
                  ) : (
                    readers.map((reader) => (
                      <UserCard
                        key={reader._id}
                        user={reader}
                        badgeText="Reader"
                        badgeColor="bg-purple-100 text-purple-800"
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
