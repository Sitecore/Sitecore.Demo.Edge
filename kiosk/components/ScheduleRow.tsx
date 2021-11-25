import { Session } from '../interfaces/session';
import { contentHubImageSrcGeneratorFromString } from '../utilities/contentHubImageLoader';

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
        const keynoteClass = session.type?.toLowerCase() === 'keynote' ? ' keynote-session ' : '';
        const noSpeakerClass = session.speaker ? '' : ' no-speaker';

        return (
          <div
            className={'schedule-sessions' + premiumClass + keynoteClass + noSpeakerClass}
            key={index}
          >
            <div
              className={'session-image' + premiumClass + keynoteClass}
              style={{
                backgroundImage: `url("${contentHubImageSrcGeneratorFromString(session.image)}")`,
              }}
            >
              {session.type && <div className="session-type">{session.type}</div>}
            </div>
            <div className="session-content">
              <div className="session-name">{session.name}</div>
              <div>{session.room}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ScheduleRow;
