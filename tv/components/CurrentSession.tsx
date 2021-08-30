import { Session } from '../interfaces/session';

type CurrentSessionProps = {
  session: Session;
};

const CurrentSession = (props: CurrentSessionProps): JSX.Element => {
  return (
    <div
      className="currentSession"
      style={{
        backgroundImage: `url(/room-bg.jpg)`,
      }}
    >
      <div className="data">
        <p className="room">{props.session?.room}</p>
        <h1 className="title">{props.session?.name}</h1>
        <p className="timeSlot">{props.session?.timeslot}</p>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: props.session?.description }}
        ></div>
      </div>
    </div>
  );
};

export default CurrentSession;
