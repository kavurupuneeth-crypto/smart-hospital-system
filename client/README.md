# Hospital Flow System - Frontend (Client)

## Setup Instructions

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Start Development Server
```bash
npm start
```

Application will run on `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

## Project Structure

```
client/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── DashboardCard.js
│   │   ├── DashboardHeader.js
│   │   ├── DoctorCard.js
│   │   ├── Navbar.js
│   │   ├── PrivateRoute.js
│   │   ├── QueueStatusCard.js
│   │   ├── Sidebar.js
│   │   └── StatCard.js
│   ├── context/             # Global state management
│   │   ├── AppContext.js
│   │   └── AuthContext.js
│   ├── data/                # Mock data
│   │   └── mockData.js
│   ├── layouts/             # Layout wrappers
│   │   ├── AdminLayout.js
│   │   ├── DoctorLayout.js
│   │   └── PatientLayout.js
│   ├── pages/               # Page components
│   │   ├── admin/           # Admin portal pages
│   │   ├── doctor/          # Doctor portal pages
│   │   ├── patient/         # Patient portal pages
│   │   ├── AdminDashboard.js
│   │   ├── DoctorDashboard.js
│   │   ├── PatientDashboard.js
│   │   ├── Landing.js
│   │   ├── Login.js
│   │   └── RoleSelection.js
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Tech Stack

- **React 18.2.0** - UI library
- **React Router DOM 6.20.0** - Routing
- **Tailwind CSS 3.3.0** - Styling
- **Recharts 2.10.0** - Data visualization

## Features

- Professional SaaS-style landing page
- Role-based authentication (Patient/Doctor/Admin)
- Real-time queue management
- Interactive dashboards with analytics
- Responsive design
- Modern UI with Tailwind CSS

## Demo Credentials

- Patient: `patient@test.com` / `password`
- Doctor: `doctor@test.com` / `password`
- Admin: `admin@test.com` / `password`
