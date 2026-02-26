import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'patient',
      title: 'Patient Portal',
      description: 'Book appointments, track queue, upload medical reports.',
      icon: (
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      bgClass: 'bg-blue-50/50',
      iconBgClass: 'bg-blue-100/50',
      borderClass: 'border-blue-100',
      buttonClass: 'bg-blue-600 hover:bg-blue-700 shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.39)] ring-blue-600',
      route: '/login/patient'
    },

    {
      id: 'admin',
      title: 'Admin Portal',
      description: 'Monitor hospital operations and optimize flow.',
      icon: (
        <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bgClass: 'bg-indigo-50/50',
      iconBgClass: 'bg-indigo-100/50',
      borderClass: 'border-indigo-100',
      buttonClass: 'bg-indigo-600 hover:bg-indigo-700 shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.39)] ring-indigo-600',
      route: '/login/admin'
    }
  ];

  return (
    <>
      <style>
        {`
          @keyframes customFadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: customFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
      </style>
      <div className="min-h-screen bg-gradient-to-br from-blue-50/40 via-white to-slate-50 flex flex-col pt-16 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-100 selection:text-blue-900">
        <div className="w-full max-w-7xl mx-auto opacity-0 animate-fade-in-up">

          {/* Header Section */}
          <div className="text-center mb-16 relative">
            <button
              onClick={() => navigate('/')}
              className="absolute left-0 top-0 text-slate-500 hover:text-blue-600 font-medium transition-colors duration-300 hidden sm:flex items-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="text-slate-500 hover:text-blue-600 font-medium transition-colors duration-300 flex items-center gap-2 group sm:hidden mb-8 mx-auto"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Select Your Portal
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
              Access the appropriate dashboard based on your role
            </p>

            <div className="mt-10 w-24 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-auto"></div>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto">
            {roles.map((role, index) => (
              <div
                key={role.id}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform md:hover:-translate-y-1 hover:translate-y-[-4px] border border-slate-100/60 hover:border-slate-200 group flex flex-col overflow-hidden flex-1"
                style={{ animationDelay: `${index * 100 + 100}ms` }}
              >
                <div className={`p-8 sm:p-10 flex flex-col h-full items-center text-center ${role.bgClass} flex-grow transition-colors duration-500`}>

                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-sm border ${role.borderClass} ${role.iconBgClass} group-hover:scale-110 transition-transform duration-500 bg-white`}>
                    {role.icon}
                  </div>

                  {/* Text Content */}
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">{role.title}</h2>
                  <p className="text-slate-500 leading-relaxed mb-10 flex-grow font-medium text-15px">
                    {role.description}
                  </p>

                  {/* CTA Button */}
                  <div className="w-full mt-auto">
                    <button
                      onClick={() => navigate(role.route)}
                      className={`w-full py-4 px-6 text-white text-base font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 group/btn ${role.buttonClass}`}
                    >
                      Login
                      <svg className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Registration Prompt */}
          <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <p className="text-slate-600 text-lg">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleSelection;
