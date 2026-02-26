import React from 'react';

const StatCard = ({ title, value, icon, color = "blue", trend }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    teal: "from-teal-500 to-teal-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600"
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">{title}</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{value}</p>
          {trend && (
            <p className="text-xs text-green-600 mt-2 font-medium">↑ {trend}</p>
          )}
        </div>
        <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[color]} rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl transform transition-transform hover:scale-110`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
