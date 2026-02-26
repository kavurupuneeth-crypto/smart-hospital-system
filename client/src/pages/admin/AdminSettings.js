import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const AdminSettings = () => {
  const { theme, applyTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleApplyTheme = () => {
    applyTheme(selectedTheme);
  };
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">System Settings</h1>
        <p className="text-gray-600 mt-2">Configure system-wide settings and preferences</p>
      </div>

      <div className="grid gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Theme Settings</h3>
          <p className="text-sm text-gray-600 mb-6">Choose your preferred theme for the dashboard</p>
          
          <div className="grid grid-cols-3 gap-4">
            {/* Default Theme */}
            <div
              onClick={() => setSelectedTheme('default')}
              className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                selectedTheme === 'default' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Default</h4>
                {selectedTheme === 'default' && (
                  <span className="text-teal-500">✓</span>
                )}
              </div>
              <div className="space-y-2">
                <div className="h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded"></div>
                <div className="h-4 bg-gray-100 rounded"></div>
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
              </div>
              <p className="text-xs text-gray-500 mt-3">Blue & Teal accent colors</p>
            </div>

            {/* Light Theme */}
            <div
              onClick={() => setSelectedTheme('light')}
              className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                selectedTheme === 'light' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Light</h4>
                {selectedTheme === 'light' && (
                  <span className="text-teal-500">✓</span>
                )}
              </div>
              <div className="space-y-2">
                <div className="h-8 bg-white border border-gray-200 rounded"></div>
                <div className="h-4 bg-gray-50 rounded"></div>
                <div className="h-4 bg-gray-50 rounded w-3/4"></div>
              </div>
              <p className="text-xs text-gray-500 mt-3">Clean white background</p>
            </div>

            {/* Dark Theme */}
            <div
              onClick={() => setSelectedTheme('dark')}
              className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                selectedTheme === 'dark' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Dark</h4>
                {selectedTheme === 'dark' && (
                  <span className="text-teal-500">✓</span>
                )}
              </div>
              <div className="space-y-2">
                <div className="h-8 bg-gray-800 rounded"></div>
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
              <p className="text-xs text-gray-500 mt-3">Dark mode for night use</p>
            </div>
          </div>

          <button onClick={handleApplyTheme} className="mt-6 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition">
            Apply Theme
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Queue Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Queue Update Interval (seconds)</label>
              <input type="number" defaultValue="10" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Overload Threshold Multiplier</label>
              <input type="number" defaultValue="2" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Notification Settings</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-3" />
              <span className="text-gray-700">Send email notifications for overload alerts</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-3" />
              <span className="text-gray-700">Send SMS alerts to doctors</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span className="text-gray-700">Enable push notifications</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
