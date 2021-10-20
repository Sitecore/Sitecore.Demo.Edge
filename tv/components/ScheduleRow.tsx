import { Session } from '../interfaces/session';
import { contentHubImageLoader } from '../utilities/contentHubImageLoader';
import Image from 'next/image';

type ScheduleRowProps = {
  sessions: Session[];
  timeslot: string;
};

const ScheduleRow = (props: ScheduleRowProps): JSX.Element => {
  console.table(props);
  return (
    <div className="schedule-row">
      <div className="schedule-time">{props.timeslot}</div>
      {props.sessions.map((session, index) => {
        const premiumClass = session.isPremium ? ' premium-session ' : '';
        const keynoteClass = session.type?.toLowerCase() == 'keynote' ? ' keynote-session ' : '';
        return (
          <div className={'schedule-sessions' + premiumClass + keynoteClass} key={index}>
            <Image
              loader={contentHubImageLoader}
              src={session?.image}
              layout="fill"
              objectFit="cover"
              alt={''}
            />
            <div className="session-name">{session.name}</div>
            <div>{session.room}</div>
            <div>{session.speaker}</div>

            {session.type && <div className="session-type">{session.type}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleRow;
