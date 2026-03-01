const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { 
  getDoctorUtilization, 
  getDepartmentLoad, 
  getAverageWaitingTime,
  getPatientDashboardStats
} = require('../controllers/analyticsController');
const Appointment = require('../models/Appointment');

router.get('/utilization', protect, getDoctorUtilization);
router.get('/department-load', protect, getDepartmentLoad);
router.get('/average-waiting-time', protect, getAverageWaitingTime);
router.get('/patient-dashboard', protect, getPatientDashboardStats);

module.exports = router;
