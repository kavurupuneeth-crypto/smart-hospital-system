const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// Update appointment statuses based on current time
const updateAppointmentStatuses = async () => {
  try {
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get all active appointments for today
    const appointments = await Appointment.find({
      appointmentDate: { $gte: today, $lt: tomorrow },
      status: { $in: ['Scheduled', 'In Consultation'] }
    }).sort({ doctorId: 1, queuePosition: 1 });

    // Group by doctor
    const doctorAppointments = {};
    appointments.forEach(apt => {
      const doctorId = apt.doctorId.toString();
      if (!doctorAppointments[doctorId]) {
        doctorAppointments[doctorId] = [];
      }
      doctorAppointments[doctorId].push(apt);
    });

    // Process each doctor's appointments
    for (const doctorId in doctorAppointments) {
      const apts = doctorAppointments[doctorId];
      const doctor = await Doctor.findById(doctorId);
      
      if (!doctor) continue;

      const consultationDuration = doctor.consultationDurations.regular;

      for (let i = 0; i < apts.length; i++) {
        const apt = apts[i];
        
        // Parse slot start time
        const [startHour, startMin] = apt.slotStartTime.split(':').map(Number);
        const slotStartDateTime = new Date(apt.appointmentDate);
        slotStartDateTime.setHours(startHour, startMin, 0, 0);
        
        // Calculate slot end time
        const slotEndDateTime = new Date(slotStartDateTime);
        slotEndDateTime.setMinutes(slotEndDateTime.getMinutes() + consultationDuration);

        // Check if appointment time has passed (should be completed)
        if (now > slotEndDateTime && apt.status === 'In Consultation') {
          apt.status = 'Completed';
          await apt.save();
          console.log(`Marked appointment ${apt._id} as Completed`);
          
          // Move next patient to "In Consultation"
          if (i + 1 < apts.length) {
            const nextApt = apts[i + 1];
            if (nextApt.status === 'Scheduled') {
              nextApt.status = 'In Consultation';
              nextApt.consultationStartTime = new Date();
              await nextApt.save();
              console.log(`Moved appointment ${nextApt._id} to In Consultation`);
            }
          }
        }
        // Check if appointment time has arrived (should start consultation)
        else if (now >= slotStartDateTime && now <= slotEndDateTime && apt.status === 'Scheduled' && apt.queuePosition === 1) {
          apt.status = 'In Consultation';
          apt.consultationStartTime = new Date();
          await apt.save();
          console.log(`Started consultation for appointment ${apt._id}`);
        }
      }
    }

    // Mark past appointments as completed
    const pastAppointments = await Appointment.find({
      appointmentDate: { $lt: today },
      status: { $in: ['Scheduled', 'In Consultation'] }
    });

    for (const apt of pastAppointments) {
      apt.status = 'Completed';
      await apt.save();
      console.log(`Marked past appointment ${apt._id} as Completed`);
    }

  } catch (error) {
    console.error('Error updating appointment statuses:', error);
  }
};

// Run every minute
const startStatusUpdateService = () => {
  console.log('Starting appointment status update service...');
  
  // Run immediately on start
  updateAppointmentStatuses();
  
  // Then run every minute
  setInterval(updateAppointmentStatuses, 60000); // 60000ms = 1 minute
};

module.exports = { updateAppointmentStatuses, startStatusUpdateService };
