const Appointment = require('../models/Appointment');
const { sendCheckInConfirmation } = require('../utils/whatsappService');

const handleWhatsAppWebhook = async (req, res) => {
  try {
    const { Body, From } = req.body;
    
    // Extract phone number (remove 'whatsapp:' prefix)
    const phoneNumber = From.replace('whatsapp:', '').replace('+91', '');
    
    // Check if message is YES or NO
    const message = Body.trim().toUpperCase();
    
    if (message === 'YES' || message === 'Y') {
      // Find today's scheduled appointment for this phone number
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const appointment = await Appointment.findOne({
        status: 'Scheduled',
        checkedIn: false,
        appointmentDate: {
          $gte: today,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      }).populate('patientId', 'phone name');
      
      if (appointment && appointment.patientId.phone.includes(phoneNumber)) {
        // Auto check-in
        appointment.checkedIn = true;
        appointment.checkInTime = new Date();
        await appointment.save();
        
        // Send confirmation
        await sendCheckInConfirmation(
          appointment.patientId.phone,
          appointment.patientId.name,
          appointment.doctorName
        );
        
        console.log(`✅ Auto check-in successful for ${appointment.patientId.name}`);
      }
    }
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    res.status(200).send('OK'); // Always return 200 to Twilio
  }
};

module.exports = { handleWhatsAppWebhook };
