import React from 'react';

const ResourceManagement = () => {
  const resources = [
    { id: 1, name: 'ICU Beds', total: 20, available: 5, occupied: 15 },
    { id: 2, name: 'General Beds', total: 100, available: 35, occupied: 65 },
    { id: 3, name: 'Operation Theaters', total: 8, available: 3, occupied: 5 },
    { id: 4, name: 'Ambulances', total: 10, available: 7, occupied: 3 }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Resource Management</h1>
        <p className="text-gray-600 mt-2">Monitor and manage hospital resources</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {resources.map(resource => {
          const utilization = (resource.occupied / resource.total * 100).toFixed(0);
          return (
            <div key={resource.id} className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">{resource.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  utilization > 80 ? 'bg-red-100 text-red-800' :
                  utilization > 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {utilization}% Utilized
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-gray-800">{resource.total}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Available</p>
                  <p className="text-2xl font-bold text-green-600">{resource.available}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Occupied</p>
                  <p className="text-2xl font-bold text-blue-600">{resource.occupied}</p>
                </div>
              </div>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    utilization > 80 ? 'bg-red-500' :
                    utilization > 60 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${utilization}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResourceManagement;
