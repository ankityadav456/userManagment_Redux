import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm font-medium">
          &copy; {new Date().getFullYear()} <span className="font-semibold">UserApp</span>. All rights reserved.
        </p>

        {/* Optional Social Icons */}
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
