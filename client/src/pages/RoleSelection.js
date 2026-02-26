import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'patient',
      title: 'Patient Portal',
      description: 'Book appointments, track queue status, and manage your medical records.',
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-blue-600',
      route: '/login/patient'
    },
    {
      id: 'admin',
      title: 'Admin Portal',
      description: 'Monitor hospital operations, optimize patient flow, and manage resources.',
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      gradient: 'from-indigo-500 to-indigo-600',
      route: '/login/admin'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-r from-[#E3F2FD] via-[#BBDEFB] to-[#90CAF9]">
      {/* Animated Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-20 h-20 bg-white/40 rounded-full shadow-lg" style={{left: '10%', bottom: '-20px', animation: 'bubble 15s infinite'}}></div>
        <div className="absolute w-16 h-16 bg-white/35 rounded-full shadow-lg" style={{left: '20%', bottom: '-20px', animation: 'bubble 12s infinite 2s'}}></div>
        <div className="absolute w-24 h-24 bg-white/30 rounded-full shadow-lg" style={{left: '35%', bottom: '-20px', animation: 'bubble 18s infinite 4s'}}></div>
        <div className="absolute w-12 h-12 bg-white/40 rounded-full shadow-lg" style={{left: '50%', bottom: '-20px', animation: 'bubble 14s infinite 1s'}}></div>
        <div className="absolute w-18 h-18 bg-white/35 rounded-full shadow-lg" style={{left: '65%', bottom: '-20px', animation: 'bubble 16s infinite 3s'}}></div>
        <div className="absolute w-14 h-14 bg-white/40 rounded-full shadow-lg" style={{left: '80%', bottom: '-20px', animation: 'bubble 13s infinite 5s'}}></div>
        <div className="absolute w-22 h-22 bg-white/30 rounded-full shadow-lg" style={{left: '90%', bottom: '-20px', animation: 'bubble 17s infinite 2s'}}></div>
      </div>
      
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 flex items-center gap-2 text-gray-800 hover:text-blue-700 transition-colors group"
          style={{animation: 'fade-in-up 0.6s ease-out'}}
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-semibold">Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12" style={{animation: 'fade-in-up 0.8s ease-out'}}>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">SmartCare Flow</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Choose Your Portal</h2>
          <p className="text-lg text-gray-700 max-w-xl mx-auto">
            Select the appropriate portal to access your dashboard
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl w-full mb-10">
          {roles.map((role, index) => (
            <div
              key={role.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-105"
              style={{animation: `fade-in-up 0.8s ease-out ${index * 0.2 + 0.3}s backwards`}}
              onClick={() => navigate(role.route)}
            >
              {/* Icon Section with Gradient */}
              <div className={`bg-gradient-to-br ${role.gradient} p-6 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10" style={{animation: 'pulse 3s ease-in-out infinite'}}></div>
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-all duration-300 relative z-10 shadow-lg">
                  {role.icon}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 text-center">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{role.title}</h3>
                <p className="text-gray-600 mb-5 leading-relaxed text-sm">{role.description}</p>
                
                <button
                  className={`w-full bg-gradient-to-r ${role.gradient} text-white py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg hover:shadow-xl`}
                >
                  Access Portal
                  <svg className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Registration Link */}
        <div className="text-center" style={{animation: 'fade-in-up 0.8s ease-out 0.6s backwards'}}>
          <p className="text-gray-800">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-700 font-semibold hover:text-blue-800 hover:underline transition-colors"
            >
              Register Now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
