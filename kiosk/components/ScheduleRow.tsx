import { Session } from '../interfaces/session';
import { logViewEvent } from '../services/CdpService';
import { contentHubImageSrcGeneratorFromString } from '../utilities/contentHubImageLoader';

type ScheduleRowProps = {
  sessions: Session[];
  timeslot: string;
};

const showDetail = (session: Session) => {
  document.getElementById(session.id)?.classList.add('active');

  // Log the session page view on CDP
  const sessionPage = `/sessions/${session.name}`;
  const additionalData = {
    premiumContent: !!session.isPremium,
  };
  logViewEvent(additionalData, sessionPage);
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
            onClick={() => showDetail(session)}
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
