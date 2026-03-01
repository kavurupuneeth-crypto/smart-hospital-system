const mongoose = require('mongoose');
const Appointment = require('./models/Appointment');
const Doctor = require('./models/Doctor');
require('dotenv').config();

const updateAllAppointments = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const appointments = await Appointment.find({
      status: { $nin: ['Cancelled', 'Completed', 'completed'] }
    });

    console.log(`Found ${appointments.length} appointments to update`);

    for (const apt of appointments) {
      if (apt.slotStartTime && apt.slotEndTime) {
        const formatTime = (time) => {
          const [h, m] = time.split(':').map(Number);
          const period = h >= 12 ? 'PM' : 'AM';
          const hour12 = h % 12 || 12;
          return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
        };

        apt.slotTime = `${formatTime(apt.slotStartTime)} - ${formatTime(apt.slotEndTime)}`;
        await apt.save();
        console.log(`Updated appointment ${apt._id}: ${apt.slotTime}`);
      }
    }

    console.log('All appointments updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating appointments:', error);
    process.exit(1);
  }
};

updateAllAppointments();
