import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllSessionsByDay } from '../../api/queries/getSessions';
import ScheduleForDay from '../../components/ScheduleForDay';
import { ScheduleSlot } from '../../interfaces/schedule';
import { Session } from '../../interfaces/session';
import Screen from '../../components/Screen';
import ScheduleHeader from '../../components/ScheduleHeader';
import { getAllDays } from '../../api/queries/getDays';
import { Params } from '../../interfaces';
import { Day } from '../../interfaces/day';
import ScheduleDetails from '../../components/ScheduleDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

type ScheduleProps = {
  sessions: Session[];
  days: Day[];
  day: string;
};

export declare type ScheduleParams = {
  [param: string]: Params;
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
  const router = useRouter();
  const initialPageLoadDay = useRef(props.day);
  const [sessions, setSessions] = useState(props.sessions);

  function handleQuickRefreshClick() {
    const day = router.query.id?.toString() || '0';
    getAllSessionsByDay(day).then((data) => {
      setSessions(data.sessions);
    });
  }

  useEffect(() => {
    // Do not get the sessions if the day has not changed This means they come from the props.
    if (initialPageLoadDay.current !== router.query.id?.toString()) {
      const day = router.query.id?.toString() || '0';
      getAllSessionsByDay(day).then((data) => {
        setSessions(data.sessions);
      });
    }

    initialPageLoadDay.current = router.query.id?.toString() || '0';
  }, [router]);

  return (
    <>
      <div className="menu">
        <div className="menu-button refresh-button" onClick={handleQuickRefreshClick}>
          <FontAwesomeIcon className="icon" icon={faSyncAlt} />
        </div>
      </div>
      <Screen>
        <ScheduleHeader days={props.days} />
        <ScheduleForDay schedule={generateSchedule(sessions)} />
        <ScheduleDetails sessions={sessions} />
      </Screen>
    </>
  );
};

export async function getStaticPaths() {
  const { days } = await getAllDays();
  const paths = days.map((day) => ({
    params: { id: day.sortOrder.toString() },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }: ScheduleParams) => {
  const { sessions } = await getAllSessionsByDay(params.id);
  const { days } = await getAllDays();

  return {
    props: {
      sessions,
      days,
      day: params.id,
    },
    revalidate: 10,
  };
};

export default Schedule;
