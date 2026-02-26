import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { departments } from '../../data/mockData';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/appointments?role=patient');
      console.log('Appointments response:', response.data);
      setAppointments(response.data.appointments || []);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axiosInstance.get('/doctors');
      console.log('Doctors response:', response.data);
      setDoctors(response.data || []);
    } catch (err) {
      console.error('Failed to fetch doctors:', err);
      setDoctors([]);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedDepartment) return;

    setBookingLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/appointments/book', {
        department: selectedDepartment,
        patientType: 'regular'
      });
      console.log('Booking response:', response.data);
      
      setConfirmedAppointment(response.data.appointment);
      setShowSuccessModal(true);
      setShowBooking(false);
      setSelectedDepartment('');
    } catch (err) {
      console.error('Booking failed:', err);
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setBookingLoading(false);
    }
  };

  const filteredDoctors = selectedDepartment
    ? doctors.filter(d => d.department === selectedDepartment)
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading appointments...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
          <p className="text-gray-600 mt-2">Book and manage your medical appointments</p>
        </div>
        <button
          onClick={() => setShowBooking(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          + Book New Appointment
        </button>
      </div>

      {showBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Book New Appointment</h2>
            <form onSubmit={handleBooking}>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select Department...</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {selectedDepartment && filteredDoctors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">Available Doctors</label>
                  <div className="space-y-3">
                    {filteredDoctors.map(doctor => (
                      <div
                        key={doctor._id}
                        className="p-4 border-2 border-gray-200 rounded-lg"
                      >
                        <h4 className="font-semibold text-gray-800">{doctor.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{doctor.department}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-3 italic">
                    The system will automatically assign you to the best available doctor.
                  </p>
                </div>
              )}

              <div className="flex space-x-3 mt-8">
                <button
                  type="submit"
                  disabled={!selectedDepartment || bookingLoading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowBooking(false);
                    setSelectedDepartment('');
                    setError('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && confirmedAppointment && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-hidden">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-14 h-14 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Appointment Confirmed</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">Your appointment has been successfully scheduled.</p>
              
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-6 mb-8 text-left space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Doctor</span>
                  <span className="text-lg font-bold text-gray-900">{confirmedAppointment.doctorName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Department</span>
                  <span className="text-lg font-bold text-gray-900">{confirmedAppointment.department}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Time Slot</span>
                  <span className="text-lg font-bold text-gray-900">{confirmedAppointment.slotTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Queue Position</span>
                  <span className="text-3xl font-extrabold text-blue-600">{confirmedAppointment.queuePosition}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Estimated Wait</span>
                  <span className="text-lg font-bold text-gray-900">{confirmedAppointment.estimatedWaitTime} min</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    fetchAppointments();
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  View My Appointments
                </button>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full bg-white border-2 border-slate-300 text-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-400 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">My Appointments</h3>
        {appointments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl mb-2">📅</p>
            <p>No appointments yet</p>
            <p className="text-sm mt-2">Book your first appointment to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Slot</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Queue Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Wait Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {appointments.map(apt => (
                  <tr key={apt._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">{apt.doctorName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.department}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-800">{apt.slotTime}</td>
                    <td className="px-6 py-4">
                      <span className="text-2xl font-bold text-blue-600">{apt.queuePosition}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.estimatedWaitTime} min</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        apt.status === 'In Consultation' ? 'bg-green-100 text-green-800' :
                        apt.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' :
                        apt.status === 'Completed' || apt.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;
