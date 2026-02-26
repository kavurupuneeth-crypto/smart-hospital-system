import React from 'react';

const DoctorCard = ({ doctor, onClick }) => {
  const isOverloaded = doctor.currentQueueLength > doctor.capacityPerHour * 2;

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-xl transition ${
        isOverloaded ? 'border-2 border-red-400' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
          <p className="text-primary font-medium mt-1">{doctor.specialization}</p>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Queue Length:</span>
              <span className={`font-semibold ${isOverloaded ? 'text-red-600' : 'text-gray-800'}`}>
                {doctor.currentQueueLength} patients
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Avg Consultation:</span>
              <span className="font-semibold text-gray-800">{doctor.averageConsultationTime} mins</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Capacity/Hour:</span>
              <span className="font-semibold text-gray-800">{doctor.capacityPerHour} patients</span>
            </div>
          </div>

          {isOverloaded && (
            <div className="mt-3 bg-red-50 text-red-700 text-xs p-2 rounded">
              ⚠️ High workload - longer wait times expected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
