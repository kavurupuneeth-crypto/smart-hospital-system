const mongoose = require('mongoose');
const Appointment = require('./models/Appointment');
const Doctor = require('./models/Doctor');
const recalculateDoctorQueue = require('./utils/recalculateDoctorQueue');
require('dotenv').config();

const recalculateAllQueues = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const appointments = await Appointment.find({
      status: { $nin: ['Cancelled', 'Completed', 'completed'] }
    });

    console.log(`Found ${appointments.length} active appointments`);

    // Group by doctor and date
    const doctorDateMap = new Map();
    
    for (const apt of appointments) {
      const dateKey = new Date(apt.appointmentDate).toISOString().split('T')[0];
      const key = `${apt.doctorId}_${dateKey}`;
      
      if (!doctorDateMap.has(key)) {
        doctorDateMap.set(key, {
          doctorId: apt.doctorId,
          date: apt.appointmentDate
        });
      }
    }

    console.log(`Recalculating queues for ${doctorDateMap.size} doctor-date combinations`);

    for (const [key, { doctorId, date }] of doctorDateMap) {
      console.log(`Recalculating queue for doctor ${doctorId} on ${date}`);
      await recalculateDoctorQueue(doctorId, date);
    }

    console.log('All queues recalculated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error recalculating queues:', error);
    process.exit(1);
  }
};

recalculateAllQueues();
