import { Session } from '../interfaces/session';
import { contentHubImageSrcGeneratorFromString } from '../utilities/contentHubImageLoader';

type ScheduleRowProps = {
  sessions: Session[];
  timeslot: string;
};

const showDetail = (sessionId: string) => {
  document.getElementById(sessionId)?.classList.add('active');
};

const ScheduleRow = (props: ScheduleRowProps): JSX.Element => {
  return (
    <>
      <div className="schedule-time">{props.timeslot}</div>
      {props.sessions.map((session, index) => {
        const premiumClass = session.isPremium ? ' premium-session ' : '';
        const isKeynoteSession = session.type?.toLowerCase() === 'keynote';
        const keynoteClass = isKeynoteSession ? ' keynote-session ' : '';
        const noSpeakerClass = session.speaker ? '' : ' no-speaker ';

        return (
          <div
            onClick={() => showDetail(session.id)}
            className={'schedule-sessions' + premiumClass + keynoteClass + noSpeakerClass}
            key={index}
          >
            <div
              className={'session-image' + premiumClass + keynoteClass}
              style={{
                backgroundImage: `url("${contentHubImageSrcGeneratorFromString(session.image)}")`,
              }}
            >
              {session.isPremium && <div className="session-type">Premium</div>}
              {isKeynoteSession && <div className="session-type">Keynote</div>}
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
