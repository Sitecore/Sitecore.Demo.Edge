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
          <li key={index}>
            <Link href={'/rooms/' + room.id}>
              <div className="room">
                <div className="box" style={{ backgroundColor: randomhsl() }}></div>
                {room.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
