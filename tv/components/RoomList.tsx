import { Room } from '../interfaces';
import Link from 'next/link';
import { randomHSL } from '../utilities/randomHSL';

type RoomListProps = {
  rooms: Room[];
};

export declare type Params = {
  [param: string]: any;
};

const RoomList = (props: RoomListProps): JSX.Element => {
  return (
    <div className="roomList">
      <ul>
        {props.rooms.map((room, index) => (
          <li key={index} className="room">
            <div className="box" style={{ backgroundColor: randomHSL() }}></div>
            <Link href={'/rooms/' + room.id}>{room.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
