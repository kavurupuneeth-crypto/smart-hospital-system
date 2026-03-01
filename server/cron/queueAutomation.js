const cron = require('node-cron');
const Appointment = require('../models/Appointment');

const startQueueAutomation = () => {
  cron.schedule('* * * * *', async () => {
    try {
      console.log('Running queue automation...');
      
      const currentTime = new Date();
      
      // Find appointments currently "In Consultation"
      const inConsultationAppointments = await Appointment.find({
        status: 'In Consultation',
        consultationStartTime: { $exists: true },
        consultationDuration: { $exists: true }
      });

      for (const appointment of inConsultationAppointments) {
        const consultationEndTime = new Date(
          appointment.consultationStartTime.getTime() + 
          (appointment.consultationDuration * 60000)
        );

        // Check if consultation time has elapsed
        if (currentTime >= consultationEndTime) {
          console.log(`Completing appointment ${appointment._id}`);
          
          // Mark current appointment as Completed
          appointment.status = 'Completed';
          await appointment.save();

          // Find next scheduled appointment for same doctor
          const nextAppointment = await Appointment.findOne({
            doctorId: appointment.doctorId,
            status: 'Scheduled'
          }).sort({ appointmentDate: 1, createdAt: 1 });

          if (nextAppointment) {
            console.log(`Starting next appointment ${nextAppointment._id}`);
            
            // Start consultation for next patient
            nextAppointment.status = 'In Consultation';
            nextAppointment.consultationStartTime = new Date();
            await nextAppointment.save();
          }
        }
      }
    } catch (error) {
      console.error('Queue automation error:', error);
    }
  });

  console.log('Queue automation cron job started (runs every minute)');
};

module.exports = startQueueAutomation;
