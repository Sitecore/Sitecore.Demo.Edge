import { Session } from '../interfaces';
import SessionList from '../components/SessionList';
import CurrentSession from '../components/CurrentSession';

type RoomProps = {
  sessions: Session[];
};

const RoomDisplay = (props: RoomProps): JSX.Element => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="relative">
        <CurrentSession session={props.sessions[0]} />
      </div>
      <div className="bg-gray-100 p-10">
        <div className="mb-auto mt-auto max-w-lg">
          <h1 className="text-6xl uppercase pb-10 text-center">10:02AM</h1>
          <h1 className="text-xl uppercase">Today</h1>

          <SessionList sessions={props.sessions} />
        </div>
      </div>
    </div>
  );
};

export default RoomDisplay;
