import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import userIcon from '../assets/management.png'; // adjust the path if needed

const Header = () => {
  return (
    <header className="fixed top-0 z-10 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Icon */}
        <Link
      to="/"
      className="flex items-center gap-2 text-white text-2xl sm:text-3xl font-extrabold tracking-wide hover:scale-105 transition"
    >
      <img
        src={userIcon}
        alt="UserApp Logo"
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
      />
      UserApp
    </Link>

        {/* Navigation */}
        <nav className="flex gap-6 text-sm sm:text-base">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `pb-1 border-b-2 transition-all duration-300 ${
                isActive
                  ? 'text-white font-semibold border-white'
                  : 'text-white/80 hover:text-white hover:border-white border-transparent'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `pb-1 border-b-2 transition-all duration-300 ${
                isActive
                  ? 'text-white font-semibold border-white'
                  : 'text-white/80 hover:text-white hover:border-white border-transparent'
              }`
            }
          >
            Add User
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
