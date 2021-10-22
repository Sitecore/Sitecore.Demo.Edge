import { Session } from '../interfaces/session';

type SessionListProps = {
  sessions: Session[];
};

const SessionList = (props: SessionListProps): JSX.Element => {
  return (
    <div className="sessionList">
      <span className="heading">Wednesday, Mar 8</span>

      {props.sessions.map((session, index) => (
        <div key={index} className="session">
          <div className="time">
            <span>{session.timeslot}</span>
          </div>
          <div className="icon">
            <span></span>
          </div>
          <div className="data">
            <span className="title">{session.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionList;
