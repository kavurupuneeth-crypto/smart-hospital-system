import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation Bar */}
      <nav className="absolute top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <span className="text-3xl filter drop-shadow-sm">🏥</span>
              <span className="text-xl font-bold text-slate-900 tracking-tight">HospitalFlow</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={() => navigate('/role-selection')}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-sm shadow-[0_4px_14px_0_rgb(37,99,235,0.39)]"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-1/2 -ml-[39rem] -mt-10 blur-3xl opacity-50 pointer-events-none">
            <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#93c5fd] to-[#3b82f6] opacity-30" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-8 border border-blue-100 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              v2.0 Now Available
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
              Smart Hospital Flow <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Optimization System</span>
            </h1>

            <p className="mt-6 text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Reduce waiting time. Balance doctor workload. Improve patient experience.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/role-selection')}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-[0_8px_30px_rgb(37,99,235,0.24)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                Login
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </button>
              <button
                onClick={() => {
                  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 text-lg font-bold rounded-xl hover:bg-slate-50 border border-slate-200 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="bg-white py-24 sm:py-32 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 tracking-tight">Everything you need to run smoothly</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Comprehensive tools designed specifically for modern healthcare facilities to optimize patient flow and resource management.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
              {/* Feature 1 */}
              <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 border border-slate-100">
                  <span className="text-blue-600">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  Real-Time Queue Monitoring
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Track patient wait times, active queues, and department loads instantly. Ensure predictable waiting times and eliminate bottlenecks before they occur.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 border border-slate-100">
                  <span className="text-indigo-600">👨‍⚕️</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                  Intelligent Doctor Allocation
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Smart workload distribution across available medical staff. Balance doctor schedules dynamically based on patient influx and appointment capacities.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 border border-slate-100">
                  <span className="text-purple-600">📈</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  Admin Operational Dashboard
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  A centralized command center providing comprehensive analytics, predictive insights, and complete visibility over the hospital's day-to-day operations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-slate-50 pb-24 sm:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 sm:p-16 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white rounded-full opacity-10 blur-3xl"></div>

              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">Ready to transform your healthcare facility?</h2>
                <p className="text-blue-100 text-lg sm:text-xl font-medium">
                  Join the innovative hospitals utilizing our unified platform for smarter management.
                </p>
              </div>

              <div className="relative z-10 flex-shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => navigate('/register')}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 text-lg font-bold rounded-xl hover:bg-slate-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  Get Started Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
