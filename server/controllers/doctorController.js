const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isAvailable: true }).populate('userId', 'name email');
    res.json({ doctors });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch doctors', error: error.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json({ doctor });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch doctor', error: error.message });
  }
};

exports.getDoctorUtilization = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const appointments = await Appointment.find({
      doctorId,
      appointmentDate: { $gte: today },
      status: { $ne: 'Cancelled' }
    });

    const maxCapacity = doctor.maxPatientsPerHour * 8;
    const booked = appointments.length;
    const utilization = Math.round((booked / maxCapacity) * 100);

    res.json({ booked, capacity: maxCapacity, utilization });
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate utilization', error: error.message });
  }
};

exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ message: 'Doctor created successfully', doctor });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create doctor', error: error.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json({ message: 'Doctor updated successfully', doctor });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update doctor', error: error.message });
  }
};
