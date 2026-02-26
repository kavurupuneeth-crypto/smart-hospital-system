import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Fetch initial data
  const fetchData = async () => {
    try {
      const docsRes = await axiosInstance.get('/doctors');
      const formattedDoctors = docsRes.data.map(d => ({
        id: d._id,
        name: d.name,
        department: d.department,
        consultationTime: d.consultationDurations.regular,
        maxPatientsPerHour: Math.floor(60 / d.consultationDurations.regular),
        workingHours: d.workingHours,
        surgerySlots: d.surgerySlots
      }));
      setDoctors(formattedDoctors);

      const aptRes = await axiosInstance.get('/appointments/all');
      const formattedApt = aptRes.data.map(a => ({
        ...a,
        id: a._id
      }));
      setAppointments(formattedApt);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      setAppointments(prev =>
        prev.map(apt => {
          if (apt.status === 'Waiting' && apt.estimatedWaitTime > 0) {
            return {
              ...apt,
              estimatedWaitTime: Math.max(0, apt.estimatedWaitTime - 1)
            };
          }
          return apt;
        })
      );
    }, 60000); // Wait time decrements every minute

    return () => clearInterval(interval);
  }, []);

  const getSlotCapacity = (doctorId, slotTime) => {
    const doctor = doctors.find(d => d.id === doctorId);
    const slotAppointments = appointments.filter(
      a => a.doctorId === doctorId && a.slotTime === slotTime && a.status !== 'Completed'
    );
    return {
      booked: slotAppointments.length,
      max: 1,
      available: slotAppointments.length === 0
    };
  };

  const getDoctorUtilization = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    const activeAppointments = appointments.filter(
      a => a.doctorId === doctorId && a.status !== 'Completed'
    );
    const maxCapacity = doctor.maxPatientsPerHour * 8; // 8 hour day
    return {
      booked: activeAppointments.length,
      maxCapacity,
      utilization: Math.round((activeAppointments.length / maxCapacity) * 100)
    };
  };

  const bookAppointment = async (department, patientType = 'regular') => {
    try {
      const response = await axiosInstance.post('/appointments/book', {
        department,
        patientType
      });

      await fetchData(); // Refresh state after booking

      return { success: true, appointment: response.data.appointment };
    } catch (error) {
      return { error: error.response?.data?.message || 'Failed to book appointment' };
    }
  };

  const completeConsultation = (doctorId) => {
    const currentPatient = appointments.find(
      a => a.doctorId === doctorId && a.status === 'In Consultation'
    );

    if (currentPatient) {
      setAppointments(prev => {
        const updated = prev.map(apt => {
          if (apt.id === currentPatient.id) {
            return { ...apt, status: 'Completed' };
          }
          if (apt.doctorId === doctorId && apt.status === 'Waiting') {
            const newPosition = apt.queuePosition - 1;
            const doctor = doctors.find(d => d.id === doctorId);
            return {
              ...apt,
              queuePosition: newPosition,
              status: newPosition === 1 ? 'In Consultation' : 'Waiting',
              estimatedWaitTime: (newPosition - 1) * doctor.consultationTime
            };
          }
          return apt;
        });
        return updated;
      });
    }
  };

  const cancelAppointment = (appointmentId) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (appointment) {
      setAppointments(prev => {
        const updated = prev.filter(a => a.id !== appointmentId).map(apt => {
          if (apt.doctorId === appointment.doctorId && apt.queuePosition > appointment.queuePosition) {
            const doctor = doctors.find(d => d.id === apt.doctorId);
            const newPosition = apt.queuePosition - 1;
            return {
              ...apt,
              queuePosition: newPosition,
              estimatedWaitTime: (newPosition - 1) * doctor.consultationTime
            };
          }
          return apt;
        });
        return updated;
      });
    }
  };

  return (
    <AppContext.Provider value={{
      doctors,
      appointments,
      bookAppointment,
      completeConsultation,
      cancelAppointment,
      getSlotCapacity,
      getDoctorUtilization
    }}>
      {children}
    </AppContext.Provider>
  );
};
