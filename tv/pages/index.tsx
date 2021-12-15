import React, { useContext, useEffect, useRef, useState } from 'react';
import { getSessionsByDay } from '../api/queries/getSessions';
import ScheduleForDay from '../components/ScheduleForDay';
import { ScheduleSlot } from '../interfaces/schedule';
import { Session } from '../interfaces/session';
import { dayDefaultValue, DayTimeContext } from '../contexts/DayTimeContext';
import { FeatureFlagContext } from '../contexts/FeatureFlagContext';

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

const defaultSchedule: ScheduleSlot[][] = [];

const Schedule = (props: ScheduleProps): JSX.Element => {
  const displayedDaySessions = useRef(props.sessions);
  const [schedule, setSchedule] = useState(defaultSchedule);
  const dayTimeContext = useContext(DayTimeContext);
  const featureFlagContext = useContext(FeatureFlagContext);

  useEffect(() => {
    getSessionsByDay(
      parseInt(dayTimeContext.dayTime.day),
      featureFlagContext.featureFlags.isPreviewApiEnabled
    ).then((data) => {
      displayedDaySessions.current = data.sessions;
      setSchedule(generateSchedule(displayedDaySessions.current, dayTimeContext.dayTime.time));
    });
  }, [dayTimeContext.dayTime, featureFlagContext.featureFlags.isPreviewApiEnabled]);

  return <ScheduleForDay schedule={schedule} />;
};

export const getStaticProps = async () => {
  const { sessions } = await getSessionsByDay(parseInt(dayDefaultValue), false);

  return {
    props: {
      sessions,
    },
    revalidate: 10,
  };
};

export default Schedule;
