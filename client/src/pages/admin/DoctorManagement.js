import React from 'react';
import { useApp } from '../../context/AppContext';

const DoctorManagement = () => {
  const { doctors } = useApp();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Doctor Management</h1>
          <p className="text-gray-600 mt-2">Manage all doctors in the system</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          + Add New Doctor
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Queue Length</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Capacity/Hour</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Avg Time</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {doctors.map(doctor => {
                const isOverloaded = doctor.currentQueueLength > doctor.capacityPerHour * 2;
                return (
                  <tr key={doctor.id} className={`hover:bg-gray-50 ${isOverloaded ? 'bg-red-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {doctor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{doctor.name}</p>
                          <p className="text-xs text-gray-500">{doctor.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {doctor.specialization}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-2xl font-bold ${isOverloaded ? 'text-red-600' : 'text-gray-800'}`}>
                        {doctor.currentQueueLength}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {doctor.capacityPerHour}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {doctor.averageConsultationTime} mins
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-4 py-2 rounded-full text-xs font-semibold ${
                        isOverloaded 
                          ? 'bg-red-100 text-red-800' 
                          : doctor.currentQueueLength > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {isOverloaded ? '⚠️ Overloaded' : doctor.currentQueueLength > 0 ? '✓ Active' : '○ Available'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Remove</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorManagement;
