// import { useState } from "react";
// import { Link, Outlet } from "react-router-dom";
// import { FaRegHeart, FaBars, FaTimes } from "react-icons/fa";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const navLinks = [
//     { path: "/", label: "Home" },
//     { path: "/ArticleDetails", label: "Article Details" },
//     { path: "/Bookmark", label: "Bookmark" },
//     { path: "/Categories", label: "Categories" },
//     { path: "/Contact", label: "Contact" },
//     { path: "/About", label: "About" },
//     { path: "/ToBeJournalist", label: "To Be a Journalist" },
//     { path: "/Profile", label: "Profile" },
//     { path: "/NewsArticleCreation", label: "Create News Article" },
//     { path: "/login", label: "Login" },
//     { path: "/Register", label: "Register" },
//   ];

//   return (
//     <>
//       <nav className="backdrop-blur-md bg-white/95 sticky top-0 z-50 border-b border-gray-100 shadow-sm">
//         <div className="container mx-auto px-4 flex justify-between items-center py-4">
//           <div className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-300">
//             <Link to="/">MyWebsite</Link>
//           </div>

//           {/* Desktop Navigation */}
//           <ul className="hidden lg:flex space-x-6">
//             {navLinks.map((link) => (
//               <li key={link.path}>
//                 <Link
//                   to={link.path}
//                   className="text-gray-600 hover:text-indigo-600 font-medium transition duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-300"
//                 >
//                   {link.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* Mobile Navigation Toggle */}
//           <div className="lg:hidden">
//             <button
//               onClick={toggleMenu}
//               className="text-gray-600 hover:text-indigo-600 transition duration-300"
//               aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//             >
//               {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden">
//             <ul className="flex flex-col bg-white py-4 px-6 space-y-4 border-t border-gray-100">
//               {navLinks.map((link) => (
//                 <li key={link.path}>
//                   <Link
//                     to={link.path}
//                     className="text-gray-600 hover:text-indigo-600 font-medium transition duration-300 block"
//                     onClick={toggleMenu}
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </nav>
//       <Outlet />
//     </>
//   );
// };

// export default Navbar;
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import logo from "../images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import {clearUserId} from "../../Redux/userSlice"

const useUserData = (userId) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8000/api/user/details/${userId}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUserData(null);
        });
    }
  }, [userId]);

  return userData;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8000/api/user/details/${userId}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [userId]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { path: "/Categories", label: "Explore News" },
    { path: "/About", label: "Our Universe" },
    { path: "/Contact", label: "Mission Control" },
  ];

  if (userData?.role === "journalist") {
    navLinks.push({ path: "/NewsArticleCreation", label: "Add Article" });
  } else {
    navLinks.push({ path: userId ? "/ToBeJournalist" : "/login", label: "Join Us" });
  }

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    dispatch(clearUserId());
    navigate("/login"); // Redirect to login page
    window.location.reload(); // Refresh to clear Redux state (optional)
  };

  return (
    <>
      <nav className="text-white backdrop-blur-md bg-black/95 sticky top-0 z-50 border-b border-gray-900 shadow-sm w-full">
        <div className="container mx-auto px-4 flex justify-between items-center py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="ORBITRA" className="h-12 md:h-16" />
            <span className="text-xl md:text-2xl font-bold text-white">ORBITRA</span>
          </Link>

          {/* Desktop Navigation (Large screens only) */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition duration-300 text-lg font-medium ${
                  location.pathname === link.path
                    ? "text-[#FDB827] border-b-2 border-[#FDB827]"
                    : "text-white hover:text-[#FDB827]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Section (Large screens only) */}
          <div className="hidden lg:block relative">
            {userId ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center cursor-pointer space-x-2 focus:outline-none"
                >
                  <FaUserCircle size={32} className="text-white" />
                  <span className="text-white font-medium">{userData?.fullName}</span>
                </button>
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 shadow-lg rounded-lg overflow-hidden">
                    <Link to={`/Profile/${userId}`} className="block px-4 py-2 text-white hover:bg-gray-800">
                      Profile
                    </Link>
                    <Link to="/Bookmark" className="block px-4 py-2 text-white hover:bg-gray-800">
                      Bookmarks
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full cursor-pointer text-left px-4 py-2 text-red-500 hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="border border-[#FDB827] text-[#FDB827] hover:bg-[#FDB827] hover:text-black transition duration-300 px-4 py-1 rounded uppercase text-sm font-bold"
              >
                LOGIN
              </Link>
            )}
          </div>

          {/* Mobile & Tablet Menu Toggle */}
          <button onClick={toggleMenu} className="lg:hidden text-white hover:text-[#FDB827]">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile & Tablet Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black py-4 border-t border-gray-800">
            <div className="container mx-auto px-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 text-lg ${
                    location.pathname === link.path
                      ? "text-[#FDB827] font-medium"
                      : "text-white hover:text-[#FDB827]"
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-800 mt-4">
                {userId ? (
                  <>
                    <div className="flex items-center space-x-2 mb-4">
                      <FaUserCircle size={24} className="text-white" />
                      <span className="text-white font-medium">{userData?.fullName}</span>
                    </div>
                    <Link 
                      to={`/Profile/${userId}`} 
                      className="block text-white hover:text-[#FDB827] py-2"
                      onClick={closeMenu}
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/Bookmark" 
                      className="block text-white hover:text-[#FDB827] py-2"
                      onClick={closeMenu}
                    >
                      Bookmarks
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="block w-full text-left text-red-500 hover:text-red-400 py-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3 pt-2">
                    <Link
                      to="/login"
                      className="block border border-[#FDB827] text-center text-[#FDB827] hover:bg-[#FDB827] hover:text-black transition duration-300 px-4 py-2 rounded uppercase text-sm font-bold"
                      onClick={closeMenu}
                    >
                      LOGIN
                    </Link>
                    <Link
                      to="/Register"
                      className="block bg-[#FDB827] text-center text-black hover:bg-[#e09e1a] transition duration-300 px-4 py-2 rounded uppercase text-sm font-bold"
                      onClick={closeMenu}
                    >
                      SIGN UP
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
