import { GetAllDays, getAllSessionsByDay } from '../../api/queries/getSessions';
import { Day, ScheduleSlot } from '../../interfaces/session';
import { Params } from '../../interfaces';
import { groupBy, SplitArray } from '../../utilities/arrayUtilities';
import React from 'react';
import ScheduleForDay from '../../components/ScheduleForDay';

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

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get rooms
  const { days } = await GetAllDays();

  // Get the paths we want to pre-render based on rooms
  const paths = days.map((day) => ({
    params: { id: day.sortOrder.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
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
