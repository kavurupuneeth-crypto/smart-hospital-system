import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { useAuth } from '../context/AuthContext';

const PatientLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();

  const menuItems = [
    { label: 'Dashboard', icon: '📊', path: '/patient' },
    { label: 'Appointments', icon: '📅', path: '/patient/appointments' },
    { label: 'Medical Records', icon: '📋', path: '/patient/records' },
    { label: 'Bills', icon: '💳', path: '/patient/bills' },
    { label: 'Medications', icon: '💊', path: '/patient/medications' },
    { label: 'Settings', icon: '⚙️', path: '/patient/settings' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar menuItems={menuItems} isOpen={sidebarOpen} />

      <div className={`flex-1 flex flex-col transition-all ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader
          userName={user?.name || "Patient"}
          userRole="Patient"
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
