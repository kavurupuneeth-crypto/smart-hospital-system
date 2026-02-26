import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { peakHoursData } from '../../data/mockData';
import { getDoctorUtilization, getDepartmentLoad, getAverageWaitingTime } from '../../api/analyticsApi';

const Analytics = () => {
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

  const departmentColors = {
    'Cardiology': '#3b82f6',
    'Dermatology': '#10b981',
    'Orthopedics': '#f59e0b',
    'Psychiatry': '#8b5cf6'
  };

  const departmentChartData = departmentLoad.map((dept, index) => ({
    name: dept.department,
    value: dept.totalAppointments,
    color: departmentColors[dept.department] || `#${Math.floor(Math.random()*16777215).toString(16)}`
  }));

  const workloadChartData = utilization.map(doc => ({
    doctor: doc.doctorName,
    patients: doc.totalAppointments,
    capacity: doc.dailyCapacity
  }));

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
        <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-600 mt-2">Detailed system analytics and insights</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Average Wait Time</h2>
          <div className="text-center py-8">
            <div className="text-6xl font-bold text-blue-600 mb-2">{avgWait}</div>
            <div className="text-gray-600 text-lg">minutes</div>
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Peak Hours Analysis</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={3} name="Patients" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Department Distribution</h2>
          {departmentChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500 py-12">No department data available</div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Doctor Workload Comparison</h2>
          {workloadChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workloadChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="doctor" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="patients" fill="#10b981" radius={[8, 8, 0, 0]} name="Patients Handled" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500 py-12">No workload data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
