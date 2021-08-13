import { Session } from '../interfaces';

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
        <p className="font-semibold py-3 uppercase text-yellow-400" style={{ minWidth: '592px' }}>Conference Room</p>
        <h1 className="text-4xl uppercase text-white">{props.session.name}</h1>
        <p className="text-2xl py-3 font-semibold uppercase text-yellow-400">10:00am-11:00am</p>
        <p className="text-white pt-2">{props.session.description}</p>
      </div>
    </div>
  );
};

export default CurrentSession;
