const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.get('/:doctorId/utilization', doctorController.getDoctorUtilization);
router.post('/', authMiddleware, roleMiddleware('admin'), doctorController.createDoctor);
router.put('/:id', authMiddleware, roleMiddleware('admin', 'doctor'), doctorController.updateDoctor);

module.exports = router;
