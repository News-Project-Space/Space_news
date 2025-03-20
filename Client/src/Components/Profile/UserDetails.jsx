import React from "react";
import InterestsSelector from "./InterestsSelector";

function UserDetails({
  userData,
  isEditing,
  editedName,
  setEditedName,
  editedPreferences,
  setEditedPreferences,
  setIsEditing,
  setUserData,
  id,
}) {
  const handleSave = () => {
    fetch(`http://localhost:8000/api/user/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: editedName,
        preferences: editedPreferences,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating user data:", error));
  };

  return (
    <div id="user-details">
      <h1 className="text-2xl font-bold mb-6 text-[#23120B]">User Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FDB827]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <h3 className="text-[#23120B] text-sm mb-1 font-medium">
              Full Name
            </h3>
            {isEditing ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#FDB827]"
              />
            ) : (
              <p className="font-medium text-[#23120B]">{userData.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <h3 className="text-[#23120B] text-sm mb-1 font-medium">Email</h3>
            <p className="font-medium text-[#23120B]">{userData.email}</p>
          </div>

          {/* Interests */}
          <div>
            <h3 className="text-[#23120B] text-sm mb-1 font-medium">
              Interests
            </h3>
            {isEditing ? (
              <InterestsSelector
                value={editedPreferences}
                onChange={setEditedPreferences}
                options={[
                  {
                    id: 1,
                    value: "The Solar System",
                    label: "The Solar System",
                  },
                  {
                    id: 2,
                    value: "Astrobiology & Alien Life",
                    label: "Astrobiology & Alien Life",
                  },
                  {
                    id: 3,
                    value: "Astronomy & Space Science",
                    label: "Astronomy & Space Science",
                  },
                  {
                    id: 4,
                    value: "Space Technology & Innovation",
                    label: "Space Technology & Innovation",
                  },
                ]}
              />
            ) : (
              <div className="flex flex-wrap gap-2 mt-1">
                {userData.preferences.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-[#F1F1F1] text-[#23120B] px-3 py-1 rounded-full text-sm border border-[#FDB827]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Buttons for saving or canceling the edit */}
        <div className="mt-6 flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-[#23120B] text-white py-2 px-4 rounded-md hover:bg-[#23120B]/90 transition duration-200 flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2 text-[#FDB827]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-white text-[#23120B] py-2 px-4 rounded-md border border-[#23120B] hover:bg-[#F1F1F1] transition duration-200"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[#23120B] text-white py-2 px-4 rounded-md hover:bg-[#23120B]/90 transition duration-200 flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2 text-[#FDB827]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
