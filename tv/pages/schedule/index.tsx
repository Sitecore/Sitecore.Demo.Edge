import { Day, ScheduleSlot } from '../../interfaces/session';
import { GetAllDays, getAllSessionsByDay } from '../../api/queries/getSessions';
import { groupBy, SplitArray } from '../../utilities/arrayUtilities';
import React from 'react';
import ScheduleForDay from '../../components/ScheduleForDay';

type ScheduleProps = {
  day: string;
  days: Day[];
  schedule: ScheduleSlot[][];
};

const Schedule = (props: ScheduleProps): JSX.Element => {
  return <ScheduleForDay days={props.days} schedule={props.schedule} day={'0'} />;
};

// This also gets called at build time
export const getStaticProps = async () => {
  const { sessions } = await getAllSessionsByDay('0');
  const { days } = await GetAllDays();
  return {
    props: {
      days: days,
      schedule: SplitArray(groupBy(sessions), 3),
      day: '1',
    },
    revalidate: 10,
  };
};

export default Schedule;
