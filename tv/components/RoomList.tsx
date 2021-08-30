import { Room } from '../interfaces/room';
import Link from 'next/link';
import { randomhsl } from '../utilities/randomHSL';

type RoomListProps = {
  rooms: Room[];
};

const RoomList = (props: RoomListProps): JSX.Element => {
  return (
    <div className="roomList">
      <ul>
        {props.rooms.map((room, index) => (
          <li key={index} className="room">
            <div className="box" style={{ backgroundColor: randomhsl() }}></div>
            <Link href={'/rooms/' + room.id}>{room.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
