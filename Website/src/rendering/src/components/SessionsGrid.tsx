import { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Text, Field, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { faCalendar, faClock, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { getSessionTime } from '../helpers/DateHelper';
import { Timeslot } from '../interfaces/Timeslot';

type Speaker = {
  name: Field<string>;
  role: Field<string>;
};

type Day = {
  name: Field<string>;
};

type Session = {
  // Purposefully using the Sitecore item name instead of the url.path to build the link URLs as the url.path is invalid when the item name contains an hyphen
  itemName: string;
  name: Field<string>;
  premium: Field<boolean>;
  image: {
    jsonValue: ImageField;
  };
  speakers: {
    targetItems: Speaker[];
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

const SessionsGrid = (props: SessionsGridProps): JSX.Element => {
  const getImageStyles = (session: Session): CSSProperties =>
    session?.image?.jsonValue?.value?.src
      ? {
          backgroundImage: `url(${session.image.jsonValue.value.src})`,
        }
      : {};

  return (
    <div className="item-grid sessions-grid">
      <div className="grid-content">
        {props.fields.data?.item?.children?.results &&
          props.fields.data.item.children.results.map((session, index) => (
            <Link key={index} href={`/sessions/${session.itemName}`} passHref>
              <a className="grid-item">
                <div className="image-hover-zoom" style={getImageStyles(session)}></div>
                {session.premium?.value && (
                  <div className="session-featured" title="Premium">
                    <FontAwesomeIcon className="icon-yellow" icon={faStar} />
                  </div>
                )}
                <div className="item-details item-details-left">
                  <div className="item-title">{session.name.value}</div>
                  {session.day?.targetItems &&
                    session.day.targetItems.length > 0 &&
                    session.day.targetItems.map((day, index) => (
                      <p key={index}>
                        <span>
                          <FontAwesomeIcon className="icon" icon={faCalendar} />
                        </span>
                        <Text tag="span" field={day.name}></Text>
                      </p>
                    ))}
                  {session.timeslots?.targetItems && session.timeslots.targetItems.length > 0 && (
                    <p>
                      <span>
                        <FontAwesomeIcon className="icon" icon={faClock} />
                      </span>
                      {getSessionTime(session.timeslots.targetItems)}
                    </p>
                  )}
                  {session.speakers?.targetItems &&
                    session.speakers.targetItems.map((speaker, index) => (
                      <p key={index}>
                        <span>
                          <FontAwesomeIcon className="icon" icon={faUser} />
                        </span>
                        <Text tag="span" className="speaker-name" field={speaker.name}></Text>
                        {speaker.role?.value && (
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
};

export type { Session, Speaker };
export default SessionsGrid;
