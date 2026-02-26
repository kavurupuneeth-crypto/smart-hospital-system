import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const DashboardHeader = ({ userName, userRole, onMenuClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const { theme } = useTheme();

  const headerClasses = {
    default: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-800'
  };

  const textClasses = {
    default: 'text-gray-800',
    light: 'text-gray-900',
    dark: 'text-gray-100'
  };

  const notifications = [
    { id: 1, patient: 'Vikram Singh', type: 'Appointment', time: '09:00 AM', status: 'Confirmed', dept: 'Orthopedics' },
    { id: 2, patient: 'Anita Sharma', type: 'Appointment', time: '09:30 AM', status: 'Waiting', dept: 'Cardiology' },
    { id: 3, patient: 'Arun Sharma', type: 'Appointment', time: '10:00 AM', status: 'Confirmed', dept: 'General Medicine' },
    { id: 4, patient: 'Kiran Rao', type: 'Appointment', time: '10:30 AM', status: 'Confirmed', dept: 'Pediatrics' },
    { id: 5, patient: 'Priya Das', type: 'Appointment', time: '11:00 AM', status: 'Waiting', dept: 'Pediatrics' }
  ];

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
    <div className={`${headerClasses[theme] || headerClasses.default} shadow-sm border-b px-8 py-4 flex items-center justify-between`}>
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
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
          >
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Today's Appointments</h3>
                <p className="text-xs text-gray-500 mt-1">{notifications.length} pending appointments</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{notif.patient}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.dept}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-600">⏰ {notif.time}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            notif.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {notif.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200">
                <button className="w-full text-center text-sm text-teal-600 hover:text-teal-700 font-medium">
                  View All Appointments
                </button>
              </div>
            </div>
          )}
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
