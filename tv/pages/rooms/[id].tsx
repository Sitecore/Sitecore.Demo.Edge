import { getSessionsByRoom } from '../../api/queries/getSessions';
import { getRooms } from '../../api/queries/getRooms';
import { Session } from '../../interfaces/session';
import { Params } from '../../interfaces';
import RoomDisplay from '../../components/RoomDisplay';

type RoomProps = {
  sessions: Session[];
};

export declare type RoomParams = {
  [param: string]: Params;
};

export default function RoomPage(props: RoomProps) {
  return (
    <>
      <div
        className="room-background"
        style={{
          backgroundImage: 'url(' + '/conference-hallway.jpg' + ')',
        }}
      ></div>
      <div id="container" className="absolute">
        <div id="monitor">
          <div id="monitorscreen">
            <RoomDisplay sessions={props.sessions} />
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
  const { sessions } = await getSessionsByRoom(params.id);

  return {
    props: {
      sessions: sessions,
    },
    revalidate: 10,
  };
};
