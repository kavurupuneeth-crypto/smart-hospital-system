module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#10b981',
        accent: '#06b6d4',
        teal: {
          500: '#14b8a6',
          600: '#0d9488',
        },
      },
      backgroundColor: {
        'dashboard': '#f4f7fb',
      },
    },
  },
  plugins: [],
}
