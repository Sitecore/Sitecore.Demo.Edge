import { getSessions } from '../../api/queries/getSessions';
import { getRooms } from '../../api/queries/getRooms';
import { Session } from '../../interfaces';
import RoomDisplay from '../../components/RoomDisplay';

type RoomsProps = {
  sessions: Session[];
};

export declare type Params = {
  [param: string]: any;
};

export default function Rooms(props: RoomsProps) {
  return <RoomDisplay sessions={props.sessions} />;
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
export const getStaticProps = async ({ params }: Params) => {
  const { sessions } = await getSessions(params.id);

  return {
    props: {
      sessions: sessions,
    },
    revalidate: 10,
  };
};
