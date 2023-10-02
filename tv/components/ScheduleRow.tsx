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
      <div className="w-full flex-row flex gap-4 p-4">
        {props.sessions.map((session, index) => {
          const premiumClass = session.isPremium ? ' premium-session ' : '';
          const keynoteClass = session.type?.toLowerCase() === 'keynote' ? ' keynote-session ' : '';
          const noSpeakerClass = session.speaker ? '' : ' no-speaker';

          return (
            <Link
              key={index}
              href={
                '/rooms/' + session.roomId + '?d=' + session.shortDay + '&t=' + session.sortOrder
              }
              passHref
            >
              <div
                className={
                  'schedule-sessions show-image ' + premiumClass + keynoteClass + noSpeakerClass
                }
              >
                <div
                  className={'session-image' + premiumClass + keynoteClass}
                  style={{
                    backgroundImage: `url("${contentHubImageSrcGenerator(session.image)}")`,
                  }}
                >
                  {(session.type === 'Keynote' ||
                    session.type === 'Workshop' ||
                    session.isPremium) && (
                    <div className="session-type">
                      {(session.type === 'Keynote' || session.type === 'Workshop') && session.type}
                      {session.isPremium && <div>Premium</div>}
                    </div>
                  )}
                </div>
                <div className="session-content">
                  <div className="session-name">{session.name}</div>
                  <div>{session.room}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ScheduleRow;
