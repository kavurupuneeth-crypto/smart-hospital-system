import React from 'react';

const DashboardCard = ({ title, value, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600"
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mt-2">{value}</p>
        </div>
        <div className={`${colorClasses[color]} p-5 rounded-2xl text-3xl shadow-lg transform transition-transform hover:scale-110`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
