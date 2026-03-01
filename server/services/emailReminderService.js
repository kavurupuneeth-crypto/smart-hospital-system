const cron = require('node-cron');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { sendAppointmentReminder } = require('../utils/emailService');
const { sendAppointmentReminder: sendWhatsAppReminder } = require('../utils/whatsappService');

const startEmailReminderService = () => {
  // Run every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    try {
      const now = new Date();
      const thirtyMinutesLater = new Date(now.getTime() + 30 * 60000);

      // Find appointments starting in the next 30 minutes
      const upcomingAppointments = await Appointment.find({
        status: 'Scheduled',
        appointmentDate: {
          $gte: new Date(now.toDateString()),
          $lt: new Date(now.toDateString() + ' 23:59:59')
        }
      }).populate('patientId', 'email name');

      for (const appointment of upcomingAppointments) {
        // Parse appointment time
        const [startTime] = appointment.slotTime.split(' - ');
        const [time, period] = startTime.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;

        const appointmentDateTime = new Date(appointment.appointmentDate);
        appointmentDateTime.setHours(hours, minutes, 0, 0);

        // Check if appointment is within 30 minutes
        const timeDiff = appointmentDateTime - now;
        if (timeDiff > 0 && timeDiff <= 30 * 60000) {
          // Send reminder email and WhatsApp
          if (appointment.patientId && appointment.patientId.email) {
            console.log(`Sending reminder to ${appointment.patientId.email} for appointment at ${appointment.slotTime}`);
            await sendAppointmentReminder(appointment, appointment.patientId.email);
            
            // Send WhatsApp reminder if phone number exists
            if (appointment.patientId.phone) {
              await sendWhatsAppReminder(
                appointment.patientId.phone,
                appointment.patientId.name,
                appointment.doctorName,
                appointment.slotTime,
                appointment._id
              );
            }
          }
        }
      }
    } catch (error) {
      console.error('Email reminder service error:', error);
    }
  });

  console.log('✅ Email reminder service started (runs every 5 minutes)');
};

module.exports = { startEmailReminderService };
