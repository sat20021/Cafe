import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const LoginButton = ({ onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenModal = (mode) => {
    onOpenModal(mode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Login Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <FaUser className="w-4 h-4" />
        <span>Login</span>
        <FaChevronDown 
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 transform opacity-0 scale-95 animate-in slide-in-from-top-2 duration-200">
          <div className="py-2">
            <button
              onClick={() => handleOpenModal('login')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <FaSignInAlt className="w-4 h-4 text-green-600" />
              <span>Sign In</span>
            </button>
            
            <button
              onClick={() => handleOpenModal('register')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <FaUserPlus className="w-4 h-4 text-blue-600" />
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginButton;

