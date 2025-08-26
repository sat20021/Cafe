import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaShoppingCart, FaCog, FaChevronDown } from 'react-icons/fa';

const UserDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  // Get user avatar
  const getUserAvatar = () => {
    if (user?.photoURL) {
      return (
        <img 
          src={user.photoURL} 
          alt={user.name} 
          className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
        />
      );
    }
    
    // Show initials or default avatar
    if (user?.name) {
      const initials = user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold border-2 border-white shadow-sm">
          {initials}
        </div>
      );
    }
    
    // Default cake emoji
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-sm border-2 border-white shadow-sm">
        🍰
      </div>
    );
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        {getUserAvatar()}
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            🍰 Hi, {user?.name || 'User'}
          </div>
        </div>
        <FaChevronDown 
          className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 transform opacity-0 scale-95 animate-in slide-in-from-top-2 duration-200">
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              {getUserAvatar()}
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.name || 'User'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email || 'user@example.com'}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => handleNavigation('/orders')}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <FaShoppingCart className="w-4 h-4" />
              <span>🛒 My Orders</span>
            </button>
            
            <button
              onClick={() => handleNavigation('/profile')}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <FaUser className="w-4 h-4" />
              <span>👤 Profile</span>
            </button>
            
            <button
              onClick={() => handleNavigation('/settings')}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <FaCog className="w-4 h-4" />
              <span>⚙️ Settings</span>
            </button>
          </div>

          {/* Logout Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 py-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>🚪 Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

