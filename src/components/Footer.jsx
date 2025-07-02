import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-center py-4 mt-auto shadow-md">
      <p className="text-sm font-medium">&copy; {new Date().getFullYear()} UserApp. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
