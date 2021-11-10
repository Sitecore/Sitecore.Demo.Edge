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
    if (output.length === 0 || currentValue.sortOrder !== output[currentOutputIndex].SortOrder) {
      currentOutputIndex += 1;
      output.push({
        Timeslot: currentValue.timeslot,
        SortOrder: currentValue.sortOrder,
        Sessions: [],
      });
    }

    // Add current session to ScheduleSlot
    output[currentOutputIndex].Sessions.push(currentValue);

    return output;
  }, initialOutput);
}

function filterPastScheduleSlots(scheduleSlots: ScheduleSlot[], selectedTimeslotOrder: number) {
  return scheduleSlots.filter((scheduleSlot) => scheduleSlot.SortOrder >= selectedTimeslotOrder);
}

function paginateScheduleSlots(original: ScheduleSlot[], chunkSize: number): ScheduleSlot[][] {
  const returnArray = [];

  for (let i = 0; i < original.length; i += chunkSize) {
    const temporary = original.slice(i, i + chunkSize);
    returnArray.push(temporary);
  }

  return returnArray;
}

function generateSchedule(sessions: Session[], selectedTimeslotOrder: string): ScheduleSlot[][] {
  const scheduleSlots = groupSessionsByTimeslot(sessions);
  const filteredScheduleSlots = filterPastScheduleSlots(
    scheduleSlots,
    parseInt(selectedTimeslotOrder)
  );
  const schedulePages = paginateScheduleSlots(filteredScheduleSlots, 3);

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
