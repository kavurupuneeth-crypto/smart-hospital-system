import React from 'react';

const PatientManagement = () => {
  const mockPatients = [
    { id: 1, name: 'Amit Patel', email: 'amit@example.com', phone: '+1 234 567 8901', visits: 12, lastVisit: '2024-01-15' },
    { id: 2, name: 'Sneha Gupta', email: 'sneha@example.com', phone: '+1 234 567 8902', visits: 8, lastVisit: '2024-01-18' },
    { id: 3, name: 'Rahul Singh', email: 'rahul@example.com', phone: '+1 234 567 8903', visits: 15, lastVisit: '2024-01-20' },
    { id: 4, name: 'Priya Nair', email: 'priya@example.com', phone: '+1 234 567 8904', visits: 6, lastVisit: '2024-01-22' }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
          <p className="text-gray-600 mt-2">View and manage all registered patients</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          + Add New Patient
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Total Visits</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Last Visit</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockPatients.map(patient => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{patient.name}</p>
                        <p className="text-xs text-gray-500">ID: #{patient.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-800">{patient.email}</p>
                    <p className="text-xs text-gray-500">{patient.phone}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-2xl font-bold text-gray-800">{patient.visits}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {patient.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-800">Edit</button>
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

export default PatientManagement;
