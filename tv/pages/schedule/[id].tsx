import { getAllSessionsByDay } from '../../api/queries/getSessions';
import { getAllDays } from '../../api/queries/getDays';
import { Day } from '../../interfaces/day';
import { ScheduleSlot } from '../../interfaces/schedule';
import { Session } from '../../interfaces/session';
import { Params } from '../../interfaces';
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
  return <ScheduleForDay {...props} />;
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get days
  const { days } = await getAllDays();

  // Get the paths we want to pre-render based on days
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
  const { days } = await getAllDays();

  return {
    props: {
      days: days,
      schedule: splitArray(groupBy(sessions), 3),
      day: params.id,
    },
    revalidate: 10,
  };
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
