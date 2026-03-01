const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send appointment reminder email
const sendAppointmentReminder = async (appointment, patientEmail) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: patientEmail,
      subject: '🏥 Appointment Reminder - SmartHospital',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #2563eb; text-align: center;">Appointment Reminder</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Patient:</strong> ${appointment.patientName}</p>
            <p style="margin: 10px 0;"><strong>Doctor:</strong> Dr. ${appointment.doctorName}</p>
            <p style="margin: 10px 0;"><strong>Department:</strong> ${appointment.department}</p>
            <p style="margin: 10px 0;"><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p style="margin: 10px 0;"><strong>Time Slot:</strong> ${appointment.slotTime}</p>
            <p style="margin: 10px 0;"><strong>Queue Position:</strong> #${appointment.queuePosition}</p>
          </div>
          
          <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af;">⏰ <strong>Please arrive ${appointment.estimatedWaitTime} minutes before your slot time.</strong></p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 30px;">
            Thank you for choosing SmartHospital<br/>
            For any queries, please contact us.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

// Send appointment confirmation email
const sendAppointmentConfirmation = async (appointment, patientEmail) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: patientEmail,
      subject: '✅ Appointment Confirmed - SmartHospital',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #10b981;">✅ Appointment Confirmed!</h2>
          </div>
          
          <p>Dear ${appointment.patientName},</p>
          <p>Your appointment has been successfully booked.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Appointment Details:</h3>
            <p style="margin: 10px 0;"><strong>Doctor:</strong> Dr. ${appointment.doctorName}</p>
            <p style="margin: 10px 0;"><strong>Department:</strong> ${appointment.department}</p>
            <p style="margin: 10px 0;"><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p style="margin: 10px 0;"><strong>Time Slot:</strong> ${appointment.slotTime}</p>
            <p style="margin: 10px 0;"><strong>Queue Position:</strong> #${appointment.queuePosition}</p>
            <p style="margin: 10px 0;"><strong>Estimated Wait:</strong> ${appointment.estimatedWaitTime} minutes</p>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">📌 <strong>Important:</strong> Please arrive on time. You will receive a reminder before your appointment.</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 30px;">
            Thank you for choosing SmartHospital
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendAppointmentReminder,
  sendAppointmentConfirmation
};
