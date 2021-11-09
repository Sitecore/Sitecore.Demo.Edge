import React from 'react';

export type DayTimeState = {
  day: string;
  time: string;
};

// eslint-disable-next-line no-unused-vars
export type SetDayTimeFunction = (day: string, time: string) => void;

export type DayTimeContextValue = {
  dayTime: DayTimeState;
  // eslint-disable-next-line no-unused-vars
  setDayTime: SetDayTimeFunction;
};

export const dayDefaultValue = '0';
export const timeDefaultValue = '1';
export const dayTimeDefaultValue = {
  day: dayDefaultValue,
  time: timeDefaultValue,
};

const defaultValue: DayTimeContextValue = {
  dayTime: dayTimeDefaultValue,
  setDayTime: () => {
    // Do nothing
  },
};

export const DayTimeContext = React.createContext(defaultValue);
