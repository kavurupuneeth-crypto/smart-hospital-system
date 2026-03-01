require('dotenv').config();
const { sendAppointmentReminder } = require('./utils/whatsappService');

// Replace with your phone number (that joined the sandbox)
const testPhone = '+916304292395'; // Change this to your number!

console.log('Sending test WhatsApp message...');

sendAppointmentReminder(
  testPhone,
  'Test Patient',
  'Dr. Sarah Johnson',
  '10:00 AM - 10:30 AM',
  'test123'
)
  .then(() => {
    console.log('✅ WhatsApp message sent successfully!');
    console.log('Check your WhatsApp for the message.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error sending WhatsApp:', error.message);
    process.exit(1);
  });
