const express = require('express');
const router = express.Router();
const { bookAppointment, markAppointmentComplete } = require('../controllers/appointmentController');
const protect = require('../middleware/authMiddleware');
const Appointment = require('../models/Appointment');

router.post('/book', protect, bookAppointment);
router.put("/complete/:id", protect, markAppointmentComplete);

router.get("/all", protect, async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
