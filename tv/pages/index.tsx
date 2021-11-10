import React, { useContext, useEffect, useState } from 'react';
import { getAllSessionsByDay } from '../api/queries/getSessions';
import ScheduleForDay from '../components/ScheduleForDay';
import { ScheduleSlot } from '../interfaces/schedule';
import { Session } from '../interfaces/session';
import { dayDefaultValue, DayTimeContext, timeDefaultValue } from '../contexts/DayTimeContext';

type ScheduleProps = {
  schedule: ScheduleSlot[][];
};

function groupSessionsByTimeslot(original: Session[]): ScheduleSlot[] {
  let currentOutputIndex = -1;
  const initialOutput: ScheduleSlot[] = [];

  return original.reduce((output: ScheduleSlot[], currentValue: Session) => {
    // Create a new ScheduleSlot if needed
    if (output.length === 0 || currentValue.timeslot !== output[currentOutputIndex].Timeslot) {
      currentOutputIndex += 1;
      output.push({
        Timeslot: currentValue.timeslot,
        Sessions: [],
      });
    }

    // Add current session to ScheduleSlot
    output[currentOutputIndex].Sessions.push(currentValue);

    return output;
  }, initialOutput);
}

function getSchedulePages(original: ScheduleSlot[], chunkSize: number): ScheduleSlot[][] {
  const returnArray = [];

  for (let i = 0; i < original.length; i += chunkSize) {
    const temporary = original.slice(i, i + chunkSize);
    returnArray.push(temporary);
  }

  return returnArray;
}

function getTimeslotOrder(timeslot: string): number {
  switch (timeslot) {
    case '08:00am - 09:00am':
      return 1;
    case '09:00am - 10:00am':
      return 2;
    case '10:00am - 11:00am':
      return 3;
    case '11:00am - 12:00pm':
      return 4;
    case '12:00pm - 01:00pm':
      return 5;
    case '01:00pm - 02:00pm':
      return 6;
    case '02:00pm - 03:00pm':
      return 7;
    case '03:00pm - 04:00pm':
      return 8;
    case '04:00pm - 05:00pm':
      return 9;
    default:
      return 1;
  }
}

function filterPassedScheduleSlots(scheduleSlots: ScheduleSlot[], selectedTimeslotOrder: number) {
  return scheduleSlots.filter(
    (scheduleSlot) => getTimeslotOrder(scheduleSlot.Timeslot) >= selectedTimeslotOrder
  );
}

function generateSchedule(sessions: Session[], selectedTimeslotOrder: string): ScheduleSlot[][] {
  const scheduleSlots = groupSessionsByTimeslot(sessions);
  const filteredScheduleSlots = filterPassedScheduleSlots(
    scheduleSlots,
    parseInt(selectedTimeslotOrder)
  );
  const schedulePages = getSchedulePages(filteredScheduleSlots, 3);

  return schedulePages;
}

const Schedule = (props: ScheduleProps): JSX.Element => {
  const [schedule, setSchedule] = useState(props.schedule);
  const dayTimeContext = useContext(DayTimeContext);

  useEffect(() => {
    getAllSessionsByDay(dayTimeContext.dayTime.day).then((data) => {
      setSchedule(generateSchedule(data.sessions, dayTimeContext.dayTime.time));
    });
  }, [dayTimeContext.dayTime]);

  return <ScheduleForDay schedule={schedule} />;
};

export const getStaticProps = async () => {
  const { sessions } = await getAllSessionsByDay(dayDefaultValue);

  return {
    props: {
      schedule: generateSchedule(sessions, timeDefaultValue),
    },
    revalidate: 10,
  };
};

export default Schedule;
