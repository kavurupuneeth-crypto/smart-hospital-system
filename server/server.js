require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const Appointment = require("./models/Appointment");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/analytics", analyticsRoutes);

app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server running successfully' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const Doctor = require("./models/Doctor");

app.post("/api/seed-doctors", async (req, res) => {
  try {
    await Doctor.deleteMany();

    await Doctor.insertMany([
      {
        name: "Dr. Rajesh",
        department: "Cardiology",
        consultationDurations: {
          regular: 5,
          new: 10,
          emergency: 3
        },
        workingHours: { start: "09:00", end: "17:00" },
        surgerySlots: [
          { start: "13:00", end: "14:00" }
        ]
      },
      {
        name: "Dr. Priya",
        department: "Dermatology",
        consultationDurations: {
          regular: 6,
          new: 12,
          emergency: 4
        },
        workingHours: { start: "10:00", end: "18:00" },
        surgerySlots: []
      },
      {
        name: "Dr. Ahmed",
        department: "Orthopedics",
        consultationDurations: {
          regular: 7,
          new: 15,
          emergency: 5
        },
        workingHours: { start: "09:00", end: "16:00" },
        surgerySlots: [
          { start: "12:00", end: "13:00" }
        ]
      }
    ]);

    res.json({ message: "Doctors seeded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/api/doctors", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

const appointmentRoutes = require("./routes/appointmentRoutes");

app.use("/api/appointments", appointmentRoutes);