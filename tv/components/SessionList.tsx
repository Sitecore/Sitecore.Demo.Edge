import { Session } from '../interfaces';

type SessionListProps = {
  sessions: Session[];
};

const SessionList = (props: SessionListProps): JSX.Element => {
  return (
    <div className="sessionList">
      <span className="heading">Wednesday, Mar 8</span>

      {props.sessions.map((name, index) => (
        <div key={index} className="session">
          <div className="time">
            <span>10:00am - 11:00am</span>
          </div>
          <div className="icon">
            <span></span>
          </div>
          <div className="data">
            <span className="title">{name.name}</span>
            <span className="text-sm">{name.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionList;
