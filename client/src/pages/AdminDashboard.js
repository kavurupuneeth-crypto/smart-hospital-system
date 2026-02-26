import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import { getDoctorUtilization, getDepartmentLoad, getAverageWaitingTime } from '../api/analyticsApi';

const AdminDashboard = () => {
  const { doctors, appointments, getDoctorUtilization: getLocalUtilization } = useApp();
  const [utilization, setUtilization] = useState([]);
  const [departmentLoad, setDepartmentLoad] = useState([]);
  const [avgWait, setAvgWait] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const [utilizationData, departmentData, waitData] = await Promise.all([
          getDoctorUtilization(),
          getDepartmentLoad(),
          getAverageWaitingTime()
        ]);
        setUtilization(utilizationData.utilization || []);
        setDepartmentLoad(departmentData.departmentLoad || []);
        setAvgWait(waitData.averageWaitingTime || 0);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        setUtilization([]);
        setDepartmentLoad([]);
        setAvgWait(0);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const activeQueues = doctors.filter(d => getLocalUtilization(d.id).booked > 0).length;
  const totalPatients = appointments.filter(a => a.status !== 'Completed').length;
  const totalDoctors = utilization.length || doctors.length;

  const waitingTimeTrend = [
    { time: '9 AM', wait: 12 },
    { time: '10 AM', wait: 18 },
    { time: '11 AM', wait: 25 },
    { time: '12 PM', wait: 22 },
    { time: '1 PM', wait: 15 },
    { time: '2 PM', wait: 28 },
    { time: '3 PM', wait: 20 },
    { time: '4 PM', wait: 16 }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">System overview and operational monitoring</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Doctors" value={totalDoctors} icon="👨⚕️" color="blue" />
        <StatCard title="Active Patients" value={totalPatients} icon="👥" color="green" />
        <StatCard title="Active Queues" value={activeQueues} icon="📋" color="teal" />
        <StatCard title="Avg Wait Time" value={`${avgWait}m`} icon="⏱️" color="orange" />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Waiting Time Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={waitingTimeTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="wait" stroke="#3b82f6" strokeWidth={3} name="Avg Wait (min)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">System Health</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-semibold text-gray-800">Server Status</span>
              <span className="text-green-600 font-bold">✓ Online</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-semibold text-gray-800">Database</span>
              <span className="text-blue-600 font-bold">✓ Connected</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="font-semibold text-gray-800">Queue Engine</span>
              <span className="text-yellow-600 font-bold">⚡ Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Doctor Utilization</h2>
        {utilization.length > 0 ? (
          <div className="space-y-4">
            {utilization.map((doctor, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-48">
                  <p className="font-semibold text-gray-800">{doctor.doctorName}</p>
                  <p className="text-sm text-gray-500">{doctor.department}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all ${
                          doctor.utilizationPercentage > 90 ? 'bg-red-500' : 
                          doctor.utilizationPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(doctor.utilizationPercentage, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-12">{doctor.utilizationPercentage}%</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">{doctor.totalAppointments}/{doctor.dailyCapacity}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No utilization data available</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
