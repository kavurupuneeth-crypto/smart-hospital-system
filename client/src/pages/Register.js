import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/register', formData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userId', user.id);

      const redirectMap = {
        patient: '/patient',
        admin: '/admin'
      };

      navigate(redirectMap[user.role] || '/patient');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <button
            onClick={() => navigate('/role-selection')}
            className="text-blue-600 hover:text-blue-700 mb-8 inline-flex items-center gap-2 font-semibold transition-all duration-300 hover:gap-3"
          >
            ← Back to Role Selection
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-10"></div>
            <div className="relative">
              <div className="text-7xl mb-6">📝</div>
              <h1 className="text-4xl font-extrabold tracking-tight">Create Account</h1>
              <p className="text-white/90 mt-3 text-lg">Register to access the system</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-slate-700 font-bold mb-3 text-sm uppercase tracking-wide">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-slate-900"
                placeholder="Enter your full name"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-slate-700 font-bold mb-3 text-sm uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-slate-900"
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-slate-700 font-bold mb-3 text-sm uppercase tracking-wide">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-slate-900"
                placeholder="Create a password"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-8">
              <label className="block text-slate-700 font-bold mb-3 text-sm uppercase tracking-wide">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-slate-900"
                disabled={loading}
              >
                <option value="patient">Patient</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>

            <div className="mt-8 text-center">
              <p className="text-slate-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/role-selection')}
                  className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
