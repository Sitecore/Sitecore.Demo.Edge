import { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { faCalendar, faClock, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { getSessionTime } from '../helpers/DateHelper';
import { Session } from './SessionsGrid';

type SessionItemProps = {
  session: Session;
};

const SessionItem = (props: SessionItemProps): JSX.Element => {
  const getImageStyles = (session: Session): CSSProperties =>
    session?.image?.jsonValue?.value?.src
      ? {
          backgroundImage: `url(${session.image.jsonValue.value.src})`,
        }
      : {};

  const day =
    props.session.day?.targetItems && props.session.day.targetItems.length > 0
      ? props.session.day.targetItems.map((day, index) => (
          <p key={index}>
            <span>
              <FontAwesomeIcon className="icon" icon={faCalendar} />
            </span>
            <Text tag="span" field={day.name}></Text>
          </p>
        ))
      : undefined;

  const timeSlot =
    props.session.timeslots?.targetItems && props.session.timeslots.targetItems.length > 0 ? (
      <p>
        <span>
          <FontAwesomeIcon className="icon" icon={faClock} />
        </span>
        {getSessionTime(props.session.timeslots.targetItems)}
      </p>
    ) : undefined;

  const speaker = props.session.speakers?.targetItems
    ? props.session.speakers.targetItems.map((speaker, index) => (
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
      ))
    : undefined;

  return (
    <Link href={`/sessions/${props.session.itemName}`} passHref>
      <a className="grid-item">
        <div className="image-hover-zoom" style={getImageStyles(props.session)}></div>
        {props.session.premium?.value && (
          <div className="session-featured" title="Premium">
            <FontAwesomeIcon className="icon-yellow" icon={faStar} />
          </div>
        )}
        <div className="item-details item-details-left">
          <Text tag="div" className="item-title" field={props.session.name}></Text>
          {day}
          {timeSlot}
          {speaker}
        </div>
      </a>
    </Link>
  );
};

export default SessionItem;
