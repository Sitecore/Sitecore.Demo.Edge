import Link from 'next/link';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { getSessionTime } from '../../helpers/DateHelper';
import { GraphQLSession } from 'src/types/session';
import InfoText from '../NonSitecore/InfoText';
import { faClock, faDoorOpen, faUser } from '@fortawesome/free-solid-svg-icons';

type SessionListItemProps = GraphQLSession & {
  showSpeakers: boolean;
};

const SessionListItem = (props: SessionListItemProps): JSX.Element => {
  const premiumCssClass = props.premium?.value ? 'premium' : '';

  const ticketTypeBadge = props.premium?.value && (
    <span className="session-info-ticket">premium</span>
  );

  const day =
    props.day?.targetItems &&
    typeof props.day.targetItems === 'object' &&
    props.day.targetItems.length > 0 &&
    props.day.targetItems[0].name?.value
      ? props.day.targetItems[0].name.value[props.day.targetItems[0].name.value.length - 1]
      : '?';

  const time = props.timeslots?.targetItems &&
    typeof props.timeslots.targetItems === 'object' &&
    props.timeslots.targetItems.length > 0 && (
      <InfoText Icon={faClock}>
        <span className="session-info-time">{getSessionTime(props.timeslots.targetItems)}</span>
      </InfoText>
    );

  const room = props.rooms?.targetItems &&
    typeof props.rooms.targetItems === 'object' &&
    props.rooms.targetItems.length > 0 &&
    props.rooms.targetItems[0].name?.value && (
      <InfoText Icon={faDoorOpen}>
        <Text field={props.rooms.targetItems[0].name} tag="span" />
      </InfoText>
    );

  const speakers = props.showSpeakers &&
    props.speakers?.targetItems &&
    props.speakers.targetItems.length > 0 && (
      <>
        {props.speakers.targetItems.map((speaker, index) => (
          <div className="speaker-name" key={index}>
            <InfoText Icon={faUser}>
              <Link href={speaker.url.path} passHref>
                <Text field={speaker.name} tag="a" />
              </Link>
            </InfoText>
          </div>
        ))}
      </>
    );

  return (
    <div className={`information-block ${premiumCssClass}`}>
      <div className="info-col-left">
        {ticketTypeBadge}
        <div className="session-info-month">day</div>
        <div className="session-info-date">{day}</div>
      </div>
      <div className="info-col-content">
        <Text field={props.name} tag="div" className="info-col-title" />
        {speakers}
        {time}
        {room}
        <div className="info-col-cta">
          <Link href={props.url.path}>
            <a className="btn-main">More Information</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export type SessionListProps = {
  sessions: GraphQLSession[];
  showSpeakers: boolean;
};

const SessionList = (props: SessionListProps): JSX.Element => {
  const sessions = props.sessions && props.sessions.length > 0 && (
    <div className="session-list">
      {props.sessions.map((session, index) => (
        <SessionListItem {...session} showSpeakers={props.showSpeakers} key={index} />
      ))}
    </div>
  );

  return <>{sessions}</>;
};

export default SessionList;
