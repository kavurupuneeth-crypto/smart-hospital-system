const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

const recalculateDoctorQueue = async (doctorId, appointmentDate) => {
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return;

    const dateObj = new Date(appointmentDate);
    dateObj.setHours(0, 0, 0, 0);
    const nextDay = new Date(dateObj);
    nextDay.setDate(nextDay.getDate() + 1);

    const appointments = await Appointment.find({
      doctorId,
      appointmentDate: { $gte: dateObj, $lt: nextDay },
      status: { $nin: ['Cancelled', 'Completed', 'completed'] }
    }).sort({ createdAt: 1 });

    const [startHour, startMin] = doctor.workingHours.start.split(':').map(Number);
    const consultationDuration = doctor.consultationDurations.regular;

    for (let i = 0; i < appointments.length; i++) {
      const queuePosition = i + 1;
      const offsetMinutes = i * consultationDuration;
      
      const slotStartHour = startHour + Math.floor((startMin + offsetMinutes) / 60);
      const slotStartMinute = (startMin + offsetMinutes) % 60;
      const slotStartTime = `${String(slotStartHour).padStart(2, '0')}:${String(slotStartMinute).padStart(2, '0')}`;
      
      const endMinutes = startMin + offsetMinutes + consultationDuration;
      const slotEndHour = startHour + Math.floor(endMinutes / 60);
      const slotEndMinute = endMinutes % 60;
      const slotEndTime = `${String(slotEndHour).padStart(2, '0')}:${String(slotEndMinute).padStart(2, '0')}`;
      
      const formatTime = (time) => {
        const [h, m] = time.split(':').map(Number);
        const period = h >= 12 ? 'PM' : 'AM';
        const hour12 = h % 12 || 12;
        return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
      };
      
      appointments[i].queuePosition = queuePosition;
      appointments[i].slotStartTime = slotStartTime;
      appointments[i].slotEndTime = slotEndTime;
      appointments[i].slotTime = `${formatTime(slotStartTime)} - ${formatTime(slotEndTime)}`;
      appointments[i].estimatedWaitTime = offsetMinutes;
      
      if (queuePosition === 1) {
        appointments[i].status = 'In Consultation';
      }
      
      await appointments[i].save();
    }
  } catch (error) {
    console.error('Error recalculating queue:', error);
  }
};

module.exports = recalculateDoctorQueue;
