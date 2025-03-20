// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// function Profile() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [activeTab, setActiveTab] = useState('user-details');
//   const [userData, setUserData] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedName, setEditedName] = useState('');
//   const [editedPreferences, setEditedPreferences] = useState([]);

//   const interestOptions = [
//     { id: 1, value: "The Solar System", label: "The Solar System" },
//     { id: 2, value: "Astrobiology & Alien Life", label: "Astrobiology & Alien Life" },
//     { id: 3, value: "Astronomy & Space Science", label: "Astronomy & Space Science" },
//     { id: 4, value: "Space Technology & Innovation", label: "Space Technology & Innovation" }
//   ];

//   useEffect(() => {
//     if (id) {
//       fetch(`http://localhost:8000/api/user/details/${id}`)
//         .then((response) => response.json())
//         .then((data) => setUserData(data))
//         .catch((error) => console.error('Error fetching user data:', error));
//     }
//   }, [id]);

//   const savedArticles = [
//     { id: 1, title: "The Future of AI", date: "Feb 12, 2025" },
//     { id: 2, title: "Exploring Mars", date: "Jan 30, 2025" },
//     { id: 3, title: "Ancient Civilizations", date: "Jan 15, 2025" }
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//     window.location.reload();
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//     setEditedName(userData.fullName);
//     setEditedPreferences(userData.preferences);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//   };

//   const handleSave = () => {
//     console.log(editedPreferences);
//     // Send the updated user data, ensuring that preferences is an array.
//     fetch(`http://localhost:8000/api/user/update/${id}`, {
//       method: "PUT", // Consider PATCH if doing partial updates.
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         fullName: editedName,
//         preferences: editedPreferences // Expected to be an array.
//       })
//     })
//       .then(response => response.json())
//       .then(data => {
//         setUserData(data);
//         setIsEditing(false);
//       })
//       .catch(error => console.error("Error updating user data:", error));
//   };

//   // Enhanced Interests Selector Component
//   const InterestsSelector = ({ value, onChange, options }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const dropdownRef = useRef(null);

//     // Filter options based on the search term
//     const filteredOptions = options.filter(option =>
//       option.label.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     useEffect(() => {
//       const handleClickOutside = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//           setIsOpen(false);
//         }
//       };

//       document.addEventListener('mousedown', handleClickOutside);
//       return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     // Toggle selection of an interest
//     const toggleInterest = (interestValue) => {
//       const updatedInterests = value.includes(interestValue)
//         ? value.filter(item => item !== interestValue)
//         : [...value, interestValue];
//       onChange(updatedInterests);
//     };

//     // Remove a selected interest
//     const removeInterest = (interestValue) => {
//       onChange(value.filter(item => item !== interestValue));
//     };

//     return (
//       <div className="relative w-full" ref={dropdownRef}>
//         {/* Display selected interests */}
//         <div
//           className="border border-gray-300 rounded-md p-2 min-h-12 flex flex-wrap gap-2 cursor-pointer"
//           onClick={() => setIsOpen(true)}
//         >
//           {value.length > 0 ? (
//             value.map((interest) => {
//               const option = options.find(opt => opt.value === interest);
//               return (
//                 <div key={interest} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center">
//                   {option?.label || interest}
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       removeInterest(interest);
//                     }}
//                     className="ml-1 text-blue-700 hover:text-blue-900"
//                   >
//                     ×
//                   </button>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-gray-400">Select your interests...</div>
//           )}
//         </div>

//         {/* Dropdown menu */}
//         {isOpen && (
//           <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
//             {/* Search Input */}
//             <div className="p-2 border-b border-gray-200">
//               <input
//                 type="text"
//                 placeholder="Search interests..."
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 autoFocus
//               />
//             </div>

//             {/* Options List */}
//             <div className="max-h-60 overflow-y-auto">
//               {filteredOptions.length > 0 ? (
//                 filteredOptions.map((option) => (
//                   <div
//                     key={option.id}
//                     className={`p-2 hover:bg-gray-100 cursor-pointer flex items-center ${value.includes(option.value) ? 'bg-blue-50' : ''}`}
//                     onClick={() => toggleInterest(option.value)}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={value.includes(option.value)}
//                       onChange={() => { }}
//                       className="mr-2"
//                     />
//                     {option.label}
//                   </div>
//                 ))
//               ) : (
//                 <div className="p-3 text-center text-gray-500">No matching interests found</div>
//               )}
//             </div>

