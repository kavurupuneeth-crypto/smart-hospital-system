# Hospital Flow System - Backend

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment
Edit `.env` file with your MongoDB connection string and JWT secret.

### 3. Start MongoDB
Make sure MongoDB is running on your system.

### 4. Run Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/:doctorId/utilization` - Get doctor utilization
- `POST /api/doctors` - Create doctor (admin only)
- `PUT /api/doctors/:id` - Update doctor (admin/doctor)

### Appointments
- `POST /api/appointments` - Book appointment (protected)
- `GET /api/appointments` - Get appointments (protected)
- `PUT /api/appointments/:appointmentId/complete` - Complete consultation (protected)
- `PUT /api/appointments/:appointmentId/cancel` - Cancel appointment (protected)

## Database Models

- **User**: Authentication and user management
- **Doctor**: Doctor profiles and availability
- **Appointment**: Appointment booking and queue management
