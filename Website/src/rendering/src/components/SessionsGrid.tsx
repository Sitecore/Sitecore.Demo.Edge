import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Text, Field, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { faCalendar, faClock, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { getSessionTime } from '../helpers/DateHelper';

type Speaker = {
  fields: {
    Name: Field<string>;
    Role: Field<string>;
  };
};

type Room = {
  fields: {
    Name: Field<string>;
  };
};

type Timeslot = {
  fields: {
    Name: Field<string>;
  };
};

type Day = {
  fields: {
    Name: Field<string>;
  };
};

type Session = {
  name: Field<string>;
  fields: {
    Name: Field<string>;
    Image: ImageField;
    Speakers: Speaker[];
    Rooms: Room[];
    Day: Day[];
    Timeslots: Timeslot[];
    Premium: Field<boolean>;
  };
};

type SessionsGridProps = ComponentProps & {
  fields: {
    items: Session[];
  };
};

const SessionsGrid = (props: SessionsGridProps): JSX.Element => (
  <div className="item-grid sessions-grid">
    <div className="grid-content">
      {props.fields.items &&
        props.fields.items.map((session, index) => (
          <Link key={index} href={'/sessions/' + session.name} passHref>
            <a className="grid-item">
              <div className="image-hover-zoom">
                <Image field={session.fields.Image} alt={session.fields.Name.value} width={500} />
              </div>
              {session.fields.Premium?.value === true && (
                <div className="session-featured" title="Premium">
                  <FontAwesomeIcon className="icon-yellow" icon={faStar} />
                </div>
              )}
              <div className="item-details item-details-left">
                <Text tag="div" className="item-title" field={session.fields.Name}></Text>
                {session.fields.Day &&
                  session.fields.Day.length > 0 &&
                  session.fields.Day.map((day, index) => (
                    <p key={index}>
                      <span>
                        <FontAwesomeIcon className="icon" icon={faCalendar} />
                      </span>
                      <Text tag="span" field={day.fields.Name}></Text>
                    </p>
                  ))}
                {session.fields.Timeslots && session.fields.Timeslots.length > 0 && (
                  <p>
                    <span>
                      <FontAwesomeIcon className="icon" icon={faClock} />
                    </span>
                    {getSessionTime(session.fields.Timeslots)}
                  </p>
                )}
                {session.fields.Speakers &&
                  session.fields.Speakers.map((speaker, index) => (
                    <p key={index}>
                      <span>
                        <FontAwesomeIcon className="icon" icon={faUser} />
                      </span>
                      <Text tag="span" className="speaker-name" field={speaker.fields.Name}></Text>
                      {speaker.fields.Role.value && (
                        <span>
                          {' | '}
                          <Text tag="span" field={speaker.fields.Role}></Text>
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
