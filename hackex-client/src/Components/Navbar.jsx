import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../userContext";
import { useTheme } from "../themeContext";
import { FaSun, FaMoon, FaPowerOff, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import logoDark from "../assets/logoDark.png";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, logout } = useUser();
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const response = await fetch(
      "https://hackex.onrender.com/api/v1/users/logout",
      { method: "GET" }
    );
    if (response.ok) {
      await logout();
      navigate("/");
    } else {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 shadow-md ${
        theme === "light"
          ? "bg-gray-50 text-gray-900"
          : "bg-gray-800 text-gray-100"
      }`}
    >
      <div className="mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-semibold flex items-center space-x-2"
        >
          <img
            src={theme === "light" ? logoDark : logo}
            alt="Logo"
            className="h-10 w-auto"
          />
          <span className="ml-4">Hackex</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-12">
          <Link
  to="/problems"
  className="text-md transition-all duration-300 transform hover:scale-105 hover:text-[#5044e5]"
>
  Problems
</Link>

<Link
  to="/contests"
  className="text-md transition-all duration-300 transform hover:scale-105 hover:text-[#5044e5]"
>
  Contests
</Link>

<Link
  to="/playground"
  className="text-md transition-all duration-300 transform hover:scale-105 hover:text-[#5044e5]"
>
  Playground
</Link>

<Link
  to="/submit"
  className="text-md transition-all duration-300 transform hover:scale-105 hover:text-[#5044e5]"
>
  Submit Problem
</Link>


          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-lg transition duration-300 focus:outline-none"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {/* Auth Section */}
          <div className="ml-6 flex items-center">
            {!isLoggedIn ? (
              <Link to="/login" className="btn-primary flex items-center">
                <FaUser className="mr-2" />
                Login/Register
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="btn-primary"
                  aria-label="User Menu"
                >
                  <FaPowerOff />
                </button>

                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg overflow-hidden bg-gray-700 text-gray-100"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-[#5044e5] transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-[#5044e5] transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
