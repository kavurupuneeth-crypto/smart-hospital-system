import React from 'react';

const Medications = () => {
  const mockMedications = [
    { id: 1, name: 'Aspirin', dosage: '100mg', frequency: 'Once daily', duration: '30 days', prescribedBy: 'Dr. Rajesh Kumar', startDate: '2024-01-10', status: 'Active' },
    { id: 2, name: 'Vitamin D', dosage: '1000IU', frequency: 'Once daily', duration: '60 days', prescribedBy: 'Dr. Priya Sharma', startDate: '2024-01-05', status: 'Active' },
    { id: 3, name: 'Ibuprofen', dosage: '400mg', frequency: 'Twice daily', duration: '7 days', prescribedBy: 'Dr. Ahmed Ali', startDate: '2024-01-01', status: 'Completed' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Medications</h1>
        <p className="text-gray-600 mt-2">Track your current and past prescriptions</p>
      </div>

      <div className="grid gap-6">
        {mockMedications.map(med => (
          <div key={med.id} className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center text-white text-2xl">
                  💊
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{med.name}</h3>
                  <p className="text-gray-600 mt-1">{med.dosage} - {med.frequency}</p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-sm font-semibold text-gray-800">{med.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Prescribed By</p>
                      <p className="text-sm font-semibold text-gray-800">{med.prescribedBy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Start Date</p>
                      <p className="text-sm font-semibold text-gray-800">{med.startDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        med.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {med.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Medications;
