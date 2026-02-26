import React, { useState } from 'react';

const WaitingQueue = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const queueData = [
    { id: 1, waitNo: 'WL-001', patient: 'Suresh Babu', bloodGroup: 'O+', dept: 'Cardiology', doctor: 'Dr. Sarah Johnson', level: 'Critical', waitTime: 8 },
    { id: 2, waitNo: 'WL-002', patient: 'Divya Menon', bloodGroup: 'A-', dept: 'General Medicine', doctor: 'Dr. Arjun Mehta', level: 'Critical', waitTime: 11 },
    { id: 3, waitNo: 'WL-003', patient: 'Vikram Singh', bloodGroup: 'B+', dept: 'Orthopedics', doctor: 'Dr. Robert Chen', level: 'Critical', waitTime: 15 },
    { id: 4, waitNo: 'WL-004', patient: 'Priya Das', bloodGroup: 'AB+', dept: 'Cardiology', doctor: 'Dr. Priya Nair', level: 'High', waitTime: 22 },
    { id: 5, waitNo: 'WL-005', patient: 'Rajan Kumar', bloodGroup: 'B+', dept: 'Pediatrics', doctor: 'Dr. Emily White', level: 'High', waitTime: 28 },
    { id: 6, waitNo: 'WL-006', patient: 'Meera Iyer', bloodGroup: 'O-', dept: 'General Medicine', doctor: 'Dr. Kavita Shah', level: 'High', waitTime: 33 },
    { id: 7, waitNo: 'WL-007', patient: 'Ajay Patel', bloodGroup: 'A+', dept: 'Orthopedics', doctor: 'Dr. James Osei', level: 'High', waitTime: 40 },
    { id: 8, waitNo: 'WL-008', patient: 'Sneha Gupta', bloodGroup: 'B-', dept: 'Cardiology', doctor: 'Dr. Sarah Johnson', level: 'High', waitTime: 45 }
  ];

  const filteredQueue = activeFilter === 'All' 
    ? queueData 
    : queueData.filter(item => item.level === activeFilter);

  const getLevelStyle = (level) => {
    if (level === 'Critical') return 'bg-red-100 text-red-700';
    if (level === 'High') return 'bg-orange-100 text-orange-700';
    if (level === 'Medium') return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  const getLevelIcon = (level) => {
    if (level === 'Critical') return '⚠️';
    if (level === 'High') return '⚡';
    return '✓';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white rounded-3xl shadow-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Today's Waiting Queue</h1>
          
          {/* Filter Pills */}
          <div className="flex gap-2">
            {['All', 'Critical', 'High', 'Medium', 'Low'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">#</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">Wait No.</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">Patient Name</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">Blood Group</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">Department</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">Doctor</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">Emergency Level</th>
                <th className="text-right py-4 px-4 text-xs font-semibold text-gray-500 uppercase">Wait Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredQueue.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-600">{item.id}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-900">{item.waitNo}</td>
                  <td className="py-4 px-4 text-sm text-gray-800">{item.patient}</td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                      {item.bloodGroup}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{item.dept}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{item.doctor}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getLevelStyle(item.level)}`}>
                      <span>{getLevelIcon(item.level)}</span>
                      {item.level}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-sm font-bold text-gray-900">{item.waitTime}</span>
                    <span className="text-sm text-gray-500 ml-1">min</span>
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

export default WaitingQueue;
