const generateTimeSlots = (consultationTime, startTime = '09:00', endTime = '17:00') => {
  const slots = [];
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  let currentTime = startHour * 60 + startMin;
  const endTimeInMin = endHour * 60 + endMin;
  
  while (currentTime < endTimeInMin) {
    const hours = Math.floor(currentTime / 60);
    const minutes = currentTime % 60;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    slots.push(timeString);
    currentTime += consultationTime;
  }
  
  return slots;
};

module.exports = { generateTimeSlots };
