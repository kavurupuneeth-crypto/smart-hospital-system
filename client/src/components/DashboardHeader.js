import React, { useState, useEffect } from 'react';

const DashboardHeader = ({ userName, userRole, onMenuClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-white shadow-sm border-b px-8 py-4 flex items-center justify-between">
      <button
        onClick={onMenuClick}
        className="lg:hidden mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <span className="text-2xl">☰</span>
      </button>
      
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-right">
          <p className="text-sm text-gray-600">{formatDate(currentTime)}</p>
          <p className="text-xs text-gray-500 font-mono">{formatTime(currentTime)}</p>
        </div>

        <div className="relative">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
            {userName?.charAt(0) || 'U'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
