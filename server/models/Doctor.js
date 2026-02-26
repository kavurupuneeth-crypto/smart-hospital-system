const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  consultationDurations: {
    regular: {
      type: Number,
      required: true
    },
    new: {
      type: Number,
      required: true
    },
    emergency: {
      type: Number,
      required: true
    }
  },
  workingHours: {
    start: {
      type: String,
      required: true
    },
    end: {
      type: String,
      required: true
    }
  },
  surgerySlots: [
    {
      start: { type: String },
      end: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
