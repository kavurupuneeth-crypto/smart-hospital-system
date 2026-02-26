import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { label: 'Dashboard', icon: 'dashboard', path: '/admin' },
    { label: 'Doctors', icon: 'medical_services', path: '/admin/doctors' },
    { label: 'Patients', icon: 'group', path: '/admin/patients' },
    { label: 'Appointments', icon: 'event', path: '/admin/appointments' },
    { label: 'Analytics', icon: 'analytics', path: '/admin/analytics' },
    { label: 'Resource Management', icon: 'inventory_2', path: '/admin/resources' },
    { label: 'Control Room', icon: 'monitoring', path: '/admin/control-room' },
    { label: 'Settings', icon: 'settings', path: '/admin/settings' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
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
