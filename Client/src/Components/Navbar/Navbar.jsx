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

import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import logo from "../images/logo.png";

const Navbar = ({ user, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const navLinks = [
    { path: "/Categories", label: "Explore News" },
    { path: "/About", label: "Our Universe" },
    { path: "/Contact", label: "Mission Control" },
  ];

  // If user is NOT a journalist, show Join Us, otherwise show Add Article
  if (user?.role === "Journalist") {
    navLinks.push({ path: "/AddArticle", label: "Add Article" });
  } else {
    navLinks.push({ path: "/ToBeJournalist", label: "Join Us" });
  }

  return (
    <>
      <nav className="text-white backdrop-blur-md bg-black/95 sticky top-0 z-50 border-b border-gray-900 shadow-sm w-full">
        <div className="container mx-auto px-4 flex justify-between items-center py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="ORBITRA" className="h-16" />
            <span className="text-2xl font-bold text-white">ORBITRA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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

          {/* User Section */}
          <div className="hidden md:block relative">
            {user ? (
              <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
                  <img src={user.profilePic || FaUserCircle} alt="Profile" className="w-10 h-10 rounded-full" />
                  <span className="text-white font-medium">{user.username}</span>
                </button>
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 shadow-lg rounded-lg overflow-hidden">
                    <Link to="/Profile" className="block px-4 py-2 text-white hover:bg-gray-800">Profile</Link>
                    <Link to="/Bookmarks" className="block px-4 py-2 text-white hover:bg-gray-800">Bookmarks</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-800">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/Register"
                className="border border-[#FDB827] text-[#FDB827] hover:bg-[#FDB827] hover:text-black transition duration-300 px-4 py-1 rounded uppercase text-sm font-bold"
              >
                SIGN UP
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="md:hidden text-white hover:text-[#FDB827]">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black py-4">
            <div className="container mx-auto px-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-white hover:text-[#FDB827] py-2"
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/Profile" className="block text-white hover:text-[#FDB827] py-2">Profile</Link>
                  <Link to="/Bookmarks" className="block text-white hover:text-[#FDB827] py-2">Bookmarks</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-500 hover:text-red-400 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/Register"
                  className="block border border-[#FDB827] text-[#FDB827] hover:bg-[#FDB827] hover:text-black transition duration-300 px-4 py-1 rounded uppercase text-sm font-bold"
                  onClick={toggleMenu}
                >
                  SIGN UP
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
      <Outlet />
      
    </>
  );
};

export default Navbar;
