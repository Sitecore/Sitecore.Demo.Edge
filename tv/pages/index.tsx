import React, { useContext, useEffect, useState } from 'react';
import { getAllSessionsByDay } from '../api/queries/getSessions';
import ScheduleForDay from '../components/ScheduleForDay';
import { ScheduleSlot } from '../interfaces/schedule';
import { Session } from '../interfaces/session';
import { dayDefaultValue, DayTimeContext } from '../contexts/DayTimeContext';

type ScheduleProps = {
  schedule: ScheduleSlot[][];
};

function groupBy(original: Session[]): ScheduleSlot[] {
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

function splitArray(original: ScheduleSlot[], chunkSize: number): ScheduleSlot[][] {
  const returnArray = [];

  for (let i = 0; i < original.length; i += chunkSize) {
    const temporary = original.slice(i, i + chunkSize);
    returnArray.push(temporary);
  }

  return returnArray;
}

const Schedule = (props: ScheduleProps): JSX.Element => {
  const [schedule, setSchedule] = useState(props.schedule);
  const dayTimeContext = useContext(DayTimeContext);

  useEffect(() => {
    getAllSessionsByDay(dayTimeContext.dayTime.day).then((data) => {
      setSchedule(splitArray(groupBy(data.sessions), 3));
    });
  }, [dayTimeContext.dayTime]);

  return <ScheduleForDay schedule={schedule} />;
};

export const getStaticProps = async () => {
  const { sessions } = await getAllSessionsByDay(dayDefaultValue);

  return {
    props: {
      schedule: splitArray(groupBy(sessions), 3),
    },
    revalidate: 10,
  };
};

export default Schedule;
