import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';

const PatientDashboard = () => {
  const { doctors, appointments } = useApp();
  const { user } = useAuth();
  const patientName = user?.name || "Patient";
  const [countdown, setCountdown] = useState({});

  const myActiveAppointments = appointments.filter(
    a => a.patientName === patientName && a.status !== 'Completed'
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const newCountdown = {};
      myActiveAppointments.forEach(apt => {
        if (apt.status === 'Waiting') {
          newCountdown[apt.id] = apt.estimatedWaitTime * 60;
        }
      });
      setCountdown(newCountdown);
    }, 1000);

    return () => clearInterval(timer);
  }, [myActiveAppointments]);

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalVisits = appointments.filter(a => a.patientName === patientName).length;
  const upcomingCount = myActiveAppointments.length;

  return (
    <div>
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl shadow-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {patientName}!</h1>
          <p className="text-blue-100">Here's your health dashboard overview</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Visits" value={totalVisits} icon="🏥" color="blue" />
        <StatCard title="Active Appointments" value={upcomingCount} icon="📅" color="green" />
        <StatCard title="Prescriptions" value="3" icon="💊" color="teal" />
        <StatCard title="Pending Bills" value="$200" icon="💳" color="orange" />
      </div>

      {myActiveAppointments.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Appointments</h2>
          <div className="grid gap-6">
            {myActiveAppointments.map(apt => {
              const doctor = doctors.find(d => d.id === apt.doctorId);
              return (
                <div key={apt.id} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                  <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-3">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{doctor?.name}</h3>
                          <p className="text-gray-600">{apt.department} • Slot: {apt.slotTime}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${apt.status === 'In Consultation'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {apt.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                          <p className="text-sm text-blue-700 mb-1">Queue Position</p>
                          <p className="text-4xl font-bold text-blue-900">{apt.queuePosition}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                          <p className="text-sm text-green-700 mb-1">Estimated Wait</p>
                          <p className="text-4xl font-bold text-green-900">{apt.estimatedWaitTime} min</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 text-center">
                          <p className="text-sm text-purple-700 mb-1">Consultation Time</p>
                          <p className="text-4xl font-bold text-purple-900">{doctor?.consultationTime} min</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl p-6 text-white">
                      <p className="text-sm mb-2">Live Countdown</p>
                      <p className="text-5xl font-mono font-bold">
                        {apt.status === 'Waiting' ? formatCountdown(countdown[apt.id] || apt.estimatedWaitTime * 60) : '--:--'}
                      </p>
                      {apt.status === 'In Consultation' && (
                        <p className="text-sm mt-2 text-blue-100">In Progress</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {appointments
              .filter(a => a.patientName === patientName)
              .slice(0, 5)
              .map(apt => {
                const doctor = doctors.find(d => d.id === apt.doctorId);
                return (
                  <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">{doctor?.name}</p>
                      <p className="text-sm text-gray-600">{apt.department} • {apt.slotTime}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${apt.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                        apt.status === 'In Consultation' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                      }`}>
                      {apt.status}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Total Doctors</span>
              <span className="text-2xl font-bold text-primary">{doctors.length}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Departments</span>
              <span className="text-2xl font-bold text-secondary">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg Wait Time</span>
              <span className="text-2xl font-bold text-accent">
                {Math.round(doctors.reduce((acc, d) => acc + d.consultationTime, 0) / doctors.length)} mins
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
