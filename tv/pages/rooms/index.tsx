import { getRooms } from '../../api/queries/getRooms';
import { Room } from '../../interfaces';
import RoomList from '../../components/RoomList';

type RoomProps = {
  rooms: Room[];
  preview: boolean;
};

export declare type Params = {
  [param: string]: any;
};

const Rooms = (props: RoomProps): JSX.Element => {
  return <RoomList rooms={props.rooms} />;
};

// This also gets called at build time
export const getStaticProps = async ({ params }: Params) => {
  const { rooms } = await getRooms(false);

  return {
    props: {
      rooms: rooms,
    },
    revalidate: 10,
  };
};

export default Rooms;
