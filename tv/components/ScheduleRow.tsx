import { Session } from '../interfaces/session';

type ScheduleRowProps = {
  sessions: Session[];
  timeslot: string;
};

const ScheduleRow = (props: ScheduleRowProps): JSX.Element => {
  return (
    <>
      <div className="schedule-time">{props.timeslot}</div>
      {props.sessions.map((session, index) => {
        const premiumClass = session.isPremium ? ' premium-session ' : '';
        const keynoteClass = session.type?.toLowerCase() == 'keynote' ? ' keynote-session ' : '';
        return (
          <div className={'schedule-sessions' + premiumClass + keynoteClass} key={index}>
            <div
              className={'session-image' + premiumClass + keynoteClass}
              style={{
                backgroundImage: `url(/room-bg.jpg)`,
              }}
            >
              {session.type && <div className="session-type">{session.type}</div>}
            </div>
            {/* uncomment when we able to get images back from content hub
            <Image
              loader={contentHubImageLoader}
              src={session?.image}
              layout="fill"
              objectFit="cover"
              alt={''}
            /> */}
            <div className="session-content">
              <div className="session-name">{session.name}</div>
              <div>{session.room}</div>
              {/* should we show speaker? 
              <div>{session.speaker}</div> */}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ScheduleRow;
