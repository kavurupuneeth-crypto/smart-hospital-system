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
        password
      });

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
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up-fade {
            animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
      </style>
      <div className="min-h-screen bg-gradient-to-br from-blue-50/60 via-white to-slate-50 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden relative">

        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -ml-[30rem] -mt-20 blur-3xl opacity-40 pointer-events-none">
          <div className={`aspect-[1097/845] w-[60rem] bg-gradient-to-tr ${config.gradient} opacity-20`} style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>

        <div className="w-full max-w-md mx-auto relative z-10 animate-slide-up-fade">

          <div className="text-center mb-8">
            <button
              onClick={() => navigate('/role-selection')}
              className="text-slate-500 hover:text-blue-600 font-medium transition-colors duration-300 inline-flex items-center gap-2 group mb-6"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Welcome Back</h2>
            <p className="text-slate-500 font-medium text-lg">Login to access your dashboard</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:shadow-2xl sm:shadow-slate-200/50 overflow-hidden border border-slate-100/60 p-8 sm:p-10 relative">

            {/* Role Badge Indicator */}
            <div className={`absolute top-0 right-0 m-6 flex items-center gap-2 px-3 py-1.5 rounded-full ${config.badgeBg} ${config.badgeText} text-sm font-bold shadow-sm`}>
              {config.icon}
              {config.title}
            </div>

            <form onSubmit={handleLogin} className="mt-8 space-y-6">

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-xl flex items-start gap-3 text-red-700 shadow-sm animate-slide-up-fade">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2 text-sm">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 text-slate-900 font-medium placeholder-slate-400"
                    placeholder={`${role}@test.com`}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2 text-sm">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 text-slate-900 font-medium hover:bg-white placeholder-slate-400"
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r ${config.gradient} text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2 group`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Login
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </>
                  )}
                </button>
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">or</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="w-full bg-white border border-slate-200 text-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all duration-300 hover:shadow-sm"
                >
                  Create an account
                </button>
              </div>

            </form>
          </div>


        </div>
      </div>
    </>
  );
};

export default Login;
