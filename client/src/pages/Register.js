import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
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
    <div className="min-h-screen bg-gradient-to-r from-[#E3F2FD] via-[#BBDEFB] to-[#90CAF9] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-20 h-20 bg-white/40 rounded-full shadow-lg" style={{left: '10%', bottom: '-20px', animation: 'bubble 15s infinite'}}></div>
        <div className="absolute w-16 h-16 bg-white/35 rounded-full shadow-lg" style={{left: '20%', bottom: '-20px', animation: 'bubble 12s infinite 2s'}}></div>
        <div className="absolute w-24 h-24 bg-white/30 rounded-full shadow-lg" style={{left: '35%', bottom: '-20px', animation: 'bubble 18s infinite 4s'}}></div>
        <div className="absolute w-12 h-12 bg-white/40 rounded-full shadow-lg" style={{left: '50%', bottom: '-20px', animation: 'bubble 14s infinite 1s'}}></div>
        <div className="absolute w-18 h-18 bg-white/35 rounded-full shadow-lg" style={{left: '65%', bottom: '-20px', animation: 'bubble 16s infinite 3s'}}></div>
        <div className="absolute w-14 h-14 bg-white/40 rounded-full shadow-lg" style={{left: '80%', bottom: '-20px', animation: 'bubble 13s infinite 5s'}}></div>
        <div className="absolute w-22 h-22 bg-white/30 rounded-full shadow-lg" style={{left: '90%', bottom: '-20px', animation: 'bubble 17s infinite 2s'}}></div>
        
        {/* Abstract Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-cyan-300/20 rounded-full blur-2xl"></div>
        
        {/* Floating Plus Icons */}
        <div className="absolute top-32 right-24 text-white/30 text-4xl animate-pulse">+</div>
        <div className="absolute bottom-40 left-32 text-white/30 text-3xl animate-pulse" style={{animationDelay: '1s'}}>+</div>
        <div className="absolute top-2/3 right-1/4 text-white/30 text-5xl animate-pulse" style={{animationDelay: '2s'}}>+</div>
      </div>
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/role-selection')}
        className="absolute top-6 left-6 flex items-center gap-2 text-black font-bold hover:text-gray-800 transition-colors group z-50 text-lg"
      >
        <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-bold">Back</span>
      </button>

      {/* Main Card */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side - Illustration */}
        <div className="relative bg-gradient-to-br from-[#1976D2] via-[#1565C0] to-[#0D47A1] p-8 flex flex-col justify-center items-center overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          <div className="relative z-10 text-center text-white">
            <div className="mb-8">
              <svg className="w-64 h-64 mx-auto" viewBox="0 0 300 300" fill="none">
                {/* Static Clipboard */}
                <g>
                  <rect x="80" y="60" width="140" height="180" rx="12" fill="white" opacity="0.95" filter="url(#shadow)"/>
                  <rect x="110" y="50" width="80" height="20" rx="10" fill="white" opacity="0.9"/>
                  <circle cx="150" cy="60" r="8" fill="#1976D2"/>
                </g>
                
                {/* Animated Checkmarks - Draw in sequence */}
                <g className="animate-pulse" style={{animationDelay: '0.2s'}}>
                  <circle cx="110" cy="100" r="15" fill="#4CAF50" opacity="0.9"/>
                  <path d="M105 100 L110 105 L118 95" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <g className="animate-pulse" style={{animationDelay: '0.6s'}}>
                  <circle cx="110" cy="150" r="15" fill="#4CAF50" opacity="0.9"/>
                  <path d="M105 150 L110 155 L118 145" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <g className="animate-pulse" style={{animationDelay: '1s'}}>
                  <circle cx="110" cy="200" r="15" fill="#4CAF50" opacity="0.9"/>
                  <path d="M105 200 L110 205 L118 195" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                
                {/* Animated Lines - Appear with checkmarks */}
                <line x1="135" y1="100" x2="190" y2="100" stroke="#1976D2" strokeWidth="3" opacity="0.6" className="animate-pulse" style={{animationDelay: '0.2s'}}/>
                <line x1="135" y1="150" x2="190" y2="150" stroke="#1976D2" strokeWidth="3" opacity="0.6" className="animate-pulse" style={{animationDelay: '0.6s'}}/>
                <line x1="135" y1="200" x2="190" y2="200" stroke="#1976D2" strokeWidth="3" opacity="0.6" className="animate-pulse" style={{animationDelay: '1s'}}/>
                
                {/* Floating Pen */}
                <g className="animate-bounce" style={{animationDuration: '2s'}}>
                  <rect x="200" y="180" width="8" height="50" rx="4" fill="#FF6B6B" transform="rotate(45 204 205)"/>
                  <circle cx="218" cy="223" r="5" fill="#FFD700"/>
                  <circle cx="218" cy="223" r="3" fill="#FFF" opacity="0.5"/>
                </g>
                
                {/* Floating User Icon */}
                <g className="animate-bounce" style={{animationDuration: '3s', animationDelay: '0.3s'}}>
                  <circle cx="50" cy="150" r="20" fill="white" opacity="0.9"/>
                  <circle cx="50" cy="145" r="6" fill="#1976D2"/>
                  <path d="M42 158 Q42 154 46 154 L54 154 Q58 154 58 158 L58 162 Q58 164 56 164 L44 164 Q42 164 42 162 Z" fill="#1976D2"/>
                </g>
                
                {/* Floating Email Icon */}
                <g className="animate-bounce" style={{animationDuration: '2.5s', animationDelay: '0.8s'}}>
                  <rect x="230" y="140" width="30" height="20" rx="3" fill="white" opacity="0.9"/>
                  <path d="M230 140 L245 150 L260 140" stroke="#1565C0" strokeWidth="2" fill="none"/>
                </g>
                
                {/* Sparkles */}
                <circle cx="60" cy="80" r="3" fill="white" opacity="0.8" className="animate-ping" style={{animationDuration: '2s'}}/>
                <circle cx="240" cy="100" r="2" fill="white" opacity="0.8" className="animate-ping" style={{animationDelay: '1s', animationDuration: '2.5s'}}/>
                <circle cx="70" cy="220" r="2.5" fill="white" opacity="0.8" className="animate-ping" style={{animationDelay: '0.5s', animationDuration: '3s'}}/>
                <circle cx="230" cy="240" r="2" fill="white" opacity="0.8" className="animate-ping" style={{animationDelay: '1.5s', animationDuration: '2s'}}/>
                <circle cx="150" cy="40" r="2" fill="white" opacity="0.8" className="animate-ping" style={{animationDelay: '0.8s', animationDuration: '2.2s'}}/>
                <circle cx="250" cy="180" r="2.5" fill="white" opacity="0.8" className="animate-ping" style={{animationDelay: '1.2s', animationDuration: '2.8s'}}/>
                
                {/* Floating Plus Icons */}
                <g className="animate-pulse" style={{animationDelay: '0.4s'}}>
                  <path d="M40 100 L40 110 M35 105 L45 105" stroke="white" strokeWidth="2" opacity="0.6"/>
                </g>
                <g className="animate-pulse" style={{animationDelay: '1.1s'}}>
                  <path d="M260 70 L260 80 M255 75 L265 75" stroke="white" strokeWidth="2" opacity="0.6"/>
                </g>
                
                <defs>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                    <feOffset dx="2" dy="4" result="offsetblur"/>
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.3"/>
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
            <h1 className="text-5xl font-bold mb-2 text-white">Join Us Today</h1>
            <p className="text-xl text-white">Create your account in seconds</p>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="p-8 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-600 mt-1 text-sm">Register to access SmartCare Flow</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-white outline-none transition-all hover:border-purple-300 hover:shadow-md"
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-white outline-none transition-all hover:border-purple-300 hover:shadow-md"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-white outline-none transition-all hover:border-purple-300 hover:shadow-md"
                  placeholder="+91 9876543210"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-white outline-none transition-all hover:border-purple-300 hover:shadow-md"
                  placeholder="Create a password"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-white outline-none transition-all hover:border-purple-300 hover:shadow-md cursor-pointer"
                disabled={loading}
              >
                <option value="patient">Patient</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#1976D2] to-[#0D47A1] text-white py-2.5 rounded-xl font-semibold hover:shadow-xl hover:scale-[1.02] hover:from-[#0D47A1] hover:to-[#1976D2] active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? 'Creating Account...' : 'Create Account'}
                {!loading && (
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </span>
            </button>

            <p className="text-center text-gray-600 text-sm mt-6">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/role-selection')}
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-all inline-flex items-center gap-1 group"
              >
                Sign In
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
