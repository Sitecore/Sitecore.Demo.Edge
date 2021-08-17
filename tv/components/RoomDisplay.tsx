import { Session } from '../interfaces';
import SessionList from '../components/SessionList';
import CurrentSession from '../components/CurrentSession';

type RoomProps = {
  sessions: Session[];
};

const RoomDisplay = (props: RoomProps): JSX.Element => {
  return (
    <div className="roomDisplay">
      <div className="current">
        <CurrentSession session={props.sessions[0]} />
      </div>
      <div className="scheduled">
        <div className="wrapper">
          <h1 className="currentTime">08:00AM</h1>
          <h1 className="date">Today</h1>

          <SessionList sessions={props.sessions} />
        </div>
      </div>
    </div>
  );
};

export default RoomDisplay;
