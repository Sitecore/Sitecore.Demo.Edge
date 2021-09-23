import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Text, Field, ImageField, Image, DateField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { faCalendar, faClock, faStar, faUser } from '@fortawesome/free-solid-svg-icons';

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

type Session = {
  name: Field<string>;
  fields: {
    Name: Field<string>;
    Description: Field<string>;
    Type: Field<string>;
    Date: Field<string>;
    Image: ImageField;
    Speakers: Speaker[];
    Rooms: Room[];
    Day: Field<string>;
    Timeslots: Timeslot[];
    Premium: Field<boolean>;
  };
};

type SessionsGridProps = ComponentProps & {
  fields: {
    items: Session[];
  };
};

function getTimeString(time: number, isEndTime: boolean) {
  const minutes = isEndTime ? ':55' : ':00';
  time = isEndTime ? time - 1 : time;
  if (time == 12) {
    return time + minutes + ' noon';
  } else if (time < 12) {
    return time + minutes + ' am';
  } else if (time > 12) {
    return time - 12 + minutes + ' pm';
  }
  return '';
}

function GetSessionTime(timeslots: Timeslot[]) {
  let sessionTime = '';
  if (timeslots) {
    const times: number[] = [];
    timeslots.forEach((timeslot) => {
      let startTime = parseInt(timeslot.fields.Name.value);
      if (startTime < 7) {
        startTime = startTime + 12;
      }
      times.push(startTime);
    });
    times.sort();
    if (timeslots.length > 1) {
      sessionTime =
        getTimeString(times[0], false) + ' - ' + getTimeString(times[times.length - 1] + 1, true);
    } else {
      sessionTime = getTimeString(times[0], false) + ' - ' + getTimeString(times[0] + 1, true);
    }
  }
  return sessionTime;
}

const SessionsGrid = (props: SessionsGridProps): JSX.Element => (
  <div className="item-grid sessions-grid">
    <div className="grid-content">
      {props.fields.items &&
        props.fields.items.map((session, index) => (
          <Link key={index} href={'/sessions/' + session.name} passHref>
            <a className="grid-item">
              <div className="image-hover-zoom">
                <Image field={session.fields.Image} alt={session.fields.Name.value} />
              </div>
              {session.fields.Premium?.value === true && (
                <div className="session-featured" title="Premium">
                  <FontAwesomeIcon className="icon h-4 mr-2 inline text-yellow" icon={faStar} />
                </div>
              )}
              <div className="item-details item-details-left">
                <Text tag="div" className="item-title" field={session.fields.Name}></Text>
                <DateField
                  tag="p"
                  field={session.fields.Date}
                  render={(date) =>
                    date?.toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  }
                />
                {session.fields.Day.value && (
                  <p>
                    <span>
                      <FontAwesomeIcon
                        className="icon h-4 mr-2 inline text-black"
                        icon={faCalendar}
                      />
                    </span>
                    <Text tag="span" field={session.fields.Day}></Text>
                  </p>
                )}

                {session.fields.Timeslots && session.fields.Timeslots.length > 0 && (
                  <p>
                    <span>
                      <FontAwesomeIcon className="icon h-4 mr-2 inline text-black" icon={faClock} />
                    </span>
                    {GetSessionTime(session.fields.Timeslots)}
                  </p>
                )}
                {session.fields.Speakers &&
                  session.fields.Speakers.map((speaker, index) => (
                    <p key={index}>
                      <span>
                        <FontAwesomeIcon
                          className="icon h-4 mr-2 inline text-black"
                          icon={faUser}
                        />
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
