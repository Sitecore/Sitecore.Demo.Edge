import { useContext, useEffect, useState } from 'react';
import Router, { NextRouter, useRouter } from 'next/router';
import { getSessionsByRoom } from '../../api/queries/getSessions';
import { Session } from '../../interfaces/session';
import { Params } from '../../interfaces';
import RoomDisplay from '../../components/RoomDisplay';
import { dayDefaultValue, DayTimeContext, DayTimeState } from '../../contexts/DayTimeContext';

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
    room,
    currentSession,
    nextSession,
  };
}

export default function RoomPage() {
  const router = useRouter();
  const { id } = router.query;
  const [sessions, setSessions] = useState({});
  const [room, setRoom] = useState({});
  const dayTimeContext = useContext(DayTimeContext);

  useEffect(() => {
    if (id == undefined) return;

    async function fetchMyAPI() {
      const { sessions, room } = await getSessionsByRoom(id, parseInt(dayDefaultValue), false);
      setRoom(room);
      setSessions(getSessionsToDisplay(sessions, dayTimeContext.dayTime, router, room.name));
    }

    fetchMyAPI();
  }, [id, dayTimeContext.dayTime, router]);

  return (
    <>
      <div
        className="room-background"
        style={{
          backgroundImage: 'url(' + '/conference-hallway.jpg' + ')',
        }}
        onClick={() => Router.back()}
      >
        <div className="hall-title">{room?.venue?.name}</div>
      </div>
      <div id="container" className="absolute">
        <div id="monitor">
          <div id="monitorscreen">{<RoomDisplay {...sessions} />}</div>
        </div>
      </div>
    </>
  );
}
