import { Session } from '../interfaces/session';
import { contentHubImageSrcGeneratorFromString } from '../utilities/contentHubImageLoader';

type ScheduleRowProps = {
  sessions: Session[];
  timeslot: string;
};

const showDetail = (sessionId: string) => {
  console.log('button clicked ==================> ' + sessionId);
  document.getElementById(sessionId)?.classList.add('active');
};

const ScheduleRow = (props: ScheduleRowProps): JSX.Element => {
  return (
    <>
      <div className="schedule-time">{props.timeslot}</div>
      {props.sessions.map((session, index) => {
        const premiumClass = session.isPremium ? ' premium-session ' : '';
        const isKeynoteSession = session.type?.toLowerCase() === 'keynote';
        const keynoteClass = session.type?.toLowerCase() === 'keynote' ? ' keynote-session ' : '';
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

            <div
              id={session.id}
              className={
                'hidden absolute left-0 right-0 -top-24 bottom-0 w-full h-full z-50 bg-red session-detail' +
                premiumClass +
                keynoteClass +
                noSpeakerClass
              }
            >
              <div className="session-close-detail top-0 right-0 w-14 h-14 absolute">X</div>
              <div
                className={
                  'session-detail-image w-full h-1/2 bg-cover bg-no-repeat bg-center' +
                  premiumClass +
                  keynoteClass
                }
                style={{
                  backgroundImage: `url("${contentHubImageSrcGeneratorFromString(session.image)}")`,
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ScheduleRow;
