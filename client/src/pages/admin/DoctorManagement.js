import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axiosInstance.get('/doctors');
      const data = response.data.doctors || response.data;
      setDoctors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="text-gray-600">Loading doctors...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Doctor Management</h1>
        <p className="text-gray-600">Manage hospital doctors and their schedules</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
                {doctor.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                <p className="text-blue-600 font-medium">{doctor.specialization}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="material-symbols-rounded text-[20px]">schedule</span>
                <span className="text-sm">{doctor.workingHours?.start} - {doctor.workingHours?.end}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <span className="material-symbols-rounded text-[20px]">timer</span>
                <span className="text-sm">Regular: {doctor.consultationDurations?.regular}min | New: {doctor.consultationDurations?.new}min</span>
              </div>

              {doctor.surgerySlots && doctor.surgerySlots.length > 0 && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="material-symbols-rounded text-[20px]">medical_services</span>
                  <span className="text-sm">{doctor.surgerySlots.length} Surgery Slots</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  View Schedule
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {doctors.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <span className="material-symbols-rounded text-[64px] text-gray-300">person_off</span>
          <p className="mt-4">No doctors found</p>
        </div>
      )}
    </div>
  );
};

export default DoctorManagement;
