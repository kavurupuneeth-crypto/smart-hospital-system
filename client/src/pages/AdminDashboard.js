import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

  const departmentLoadData = [
    { department: 'Cardiology', booked: 48, capacity: 50 },
    { department: 'Orthopedics', booked: 36, capacity: 45 },
    { department: 'Pediatrics', booked: 22, capacity: 30 },
    { department: 'Gen. Medicine', booked: 58, capacity: 70 }
  ];

  const activeTokens = [
    { token: 402, doctor: 'Dr. Sarah Johnson', department: 'Cardiology', status: 'serving' },
    { token: 115, doctor: 'Dr. Robert Chen', department: 'Orthopedics', wait: '~5 min', status: 'next' },
    { token: 209, doctor: 'Dr. Emily White', department: 'Pediatrics', wait: '~12 min', status: 'waiting' },
    { token: 403, doctor: 'Dr. Sarah Johnson', department: 'Cardiology', wait: '~18 min', status: 'waiting' }
  ];

  const doctorAllocation = [
    { name: 'Dr. Sarah Johnson', department: 'Cardiology', capacity: 30, booked: 28, waiting: 5, status: 'Overloaded' },
    { name: 'Dr. Robert Chen', department: 'Orthopedics', capacity: 25, booked: 22, waiting: 3, status: 'Near Full' },
    { name: 'Dr. Emily White', department: 'Pediatrics', capacity: 20, booked: 11, waiting: 1, status: 'Normal' },
    { name: 'Dr. Arjun Mehta', department: 'Gen. Medicine', capacity: 35, booked: 33, waiting: 8, status: 'Overloaded' },
    { name: 'Dr. Priya Nair', department: 'Cardiology', capacity: 28, booked: 20, waiting: 2, status: 'Near Full' },
    { name: 'Dr. James Osei', department: 'Orthopedics', capacity: 22, booked: 9, waiting: 0, status: 'Normal' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Hospital Allocation Overview — {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} — {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-teal-700">LIVE</span>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-4 gap-10">
          {/* Card 1 - Total Slots Today */}
          <div className="bg-white rounded-2xl shadow-md px-5 py-3 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium mb-1">Total Slots Today</p>
                <p className="text-2xl font-bold text-gray-900 mb-0.5">1,240</p>
                <p className="text-green-600 text-xs font-medium flex items-center gap-1">
                  <span>↑</span> +5.2% vs yesterday
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2 - Booked Slots */}
          <div className="bg-white rounded-2xl shadow-md px-5 py-3 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium mb-1">Booked Slots</p>
                <p className="text-2xl font-bold text-gray-900 mb-0.5">892</p>
                <p className="text-green-600 text-xs font-medium flex items-center gap-1">
                  <span>↑</span> +12% vs yesterday
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3 - Waiting List */}
          <div className="bg-white rounded-2xl shadow-md px-5 py-3 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium mb-1">Waiting List</p>
                <p className="text-2xl font-bold text-gray-900 mb-0.5">156</p>
                <p className="text-green-600 text-xs font-medium flex items-center gap-1">
                  <span>↑</span> +8% vs yesterday
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 4 - No-Show Count */}
          <div className="bg-white rounded-2xl shadow-md px-5 py-3 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium mb-1">No-Show Count</p>
                <p className="text-2xl font-bold text-gray-900 mb-0.5">42</p>
                <p className="text-red-600 text-xs font-medium flex items-center gap-1">
                  <span>↓</span> -2% vs yesterday
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-2xl shadow-md p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Department Load Overview</h2>
                <p className="text-xs text-gray-500 mt-0.5">Booked vs Total Capacity</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-teal-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Booked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
                  <span className="text-xs text-gray-600">Capacity</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={departmentLoadData} barGap={6} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="department" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 80]} tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                <Bar dataKey="booked" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="capacity" fill="#e5e7eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-base font-bold text-gray-800">Active Tokens</h2>
                <p className="text-xs text-gray-500 mt-0.5">Real-Time Queue Status</p>
              </div>
              <div className="flex items-center gap-1.5 bg-red-50 px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-red-600">LIVE</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-3 mb-2 text-center relative overflow-hidden">
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></div>
              <p className="text-xs font-semibold text-teal-700 mb-1 tracking-wider">NOW SERVING</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">{activeTokens[0].token}</p>
              <p className="text-xs font-semibold text-gray-800">{activeTokens[0].doctor}</p>
              <p className="text-xs text-gray-600">{activeTokens[0].department}</p>
            </div>

            <div className="space-y-1.5 mb-2">
              {activeTokens.slice(1).map((item, index) => (
                <div key={index} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">{item.token}</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">{item.status}</p>
                      <p className="text-xs font-semibold text-gray-800">{item.doctor}</p>
                      <p className="text-xs text-gray-500">{item.department}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-teal-600">{item.wait}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg py-1.5 px-2.5 text-center">
              <p className="text-xs text-gray-600">Total Pending: <span className="font-bold text-gray-900">40 Tokens</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="bg-white rounded-3xl shadow-md p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Doctor Allocation Status</h2>
              <p className="text-sm text-gray-500 mt-1">Real-time slot usage per doctor</p>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Doctor Name</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Capacity</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Booked</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Waiting</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {doctorAllocation.map((doctor, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-semibold text-gray-900">{doctor.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{doctor.department}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-center font-medium">{doctor.capacity}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-center font-medium">{doctor.booked}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-center font-medium">{doctor.waiting}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        doctor.status === 'Overloaded' ? 'bg-red-100 text-red-700' :
                        doctor.status === 'Near Full' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {doctor.status}
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

export default AdminDashboard;
