import React from 'react';

const MedicalRecords = () => {
  const mockRecords = [
    { id: 1, type: 'Blood Test', date: '2024-01-10', doctor: 'Dr. Rajesh Kumar', result: 'Normal', file: 'blood_test.pdf' },
    { id: 2, type: 'X-Ray', date: '2024-01-12', doctor: 'Dr. Ahmed Ali', result: 'Pending', file: 'xray.pdf' },
    { id: 3, type: 'ECG', date: '2024-01-08', doctor: 'Dr. Rajesh Kumar', result: 'Normal', file: 'ecg.pdf' },
    { id: 4, type: 'MRI Scan', date: '2024-01-05', doctor: 'Dr. Ahmed Ali', result: 'Normal', file: 'mri.pdf' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Medical Records</h1>
        <p className="text-gray-600 mt-2">View and download your medical test results</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Result</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockRecords.map(record => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">📄</span>
                      <div>
                        <p className="font-semibold text-gray-800">{record.type}</p>
                        <p className="text-xs text-gray-500">{record.file}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.doctor}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      record.result === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.result}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-800">Download</button>
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

export default MedicalRecords;
