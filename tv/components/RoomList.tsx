/* eslint-disable @next/next/no-img-element */
import { Room } from '../interfaces/room';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getRooms } from '../api/queries/getRooms/index';

type RoomListProps = {
  rooms: Room[];
};

const RoomList = (props: RoomListProps): JSX.Element => {
  return (
    <div className="roomList">
      <Link href={'/rooms/' + props.rooms[0].id} passHref>
        <img className="tv-one" src="../public/tv-mock.png" alt="" />
      </Link>
      <Link href={'/rooms/' + props.rooms[1].id} passHref>
        <img className="tv-two" src="../public/tv-mock.png" alt="" />
      </Link>
    </div>
  );
};

export default RoomList;
export const getStaticProps: GetStaticProps = async () => {
  const { rooms } = await getRooms();
  return {
    props: {
      rooms: rooms,
    },
    revalidate: 10,
  };
};
