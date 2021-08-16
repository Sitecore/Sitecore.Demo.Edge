import { Session } from '../interfaces';
import Room from '../pages/rooms/[id]';

type CurrentSessionProps = {
  session: Session;
};

const CurrentSession = (props: CurrentSessionProps): JSX.Element => {
  return (
    <div
      className="w-full h-full pt-10"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(/room-bg.jpg)`,
      }}
    >
      <div className="m-auto p-6">
        <p className="font-semibold py-3 uppercase text-yellow-400" style={{ minWidth: '592px' }}>
          {props.session.room}
        </p>
        <h1 className="text-4xl uppercase text-white">{props.session.name}</h1>
        <p className="text-2xl py-3 font-semibold uppercase text-yellow-400">
          {props.session.timeslot}
        </p>
        <div
          className="text-white pt-2"
          dangerouslySetInnerHTML={{ __html: props.session.description }}
        ></div>
      </div>
    </div>
  );
};

export default CurrentSession;
