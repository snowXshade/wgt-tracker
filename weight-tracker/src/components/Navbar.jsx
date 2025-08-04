import React, { useState } from 'react';
import { clearToken } from '../utils/auth.js';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userEmail }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const initial = userEmail ? userEmail.charAt(0).toUpperCase() : 'U';

  const logout = () => {
    clearToken();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      <h2 className="text-xl font-bold text-blue-600">Weight Tracker</h2>
      <div onClick={() => setOpen(prev => !prev)} className="relative group">
        <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full cursor-pointer">
          {initial}
        </div>
        {open && (
          <div className="absolute right-0 mt-2 bg-white border shadow-md rounded-md p-2 z-50">
            <p className="text-sm text-gray-700 mb-2">{userEmail}</p>
            <button onClick={logout} className="text-red-500 hover:underline text-sm">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
