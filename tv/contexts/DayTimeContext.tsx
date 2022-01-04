import React, { PropsWithChildren, useState } from 'react';

export type DayTimeState = {
  day: string;
  time: string;
};

// eslint-disable-next-line no-unused-vars
export type SetDayTimeFunction = (day: string, time: string) => void;
export type LoadingFunction = () => void;

export type DayTimeContextValue = {
  dayTime: DayTimeState;
  setDayTime: SetDayTimeFunction;
  isLoading: boolean;
  showLoading: LoadingFunction;
  hideLoading: LoadingFunction;
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
    // Do nothing for the default context value
  },
  isLoading: false,
  showLoading: () => {
    // Do nothing for the default context value
  },
  hideLoading: () => {
    // Do nothing for the default context value
  },
};

export const DayTimeContext = React.createContext(defaultValue);

export const DayTimeContextProvider = (props: PropsWithChildren<unknown>): JSX.Element => {
  const [dayTimeState, setDayTimeState] = useState(dayTimeDefaultValue);
  const [isLoadingState, setILoadingState] = useState(false);

  const dayTimeContextValue: DayTimeContextValue = {
    dayTime: dayTimeState,
    setDayTime: (day: string, time: string) => {
      setDayTimeState({
        day,
        time,
      });
    },
    isLoading: isLoadingState,
    showLoading: () => {
      setILoadingState(true);
    },
    hideLoading: () => {
      setILoadingState(false);
    },
  };

  return (
    <DayTimeContext.Provider value={dayTimeContextValue}>{props.children}</DayTimeContext.Provider>
  );
};
