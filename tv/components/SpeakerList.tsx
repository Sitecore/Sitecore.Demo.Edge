import { Speaker } from '../interfaces';
import Link from 'next/link';
import { randomHSL } from '../utilities/randomHSL';

type SpeakerListProps = {
  speakers: Speaker[];
};

export declare type Params = {
  [param: string]: any;
};

const RoomList = (props: SpeakerListProps): JSX.Element => {
  return (
    <div className="roomList">
      <ul>
        {props.speakers.map((room, index) => (
          <li key={index} className="room">
            <div className="box" style={{ backgroundColor: randomHSL() }}></div>
            <Link href={'/speakers/' + room.id}>{room.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
