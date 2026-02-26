const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  department: String,
  slotTime: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  queuePosition: {
    type: Number,
    required: true
  },
  estimatedWaitTime: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Waiting', 'In Consultation', 'completed', 'Cancelled'],
    default: 'Waiting'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
