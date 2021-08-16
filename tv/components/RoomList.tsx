import { Room } from '../interfaces';
import Link from 'next/link';

type RoomListProps = {
  rooms: Room[];
};

export declare type Params = {
  [param: string]: any;
};

function randomHSL() {
  return 'hsla(' + ~~(360 * Math.random()) + ',' + '70%,' + '80%,1)';
}

const RoomList = (props: RoomListProps): JSX.Element => {
  return (
    <div className="bg-white p-10" style={{ minWidth: '1184px', minHeight: '582px' }}>
      <ul className="w-full grid grid-cols-2 gap-4">
        {props.rooms.map((room, index) => (
          <li
            key={index}
            className="mb-5 flex justify-start items-center bg-white shadow-lg rounded-lg text-left w-3/4"
          >
            <div
              className="float-left h-20 w-20 clear-both mr-5"
              style={{ backgroundColor: randomHSL() }}
            ></div>
            <Link href={'/rooms/' + room.id}>{room.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
