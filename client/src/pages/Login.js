import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const Login = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roleConfig = {
    patient: {
      title: 'Patient Portal',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: 'blue',
      gradient: 'from-blue-600 to-indigo-600',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-700'
    },

    admin: {
      title: 'Admin Portal',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'purple',
      gradient: 'from-indigo-600 to-purple-600',
      badgeBg: 'bg-indigo-100',
      badgeText: 'text-indigo-700'
    }
  };

  const config = roleConfig[role] || roleConfig.patient;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
        requestedRole: role
      });

      const { token, user } = response.data;

      // Verify role matches the portal
      if (user.role !== role) {
        setError(`This account is registered as ${user.role}. Please use the ${user.role} portal.`);
        setLoading(false);
        return;
      }

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
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A7C7E7] to-[#6FA3D2] flex items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate('/role-selection')}
        className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-gray-100 transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-semibold">Back</span>
      </button>

      {/* Main Card */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side - Illustration */}
        <div className="relative bg-gradient-to-br from-[#4A90E2] to-[#357ABD] p-8 flex flex-col justify-center items-center overflow-hidden">
          {/* Animated Background Shapes */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <div className="relative z-10 text-center text-white">
            {/* Animated Healthcare Illustration */}
            <div className="mb-8">
              <svg className="w-64 h-64 mx-auto" viewBox="0 0 300 300" fill="none">
                {/* Heartbeat Monitor */}
                <g className="animate-pulse">
                  <rect x="50" y="100" width="200" height="120" rx="15" fill="white" opacity="0.95"/>
                  <path d="M70 160 L100 160 L110 140 L120 180 L130 160 L230 160" stroke="#4A90E2" strokeWidth="4" fill="none" className="animate-pulse"/>
                  <circle cx="90" cy="130" r="4" fill="#4CAF50" className="animate-ping"/>
                  <circle cx="200" cy="130" r="4" fill="#4CAF50" className="animate-ping" style={{animationDelay: '0.5s'}}/>
                </g>
                
                {/* Floating Heart */}
                <g className="animate-bounce" style={{animationDuration: '2s'}}>
                  <path d="M150 80 C150 80 130 60 110 60 C90 60 80 75 80 90 C80 110 95 125 150 160 C205 125 220 110 220 90 C220 75 210 60 190 60 C170 60 150 80 150 80 Z" fill="#FF6B6B" opacity="0.9"/>
                  <circle cx="130" cy="75" r="3" fill="white" opacity="0.8"/>
                </g>
                
                {/* Medical Cross */}
                <g className="animate-pulse" style={{animationDelay: '0.3s'}}>
                  <circle cx="240" cy="200" r="25" fill="white" opacity="0.9"/>
                  <rect x="235" y="185" width="10" height="30" rx="2" fill="#4A90E2"/>
                  <rect x="225" y="195" width="30" height="10" rx="2" fill="#4A90E2"/>
                </g>
                
                {/* Pills */}
                <g className="animate-bounce" style={{animationDuration: '3s', animationDelay: '0.5s'}}>
                  <ellipse cx="60" cy="220" rx="15" ry="8" fill="white" opacity="0.9" transform="rotate(-30 60 220)"/>
                  <ellipse cx="75" cy="235" rx="15" ry="8" fill="white" opacity="0.9" transform="rotate(20 75 235)"/>
                </g>
              </svg>
            </div>
            
            <h1 className="text-6xl font-bold mb-4">Welcome Back</h1>
            <p className="text-xl text-white/90">Please enter your details to continue</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-12 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">SmartCare Flow</h2>
            <div className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full ${config.badgeBg} ${config.badgeText} text-sm`}>
              {config.icon}
              <span className="font-semibold">{config.title}</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Username or Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                placeholder={`${role}@test.com`}
                required
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#4A90E2] to-[#357ABD] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Login'}
            </button>

            {/* Register Link */}
            <p className="text-center text-gray-600 text-sm mt-6">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Register Now
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
