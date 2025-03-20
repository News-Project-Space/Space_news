import React from 'react';
import InterestsSelector from './InterestsSelector';

function UserDetails({
    userData,
    isEditing,
    editedName,
    setEditedName,
    editedPreferences,
    setEditedPreferences,
    setIsEditing,
    setUserData,
    id
}) {


    const handleSave = () => {

        fetch(`http://localhost:8000/api/user/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName: editedName,
                preferences: editedPreferences
            })
        })
            .then(response => response.json())
            .then(data => {
                setUserData(data);
                setIsEditing(false);
            })
            .catch(error => console.error("Error updating user data:", error));
    };



    return (
        <div id="user-details">
            <h1 className="text-2xl font-bold mb-6">User Details</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                        <h3 className="text-gray-500 text-sm mb-1">Full Name</h3>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        ) : (
                            <p className="font-medium">{userData.fullName}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <h3 className="text-gray-500 text-sm mb-1">Email</h3>
                        <p className="font-medium">{userData.email}</p>
                    </div>

                    {/* Interests */}
                    <div>
                        <h3 className="text-gray-500 text-sm mb-1">Interests</h3>
                        {isEditing ? (
                            <InterestsSelector
                                value={editedPreferences}
                                onChange={setEditedPreferences}
                                options={[
                                    { id: 1, value: "The Solar System", label: "The Solar System" },
                                    { id: 2, value: "Astrobiology & Alien Life", label: "Astrobiology & Alien Life" },
                                    { id: 3, value: "Astronomy & Space Science", label: "Astronomy & Space Science" },
                                    { id: 4, value: "Space Technology & Innovation", label: "Space Technology & Innovation" },
                                ]}
                            />
                        ) : (
                            <div className="flex flex-wrap gap-2 mt-1">
                                {userData.preferences.map((interest, index) => (
                                    <span key={index} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
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
                                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)} // Cancel editing
                                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)} // Start editing
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
