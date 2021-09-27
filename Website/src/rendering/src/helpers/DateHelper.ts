import { Timeslot } from 'src/interfaces/Timeslot';

export const getTimeString = (time: number, isEndTime: boolean): string => {
  const minutes = isEndTime ? ':55' : ':00';
  time = isEndTime ? time - 1 : time;
  if (time == 12) {
    return time + minutes + ' noon';
  } else if (time < 12) {
    return time + minutes + ' am';
  } else if (time > 12) {
    return time - 12 + minutes + ' pm';
  }
  return '';
};

export const getSessionTime = (timeslots: Timeslot[]): string => {
  let sessionTime = '';
  if (timeslots) {
    const times: number[] = [];
    timeslots.forEach((timeslot) => {
      let startTime = parseInt(timeslot.fields.Name.value);
      if (startTime < 7) {
        startTime = startTime + 12;
      }
      times.push(startTime);
    });
    times.sort();
    if (timeslots.length > 1) {
      sessionTime =
        getTimeString(times[0], false) + ' - ' + getTimeString(times[times.length - 1] + 1, true);
    } else {
      sessionTime = getTimeString(times[0], false) + ' - ' + getTimeString(times[0] + 1, true);
    }
  }
  return sessionTime;
};
