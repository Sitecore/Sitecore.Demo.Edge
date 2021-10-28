import Link from 'next/link';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { getSessionTime } from '../helpers/DateHelper';
import { Session } from 'src/types/session';

type SessionListSessionProps = Session & {
  showSpeakers: boolean;
};

const SessionListSession = (props: SessionListSessionProps): JSX.Element => {
  const premiumCssClass = props.fields.Premium?.value ? 'premium' : '';

  const ticketTypeBadge = props.fields.Premium?.value && (
    <span className="session-info-ticket">premium</span>
  );

  // TODO: Remove the fallback day when all users of SessionList are providing days
  const day =
    props.fields.Day && typeof props.fields.Day === 'object' && props.fields.Day.length > 0
      ? props.fields.Day[0].fields.Name.value[props.fields.Day[0].fields.Name.value.length - 1]
      : '1';

  // TODO: Remove the fallback time when all users of SessionList are providing timeslots
  const time =
    props.fields.Timeslots &&
    typeof props.fields.Timeslots === 'object' &&
    props.fields.Timeslots.length > 0
      ? getSessionTime(props.fields.Timeslots)
      : '9:00 am - 9:55 am';

  const speakers = props.showSpeakers &&
    props.fields.Speakers &&
    props.fields.Speakers.length > 0 && (
      <>
        {props.fields.Speakers.map((speaker, index) => (
          <div className="speaker-name" key={index}>
            <a href="#">
              <Text field={speaker.fields.Name} />
            </a>
          </div>
        ))}
      </>
    );

  return (
    <div className={`session-info ${premiumCssClass}`}>
      <div className="session-info-col-date">
        {ticketTypeBadge}
        <div className="session-info-month">day</div>
        <div className="session-info-date">{day}</div>
      </div>
      <div className="session-info-col-title">
        <span className="session-info-time">{time}</span>
        <Text field={props.fields.Name} tag="div" className="session-info-title" />
        {speakers}
        <div className="session-info-col-calendar">
          <Link href="/tickets/attendee">
            <a className="btn--main btn--main--round">Add to Calendar</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export type SessionListProps = {
  sessions: Session[];
  showSpeakers: boolean;
};

const SessionList = (props: SessionListProps): JSX.Element => {
  const sessions = props.sessions && props.sessions.length > 0 && (
    <div className="session-list">
      {props.sessions.map((session, index) => (
        <SessionListSession {...session} showSpeakers={props.showSpeakers} key={index} />
      ))}
    </div>
  );

  return <>{sessions}</>;
};

export default SessionList;
