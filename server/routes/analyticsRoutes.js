const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { 
  getDoctorUtilization, 
  getDepartmentLoad, 
  getAverageWaitingTime 
} = require('../controllers/analyticsController');

router.get('/utilization', protect, getDoctorUtilization);
router.get('/department-load', protect, getDepartmentLoad);
router.get('/average-waiting-time', protect, getAverageWaitingTime);

module.exports = router;
