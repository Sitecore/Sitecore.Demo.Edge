import { Day } from 'src/types/day';
import { Timeslot } from '../interfaces/Timeslot';

const getTimeString = (time: number, isEndTime: boolean): string => {
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
      let startTime = parseInt(
        (typeof timeslot.name === 'string' ? timeslot.name : timeslot.name.value) ?? ''
      );
      if (startTime !== NaN) {
        if (startTime < 7) {
          startTime = startTime + 12;
        }
        times.push(startTime);
      }
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

export const newsDateFormatter = (date: Date | null): string | undefined =>
  date?.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const getSessionDays = (days: Day[]): string => {
  return days.map((day) => day.fields.Name.value.toString()).join(', ');
};

export const getMonthFromIsoDateString = (isoDate: string): string => {
  if (!isoDate) {
    return '';
  }
  const date = new Date(isoDate);
  return (date.getMonth() + 1).toString().padStart(2, '0');
};

export const getYearFromIsoDateString = (isoDate: string): string => {
  if (!isoDate) {
    return '';
  }
  const date = new Date(isoDate);
  return date.getFullYear().toString();
};

export const getShortYearFromIsoDateString = (isoDate: string): string => {
  if (!isoDate) {
    return '';
  }
  return getYearFromIsoDateString(isoDate).slice(2);
};

export const getIsoDateFromYearAndMonth = (year: string, month: string): string => {
  if (!year || !month) {
    return '';
  }
  const dateYear = Number(year);
  const dateMonth = Number(month) - 1; // month is 0 - 11 in javascript
  return new Date(dateYear, dateMonth).toISOString();
};

export const getOrderDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB').replace(/\//g, '.');
};

export const getCreditCardExpirationDate = (isoDate: string): string => {
  const month = getMonthFromIsoDateString(isoDate);
  const year = getShortYearFromIsoDateString(isoDate);

  return `${month}/${year}`;
};

export const calculateEstimatedDeliveryDate = (days: number, orderDate?: Date): string => {
  const eta = orderDate || new Date();
  eta.setDate(eta.getDate() + days);
  return getOrderDate(eta);
};
