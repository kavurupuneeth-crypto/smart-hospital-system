import React, { useState } from 'react';

const PatientManagement = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Amit Patel', email: 'amit@example.com', phone: '+1 234 567 8901', lastVisit: '2024-01-15', bloodGroup: 'A+', age: 45, gender: 'Male', address: '123 Main St, Mumbai' },
    { id: 2, name: 'Sneha Gupta', email: 'sneha@example.com', phone: '+1 234 567 8902', lastVisit: '2024-01-18', bloodGroup: 'O+', age: 32, gender: 'Female', address: '456 Park Ave, Delhi' },
    { id: 3, name: 'Rahul Singh', email: 'rahul@example.com', phone: '+1 234 567 8903', lastVisit: '2024-01-20', bloodGroup: 'B+', age: 38, gender: 'Male', address: '789 Lake Rd, Bangalore' },
    { id: 4, name: 'Priya Nair', email: 'priya@example.com', phone: '+1 234 567 8904', lastVisit: '2024-01-22', bloodGroup: 'AB+', age: 28, gender: 'Female', address: '321 Hill St, Chennai' }
  ]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '', email: '', phone: '', bloodGroup: '', age: '', gender: 'Male', address: ''
  });

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setEditedPatient(patient);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setPatients(patients.map(p => p.id === editedPatient.id ? editedPatient : p));
    setSelectedPatient(editedPatient);
    setIsEditing(false);
  };

  const handleClose = () => {
    setSelectedPatient(null);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedPatient({ ...editedPatient, [field]: value });
  };

  const handleAddPatient = () => {
    setShowAddModal(true);
  };

  const handleAddChange = (field, value) => {
    setNewPatient({ ...newPatient, [field]: value });
  };

  const handleAddSave = () => {
    const today = new Date().toISOString().split('T')[0];
    const patient = {
      ...newPatient,
      id: patients.length + 1,
      lastVisit: today
    };
    setPatients([...patients, patient]);
    setNewPatient({ name: '', email: '', phone: '', bloodGroup: '', age: '', gender: 'Male', address: '' });
    setShowAddModal(false);
  };

  const handleAddClose = () => {
    setNewPatient({ name: '', email: '', phone: '', bloodGroup: '', age: '', gender: 'Male', address: '' });
    setShowAddModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
          <p className="text-gray-600 mt-2">View and manage all registered patients</p>
        </div>
        <button onClick={handleAddPatient} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
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
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Last Visit</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Blood Group</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.map(patient => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {patient.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">{patient.bloodGroup}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button onClick={() => handleView(patient)} className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Patient Details</h2>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedPatient.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-semibold">{selectedPatient.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedPatient.bloodGroup}
                      onChange={(e) => handleChange('bloodGroup', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">{selectedPatient.bloodGroup}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedPatient.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{selectedPatient.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedPatient.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{selectedPatient.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedPatient.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{selectedPatient.age}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  {isEditing ? (
                    <select
                      value={editedPatient.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{selectedPatient.gender}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedPatient.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{selectedPatient.address}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Visit</label>
                  <p className="text-gray-900">{selectedPatient.lastVisit}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={handleClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                Close
              </button>
              {isEditing ? (
                <button onClick={handleSave} className="px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition">
                  Save Changes
                </button>
              ) : (
                <button onClick={handleEdit} className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add New Patient</h2>
              <button onClick={handleAddClose} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={newPatient.name}
                    onChange={(e) => handleAddChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group *</label>
                  <input
                    type="text"
                    value={newPatient.bloodGroup}
                    onChange={(e) => handleAddChange('bloodGroup', e.target.value)}
                    placeholder="e.g., A+, O-, B+"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => handleAddChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={newPatient.phone}
                    onChange={(e) => handleAddChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                  <input
                    type="number"
                    value={newPatient.age}
                    onChange={(e) => handleAddChange('age', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) => handleAddChange('gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    type="text"
                    value={newPatient.address}
                    onChange={(e) => handleAddChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={handleAddClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                Cancel
              </button>
              <button onClick={handleAddSave} className="px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition">
                Add Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;
