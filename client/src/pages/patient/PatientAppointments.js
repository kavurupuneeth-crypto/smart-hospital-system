import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  // Booking form states
  const [showBooking, setShowBooking] = useState(false);
  const [bookingType, setBookingType] = useState('self');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reason, setReason] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  
  // Other person details
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientRelation, setPatientRelation] = useState('');
  
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      fetchAvailableSlots();
    } else {
      setAvailableSlots([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDoctor, selectedDate]);

  useEffect(() => {
    if (showSuccessModal || showBooking || showCancelModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSuccessModal, showBooking, showCancelModal]);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchAppointments(), fetchDoctors()]);
    setLoading(false);
  };

  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get('/appointments?role=patient');
      setAppointments(response.data.appointments || []);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axiosInstance.get('/doctors');
      setDoctors(response.data || []);
      const uniqueDepts = [...new Set(response.data.map(d => d.department))];
      setDepartments(uniqueDepts);
    } catch (err) {
      console.error('Failed to fetch doctors:', err);
    }
  };

  const fetchAvailableSlots = async () => {
    setLoadingSlots(true);
    try {
      const response = await axiosInstance.get('/appointments/available-slots', {
        params: {
          doctorId: selectedDoctor,
          date: selectedDate
        }
      });
      setAvailableSlots(response.data.slots || []);
    } catch (err) {
      console.error('Failed to fetch slots:', err);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      setError('Please select a time slot');
      return;
    }

    setBookingLoading(true);
    setError('');

    try {
      const bookingData = {
        doctorId: selectedDoctor,
        appointmentDate: selectedDate,
        slotStartTime: selectedSlot.slotStartTime,
        bookingType,
        reason
      };

      if (bookingType === 'other') {
        bookingData.patientDetails = {
          name: patientName,
          age: parseInt(patientAge),
          gender: patientGender,
          phone: patientPhone,
          relation: patientRelation
        };
      }

      const response = await axiosInstance.post('/appointments/book', bookingData);
      
      if (response.data.success) {
        setConfirmedAppointment(response.data.appointment);
        setShowSuccessModal(true);
        setShowBooking(false);
        resetForm();
        await fetchAppointments();
      }
    } catch (err) {
      console.error('Booking failed:', err);
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setBookingLoading(false);
    }
  };

  const resetForm = () => {
    setBookingType('self');
    setSelectedDepartment('');
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedSlot(null);
    setReason('');
    setPatientName('');
    setPatientAge('');
    setPatientGender('');
    setPatientPhone('');
    setPatientRelation('');
    setError('');
    setAvailableSlots([]);
  };

  const handleCancelClick = (appointment) => {
    setAppointmentToCancel(appointment);
    setShowCancelModal(true);
  };

  const handleCancelConfirm = async () => {
    if (!appointmentToCancel) return;
    
    setCancelLoading(true);
    try {
      const response = await axiosInstance.put(`/appointments/cancel/${appointmentToCancel._id}`);
      if (response.data.success) {
        setShowCancelModal(false);
        setConfirmedAppointment({ message: 'Appointment successfully cancelled' });
        setShowSuccessModal(true);
        await fetchAppointments();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel appointment');
    } finally {
      setCancelLoading(false);
      setAppointmentToCancel(null);
    }
  };

  const filteredDoctors = selectedDepartment
    ? doctors.filter(d => d.department === selectedDepartment)
    : [];

  const sortedAppointments = [...appointments].sort((a, b) => {
    const statusOrder = { 'Scheduled': 1, 'In Consultation': 2, 'Completed': 3, 'completed': 3, 'Cancelled': 4 };
    return (statusOrder[a.status] || 5) - (statusOrder[b.status] || 5);
  });

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
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Book New Appointment
        </button>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full my-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Book New Appointment</h2>
            
            <form onSubmit={handleBooking}>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* STEP 1: Booking Type Selection */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <label className="block text-gray-700 font-semibold mb-3">Booking For</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="self"
                      checked={bookingType === 'self'}
                      onChange={(e) => setBookingType(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700 font-medium">Self</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="other"
                      checked={bookingType === 'other'}
                      onChange={(e) => setBookingType(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700 font-medium">For Someone Else</span>
                  </label>
                </div>
              </div>

              {/* Patient Details for Others */}
              {bookingType === 'other' && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg space-y-4">
                  <h3 className="font-semibold text-gray-800">Patient Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Patient Name *</label>
                      <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Age *</label>
                      <input
                        type="number"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Gender *</label>
                      <select
                        value={patientGender}
                        onChange={(e) => setPatientGender(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 text-sm font-medium mb-1">Relation</label>
                      <select
                        value={patientRelation}
                        onChange={(e) => setPatientRelation(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="">Select...</option>
                        <option value="father">Father</option>
                        <option value="mother">Mother</option>
                        <option value="sibling">Sibling</option>
                        <option value="spouse">Spouse</option>
                        <option value="child">Child</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Department and Doctor Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Department *</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => {
                      setSelectedDepartment(e.target.value);
                      setSelectedDoctor('');
                      setSelectedSlot(null);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  >
                    <option value="">Select Department...</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Doctor *</label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => {
                      setSelectedDoctor(e.target.value);
                      setSelectedSlot(null);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled={!selectedDepartment}
                    required
                  >
                    <option value="">Select Doctor...</option>
                    {filteredDoctors.map(doctor => (
                      <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date and Reason */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Appointment Date *</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedSlot(null);
                    }}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Reason *</label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  >
                    <option value="">Select Reason...</option>
                    <option value="checkup">General Checkup</option>
                    <option value="consultation">Consultation</option>
                    <option value="followup">Follow-up</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && selectedDoctor && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">Select Time Slot *</label>
                  {loadingSlots ? (
                    <div className="text-center py-8 text-gray-500">Loading available slots...</div>
                  ) : availableSlots.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No available slots for this date</div>
                  ) : (
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => slot.available && setSelectedSlot(slot)}
                          disabled={!slot.available}
                          className={`w-full py-3 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                            selectedSlot?.slotStartTime === slot.slotStartTime
                              ? 'bg-blue-600 text-white'
                              : slot.available
                              ? 'bg-green-50 text-green-700 hover:bg-green-100 border-2 border-green-200'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200'
                          }`}
                        >
                          <span>{formatTime(slot.slotStartTime)} - {formatTime(slot.slotEndTime)}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            slot.available ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                          }`}>
                            {slot.available ? 'Available' : 'Full'}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  type="submit"
                  disabled={bookingLoading || !selectedSlot}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowBooking(false);
                    resetForm();
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">
            <div className="text-center">
              <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-6xl text-green-600">check_circle</span>
              </div>
              
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
                {confirmedAppointment.message ? 'Success!' : 'Appointment Booked!'}
              </h2>
              <p className="text-slate-600 mb-8">
                {confirmedAppointment.message || 'Your appointment has been successfully scheduled.'}
              </p>
              
              {!confirmedAppointment.message && (
                <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-6 mb-8 text-left space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-slate-600">Doctor</span>
                    <span className="text-sm font-bold text-gray-900">{confirmedAppointment.doctorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-slate-600">Department</span>
                    <span className="text-sm font-bold text-gray-900">{confirmedAppointment.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-slate-600">Time Slot</span>
                    <span className="text-sm font-bold text-gray-900">{confirmedAppointment.slotTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-slate-600">Queue Position</span>
                    <span className="text-2xl font-extrabold text-blue-600">{confirmedAppointment.queuePosition}</span>
                  </div>
                </div>
              )}
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && appointmentToCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Cancel Appointment?</h3>
            <p className="text-gray-600 text-sm mb-5">
              Are you sure you want to cancel your appointment with {appointmentToCancel.doctorName}?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setAppointmentToCancel(null);
                }}
                disabled={cancelLoading}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                No, Keep
              </button>
              <button
                onClick={handleCancelConfirm}
                disabled={cancelLoading}
                className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {cancelLoading ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">My Appointments</h3>
        {appointments.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <span className="material-symbols-outlined text-6xl mb-3">event_busy</span>
            <p className="text-lg font-medium">No appointments yet</p>
            <p className="text-sm mt-2">Book your first appointment to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Patient</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Doctor</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Time Slot</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Queue</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedAppointments.map(apt => (
                  <tr key={apt._id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-5 text-sm font-semibold text-gray-900">
                      {apt.patientName}
                      {apt.bookingType === 'other' && (
                        <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">Other</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-sm font-semibold text-gray-900">{apt.doctorName}</td>
                    <td className="px-6 py-5 text-sm text-gray-700">{apt.department}</td>
                    <td className="px-6 py-5 text-sm font-medium text-gray-800">
                      {apt.slotTime || '—'}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-2xl font-extrabold text-blue-600">{apt.queuePosition}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                        apt.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                        apt.status === 'In Consultation' ? 'bg-yellow-100 text-yellow-700' :
                        apt.status === 'Completed' || apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                        apt.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      {(apt.status === 'Scheduled' || apt.status === 'In Consultation') && (
                        <button
                          onClick={() => handleCancelClick(apt)}
                          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium text-sm"
                        >
                          Cancel
                        </button>
                      )}
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
