# 🏥 Smart Hospital Flow Monitoring and Optimization System

A full-stack application for intelligent hospital queue management and real-time monitoring.

## Project Structure

```
hospital-flow-system/
├── client/                  # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                  # Node.js backend
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   └── server.js
└── README.md
```

## Quick Start

### Backend Setup
```bash
cd server
npm install
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm start
```

## Tech Stack

### Frontend
- React 18.2.0
- React Router DOM 6.20.0
- Tailwind CSS 3.3.0
- Recharts 2.10.0

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

## Features

- Role-based authentication (Patient/Doctor/Admin)
- Real-time queue management
- Capacity-controlled booking
- Predictable waiting times
- Analytics dashboards
- Doctor utilization tracking

## Demo Credentials

- Patient: `patient@test.com` / `password`
- Doctor: `doctor@test.com` / `password`
- Admin: `admin@test.com` / `password`

## Documentation

- [Client README](./client/README.md)
- [Server README](./server/README.md)
