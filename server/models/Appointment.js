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
  slotStartTime: {
    type: String
  },
  slotEndTime: {
    type: String
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
  consultationStartTime: {
    type: Date
  },
  consultationDuration: {
    type: Number
  },
  bookingType: {
    type: String,
    enum: ['self', 'other'],
    default: 'self'
  },
  patientDetails: {
    name: String,
    age: Number,
    gender: String,
    phone: String,
    relation: String
  },
  reason: String,
  status: {
    type: String,
    enum: ['Scheduled', 'Waiting', 'In Consultation', 'Completed', 'completed', 'Cancelled', 'No Show'],
    default: 'Scheduled'
  },
  checkedIn: {
    type: Boolean,
    default: false
  },
  checkInTime: {
    type: Date
  },
  cancelledAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
