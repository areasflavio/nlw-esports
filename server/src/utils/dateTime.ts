export const convertHourStringToMinutes = (hoursString: String) => {
  const [hours, minutes] = hoursString.split(':').map(Number);

  return hours * 60 + minutes;
};

export const convertMinutesToHourString = (minutes: number) => {
  const hrs = String(Math.floor(minutes / 60)).padStart(2, '0');
  const min = String((minutes % 60) * 60).padStart(2, '0');

  return `${hrs}:${min}`;
};
