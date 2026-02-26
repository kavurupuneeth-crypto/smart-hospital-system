import React from 'react';
import { useApp } from '../../context/AppContext';

const AppointmentManagement = () => {
  const { appointments } = useApp();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Appointment Management</h1>
        <p className="text-gray-600 mt-2">View and manage all system appointments</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Queue Position</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Wait Time</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map(apt => (
                <tr key={apt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">#{apt.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{apt.patientName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Doctor ID: {apt.doctorId}</td>
                  <td className="px-6 py-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {apt.queuePosition}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{apt.estimatedWaitingTime} mins</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      apt.status === 'In Consultation' ? 'bg-green-100 text-green-800' :
                      apt.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                    <button className="text-red-600 hover:text-red-800">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;
