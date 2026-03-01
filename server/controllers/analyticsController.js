const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

exports.getDoctorUtilization = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const doctors = await Doctor.find();
    const utilization = [];

    for (const doctor of doctors) {
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
      const dailyCapacity = Math.floor(availableMinutes / doctor.consultationDurations.regular);

      const totalAppointments = await Appointment.countDocuments({
        doctorId: doctor._id,
        appointmentDate: { $gte: today, $lt: tomorrow },
        status: { $ne: 'Cancelled' }
      });

      const utilizationPercentage = dailyCapacity > 0 
        ? Math.round((totalAppointments / dailyCapacity) * 100) 
        : 0;

      utilization.push({
        doctorName: doctor.name,
        department: doctor.department,
        totalAppointments,
        dailyCapacity,
        utilizationPercentage
      });
    }

    res.json({ utilization });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDepartmentLoad = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const departmentLoad = await Appointment.aggregate([
      {
        $match: {
          appointmentDate: { $gte: today, $lt: tomorrow },
          status: { $ne: 'Cancelled' }
        }
      },
      {
        $group: {
          _id: '$department',
          totalAppointments: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          department: '$_id',
          totalAppointments: 1
        }
      }
    ]);

    res.json({ departmentLoad });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAverageWaitingTime = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const waitingAppointments = await Appointment.find({
      appointmentDate: { $gte: today, $lt: tomorrow },
      status: 'Waiting'
    });

    const averageWaitingTime = waitingAppointments.length > 0
      ? Math.round(
          waitingAppointments.reduce((sum, apt) => sum + apt.estimatedWaitTime, 0) / 
          waitingAppointments.length
        )
      : 0;

    res.json({ averageWaitingTime });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPatientDashboardStats = async (req, res) => {
  try {
    const total = await Appointment.countDocuments({
      patientId: req.user.id
    });

    const active = await Appointment.countDocuments({
      patientId: req.user.id,
      status: { $in: ['Scheduled', 'In Consultation'] }
    });

    const completed = await Appointment.countDocuments({
      patientId: req.user.id,
      status: { $in: ['Completed', 'completed'] }
    });

    const upcoming = await Appointment.countDocuments({
      patientId: req.user.id,
      status: 'Scheduled'
    });

    res.json({ total, active, completed, upcoming });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
