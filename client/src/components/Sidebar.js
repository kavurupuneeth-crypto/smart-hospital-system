import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SidebarIcon from './SidebarIcon';

const Sidebar = ({ menuItems, isOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className={`w-64 bg-white h-screen fixed left-0 top-0 shadow-2xl flex flex-col transition-all duration-300 z-40 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0`}>
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-rounded text-3xl text-blue-600">local_hospital</span>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">SmartHospital</span>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path.split('/').length === 2}
          >
            {({ isActive }) => (
              <div className={`group flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
                <SidebarIcon name={item.icon} active={isActive} />
                <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>{item.label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="group flex items-center gap-3 px-4 py-3 rounded-xl w-full text-red-600 hover:bg-red-50 transition-all duration-200 hover:shadow-md"
        >
          <SidebarIcon name="logout" active={false} />
          <span className="font-medium text-red-600">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
