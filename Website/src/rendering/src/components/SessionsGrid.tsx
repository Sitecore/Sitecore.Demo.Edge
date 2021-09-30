import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { faCalendar, faClock, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { getSessionTime } from '../helpers/DateHelper';

type Speaker = {
  name: string;
  role: Field<string>;
};

type Room = {
  name: string;
};

type Timeslot = {
  name: string;
};

type Day = {
  name: string;
};

type Session = {
  name: string;
  premium: Field<boolean>;
  image: { jsonValue: { value: { src: string } } };
  speakers: {
    targetItems: Speaker[];
  };
  rooms: {
    targetItems: Room[];
  };
  day: {
    targetItems: Day[];
  };
  timeslots: {
    targetItems: Timeslot[];
  };
};

type SessionsGridProps = ComponentProps & {
  fields: {
    data: {
      item: {
        children: {
          results: Session[];
        };
      };
    };
  };
};

const SessionsGrid = (props: SessionsGridProps): JSX.Element => (
  <div className="item-grid sessions-grid">
    <div className="grid-content">
      {props.fields.data.item.children.results &&
        props.fields.data.item.children.results.map((session, index) => (
          <Link key={index} href={'/sessions/' + session.name} passHref>
            <a className="grid-item">
              <div
                className="image-hover-zoom"
                style={{
                  backgroundImage: 'url(' + session.image.jsonValue.value.src + ')',
                  backgroundSize: 'cover',
                }}
              ></div>
              {session.premium?.value && (
                <div className="session-featured" title="Premium">
                  <FontAwesomeIcon className="icon-yellow" icon={faStar} />
                </div>
              )}
              <div className="item-details item-details-left">
                <div className="item-title">{session.name}</div>
                {session.day &&
                  session.day.targetItems.length > 0 &&
                  session.day.targetItems.map((day, index) => (
                    <p key={index}>
                      <span>
                        <FontAwesomeIcon className="icon" icon={faCalendar} />
                      </span>
                      <span>{day.name}</span>
                    </p>
                  ))}
                {session.timeslots.targetItems && session.timeslots.targetItems.length > 0 && (
                  <p>
                    <span>
                      <FontAwesomeIcon className="icon" icon={faClock} />
                    </span>
                    {getSessionTime(session.timeslots.targetItems)}
                  </p>
                )}
                {session.speakers &&
                  session.speakers.targetItems.map((speaker, index) => (
                    <p key={index}>
                      <span>
                        <FontAwesomeIcon className="icon" icon={faUser} />
                      </span>
                      <span className="speaker-name">{speaker.name}</span>
                      {speaker.role.value && (
                        <span>
                          {' | '}
                          <Text tag="span" field={speaker.role}></Text>
                        </span>
                      )}
                    </p>
                  ))}
              </div>
            </a>
          </Link>
        ))}
    </div>
  </div>
);

export type { Session, Speaker };
export default SessionsGrid;
