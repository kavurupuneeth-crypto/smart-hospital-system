const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
  try {
    const { department, patientType } = req.body;

    const doctors = await Doctor.find({ department });
    if (!doctors.length) {
      return res.status(404).json({ message: 'No doctors found in this department' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    for (const doctor of doctors) {
      const consultationDuration = doctor.consultationDurations[patientType];
      
      const [startHour, startMin] = doctor.workingHours.start.split(':').map(Number);
      const [endHour, endMin] = doctor.workingHours.end.split(':').map(Number);
      const workingMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);

      let surgeryMinutes = 0;
      for (const slot of doctor.surgerySlots) {
        const [sStart, sStartMin] = slot.start.split(':').map(Number);
        const [sEnd, sEndMin] = slot.end.split(':').map(Number);
        surgeryMinutes += (sEnd * 60 + sEndMin) - (sStart * 60 + sStartMin);
      }

      const availableMinutes = workingMinutes - surgeryMinutes;
      const dailyCapacity = Math.floor(availableMinutes / consultationDuration);

      const currentCount = await Appointment.countDocuments({
        doctorId: doctor._id,
        appointmentDate: { $gte: today, $lt: tomorrow },
        status: { $ne: 'Cancelled' }
      });

      if (currentCount < dailyCapacity) {
        const queuePosition = currentCount + 1;
        const estimatedWaitTime = (queuePosition - 1) * consultationDuration;

        const appointment = await Appointment.create({
          patientId: req.user.id,
          patientName: req.user.name,
          doctorId: doctor._id,
          doctorName: doctor.name,
          department: doctor.department,
          slotTime: 'Next Available',
          appointmentDate: today,
          queuePosition,
          estimatedWaitTime,
          status: queuePosition === 1 ? 'In Consultation' : 'Waiting'
        });

        return res.status(201).json({
          message: 'Appointment booked successfully',
          appointment
        });
      }
    }

    res.status(400).json({ message: 'All doctors fully booked today' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markAppointmentComplete = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'completed';
    await appointment.save();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const waitingAppointments = await Appointment.find({
      doctor: appointment.doctor,
      createdAt: { $gte: today, $lt: tomorrow },
      status: 'waiting'
    }).sort({ createdAt: 1 });

    const doctor = await Doctor.findById(appointment.doctor);

    for (let i = 0; i < waitingAppointments.length; i++) {
      waitingAppointments[i].queuePosition = i + 1;

      const consultationDuration =
        doctor.consultationDurations.regular;

      waitingAppointments[i].estimatedWaitTime =
        i * consultationDuration;

      await waitingAppointments[i].save();
    }

    res.json({ message: 'Appointment marked as complete' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};