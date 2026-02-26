import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Contact Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">🏥</span>
                <div>
                  <div className="text-2xl font-bold text-blue-600">SmartCare Flow</div>
                  <div className="text-xs text-gray-500">Hospital Optimization System</div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium">How It Works</a>
              <a href="#impact" className="text-gray-700 hover:text-blue-600 font-medium">Impact</a>
              <button
                onClick={() => navigate('/role-selection')}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2.5 rounded-lg font-semibold transition-all"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-[#E3F2FD] via-[#BBDEFB] to-[#90CAF9] py-20 relative overflow-hidden">
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
        
        {/* Large Abstract Circle - Right Side */}
        <div className="absolute -right-64 top-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        
        {/* Medium Circle - Behind Image */}
        <div className="absolute right-32 top-20 w-[400px] h-[400px] bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-15 blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Floating Plus Icons */}
        <div className="absolute top-32 right-20 w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 text-xl shadow-md opacity-30 animate-bounce">+</div>
        <div className="absolute bottom-40 right-40 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 text-lg shadow-md opacity-25 animate-bounce" style={{animationDelay: '0.5s'}}>+</div>
        <div className="absolute top-1/2 right-10 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 text-sm shadow-sm opacity-20 animate-bounce" style={{animationDelay: '1s'}}>+</div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side */}
            <div className="animate-fade-in-up">
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Optimizing Hospital Patient Flow with <span className="text-blue-600">Intelligent Queue Management</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our system reduces waiting time, prevents overcrowding, balances doctor workload, and provides real-time queue monitoring for smarter hospital operations.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-all shadow-lg"
                >
                  Register
                </button>
                <button
                  onClick={() => navigate('/role-selection')}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 hover:scale-105 transition-all border-2 border-blue-600"
                >
                  Login
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="relative animate-fade-in-right">
              <div className="absolute inset-0 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative">
                <img 
                  src="https://cdn.pixabay.com/photo/2017/01/29/21/16/nurse-2019420_1280.jpg" 
                  alt="Doctor" 
                  className="rounded-3xl shadow-2xl w-full h-auto object-cover"
                  style={{animation: 'float 3s ease-in-out infinite'}}
                />
                {/* Floating Plus Icons */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg" style={{animation: 'spin-slow 8s linear infinite, float 3s ease-in-out infinite'}}>+</div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg" style={{animation: 'spin-slow 8s linear infinite, float 3s ease-in-out infinite', animationDelay: '0.5s'}}>+</div>
                <div className="absolute top-1/4 -left-8 w-8 h-8 bg-blue-300 rounded-full" style={{animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite, float 3s ease-in-out infinite'}}></div>
                <div className="absolute bottom-1/4 -right-8 w-6 h-6 bg-blue-400 rounded-full" style={{animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite, float 3s ease-in-out infinite', animationDelay: '0.5s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Smart Healthcare Features</h2>
            <p className="text-xl text-gray-600">Comprehensive solutions for modern hospital management</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 cursor-pointer" style={{animation: 'fade-in-up 0.6s ease-out'}}>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-Time Queue Tracking</h3>
              <p className="text-blue-100">Monitor patient queues instantly across all departments</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 cursor-pointer" style={{animation: 'fade-in-up 0.6s ease-out 0.1s backwards'}}>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Waiting Time Prediction</h3>
              <p className="text-blue-100">Accurate estimates for better patient planning</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 cursor-pointer" style={{animation: 'fade-in-up 0.6s ease-out 0.2s backwards'}}>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Capacity-Based Scheduling</h3>
              <p className="text-blue-100">Smart appointment allocation based on availability</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 cursor-pointer" style={{animation: 'fade-in-up 0.6s ease-out 0.3s backwards'}}>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Emergency Priority Handling</h3>
              <p className="text-blue-100">Automatic prioritization for urgent cases</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 cursor-pointer" style={{animation: 'fade-in-up 0.6s ease-out 0.4s backwards'}}>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Doctor Load Monitoring</h3>
              <p className="text-blue-100">Balance workload across medical staff efficiently</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 cursor-pointer" style={{animation: 'fade-in-up 0.6s ease-out 0.5s backwards'}}>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Admin Flow Dashboard</h3>
              <p className="text-blue-100">Complete visibility of hospital operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple three-step process for optimized care</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:border-blue-600 transition-all duration-300 cursor-pointer" style={{animation: 'fade-in-up 0.6s ease-out'}}>
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Book Appointment</h3>
              <p className="text-gray-600">Schedule your visit through our smart booking system</p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:border-blue-600 transition-all duration-300 cursor-pointer" style={{animation: 'fade-in-up 0.6s ease-out 0.2s backwards'}}>
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Queue Position</h3>
              <p className="text-gray-600">Receive real-time updates on your waiting status</p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:border-blue-600 transition-all duration-300 cursor-pointer" style={{animation: 'fade-in-up 0.6s ease-out 0.4s backwards'}}>
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Visit at Optimized Time</h3>
              <p className="text-gray-600">Arrive at the perfect time with minimal waiting</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div style={{animation: 'fade-in-up 0.8s ease-out'}}>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Why Choose SmartCare Flow?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 hover:bg-blue-600 hover:text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group" style={{animation: 'fade-in-up 0.6s ease-out 0.2s backwards'}}>
                  <div className="w-8 h-8 bg-blue-100 group-hover:bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 animate-bounce" style={{animationDuration: '2s'}}>
                    <span className="text-blue-600">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-white">Reduce waiting time by 30-40%</h3>
                    <p className="text-gray-600 group-hover:text-blue-100">Optimize patient flow with intelligent scheduling</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 hover:bg-blue-600 hover:text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group" style={{animation: 'fade-in-up 0.6s ease-out 0.3s backwards'}}>
                  <div className="w-8 h-8 bg-blue-100 group-hover:bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 animate-bounce" style={{animationDuration: '2s', animationDelay: '0.2s'}}>
                    <span className="text-blue-600">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-white">Prevent overbooking</h3>
                    <p className="text-gray-600 group-hover:text-blue-100">Smart capacity management ensures smooth operations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 hover:bg-blue-600 hover:text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group" style={{animation: 'fade-in-up 0.6s ease-out 0.4s backwards'}}>
                  <div className="w-8 h-8 bg-blue-100 group-hover:bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 animate-bounce" style={{animationDuration: '2s', animationDelay: '0.4s'}}>
                    <span className="text-blue-600">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-white">Improve doctor utilization</h3>
                    <p className="text-gray-600 group-hover:text-blue-100">Balance workload across medical staff efficiently</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 hover:bg-blue-600 hover:text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group" style={{animation: 'fade-in-up 0.6s ease-out 0.5s backwards'}}>
                  <div className="w-8 h-8 bg-blue-100 group-hover:bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 animate-bounce" style={{animationDuration: '2s', animationDelay: '0.6s'}}>
                    <span className="text-blue-600">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-white">Real-time hospital visibility</h3>
                    <p className="text-gray-600 group-hover:text-blue-100">Complete oversight of all operations in one dashboard</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 hover:bg-blue-600 hover:text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group" style={{animation: 'fade-in-up 0.6s ease-out 0.6s backwards'}}>
                  <div className="w-8 h-8 bg-blue-100 group-hover:bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 animate-bounce" style={{animationDuration: '2s', animationDelay: '0.8s'}}>
                    <span className="text-blue-600">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-white">Data-driven management</h3>
                    <p className="text-gray-600 group-hover:text-blue-100">Make informed decisions with comprehensive analytics</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{animation: 'fade-in-right 1s ease-out'}}>
              <img 
                src="https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D" 
                alt="Hospital" 
                className="rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Experience Smarter Hospital Management Today</h2>
          <p className="text-xl text-blue-100 mb-8">Transform your healthcare facility with intelligent flow optimization</p>
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🏥</span>
                <span className="text-xl font-bold">SmartCare Flow</span>
              </div>
              <p className="text-gray-400">Intelligent hospital queue optimization and flow management system for modern healthcare facilities.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>📞 +1 (555) 123-4567</p>
                <p>✉️ contact@smartcareflow.com</p>
                <p>📍 123 Healthcare Ave, Medical District</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <div className="space-y-2 text-gray-400">
                <p className="cursor-pointer hover:text-white">About Us</p>
                <p className="cursor-pointer hover:text-white">Privacy Policy</p>
                <p className="cursor-pointer hover:text-white">Terms of Service</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SmartCare Flow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
