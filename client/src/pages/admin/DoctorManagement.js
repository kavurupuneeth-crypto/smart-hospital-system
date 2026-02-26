import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const DoctorManagement = () => {
  const { doctors } = useApp();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Gen. Medicine'];

  const mockDoctors = [
    { id: 1, name: 'Dr. Sarah Johnson', initials: 'SJ', specialty: 'Cardiology', department: 'Cardiology', experience: 12, qualifications: ['MBBS', 'MD', 'FACC'], booked: 28, capacity: 30, status: 'Overloaded' },
    { id: 2, name: 'Dr. Robert Chen', initials: 'RC', specialty: 'Orthopedics', department: 'Orthopedics', experience: 8, qualifications: ['MBBS', 'MS Ortho'], booked: 22, capacity: 25, status: 'Near Full' },
    { id: 3, name: 'Dr. Emily White', initials: 'EW', specialty: 'Pediatrics', department: 'Pediatrics', experience: 10, qualifications: ['MBBS', 'DCH'], booked: 11, capacity: 20, status: 'Normal' },
    { id: 4, name: 'Dr. Arjun Mehta', initials: 'AM', specialty: 'Gen. Medicine', department: 'Gen. Medicine', experience: 15, qualifications: ['MBBS', 'MD'], booked: 33, capacity: 35, status: 'Overloaded' },
    { id: 5, name: 'Dr. Priya Nair', initials: 'PN', specialty: 'Cardiology', department: 'Cardiology', experience: 7, qualifications: ['MBBS', 'DM'], booked: 20, capacity: 28, status: 'Near Full' },
    { id: 6, name: 'Dr. James Osei', initials: 'JO', specialty: 'Orthopedics', department: 'Orthopedics', experience: 9, qualifications: ['MBBS', 'MS'], booked: 9, capacity: 22, status: 'Normal' },
    { id: 7, name: 'Dr. Lisa Anderson', initials: 'LA', specialty: 'Pediatrics', department: 'Pediatrics', experience: 11, qualifications: ['MBBS', 'MD Peds'], booked: 15, capacity: 25, status: 'Normal' },
    { id: 8, name: 'Dr. Michael Brown', initials: 'MB', specialty: 'Gen. Medicine', department: 'Gen. Medicine', experience: 14, qualifications: ['MBBS', 'MD'], booked: 18, capacity: 30, status: 'Normal' }
  ];

  const filteredDoctors = activeFilter === 'All' 
    ? mockDoctors 
    : mockDoctors.filter(doc => doc.specialty === activeFilter);

  const getStatusColor = (status) => {
    if (status === 'Overloaded') return 'bg-red-100 text-red-700';
    if (status === 'Near Full') return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  const getProgressColor = (status) => {
    if (status === 'Overloaded') return 'bg-red-500';
    if (status === 'Near Full') return 'bg-yellow-500';
    return 'bg-teal-500';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Doctors</h1>
          <p className="text-gray-500 mt-2">All registered doctors and their profiles</p>
        </div>
        <button className="bg-teal-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-600 transition-all shadow-md hover:shadow-lg">
          + Add Doctor
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-8">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter
                ? 'bg-teal-500 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-4 gap-6">
        {filteredDoctors.map(doctor => {
          const percentage = Math.round((doctor.booked / doctor.capacity) * 100);
          return (
            <div key={doctor.id} className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition-shadow relative">
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(doctor.status)}`}>
                  {doctor.status}
                </span>
              </div>

              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {doctor.initials}
                </div>
              </div>

              {/* Doctor Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{doctor.specialty}</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium mb-2">
                  {doctor.department}
                </span>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-600 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{doctor.experience} years exp.</span>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {doctor.qualifications.map((qual, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {qual}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress Section */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">{doctor.booked}/{doctor.capacity} Booked</span>
                  <span className="text-sm font-bold text-gray-900">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${getProgressColor(doctor.status)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorManagement;
