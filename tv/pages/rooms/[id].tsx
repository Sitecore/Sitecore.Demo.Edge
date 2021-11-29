import { useContext, useEffect, useRef, useState } from 'react';
import Router, { NextRouter, useRouter } from 'next/router';
import { getSessionsByRoom } from '../../api/queries/getSessions';
import { getRooms } from '../../api/queries/getRooms';
import { Session } from '../../interfaces/session';
import { Params } from '../../interfaces';
import RoomDisplay from '../../components/RoomDisplay';
import { DayTimeContext, DayTimeState } from '../../contexts/DayTimeContext';

type RoomProps = {
  roomId: string;
  sessions: Session[];
};

export declare type RoomParams = {
  [param: string]: Params;
};

type SessionsState = {
  currentSession: Session | null;
  nextSession: Session | null;
};

function getSessionsToDisplay(
  allSessions: Session[],
  dayTime: DayTimeState,
  router: NextRouter
): SessionsState {
  let selectedDay = `Day ${parseInt(dayTime.day) + 1}`;
  let selectedTime = parseInt(dayTime.time);

  if (router.query['d'] && router.query['t']) {
    selectedDay = `Day ${parseInt(router.query['d'] as string) + 1}`;
    selectedTime = parseInt(router.query['t'] as string);
  }

  const currentAndNextSessions = allSessions.filter(
    (session) => session.Day === selectedDay && session.sortOrder >= selectedTime
  );
  let currentSession: Session | null = null;
  let nextSession: Session | null = null;

  if (currentAndNextSessions.length > 0) {
    const firstSession = currentAndNextSessions[0];

    if (firstSession.sortOrder === selectedTime) {
      currentSession = firstSession;

      if (currentAndNextSessions.length > 1) {
        nextSession = currentAndNextSessions[1];
      }
    } else {
      nextSession = firstSession;
    }
  }

  return {
    currentSession,
    nextSession,
  };
}

export default function RoomPage(props: RoomProps) {
  const router = useRouter();
  const initialPageLoad = useRef(true);
  const dayTimeContext = useContext(DayTimeContext);
  const [sessions, setSessions] = useState(
    getSessionsToDisplay(props.sessions, dayTimeContext.dayTime, router)
  );

  useEffect(() => {
    // Do not get the sessions on first page load as they come from the props.
    if (!initialPageLoad.current) {
      getSessionsByRoom(props.roomId).then((data) => {
        setSessions(getSessionsToDisplay(data.sessions, dayTimeContext.dayTime, router));
      });
    }

    initialPageLoad.current = false;
  }, [props.roomId, dayTimeContext.dayTime, router]);

  return (
    <>
      <div
        className="room-background"
        style={{
          backgroundImage: 'url(' + '/conference-hallway.jpg' + ')',
        }}
        onClick={() => Router.back()}
      ></div>
      <div id="container" className="absolute">
        <div id="monitor">
          <div id="monitorscreen">
            <RoomDisplay {...sessions} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 text-black-light">
        <span className="text-xl">🛈</span> Click anywhere outside the TV to go back to the previous
        screen
      </div>
    </>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get rooms
  const { rooms } = await getRooms();

  // Get the paths we want to pre-render based on rooms
  const paths = rooms.map((room) => ({
    params: { id: room.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export const getStaticProps = async ({ params }: RoomParams) => {
  const { sessions } = await getSessionsByRoom(params.id);

  return {
    props: {
      roomId: params.id,
      sessions: sessions,
    },
    revalidate: 10,
  };
};
