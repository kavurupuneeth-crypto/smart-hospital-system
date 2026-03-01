const express = require('express');
const router = express.Router();
const { bookAppointment, markAppointmentComplete, cancelAppointment, rescheduleAppointment, getAvailableSlots, checkInAppointment } = require('../controllers/appointmentController');
const protect = require('../middleware/authMiddleware');
const Appointment = require('../models/Appointment');

router.post('/book', protect, bookAppointment);
router.put("/complete/:id", protect, markAppointmentComplete);
router.put("/cancel/:id", protect, cancelAppointment);
router.put("/reschedule/:id", protect, rescheduleAppointment);
router.put("/check-in/:id", protect, checkInAppointment);
router.get('/available-slots', protect, getAvailableSlots);

router.get("/", protect, async (req, res) => {
  try {
    const { role } = req.query;
    let query = {};
    
    if (role === 'patient') {
      query.patientId = req.user.id;
      query.status = { $ne: 'Cancelled' };
    }
    
    const appointments = await Appointment.find(query).sort({ createdAt: -1 });
    res.json({ appointments });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/all", protect, async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
