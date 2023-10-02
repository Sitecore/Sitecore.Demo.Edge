import { useContext, useEffect, useRef, useState } from 'react';
import Router, { NextRouter, useRouter } from 'next/router';
import { getSessionsByRoom } from '../../api/queries/getSessions';
import { getRooms } from '../../api/queries/getRooms';
import { Session } from '../../interfaces/session';
import { Params } from '../../interfaces';
import RoomDisplay from '../../components/RoomDisplay';
import { dayDefaultValue, DayTimeContext, DayTimeState } from '../../contexts/DayTimeContext';
import { Room } from '../../interfaces/room';

type RoomProps = {
  roomId: string;
  room: Room;
  sessions: Session[];
};

export declare type RoomParams = {
  [param: string]: Params;
};

type SessionsState = {
  room: string;
  currentSession: Session | null;
  nextSession: Session | null;
};

function getSessionsToDisplay(
  allSessions: Session[],
  dayTime: DayTimeState,
  router: NextRouter,
  room: string
): SessionsState {
  let selectedDay = `Day ${parseInt(dayTime.day) + 1}`;
  let selectedTime = parseInt(dayTime.time);

  if (router.query['d'] && router.query['t']) {
    selectedDay = `Day ${parseInt(router.query['d'] as string) + 1}`;
    selectedTime = parseInt(router.query['t'] as string);
  }

  const currentAndNextSessions = allSessions.filter(
    (session) => session.day === selectedDay && session.sortOrder >= selectedTime
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
    room,
    currentSession,
    nextSession,
  };
}

const RoomPage = (props: RoomProps) => {
  const router = useRouter();
  const dayTimeContext = useContext(DayTimeContext);

  // Added useRef to allow use of dayTimeContextRef as a dependency in useEffect (required by linting rules)
  const dayTimeContextRef = useRef(dayTimeContext);

  const [sessions, setSessions] = useState(
    getSessionsToDisplay(props.sessions, dayTimeContext.dayTime, router, props.room.name)
  );
  useEffect(() => {
    dayTimeContextRef.current.showLoading();
    getSessionsByRoom(props.roomId, parseInt(dayTimeContext.dayTime.day)).then((data) => {
      setSessions(
        getSessionsToDisplay(data.sessions, dayTimeContext.dayTime, router, props.room.name)
      );
      dayTimeContextRef.current.hideLoading();
    });
  }, [props.roomId, dayTimeContext.dayTime, dayTimeContextRef, router, props.room.name]);

  return (
    <>
      <div
        className="room-background"
        style={{
          backgroundImage: 'url(' + '/conference-hallway.jpg' + ')',
        }}
        onClick={() => Router.back()}
      >
        <div className="hall-title">{props.room.venue.name}</div>
      </div>
      <div id="container" className="absolute">
        <div id="monitor">
          <div id="monitorscreen">
            <RoomDisplay {...sessions} />
          </div>
        </div>
      </div>
    </>
  );
};

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
  const { sessions, room } = await getSessionsByRoom(params.id, parseInt(dayDefaultValue));

  // if (typeof window !== 'undefined') {
  //   document.querySelectorAll('.menu-button,.refresh-button')[0].classList.remove('active');
  // }

  return {
    props: {
      roomId: params.id,
      room: room,
      sessions: sessions,
    },
    revalidate: 10,
  };
};

export default RoomPage;
