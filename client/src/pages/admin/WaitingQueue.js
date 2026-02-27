import React, { useState } from 'react';

const MOCK_QUEUE = [
  { _id: '1', patientName: 'Rajesh Kumar', doctorName: 'Dr. Sarah Johnson', department: 'Cardiology', queuePosition: 1, slotTime: '10:00 AM', status: 'In Progress', checkedIn: true, estimatedWait: 5 },
  { _id: '2', patientName: 'Priya Sharma', doctorName: 'Dr. Sarah Johnson', department: 'Cardiology', queuePosition: 2, slotTime: '10:30 AM', status: 'Waiting', checkedIn: true, estimatedWait: 35 },
  { _id: '3', patientName: 'Amit Patel', doctorName: 'Dr. Robert Chen', department: 'Orthopedics', queuePosition: 1, slotTime: '10:15 AM', status: 'Waiting', checkedIn: true, estimatedWait: 15 },
  { _id: '4', patientName: 'Sneha Reddy', doctorName: 'Dr. Emily White', department: 'Pediatrics', queuePosition: 1, slotTime: '11:00 AM', status: 'Waiting', checkedIn: true, estimatedWait: 60 },
  { _id: '5', patientName: 'Vikram Singh', doctorName: 'Dr. Sarah Johnson', department: 'Cardiology', queuePosition: 3, slotTime: '11:00 AM', status: 'Scheduled', checkedIn: false, estimatedWait: 65 },
  { _id: '6', patientName: 'Ananya Iyer', doctorName: 'Dr. Robert Chen', department: 'Orthopedics', queuePosition: 2, slotTime: '10:45 AM', status: 'Scheduled', checkedIn: false, estimatedWait: 45 },
];

const WaitingQueue = () => {
  const [queue, setQueue] = useState(MOCK_QUEUE);
  const [filterDepartment, setFilterDepartment] = useState('All');

  const departments = ['All', 'Cardiology', 'Orthopedics', 'Pediatrics'];
  
  const filteredQueue = filterDepartment === 'All' 
    ? queue 
    : queue.filter(item => item.department === filterDepartment);

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Progress': return 'bg-green-100 text-green-700';
      case 'Waiting': return 'bg-yellow-100 text-yellow-700';
      case 'Scheduled': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Waiting Queue</h1>
        <p className="text-gray-600">Real-time patient queue monitoring</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">In Progress</p>
              <p className="text-3xl font-bold mt-1">{queue.filter(q => q.status === 'In Progress').length}</p>
            </div>
            <span className="material-symbols-rounded text-[48px] opacity-30">medical_services</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Waiting</p>
              <p className="text-3xl font-bold mt-1">{queue.filter(q => q.status === 'Waiting').length}</p>
            </div>
            <span className="material-symbols-rounded text-[48px] opacity-30">hourglass_empty</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Scheduled</p>
              <p className="text-3xl font-bold mt-1">{queue.filter(q => q.status === 'Scheduled').length}</p>
            </div>
            <span className="material-symbols-rounded text-[48px] opacity-30">event</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Queue</p>
              <p className="text-3xl font-bold mt-1">{queue.length}</p>
            </div>
            <span className="material-symbols-rounded text-[48px] opacity-30">groups</span>
          </div>
        </div>
      </div>

      {/* Department Filter */}
      <div className="mb-6 flex gap-2">
        {departments.map(dept => (
          <button
            key={dept}
            onClick={() => setFilterDepartment(dept)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterDepartment === dept
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Queue #</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Slot Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Wait Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredQueue.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full text-blue-600 font-bold">
                      {item.queuePosition}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold">
                        {item.patientName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.patientName}</div>
                        {item.checkedIn && (
                          <div className="flex items-center gap-1 text-xs text-green-600">
                            <span className="material-symbols-rounded text-[14px]">check_circle</span>
                            Checked In
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{item.doctorName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {item.department}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-900">
                      <span className="material-symbols-rounded text-[18px] text-gray-400">schedule</span>
                      {item.slotTime}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-900">
                      <span className="material-symbols-rounded text-[18px] text-gray-400">timer</span>
                      ~{item.estimatedWait} min
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {item.status === 'Waiting' && (
                        <button className="px-2.5 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-xs font-medium flex items-center gap-1">
                          <span className="material-symbols-rounded text-[16px]">call</span>
                          Call
                        </button>
                      )}
                      <button className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                        <span className="material-symbols-rounded text-[18px]">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredQueue.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <span className="material-symbols-rounded text-[64px] text-gray-300">event_busy</span>
            <p className="mt-4">No patients in queue for {filterDepartment}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitingQueue;
