import { GetAllDays, getAllSessionsByDay } from '../../api/queries/getSessions';
import { Day, ScheduleSlot, Session } from '../../interfaces/session';
import { Params } from '../../interfaces';
import { groupBy, SplitArray } from '../../utilities/arrayUtilities';
import React, { useEffect } from 'react';
import ScheduleForDay from '../../components/ScheduleForDay';
import { getQueryStringValue } from '../../utilities/queryString';

type ScheduleProps = {
  day: string;
  days: Day[];
  schedule: ScheduleSlot[][];
};

export declare type ScheduleParams = {
  [param: string]: Params;
};

export default function SchedulePage(props: ScheduleProps) {
  return <ScheduleForDay days={props.days} schedule={props.schedule} day={props.day} />;
}

export function GetDay(): Session[] {
  useEffect(() => {
    async function fetchData() {
      console.log(window.location);
      const day = getQueryStringValue('day') as string;
      console.log('day => ' + day);
      if (day) {
        const { sessions } = await getAllSessionsByDay(day);
        console.table(sessions);
        return sessions;
      }
    }
    fetchData();
  });
  return [];
}
[];

export async function getStaticPaths() {
  const { days } = await GetAllDays();

  const paths = days.map((day) => ({
    params: { id: day.sortOrder.toString() },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }: ScheduleParams) => {
  const { sessions } = await getAllSessionsByDay(params.id);
  const { days } = await GetAllDays();

  return {
    props: {
      days: days,
      schedule: SplitArray(groupBy(sessions), 3),
      day: params.id,
    },
    revalidate: 10,
  };
};
