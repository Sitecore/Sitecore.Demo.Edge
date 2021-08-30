import { getRooms } from '../../api/queries/getRooms';
import { Room } from '../../interfaces/room';
import RoomList from '../../components/RoomList';

type RoomProps = {
  rooms: Room[];
};

const Rooms = (props: RoomProps): JSX.Element => {
  return <RoomList rooms={props.rooms} />;
};

// This also gets called at build time
export const getStaticProps = async () => {
  const { rooms } = await getRooms();

  return {
    props: {
      rooms: rooms,
    },
    revalidate: 10,
  };
};

export default Rooms;
