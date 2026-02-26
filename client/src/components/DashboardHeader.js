import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const DashboardHeader = ({ userName, userRole, onMenuClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchAppointments();
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchAppointments = async () => {
    try {
      const response = await axiosInstance.get('/appointments?role=patient');
      const appointments = response.data.appointments || [];
      
      const filtered = appointments.filter(apt => 
        apt.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.doctorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.department?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filtered);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleSearchResultClick = (appointment) => {
    setShowSearchResults(false);
    setSearchQuery('');
    if (location.pathname !== '/patient/appointments') {
      navigate('/patient/appointments');
    }
  };

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    navigate('/login/patient');
  };

  return (
    <div className="bg-white shadow-sm border-b px-8 py-4 flex items-center justify-between">
      <button
        onClick={onMenuClick}
        className="lg:hidden mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <span className="text-2xl">☰</span>
      </button>
      
      <div className="flex-1 max-w-xl relative search-container">
        <div className="relative">
          <input
            type="text"
            placeholder="Search appointments by patient, doctor, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowSearchResults(true)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
        </div>
        
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
            {searchResults.map((apt) => (
              <button
                key={apt._id}
                onClick={() => handleSearchResultClick(apt)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{apt.patientName}</p>
                    <p className="text-sm text-gray-600">Dr. {apt.doctorName} - {apt.department}</p>
                    <p className="text-xs text-gray-500 mt-1">{apt.slotTime}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    apt.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                    apt.status === 'In Consultation' ? 'bg-yellow-100 text-yellow-700' :
                    apt.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {apt.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
        
        {showSearchResults && searchQuery && searchResults.length === 0 && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
            <p className="text-gray-500 text-center">No appointments found</p>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-right">
          <p className="text-sm text-gray-600">{formatDate(currentTime)}</p>
          <p className="text-xs text-gray-500 font-mono">{formatTime(currentTime)}</p>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition"
          >
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">{userName}</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
              {userName?.charAt(0) || 'U'}
            </div>
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button 
                onClick={() => {
                  setShowProfileDropdown(false);
                  navigate('/patient/profile');
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center space-x-2"
              >
                <span className="material-symbols-outlined text-lg">person</span>
                <span>View Profile</span>
              </button>
              <hr className="my-2" />
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center space-x-2"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
