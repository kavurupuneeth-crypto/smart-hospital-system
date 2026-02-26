import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { useTheme } from '../context/ThemeContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme } = useTheme();

  const themeClasses = {
    default: 'bg-gray-50',
    light: 'bg-white',
    dark: 'bg-gray-900'
  };

  const menuItems = [
    { label: 'Dashboard', icon: 'dashboard', path: '/admin' },
    { label: 'Doctors', icon: 'medical_services', path: '/admin/doctors' },
    { label: 'Patients', icon: 'people', path: '/admin/patients' },
    { label: 'Appointments', icon: 'event', path: '/admin/appointments' },
    { label: 'Waiting Queue', icon: 'schedule', path: '/admin/waiting-queue' },
    { label: 'Analytics', icon: 'analytics', path: '/admin/analytics' },
    { label: 'Settings', icon: 'settings', path: '/admin/settings' }
  ];

  return (
    <div className={`flex h-screen ${themeClasses[theme] || themeClasses.default}`}>
      <Sidebar menuItems={menuItems} isOpen={sidebarOpen} />
      
      <div className={`flex-1 flex flex-col transition-all ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader 
          userName="Admin" 
          userRole="System Administrator"
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
