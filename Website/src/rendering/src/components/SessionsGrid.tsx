import { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { faCalendar, faClock, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { getSessionTime } from '../helpers/DateHelper';
import { CustomSession } from 'src/types/session';

type SessionsGridProps = ComponentProps & {
  fields: {
    data: {
      item: {
        children: {
          results: CustomSession[];
        };
      };
    };
  };
};

const SessionsGrid = (props: SessionsGridProps): JSX.Element => {
  const getImageStyles = (session: CustomSession): CSSProperties =>
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
                  <Text tag="div" className="item-title" field={session.name}></Text>
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

export default SessionsGrid;
