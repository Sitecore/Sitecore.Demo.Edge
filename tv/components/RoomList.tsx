/* eslint-disable @next/next/no-img-element */
import { Room } from '../interfaces/room';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getRooms } from '../api/queries/getRooms/index';

type RoomListProps = {
  rooms: Room[];
};

const RoomList = (props: RoomListProps): JSX.Element => {
  console.log(props);
  return (
    <div className="roomList">
      <Link href="/rooms/1" passHref>
        <img className="tv-one" src="../public/tv-mock.png" alt="" />
      </Link>
      <Link href="/rooms/1" passHref>
        <img className="tv-two" src="../public/tv-mock.png" alt="" />
      </Link>

      {/* <ul>
        {props.rooms.map((room, index) => (
          <li key={index}>
            <Link href={'/rooms/' + room.id} passHref>
              <div className="room">
                <div className="box" style={{ backgroundColor: randomhsl() }}></div>
                {room.name}
              </div>
            </Link>
          </li>
        ))}
      </ul> */}
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
