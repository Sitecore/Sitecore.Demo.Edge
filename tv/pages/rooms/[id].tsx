import { useContext, useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { getSessionsByRoom } from '../../api/queries/getSessions';
import { getRooms } from '../../api/queries/getRooms';
import { Session } from '../../interfaces/session';
import { Params } from '../../interfaces';
import RoomDisplay from '../../components/RoomDisplay';
import { dayDefaultValue, DayTimeContext } from '../../contexts/DayTimeContext';
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
  currentSession: Session | null;
  nextSession: Session | null;
};

function getSessionsToDisplay(allSessions: Session[]): SessionsState {
  const currentSession: Session = allSessions[0];
  const nextSession: Session = allSessions[1];

  return {
    currentSession,
    nextSession,
  };
}

export default function RoomPage(props: RoomProps) {
  const router = useRouter();
  const initialPageLoad = useRef(true);
  const dayTimeContext = useContext(DayTimeContext);
  const [sessions, setSessions] = useState(getSessionsToDisplay(props.sessions));
  useEffect(() => {
    // Do not get the sessions on first page load as they come from the props.
    if (!initialPageLoad.current) {
      getSessionsByRoom(props.roomId, parseInt(dayTimeContext.dayTime.day)).then((data) => {
        setSessions(getSessionsToDisplay(data.sessions));
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
  const { sessions, room } = await getSessionsByRoom(params.id, parseInt(dayDefaultValue));

  return {
    props: {
      roomId: params.id,
      room: room,
      sessions: sessions,
    },
    revalidate: 10,
  };
};
