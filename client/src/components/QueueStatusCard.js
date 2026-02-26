import React, { useState, useEffect } from 'react';

const QueueStatusCard = ({ appointment, onCancel }) => {
  const [countdown, setCountdown] = useState(appointment.estimatedWaitingTime * 60);

  useEffect(() => {
    setCountdown(appointment.estimatedWaitingTime * 60);
  }, [appointment.estimatedWaitingTime]);

  useEffect(() => {
    if (appointment.status === 'Waiting' && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [appointment.status, countdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const statusColors = {
    'Waiting': 'bg-yellow-100 text-yellow-800',
    'In Consultation': 'bg-green-100 text-green-800',
    'Completed': 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{appointment.patientName}</h3>
          <p className="text-gray-600 text-sm mt-1">Appointment #{appointment.id}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[appointment.status]}`}>
          {appointment.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Queue Position:</span>
          <span className="text-2xl font-bold text-primary">{appointment.queuePosition}</span>
        </div>

        {appointment.status === 'Waiting' && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Estimated Wait:</span>
              <span className="text-lg font-semibold text-gray-800">
                {appointment.estimatedWaitingTime} mins
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Countdown:</span>
              <span className="text-lg font-mono font-bold text-secondary">
                {formatTime(countdown)}
              </span>
            </div>
          </>
        )}

        {appointment.status === 'In Consultation' && (
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <p className="text-green-700 font-medium">Your consultation is in progress</p>
          </div>
        )}

        {appointment.status === 'Waiting' && (
          <button
            onClick={() => onCancel(appointment.id)}
            className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Cancel Appointment
          </button>
        )}
      </div>
    </div>
  );
};

export default QueueStatusCard;
