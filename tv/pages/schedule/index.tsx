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
  return <ScheduleForDay days={props.days} schedule={props.schedule} day={'1'} />;
};

export const getStaticProps = async () => {
  const { sessions } = await getAllSessionsByDay('1');
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
