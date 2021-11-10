import Link from 'next/link';
import React from 'react';
import { Session } from '../interfaces/session';
import { contentHubImageSrcGenerator } from '../utilities/contentHubImageLoader';

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
          <Link key={index} href={'/rooms/' + session.roomId} passHref>
            <div className={'schedule-sessions' + premiumClass + keynoteClass + noSpeakerClass}>
              <div
                className={'session-image' + premiumClass + keynoteClass}
                style={{
                  backgroundImage: `url("${contentHubImageSrcGenerator(session.image)}")`,
                }}
              >
                {session.type && <div className="session-type">{session.type}</div>}
              </div>
              <div className="session-content">
                <div className="session-name">{session.name}</div>
                <div>{session.room}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default ScheduleRow;