//             {/* Dropdown Actions */}
//             <div className="p-2 border-t border-gray-200 flex justify-between">
//               <button
//                 className="px-3 py-1 text-gray-600 hover:text-gray-800"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Cancel
//               </button>
//               <div>
//                 <button
//                   className="px-3 py-1 text-gray-600 hover:text-gray-800 mr-2"
//                   onClick={() => onChange([])}
//                 >
//                   Clear All
//                 </button>
//                 <button
//                   className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Apply
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white p-6 shadow-md">
//         <div className="mb-8 text-center">
//           <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
//             <div className="text-2xl font-bold text-blue-600">
//               <img
//                 src="https://braverplayers.org/wp-content/uploads/2022/09/blank-pfp.png"
//                 alt="pfp"
//                 className="h-full w-full object-cover rounded-full"
//               />
//             </div>
//           </div>
//         </div>
//         <nav>
//           <ul className="space-y-2">
//             <li>
//               <button
//                 onClick={() => setActiveTab('user-details')}
//                 className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'user-details' ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
//               >
//                 <span className="mr-3">👤</span> User Details
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab('saved-articles')}
//                 className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'saved-articles' ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
//               >
//                 <span className="mr-3">📑</span> Saved Articles
//               </button>
//             </li>
//           </ul>
//         </nav>
//         <div className="mt-8 pt-8 border-t border-gray-200" onClick={handleLogout}>
//           <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200">
//             Sign Out
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8 overflow-auto">
//         <div className="max-w-4xl mx-auto">
//           {activeTab === 'user-details' && userData && (
//             <div id="user-details">
//               <h1 className="text-2xl font-bold mb-6">User Details</h1>
//               <div className="bg-white p-6 rounded-lg shadow-sm">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Full Name */}
//                   <div>
//                     <h3 className="text-gray-500 text-sm mb-1">Full Name</h3>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={editedName}
//                         onChange={(e) => setEditedName(e.target.value)}
//                         className="border border-gray-300 rounded-md p-2 w-full"
//                       />
//                     ) : (
//                       <p className="font-medium">{userData.fullName}</p>
//                     )}
//                   </div>

//                   {/* Email */}
//                   <div>
//                     <h3 className="text-gray-500 text-sm mb-1">Email</h3>
//                     <p className="font-medium">{userData.email}</p>
//                   </div>

//                   {/* Member Since */}
//                   <div>
//                     <h3 className="text-gray-500 text-sm mb-1">Member Since</h3>
//                     <p className="font-medium">{new Date(userData.createdAt).toLocaleDateString()}</p>
//                   </div>

//                   {/* Interests */}
//                   <div>
//                     <h3 className="text-gray-500 text-sm mb-1">Interests</h3>
//                     {isEditing ? (
//                       <InterestsSelector
//                         value={editedPreferences}
//                         onChange={setEditedPreferences}
//                         options={interestOptions}
//                       />
//                     ) : (
//                       <div className="flex flex-wrap gap-2 mt-1">
//                         {userData.preferences.map((interest, index) => (
//                           <span key={index} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
//                             {interest}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="mt-6 flex space-x-2">
//                   {isEditing ? (
//                     <>
//                       <button
//                         onClick={handleSave}
//                         className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={handleCancel}
//                         className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       onClick={handleEdit}
//                       className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
//                     >
//                       Edit Profile
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'saved-articles' && (
//             <div id="saved-articles">
//               <h1 className="text-2xl font-bold mb-6">Saved Articles</h1>
//               <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
//                 {savedArticles.map(article => (
//                   <div key={article.id} className="p-4 hover:bg-gray-50">
//                     <h3 className="font-medium text-lg">{article.title}</h3>
//                     <div className="flex justify-between items-center mt-2">
//                       <span className="text-gray-500 text-sm">{article.date}</span>
//                       <div className="flex space-x-2">
//                         <button className="text-blue-600 hover:text-blue-800">Read</button>
//                         <button className="text-red-600 hover:text-red-800">Remove</button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import UserDetails from "./UserDetails";
import SavedArticles from "./SavedArticles";

function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("user-details");
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedPreferences, setEditedPreferences] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/user/details/${id}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ProfileSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {activeTab === "user-details" && userData && (
            <UserDetails
              userData={userData}
              setUserData={setUserData}
              isEditing={isEditing}
              editedName={editedName}
              setEditedName={setEditedName}
              editedPreferences={editedPreferences}
              setEditedPreferences={setEditedPreferences}
              setIsEditing={setIsEditing}
              id={id}
            />
          )}

          {activeTab === "saved-articles" && <SavedArticles />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
