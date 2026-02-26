import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import StatCard from '../components/StatCard';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0, upcoming: 0 });
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [processing, setProcessing] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(false);
  const location = useLocation();
  const patientName = localStorage.getItem('userName') || "Patient";

  useEffect(() => {
    fetchData();
  }, [location]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [aptsRes, statsRes] = await Promise.all([
        axiosInstance.get('/appointments?role=patient'),
        axiosInstance.get('/analytics/patient-dashboard')
      ]);
      setAppointments(aptsRes.data.appointments || []);
      
      if (statsRes.data) {
        setStats(statsRes.data);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const myActiveAppointments = appointments.filter(
    a => a.status !== 'Completed' && a.status !== 'completed' && a.status !== 'Cancelled'
  );

  const nextAppointment = myActiveAppointments.length > 0 ? myActiveAppointments[0] : null;

  const totalVisits = stats.total || 0;
  const upcomingCount = stats.upcoming || 0;
  const activeCount = stats.active || 0;
  const completedCount = stats.completed || 0;

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const handleCancelConfirm = async () => {
    setProcessing(true);
    try {
      const response = await axiosInstance.put(`/appointments/cancel/${selectedAppointment._id}`);
      if (response.data.success) {
        setShowCancelModal(false);
        setSuccessMessage('Your appointment has been successfully cancelled.');
        setShowSuccessModal(true);
        await fetchData();
      }
    } catch (error) {
      alert('Failed to cancel appointment: ' + (error.response?.data?.message || error.message));
    } finally {
      setProcessing(false);
    }
  };

  const handleRescheduleClick = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedDate('');
    setSelectedSlot('');
    setAvailableSlots([]);
    setShowRescheduleModal(true);
  };

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedSlot('');
    
    if (date && selectedAppointment) {
      setLoadingSlots(true);
      try {
        const response = await axiosInstance.get('/appointments/available-slots', {
          params: {
            doctorId: selectedAppointment.doctorId,
            date: date,
            appointmentType: 'general'
          }
        });
        setAvailableSlots(response.data.slots || []);
      } catch (error) {
        console.error('Failed to fetch slots:', error);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    }
  };

  const handleRescheduleConfirm = async () => {
    if (!selectedDate || !selectedSlot) {
      alert('Please select both date and time slot');
      return;
    }

    setProcessing(true);
    try {
      const response = await axiosInstance.put(`/appointments/reschedule/${selectedAppointment._id}`, {
        newDate: selectedDate,
        newSlotTime: selectedSlot
      });
      
      if (response.data.success) {
        setShowRescheduleModal(false);
        setSuccessMessage('Appointment successfully rescheduled');
        setShowSuccessModal(true);
        await fetchData();
      }
    } catch (error) {
      alert('Failed to reschedule: ' + (error.response?.data?.message || error.message));
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back, {patientName}!</h1>
        <p className="text-gray-600 text-lg">Here's your health dashboard overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard title="Total" value={totalVisits} icon="analytics" color="blue" />
        <StatCard title="Upcoming" value={upcomingCount} icon="event" color="purple" />
        <StatCard title="Active" value={activeCount} icon="schedule" color="green" />
        <StatCard title="Visited" value={completedCount} icon="check_circle" color="teal" />
      </div>

      <div className="mb-6 max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Next Reminder</h2>
        {nextAppointment ? (
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-md p-6 border border-blue-100">
            <div className="border-b border-gray-300 pb-4 mb-4">
              <p className="text-gray-700 font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">person</span>
                Dear {nextAppointment.patientName},
              </p>
              <p className="text-gray-600 mt-2">
                {nextAppointment.bookingType === 'other' ? 'An appointment has been booked for you.' : 'Your appointment has been successfully booked.'}
              </p>
            </div>
            
            <div className="space-y-3 text-sm border-b border-gray-300 pb-4 mb-4">
              <div className="flex items-center">
                <span className="text-gray-700 font-semibold w-40 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">medical_services</span>
                  Doctor
                </span>
                <span className="text-gray-600">: {nextAppointment.doctorName}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 font-semibold w-40 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">calendar_today</span>
                  Date
                </span>
                <span className="text-gray-600">: {new Date(nextAppointment.appointmentDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 font-semibold w-40 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                  Slot
                </span>
                <span className="text-gray-600">: {nextAppointment.slotTime}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 font-semibold w-40 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">hourglass_empty</span>
                  Waiting Time
                </span>
                <span className="text-gray-600">: {nextAppointment.estimatedWaitTime} min</span>
              </div>
            </div>
            
            <p className="text-gray-700 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">location_on</span>
              Please arrive {nextAppointment.estimatedWaitTime} minutes before your slot.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-3">event_available</span>
            <p className="text-gray-500">No upcoming appointments</p>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Appointments</h2>
        {myActiveAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <span className="material-symbols-outlined text-7xl text-gray-300 mb-4">calendar_month</span>
            <p className="text-gray-500 text-lg">No active appointments</p>
            <p className="text-gray-400 text-sm mt-2">Book an appointment to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myActiveAppointments.map(apt => {
              const patientsBeforeYou = apt.queuePosition - 1;
              const progressPercentage = Math.min((patientsBeforeYou / apt.queuePosition) * 100, 100);
              
              return (
                <div key={apt._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 border-t-4 border-blue-500">
                  <div className="border-b border-gray-200 pb-3 mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{apt.doctorName} ({apt.department})</h3>
                    <p className="text-sm text-gray-600 mt-1">Patient: {apt.patientName}</p>
                    <p className="text-sm text-gray-600">Scheduled: {apt.slotTime}</p>
                  </div>

                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Queue No:</span>
                      <span className="font-semibold text-gray-900">{apt.queuePosition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Patients Before You:</span>
                      <span className="font-semibold text-gray-900">{patientsBeforeYou}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Wait:</span>
                      <span className="font-semibold text-gray-900">{apt.estimatedWaitTime} min</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-2 mb-3 flex items-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-lg text-blue-600">schedule</span>
                    <span className="text-gray-700">Arrive By: {apt.slotTime}</span>
                  </div>

                  <div className="mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className={`flex items-center gap-1 font-semibold ${
                      apt.status === 'Scheduled' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      Status: {apt.status === 'Scheduled' ? 'On Time' : apt.status}
                      <span className="material-symbols-outlined text-base">{apt.status === 'Scheduled' ? 'check_circle' : 'pending'}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => handleRescheduleClick(apt)}
                      className="bg-gray-100 text-gray-700 py-2 px-2 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-base">event</span>
                      Reschedule
                    </button>
                    <button 
                      onClick={() => handleCancelClick(apt)}
                      className="bg-red-100 text-red-700 py-2 px-2 rounded-lg text-xs font-semibold hover:bg-red-200 transition-colors flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-base">cancel</span>
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ overflow: 'hidden' }}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Cancel Appointment?</h3>
            <p className="text-gray-600 text-sm mb-5">
              Are you sure? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCancelModal(false)}
                disabled={processing}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                No, Keep
              </button>
              <button
                onClick={handleCancelConfirm}
                disabled={processing}
                className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {processing ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ overflow: 'hidden' }}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center mb-4">
              <span className="material-symbols-outlined text-7xl text-green-500 mb-4">check_circle</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
              <p className="text-gray-600">{successMessage}</p>
            </div>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 my-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Reschedule Appointment</h3>
            
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Current:</strong> {selectedAppointment.doctorName} on {new Date(selectedAppointment.appointmentDate).toLocaleDateString()} at {selectedAppointment.slotTime}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select New Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {selectedDate && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Time Slot</label>
                {loadingSlots ? (
                  <div className="text-center py-4">Loading slots...</div>
                ) : availableSlots.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">No available slots for this date</div>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {availableSlots.map((slot, index) => {
                      const [hour, minute] = slot.time.split(':');
                      const nextHour = (parseInt(hour) + 1).toString().padStart(2, '0');
                      const timeRange = `${slot.time} - ${nextHour}:${minute}`;
                      
                      return (
                        <button
                          key={index}
                          onClick={() => slot.status === 'available' && setSelectedSlot(slot.time)}
                          disabled={slot.status === 'full'}
                          className={`w-full py-3 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                            selectedSlot === slot.time
                              ? 'bg-blue-600 text-white'
                              : slot.status === 'available'
                              ? 'bg-green-50 text-green-700 hover:bg-green-100 border-2 border-green-200'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200'
                          }`}
                        >
                          <span>{timeRange}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            slot.status === 'available' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                          }`}>
                            {slot.status === 'available' ? 'Available' : 'Full'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowRescheduleModal(false)}
                disabled={processing}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRescheduleConfirm}
                disabled={processing || !selectedDate || !selectedSlot}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Processing...
                  </>
                ) : (
                  'Confirm Reschedule'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
