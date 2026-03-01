const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

const client = twilio(accountSid, authToken);

const sendAppointmentReminder = async (patientPhone, patientName, doctorName, appointmentTime, appointmentId) => {
  try {
    // Format phone number (ensure it has country code)
    const formattedPhone = patientPhone.startsWith('+') ? patientPhone : `+91${patientPhone}`;
    
    const message = await client.messages.create({
      from: whatsappNumber,
      to: `whatsapp:${formattedPhone}`,
      body: `🏥 *Hospital Reminder*\n\nHi ${patientName},\n\nYour appointment with Dr. ${doctorName} is in 30 minutes at ${appointmentTime}.\n\n*Are you at the hospital?*\n\nReply:\n✅ YES - I'm here\n❌ NO - Running late`,
    });

    console.log('WhatsApp reminder sent:', message.sid);
    return message;
  } catch (error) {
    console.error('Error sending WhatsApp reminder:', error);
    throw error;
  }
};

const sendCheckInConfirmation = async (patientPhone, patientName, doctorName) => {
  try {
    const formattedPhone = patientPhone.startsWith('+') ? patientPhone : `+91${patientPhone}`;
    
    const message = await client.messages.create({
      from: whatsappNumber,
      to: `whatsapp:${formattedPhone}`,
      body: `✅ *Check-in Confirmed*\n\nThank you ${patientName}!\n\nYou've been checked in for your appointment with Dr. ${doctorName}.\n\nPlease wait in the reception area. You'll be called shortly.`,
    });

    console.log('WhatsApp check-in confirmation sent:', message.sid);
    return message;
  } catch (error) {
    console.error('Error sending WhatsApp confirmation:', error);
    throw error;
  }
};

module.exports = {
  sendAppointmentReminder,
  sendCheckInConfirmation,
};
