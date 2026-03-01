require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const Appointment = require("./models/Appointment");
const analyticsRoutes = require("./routes/analyticsRoutes");
const startQueueAutomation = require('./cron/queueAutomation');
const { startStatusUpdateService } = require('./services/appointmentStatusService');
const { startEmailReminderService } = require('./services/emailReminderService');

const app = express();

connectDB();
startQueueAutomation();
startStatusUpdateService();
startEmailReminderService();

app.use(cors());
app.use(express.json());
app.use("/api/analytics", analyticsRoutes);

app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server running successfully' });
});

app.get('/api/test-email', async (req, res) => {
  try {
    const { sendAppointmentConfirmation } = require('./utils/emailService');
    const testAppointment = {
      patientName: 'Test Patient',
      doctorName: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      appointmentDate: new Date(),
      slotTime: '10:00 AM - 10:30 AM',
      queuePosition: 1,
      estimatedWaitTime: 15
    };
    const result = await sendAppointmentConfirmation(testAppointment, process.env.EMAIL_USER);
    if (result.success) {
      res.json({ success: true, message: 'Test email sent! Check inbox.', messageId: result.messageId });
    } else {
      res.status(500).json({ success: false, error: result.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

const Doctor = require("./models/Doctor");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const whatsappRoutes = require("./routes/whatsappRoutes");

app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/whatsapp", whatsappRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});