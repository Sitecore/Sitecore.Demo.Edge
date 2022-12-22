import Link from 'next/link';
import { Session } from '../interfaces/session';
import { contentHubImageSrcGeneratorFromString } from '../utilities/contentHubImageLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faClock,
  faDoorOpen,
  faTag,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

type ScheduleDetailsProps = {
  sessions: Session[];
};

const closeShowDetail = (sessionId: string) => {
  document.getElementById(sessionId)?.classList.remove('active');
};

const ScheduleDetails = (props: ScheduleDetailsProps): JSX.Element => (
  <>
    {props.sessions.map((session, index) => {
      return (
        <div key={index} id={session.id} className="session-detail">
          <div
            className="session-close-detail from-center"
            onClick={() => closeShowDetail(session.id)}
          >
            <span>
              <FontAwesomeIcon className="icon" icon={faTimes} />
            </span>
          </div>
          <div
            className="session-detail-image"
            style={{
              backgroundImage: `url("${contentHubImageSrcGeneratorFromString(session.image)}")`,
            }}
          >
            {session.isPremium && (
              <div className="session-detail-meta">
                <div>
                  <span>
                    <FontAwesomeIcon className="icon" icon={faTag} />
                  </span>
                  VIP tickets only
                </div>
              </div>
            )}
          </div>
          <div className="section-detail-content">
            <h2 className="session-name">{session.name}</h2>
            <div className="session-meta">
              <div>
                {session.Day && (
                  <span>
                    <FontAwesomeIcon className="icon" icon={faCalendar} />
                    {session.Day}
                  </span>
                )}
              </div>
              <div>
                {session.timeslot && (
                  <span>
                    <FontAwesomeIcon className="icon" icon={faClock} />
                    {session.timeslot}
                  </span>
                )}
              </div>
              <div>
                {session.room && (
                  <span>
                    <FontAwesomeIcon className="icon" icon={faDoorOpen} />
                    {session.room}
                  </span>
                )}
              </div>
              <div>
                {session.speaker && (
                  <span>
                    <FontAwesomeIcon className="icon" icon={faUser} />
                    {session.speaker}
                  </span>
                )}
              </div>
            </div>
            <div className="btn__area--minimal w-full">
              <Link
                href="/tickets"
                className="btn--main btn--main--round btn--main--primary btn--main--big btn-right block text-center"
              >
                Book tickets
              </Link>
            </div>
            <div
              className="session-description"
              contentEditable="false"
              dangerouslySetInnerHTML={{ __html: session.description }}
            ></div>
          </div>
        </div>
      );
    })}
  </>
);

export default ScheduleDetails;
