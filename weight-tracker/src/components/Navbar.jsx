import React, { useState, useEffect } from 'react';
import { clearToken } from '../utils/auth.js';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userEmail }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const initial = userEmail ? userEmail.charAt(0).toUpperCase() : 'U';

  const logout = () => {
    clearToken();
    navigate('/');
  };

  // Apply/remove dark mode class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md px-6 py-3 flex items-center justify-between">
      <h2 className="text-xl font-bold text-blue-600 dark:text-white">Weight Tracker</h2>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-sm border px-3 py-1 rounded dark:text-white dark:border-white"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        {/* User Dropdown */}
        <div onClick={() => setOpen(prev => !prev)} className="relative group">
          <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full cursor-pointer">
            {initial}
          </div>
          {open && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-gray-700 border dark:border-gray-600 shadow-md rounded-md p-2 z-50">
              <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">{userEmail}</p>
              <button
                onClick={logout}
                className="text-red-500 hover:underline text-sm dark:text-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
