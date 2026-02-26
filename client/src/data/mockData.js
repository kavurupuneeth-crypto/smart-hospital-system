export const mockDoctors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    department: "Cardiology",
    consultationTime: 15,
    maxPatientsPerHour: 4,
    email: "doctor@test.com"
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    department: "Dermatology",
    consultationTime: 10,
    maxPatientsPerHour: 6,
    email: "doctor@test.com"
  },
  {
    id: 3,
    name: "Dr. Ahmed Ali",
    department: "Orthopedics",
    consultationTime: 20,
    maxPatientsPerHour: 3,
    email: "doctor@test.com"
  },
  {
    id: 4,
    name: "Dr. Kavya Reddy",
    department: "Cardiology",
    consultationTime: 15,
    maxPatientsPerHour: 4,
    email: "doctor@test.com"
  },
  {
    id: 5,
    name: "Dr. Suresh Patel",
    department: "Dermatology",
    consultationTime: 10,
    maxPatientsPerHour: 6,
    email: "doctor@test.com"
  }
];

export const mockAppointments = [
  {
    id: 1,
    patientName: "Amit Patel",
    doctorId: 1,
    department: "Cardiology",
    slotTime: "09:00",
    queuePosition: 1,
    estimatedWaitTime: 0,
    status: "In Consultation",
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    patientName: "Sneha Gupta",
    doctorId: 1,
    department: "Cardiology",
    slotTime: "09:15",
    queuePosition: 2,
    estimatedWaitTime: 15,
    status: "Waiting",
    timestamp: new Date().toISOString()
  },
  {
    id: 3,
    patientName: "Rahul Singh",
    doctorId: 2,
    department: "Dermatology",
    slotTime: "09:00",
    queuePosition: 1,
    estimatedWaitTime: 0,
    status: "In Consultation",
    timestamp: new Date().toISOString()
  },
  {
    id: 4,
    patientName: "Priya Nair",
    doctorId: 3,
    department: "Orthopedics",
    slotTime: "09:00",
    queuePosition: 1,
    estimatedWaitTime: 0,
    status: "In Consultation",
    timestamp: new Date().toISOString()
  }
];

export const departments = [
  "Cardiology",
  "Dermatology",
  "Orthopedics"
];

export const generateTimeSlots = (consultationTime) => {
  const slots = [];
  const startHour = 9;
  const endHour = 17;
  
  let currentMinutes = startHour * 60;
  const endMinutes = endHour * 60;
  
  while (currentMinutes < endMinutes) {
    const hours = Math.floor(currentMinutes / 60);
    const minutes = currentMinutes % 60;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    slots.push(timeString);
    currentMinutes += consultationTime;
  }
  
  return slots;
};

export const peakHoursData = [
  { hour: "8 AM", patients: 12 },
  { hour: "9 AM", patients: 25 },
  { hour: "10 AM", patients: 35 },
  { hour: "11 AM", patients: 42 },
  { hour: "12 PM", patients: 38 },
  { hour: "1 PM", patients: 28 },
  { hour: "2 PM", patients: 45 },
  { hour: "3 PM", patients: 40 },
  { hour: "4 PM", patients: 32 },
  { hour: "5 PM", patients: 20 }
];

export const workloadData = [
  { doctor: "Dr. Rajesh", patients: 28 },
  { doctor: "Dr. Priya", patients: 35 },
  { doctor: "Dr. Ahmed", patients: 22 },
  { doctor: "Dr. Kavya", patients: 18 }
];
