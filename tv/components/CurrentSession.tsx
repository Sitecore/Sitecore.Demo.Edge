import { Session } from '../interfaces';

type CurrentSessionProps = {
  session: Session;
};

const CurrentSession = (props: CurrentSessionProps): JSX.Element => {
  return (
    <div
      className="currentSession"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(/room-bg.jpg)`,
      }}
    >
      <div className="data">
        <p className="room" style={{ minWidth: '592px' }}>
          {props.session?.room}
        </p>
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
