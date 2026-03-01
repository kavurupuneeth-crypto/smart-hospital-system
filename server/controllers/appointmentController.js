const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const recalculateDoctorQueue = require('../utils/recalculateDoctorQueue');
const { sendAppointmentConfirmation } = require('../utils/emailService');

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, slotStartTime, bookingType, patientDetails, reason } = req.body;
    
    if (!doctorId || !appointmentDate || !slotStartTime) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (bookingType === 'other' && !patientDetails) {
      return res.status(400).json({ success: false, message: 'Patient details required for booking others' });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    const aptDate = new Date(appointmentDate);
    aptDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(aptDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Check if slot is still available
    const existingSlot = await Appointment.findOne({
      doctorId: doctor._id,
      appointmentDate: { $gte: aptDate, $lt: nextDay },
      slotStartTime: slotStartTime,
      status: { $ne: 'Cancelled' }
    });

    if (existingSlot) {
      return res.status(400).json({ success: false, message: 'Selected slot is no longer available' });
    }

    // Calculate consultation duration
    const consultationDuration = doctor.consultationDurations.regular;

    // Calculate slot end time
    const [startHour, startMin] = slotStartTime.split(':').map(Number);
    const endMinutes = startHour * 60 + startMin + consultationDuration;
    const endHour = Math.floor(endMinutes / 60);
    const endMin = endMinutes % 60;
    const slotEndTime = `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`;

    // Get queue position
    const existingAppointments = await Appointment.find({
      doctorId: doctor._id,
      appointmentDate: { $gte: aptDate, $lt: nextDay },
      status: { $ne: 'Cancelled' }
    }).sort({ createdAt: 1 });

    const queuePosition = existingAppointments.length + 1;
    const estimatedWaitTime = (queuePosition - 1) * consultationDuration;
    const isFirstInQueue = queuePosition === 1;

    // Format time for display
    const formatTime = (time) => {
      const [h, m] = time.split(':').map(Number);
      const period = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 || 12;
      return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
    };

    const newAppointment = new Appointment({
      patientId: req.user.id,
      patientName: bookingType === 'self' ? req.user.name : patientDetails.name,
      doctorId: doctor._id,
      doctorName: doctor.name,
      department: doctor.department,
      slotTime: `${formatTime(slotStartTime)} - ${formatTime(slotEndTime)}`,
      slotStartTime,
      slotEndTime,
      appointmentDate: aptDate,
      queuePosition,
      estimatedWaitTime,
      consultationDuration,
      bookingType: bookingType || 'self',
      patientDetails: bookingType === 'other' ? patientDetails : undefined,
      reason,
      status: isFirstInQueue ? 'In Consultation' : 'Scheduled',
      consultationStartTime: isFirstInQueue ? new Date() : undefined
    });
    
    await newAppointment.save();

    // Recalculate queue
    await recalculateDoctorQueue(doctor._id, aptDate);

    const updatedAppointment = await Appointment.findById(newAppointment._id);

    // Send confirmation email
    try {
      const user = await User.findById(req.user.id);
      if (user && user.email) {
        await sendAppointmentConfirmation(updatedAppointment.toObject(), user.email);
        console.log(`✅ Confirmation email sent to ${user.email}`);
      }
    } catch (emailError) {
      console.error('Email send failed:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointment: updatedAppointment
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ success: false, message: error.message });
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

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    if (appointment.patientId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    if (appointment.status === 'Completed' || appointment.status === 'completed') {
      return res.status(400).json({ success: false, message: 'Completed appointments cannot be cancelled' });
    }

    const doctorId = appointment.doctorId;
    const appointmentDate = appointment.appointmentDate;

    // Soft cancel
    appointment.status = 'Cancelled';
    await appointment.save();

    // Recalculate queue for remaining appointments
    await recalculateDoctorQueue(doctorId, appointmentDate);

    res.json({ 
      success: true, 
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.rescheduleAppointment = async (req, res) => {
  try {
    const { newDate, newSlotTime } = req.body;
    
    if (!newDate || !newSlotTime) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    if (appointment.patientId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    if (appointment.status === 'Completed' || appointment.status === 'completed' || appointment.status === 'Cancelled') {
      return res.status(400).json({ success: false, message: 'Cannot reschedule this appointment' });
    }

    const oldDoctorId = appointment.doctorId;
    const oldDate = new Date(appointment.appointmentDate);
    oldDate.setHours(0, 0, 0, 0);
    const oldNextDay = new Date(oldDate);
    oldNextDay.setDate(oldNextDay.getDate() + 1);

    const newAppointmentDate = new Date(newDate);
    newAppointmentDate.setHours(0, 0, 0, 0);
    const newNextDay = new Date(newAppointmentDate);
    newNextDay.setDate(newNextDay.getDate() + 1);

    // Check if new slot is available
    const existingAppointment = await Appointment.findOne({
      doctorId: oldDoctorId,
      appointmentDate: { $gte: newAppointmentDate, $lt: newNextDay },
      slotTime: newSlotTime,
      status: { $ne: 'Cancelled' },
      _id: { $ne: appointment._id }
    });

    if (existingAppointment) {
      return res.status(400).json({ success: false, message: 'Selected slot is already booked' });
    }

    const doctor = await Doctor.findById(oldDoctorId);
    
    // Check capacity for new date
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
    const dailyCapacity = Math.floor(availableMinutes / (appointment.consultationDuration || doctor.consultationDurations.regular));

    const newDateCount = await Appointment.countDocuments({
      doctorId: oldDoctorId,
      appointmentDate: { $gte: newAppointmentDate, $lt: newNextDay },
      status: { $ne: 'Cancelled' },
      _id: { $ne: appointment._id }
    });

    if (newDateCount >= dailyCapacity) {
      return res.status(400).json({ success: false, message: 'Doctor fully booked on selected date' });
    }

    // Update appointment
    appointment.appointmentDate = newAppointmentDate;
    appointment.slotStartTime = newSlotTime;
    appointment.status = 'Scheduled';
    await appointment.save();

    // Recalculate old date queue
    await recalculateDoctorQueue(oldDoctorId, oldDate);

    // Recalculate new date queue
    await recalculateDoctorQueue(oldDoctorId, newAppointmentDate);

    const updatedAppointment = await Appointment.findById(req.params.id);

    res.json({ 
      success: true, 
      message: 'Appointment rescheduled successfully', 
      updatedAppointment 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({ success: false, message: 'Missing required parameters' });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    const appointmentDate = new Date(date);
    appointmentDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(appointmentDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const consultationDuration = doctor.consultationDurations.regular;
    const [startHour, startMin] = doctor.workingHours.start.split(':').map(Number);
    const [endHour, endMin] = doctor.workingHours.end.split(':').map(Number);

    const slots = [];
    let currentMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    // Get surgery slots
    const surgerySlots = doctor.surgerySlots.map(slot => {
      const [sStart, sStartMin] = slot.start.split(':').map(Number);
      const [sEnd, sEndMin] = slot.end.split(':').map(Number);
      return {
        start: sStart * 60 + sStartMin,
        end: sEnd * 60 + sEndMin
      };
    });

    // Get existing appointments
    const existingAppointments = await Appointment.find({
      doctorId: doctor._id,
      appointmentDate: { $gte: appointmentDate, $lt: nextDay },
      status: { $ne: 'Cancelled' }
    });

    const bookedSlots = existingAppointments.map(apt => apt.slotStartTime);

    // Generate hourly slots
    while (currentMinutes + consultationDuration <= endMinutes) {
      const hours = Math.floor(currentMinutes / 60);
      const minutes = currentMinutes % 60;
      const slotStartTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      const endSlotMinutes = currentMinutes + consultationDuration;
      const endHours = Math.floor(endSlotMinutes / 60);
      const endMins = endSlotMinutes % 60;
      const slotEndTime = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;

      const isSurgeryTime = surgerySlots.some(
        slot => currentMinutes >= slot.start && currentMinutes < slot.end
      );

      if (!isSurgeryTime) {
        slots.push({
          slotStartTime,
          slotEndTime,
          available: !bookedSlots.includes(slotStartTime)
        });
      }

      currentMinutes += consultationDuration;
    }

    res.json({ success: true, slots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.checkInAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    if (appointment.patientId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    if (appointment.status === 'Completed' || appointment.status === 'Cancelled') {
      return res.status(400).json({ success: false, message: 'Cannot check-in for this appointment' });
    }

    if (appointment.checkedIn) {
      return res.status(400).json({ success: false, message: 'Already checked in' });
    }

    appointment.checkedIn = true;
    appointment.checkInTime = new Date();
    await appointment.save();

    res.json({ 
      success: true, 
      message: 'Checked in successfully! Please wait for your turn.',
      appointment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};