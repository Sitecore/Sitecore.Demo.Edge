import React from 'react';
import { getAllSessionsByDay } from '../api/queries/getSchedule';
import ScheduleForDay from '../components/ScheduleForDay';
import { ScheduleSlot } from '../interfaces/schedule';
import { Session } from '../interfaces/session';
import Screen from '../components/Screen';

type ScheduleProps = {
  sessions: Session[];
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

function paginateScheduleSlots(original: ScheduleSlot[], chunkSize: number): ScheduleSlot[][] {
  const returnArray = [];

  for (let i = 0; i < original.length; i += chunkSize) {
    const temporary = original.slice(i, i + chunkSize);
    returnArray.push(temporary);
  }

  return returnArray;
}

function generateSchedule(sessions: Session[]): ScheduleSlot[][] {
  const scheduleSlots = groupSessionsByTimeslot(sessions);
  const schedulePages = paginateScheduleSlots(scheduleSlots, scheduleSlots.length);

  return schedulePages;
}

const Schedule = (props: ScheduleProps): JSX.Element => {
  return (
    <Screen>
      <ScheduleForDay schedule={generateSchedule(props.sessions)} />
    </Screen>
  );
};

export const getStaticProps = async () => {
  const { sessions } = await getAllSessionsByDay('0');

  return {
    props: {
      sessions,
    },
    revalidate: 10,
  };
};

export default Schedule;
