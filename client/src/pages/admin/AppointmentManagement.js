import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const AppointmentManagement = () => {
  const { appointments } = useApp();
  const [selectedDate, setSelectedDate] = useState(15);
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(1); // 0 = January, 1 = February
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
    setSelectedDate(1);
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
    setSelectedDate(1);
  };

  // Get days in month
  const getDaysInMonth = (monthIndex) => {
    const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysPerMonth[monthIndex];
  };

  const appointmentsList = [
    // Feb 15 - 6 appointments
    { date: 15, month: 1, year: 2026, time: '09:00', patient: 'Vikram Singh', doctor: 'Dr. Robert Chen', dept: 'Orthopedics', token: 'O-200', status: 'Confirmed' },
    { date: 15, month: 1, year: 2026, time: '09:30', patient: 'Anita Sharma', doctor: 'Dr. Sarah Johnson', dept: 'Cardiology', token: 'C-201', status: 'Waiting' },
    { date: 15, month: 1, year: 2026, time: '10:00', patient: 'Arun Sharma', doctor: 'Dr. Arjun Mehta', dept: 'General Medicine', token: 'G-202', status: 'Confirmed' },
    { date: 15, month: 1, year: 2026, time: '10:30', patient: 'Kiran Rao', doctor: 'Dr. Emily White', dept: 'Pediatrics', token: 'P-203', status: 'Confirmed' },
    { date: 15, month: 1, year: 2026, time: '11:00', patient: 'Priya Das', doctor: 'Dr. Emily White', dept: 'Pediatrics', token: 'P-204', status: 'Waiting' },
    { date: 15, month: 1, year: 2026, time: '02:00', patient: 'Suresh Babu', doctor: 'Dr. Arjun Mehta', dept: 'General Medicine', token: 'G-206', status: 'Completed' },
    // Feb 16 - 2 appointments
    { date: 16, month: 1, year: 2026, time: '09:00', patient: 'Rajesh Kumar', doctor: 'Dr. Robert Chen', dept: 'Orthopedics', token: 'O-207', status: 'Confirmed' },
    { date: 16, month: 1, year: 2026, time: '10:00', patient: 'Meera Patel', doctor: 'Dr. Sarah Johnson', dept: 'Cardiology', token: 'C-208', status: 'Waiting' },
    // Feb 18 - 3 appointments
    { date: 18, month: 1, year: 2026, time: '09:00', patient: 'Sanjay Reddy', doctor: 'Dr. Robert Chen', dept: 'Orthopedics', token: 'O-211', status: 'Confirmed' },
    { date: 18, month: 1, year: 2026, time: '11:00', patient: 'Lakshmi Iyer', doctor: 'Dr. Emily White', dept: 'Pediatrics', token: 'P-212', status: 'Confirmed' },
    { date: 18, month: 1, year: 2026, time: '02:30', patient: 'Ravi Nair', doctor: 'Dr. Arjun Mehta', dept: 'General Medicine', token: 'G-213', status: 'Waiting' },
    // Feb 20 - 1 appointment
    { date: 20, month: 1, year: 2026, time: '09:00', patient: 'Amit Singh', doctor: 'Dr. Arjun Mehta', dept: 'General Medicine', token: 'G-209', status: 'Confirmed' },
    // Feb 22 - 4 appointments
    { date: 22, month: 1, year: 2026, time: '09:00', patient: 'Neha Kapoor', doctor: 'Dr. Sarah Johnson', dept: 'Cardiology', token: 'C-214', status: 'Confirmed' },
    { date: 22, month: 1, year: 2026, time: '10:00', patient: 'Arjun Desai', doctor: 'Dr. Robert Chen', dept: 'Orthopedics', token: 'O-215', status: 'Waiting' },
    { date: 22, month: 1, year: 2026, time: '11:30', patient: 'Pooja Menon', doctor: 'Dr. Emily White', dept: 'Pediatrics', token: 'P-216', status: 'Confirmed' },
    { date: 22, month: 1, year: 2026, time: '03:00', patient: 'Karthik Bhat', doctor: 'Dr. Arjun Mehta', dept: 'General Medicine', token: 'G-217', status: 'Confirmed' },
    // Feb 25 - 7 appointments
    { date: 25, month: 1, year: 2026, time: '09:00', patient: 'Divya Pillai', doctor: 'Dr. Sarah Johnson', dept: 'Cardiology', token: 'C-218', status: 'Confirmed' },
    { date: 25, month: 1, year: 2026, time: '09:30', patient: 'Rohit Joshi', doctor: 'Dr. Robert Chen', dept: 'Orthopedics', token: 'O-219', status: 'Waiting' },
    { date: 25, month: 1, year: 2026, time: '10:00', patient: 'Kavita Shah', doctor: 'Dr. Emily White', dept: 'Pediatrics', token: 'P-220', status: 'Confirmed' },
    { date: 25, month: 1, year: 2026, time: '10:30', patient: 'Manish Agarwal', doctor: 'Dr. Arjun Mehta', dept: 'General Medicine', token: 'G-221', status: 'Confirmed' },
    { date: 25, month: 1, year: 2026, time: '11:00', patient: 'Sneha Rao', doctor: 'Dr. Sarah Johnson', dept: 'Cardiology', token: 'C-222', status: 'Waiting' },
    { date: 25, month: 1, year: 2026, time: '02:00', patient: 'Varun Kumar', doctor: 'Dr. Robert Chen', dept: 'Orthopedics', token: 'O-223', status: 'Confirmed' },
    { date: 25, month: 1, year: 2026, time: '03:00', patient: 'Anjali Verma', doctor: 'Dr. Emily White', dept: 'Pediatrics', token: 'P-224', status: 'Confirmed' },
    // Feb 28 - 12 appointments
    { date: 28, month: 1, year: 2026, time: '09:00', patient: 'Rahul Saxena', doctor: 'Dr. Sarah Johnson', dept: 'Cardiology', token: 'C-225', status: 'Confirmed' },
    { date: 28, month: 1, year: 2026, time: '09:20', patient: 'Priyanka Das', doctor: 'Dr. Robert Chen', dept: 'Orthopedics', token: 'O-226', status: 'Waiting' },
    { date: 28, month: 1, year: 2026, time: '09:40', patient: 'Sunil Gupta', doctor: 'Dr. Arjun Mehta', dept: 'General Medicine', token: 'G-227', status: 'Confirmed' },
    { date: 28, month: 1, year: 2026, time: '10:00', patient: 'Meena Krishnan', doctor: 'Dr. Emily White', dept: 'Pediatrics', token: 'P-228', status: 'Confirmed' },
    { date: 28, month: 1, year: 2026, time: '10:20', patient: 'Aditya Sharma', doctor: 'Dr. Sarah Johnson', dept: 'Cardiology', token: 'C-229', status: 'Waiting' },
    { date: 28, month: 1, year: 2026, time: '10:40', patient: 'Nisha Patel', doctor: 'Dr. Robert Chen', dept: 'Orthopedics', token: 'O-230', status: 'Confirmed' },
    { date: 28, month: 1, year: 2026, time: '11:00', patient: 'Vivek Malhotra', doctor: 'Dr. Arjun Mehta', dept: 'General Medicine', token: 'G-231', status: 'Confirmed' },
    { date: 28, month: 1, year: 2026, time: '11:20', patient: 'Shruti Reddy', doctor: 'Dr. Emily White', dept: 'Pediatrics', token: 'P-232', status: 'Waiting' },
    { date: 28, month: 1, year: 2026, time: '02:00', patient: 'Akash Jain', doctor: 'Dr. Sarah Johnson', dept: 'Cardiology', token: 'C-233', status: 'Confirmed' },
    { date: 28, month: 1, year: 2026, time: '02:30', patient: 'Deepika Singh', doctor: 'Dr. Robert Chen', dept: 'Orthopedics', token: 'O-234', status: 'Confirmed' },
    { date: 28, month: 1, year: 2026, time: '03:00', patient: 'Harish Nair', doctor: 'Dr. Arjun Mehta', dept: 'General Medicine', token: 'G-235', status: 'Waiting' },
    { date: 28, month: 1, year: 2026, time: '03:30', patient: 'Swati Deshmukh', doctor: 'Dr. Emily White', dept: 'Pediatrics', token: 'P-236', status: 'Confirmed' },
    // March 5 - 1 appointment
    { date: 5, month: 2, year: 2026, time: '09:00', patient: 'Deepak Verma', doctor: 'Dr. Robert Chen', dept: 'Orthopedics', token: 'O-210', status: 'Confirmed' }
  ];

  // Generate calendar dates with real appointment counts
 const generateCalendarDates = () => {
  const daysInMonth = getDaysInMonth(currentMonthIndex);
  const dates = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const count = appointmentsList.filter(apt => apt.date === i && apt.month === currentMonthIndex && apt.year === currentYear).length;
    dates.push({ date: i, appointments: count });
  }
  return dates;
};

  const calendarDates = generateCalendarDates();

  const getCountColor = (count) => {
    if (count >= 10) return 'text-red-600';
    if (count >= 5) return 'text-orange-600';
    if (count >= 1) return 'text-teal-600';
    return 'text-gray-400';
  };

  const getDotColor = (count) => {
    if (count >= 10) return 'bg-red-500';
    if (count >= 5) return 'bg-orange-500';
    if (count >= 1) return 'bg-teal-500';
    return 'bg-gray-300';
  };

  // Filter appointments for selected date
  const filteredAppointments = appointmentsList.filter(apt => 
    apt.date === selectedDate && apt.month === currentMonthIndex && apt.year === currentYear
  );

  const getStatusStyle = (status) => {
    if (status === 'Confirmed') return 'bg-green-100 text-green-700';
    if (status === 'Waiting') return 'bg-yellow-100 text-yellow-700';
    return 'text-gray-500';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">Appointments</h1>
        <p className="text-gray-500 mt-2">Calendar view of all scheduled appointments</p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-4 gap-6">
        {/* LEFT: Calendar Panel */}
        <div className="bg-white rounded-3xl shadow-md p-5">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button 
              type="button"
              onClick={handlePrevMonth}
              className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-center">
              <h2 className="text-base font-bold text-gray-900">{monthNames[currentMonthIndex]} {currentYear}</h2>
              <p className="text-xs text-teal-600">Selected: {selectedDate}</p>
            </div>
            <button 
              type="button"
              onClick={handleNextMonth}
              className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-xs font-semibold text-gray-500">{day}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {calendarDates.map(({ date, appointments: count }) => (
              <div
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`relative h-14 rounded-lg text-xs font-medium transition-all cursor-pointer flex flex-col items-center justify-center ${
                  selectedDate === date
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="font-semibold text-sm">{date}</span>
                <span className={`text-xs font-bold mt-1 ${
                  selectedDate === date ? 'text-white' : count > 0 ? getCountColor(count) : 'text-gray-400'
                }`}>
                  {count}
                </span>
                <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                  selectedDate === date ? 'bg-white' : getDotColor(count)
                }`} />
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                <span className="text-gray-600">10+ appts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                <span className="text-gray-600">5–9</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                <span className="text-gray-600">1–4</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Appointment List Panel */}
        <div className="col-span-3 bg-white rounded-3xl shadow-md p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Appointments for {monthNames[currentMonthIndex]} {selectedDate}, {currentYear}</h2>
              <p className="text-sm text-gray-500 mt-1">{filteredAppointments.length} appointments scheduled</p>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
              Show All
            </button>
          </div>

          {/* Appointment Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Time</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Patient</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Doctor</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Dept</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Token</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((apt, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-semibold text-gray-900">{apt.time}</td>
                    <td className="py-4 px-4 text-sm text-gray-800">{apt.patient}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{apt.doctor}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{apt.dept}</td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {apt.token}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;
