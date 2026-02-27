import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'default';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    applyThemeStyles(theme);
  }, [theme]);

  const applyThemeStyles = (selectedTheme) => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('theme-light', 'theme-dark', 'theme-default');
    
    if (selectedTheme === 'dark') {
      root.classList.add('theme-dark');
      document.body.style.backgroundColor = '#111827';
    } else if (selectedTheme === 'light') {
      root.classList.add('theme-light');
      document.body.style.backgroundColor = '#ffffff';
    } else {
      root.classList.add('theme-default');
      document.body.style.backgroundColor = '#f9fafb';
    }
  };

  const applyTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
