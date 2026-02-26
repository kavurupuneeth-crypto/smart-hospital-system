import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ menuItems, isOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme } = useTheme();

  const sidebarClasses = {
    default: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-800'
  };

  const textClasses = {
    default: 'text-gray-600',
    light: 'text-gray-700',
    dark: 'text-gray-300'
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className={`w-64 ${sidebarClasses[theme] || sidebarClasses.default} h-screen fixed left-0 top-0 shadow-2xl flex flex-col transition-all duration-300 z-40 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0`}>
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex items-center space-x-2">
          <span className="material-icons text-3xl text-blue-600">local_hospital</span>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">SmartHospital</span>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path.split('/').length === 2}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg transform scale-105'
                  : 'text-gray-600 hover:bg-gray-100 hover:translate-x-1'
              }`
            }
          >
            <span className="material-icons text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-red-600 hover:bg-red-50 transition-all duration-200 hover:shadow-md"
        >
          <span className="material-icons text-xl">logout</span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
