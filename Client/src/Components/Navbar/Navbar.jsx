import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaRegHeart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/ArticleDetails", label: "Article Details" },
    { path: "/Bookmark", label: "Bookmark" },
    { path: "/Categories", label: "Categories" },
    { path: "/Contact", label: "Contact" },
    { path: "/About", label: "About" },
    { path: "/ToBeJournalist", label: "To Be a Journalist" },
    { path: "/Profile", label: "Profile" },
    { path: "/NewsArticleCreation", label: "Create News Article" },
    { path: "/login", label: "Login" },
    { path: "/Register", label: "Register" },
  ];

  return (
    <>
      <nav className="backdrop-blur-md bg-white/95 sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-300">
            <Link to="/">MyWebsite</Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-gray-600 hover:text-indigo-600 font-medium transition duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Navigation Toggle */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-indigo-600 transition duration-300"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <ul className="flex flex-col bg-white py-4 px-6 space-y-4 border-t border-gray-100">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-indigo-600 font-medium transition duration-300 block"
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;