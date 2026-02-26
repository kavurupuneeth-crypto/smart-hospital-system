import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import Landing from './pages/Landing';
import RoleSelection from './pages/RoleSelection';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientLayout from './layouts/PatientLayout';
import AdminLayout from './layouts/AdminLayout';
import PatientDashboard from './pages/PatientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PatientAppointments from './pages/patient/PatientAppointments';
import MedicalRecords from './pages/patient/MedicalRecords';
import MedicalBills from './pages/patient/MedicalBills';
import Medications from './pages/patient/Medications';
import Settings from './pages/patient/Settings';
import DoctorManagement from './pages/admin/DoctorManagement';
import PatientManagement from './pages/admin/PatientManagement';
import AppointmentManagement from './pages/admin/AppointmentManagement';
import WaitingQueue from './pages/admin/WaitingQueue';
import Analytics from './pages/admin/Analytics';
import ResourceManagement from './pages/admin/ResourceManagement';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/login/:role" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/patient/*"
              element={
                <PrivateRoute role="patient">
                  <PatientLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<PatientDashboard />} />
              <Route path="appointments" element={<PatientAppointments />} />
              <Route path="records" element={<MedicalRecords />} />
              <Route path="bills" element={<MedicalBills />} />
              <Route path="medications" element={<Medications />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route
              path="/admin/*"
              element={
                <PrivateRoute role="admin">
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="doctors" element={<DoctorManagement />} />
              <Route path="patients" element={<PatientManagement />} />
              <Route path="appointments" element={<AppointmentManagement />} />
              <Route path="waiting-queue" element={<WaitingQueue />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="resources" element={<ResourceManagement />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
