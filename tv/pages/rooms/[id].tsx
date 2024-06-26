import { useContext, useEffect, useRef, useState } from 'react';
import Router, { NextRouter, useRouter } from 'next/router';
import { getSessionsByRoom } from '../../api/queries/getSessions';
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
  // Return empty paths because we don't want to generate anything on build
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return {
    paths: [],
    fallback: 'blocking',
  };
}

// This also gets called at build time
export const getStaticProps = async ({ params }: RoomParams) => {
  const { sessions, room } = await getSessionsByRoom(params?.id, parseInt(dayDefaultValue));
  if (!room?.id) {
    return {
      props: {
        sessions: [],
        room: {
          id: '',
          name: '',
          venue: {
            name: '',
          },
        },
        roomId: params?.id,
      },
      revalidate: 10,
    };
  }

  return {
    props: {
      sessions,
      room: room ?? null,
      roomId: params?.id ?? null,
    },
    revalidate: 10,
  };
};

export default RoomPage;
