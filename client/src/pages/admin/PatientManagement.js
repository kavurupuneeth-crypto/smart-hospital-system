import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

const MOCK_PATIENTS = [
  { _id: '1', name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', phone: '+91 9876543210', bloodGroup: 'O+', gender: 'male', createdAt: '2024-01-15' },
  { _id: '2', name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 9876543211', bloodGroup: 'A+', gender: 'female', createdAt: '2024-01-20' },
  { _id: '3', name: 'Amit Patel', email: 'amit.patel@email.com', phone: '+91 9876543212', bloodGroup: 'B+', gender: 'male', createdAt: '2024-02-05' },
  { _id: '4', name: 'Sneha Reddy', email: 'sneha.reddy@email.com', phone: '+91 9876543213', bloodGroup: 'AB+', gender: 'female', createdAt: '2024-02-10' },
  { _id: '5', name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 9876543214', bloodGroup: 'O-', gender: 'male', createdAt: '2024-02-15' },
  { _id: '6', name: 'Ananya Iyer', email: 'ananya.iyer@email.com', phone: '+91 9876543215', bloodGroup: 'A-', gender: 'female', createdAt: '2024-02-20' },
  { _id: '7', name: 'Rahul Verma', email: 'rahul.verma@email.com', phone: '+91 9876543216', bloodGroup: 'B-', gender: 'male', createdAt: '2024-02-25' },
  { _id: '8', name: 'Kavya Nair', email: 'kavya.nair@email.com', phone: '+91 9876543217', bloodGroup: 'AB-', gender: 'female', createdAt: '2024-03-01' },
];

const PatientManagement = () => {
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axiosInstance.get('/auth/users?role=patient');
      setPatients(response.data.users || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="text-gray-600">Loading patients...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Patient Management</h1>
        <p className="text-gray-600">View and manage registered patients</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search patients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Patients</p>
              <p className="text-3xl font-bold mt-1">{patients.length}</p>
            </div>
            <span className="material-symbols-rounded text-[48px] opacity-30">group</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Active Today</p>
              <p className="text-3xl font-bold mt-1">{Math.floor(patients.length * 0.3)}</p>
            </div>
            <span className="material-symbols-rounded text-[48px] opacity-30">trending_up</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">New This Month</p>
              <p className="text-3xl font-bold mt-1">{Math.floor(patients.length * 0.15)}</p>
            </div>
            <span className="material-symbols-rounded text-[48px] opacity-30">person_add</span>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Blood Group</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Registered</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                        {patient.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-gray-900">{patient.email}</div>
                      <div className="text-gray-500">{patient.phone || 'N/A'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      {patient.bloodGroup || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 capitalize">{patient.gender || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">
                      {new Date(patient.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <span className="material-symbols-rounded text-[20px]">visibility</span>
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <span className="material-symbols-rounded text-[20px]">edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <span className="material-symbols-rounded text-[64px] text-gray-300">person_off</span>
            <p className="mt-4">{searchTerm ? 'No patients found matching your search' : 'No patients registered yet'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientManagement;
