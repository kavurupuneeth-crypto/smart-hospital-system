import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'default';
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (selectedTheme) => {
    const root = document.documentElement;
    
    // Remove all theme classes first
    root.classList.remove('theme-light', 'theme-dark', 'theme-default');
    
    if (selectedTheme === 'dark') {
      root.classList.add('theme-dark');
      document.body.style.backgroundColor = '#1f2937';
      document.body.style.color = '#f3f4f6';
    } else if (selectedTheme === 'light') {
      root.classList.add('theme-light');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1f2937';
    } else {
      root.classList.add('theme-default');
      document.body.style.backgroundColor = '#f9fafb';
      document.body.style.color = '#1f2937';
    }
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    applyTheme(selectedTheme);
  };

  const themes = [
    {
      id: 'light',
      name: 'Light',
      icon: 'light_mode',
      description: 'Clean and bright interface',
      preview: 'bg-white border-gray-200'
    },
    {
      id: 'dark',
      name: 'Dark',
      icon: 'dark_mode',
      description: 'Easy on the eyes',
      preview: 'bg-gray-900 border-gray-700'
    },
    {
      id: 'default',
      name: 'Default',
      icon: 'contrast',
      description: 'System default theme',
      preview: 'bg-gray-50 border-gray-300'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-2">Customize your experience</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-3xl text-blue-600">palette</span>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Theme Preferences</h3>
            <p className="text-sm text-gray-600">Choose your preferred color theme</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((themeOption) => (
            <button
              key={themeOption.id}
              onClick={() => handleThemeChange(themeOption.id)}
              className={`relative p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                theme === themeOption.id
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  theme === themeOption.id ? 'bg-blue-600' : 'bg-gray-100'
                }`}>
                  <span className={`material-symbols-outlined text-3xl ${
                    theme === themeOption.id ? 'text-white' : 'text-gray-600'
                  }`}>
                    {themeOption.icon}
                  </span>
                </div>
                
                <h4 className="text-lg font-bold text-gray-800 mb-2">{themeOption.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{themeOption.description}</p>
                
                <div className={`w-full h-12 rounded-lg border-2 ${themeOption.preview}`}></div>
                
                {theme === themeOption.id && (
                  <div className="absolute top-3 right-3">
                    <span className="material-symbols-outlined text-blue-600 text-2xl">check_circle</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-600 mt-0.5">info</span>
            <div>
              <p className="text-sm text-gray-700">
                <strong>Current theme:</strong> {themes.find(t => t.id === theme)?.name}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Your theme preference is saved and will be applied across all pages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
