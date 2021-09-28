import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, Image, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { faCalendar, faClock, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { getSessionTime } from '../helpers/DateHelper';

type Speaker = {
  fields: {
    Name: Field<string>;
    Picture: ImageField;
    JobTitle: Field<string>;
    Company: Field<string>;
    Location: Field<string>;
    Description: Field<string>;
    FacebookProfileLink?: Field<string>;
    TwitterProfileLink?: Field<string>;
    InstagramProfileLink?: Field<string>;
    LinkedinProfileLink?: Field<string>;
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

export type SessionInformationProps = ComponentProps & {
  fields: {
    Name: Field<string>;
    Description: Field<string>;
    Type: Field<string>;
    Image: ImageField;
    Speakers: Speaker[];
    Rooms: Room[];
    Day: Day[];
    Timeslots: Timeslot[];
    Premium: Field<boolean>;
  };
};

const SessionInformation = (props: SessionInformationProps): JSX.Element => {
  const speakerHeader = !props.fields.Speakers
    ? ''
    : props.fields.Speakers.length == 1
    ? 'Speaker'
    : 'Speakers';

  return (
    <section className="section information-section session-information">
      <div className="section__content left__content">
        <div className="information-grid">
          <div className="image-col">
            <div>
              <Image field={props.fields?.Image} alt={props.fields?.Name?.value} />
              {props.fields.Rooms && props.fields.Rooms.length > 0 && (
                <div className="info-text">
                  <span>
                    <FontAwesomeIcon className="icon" icon={faDoorOpen} />
                  </span>
                  <Text tag="p" field={props.fields.Rooms[0].fields.Name}></Text>
                </div>
              )}
              {props.fields.Day &&
                props.fields.Day.length > 0 &&
                props.fields.Day.map((day, index) => (
                  <div key={index} className="info-text">
                    <span>
                      <FontAwesomeIcon className="icon" icon={faCalendar} />
                    </span>
                    <Text tag="p" field={day.fields.Name}></Text>
                  </div>
                ))}
              {props.fields.Timeslots && props.fields.Timeslots.length > 0 && (
                <div className="info-text">
                  <span>
                    <FontAwesomeIcon className="icon" icon={faClock} />
                  </span>
                  <span>{getSessionTime(props.fields.Timeslots)}</span>
                </div>
              )}
            </div>
            <div className="related-sessions" title="TODO: hardcoded for now...">
              <div className="session-title">Related Sessions</div>
              <div className="session">
                <p>Mon, 19th | 9:00 AM</p>
                <p className="session-title">10 Tips to get the most out of your routines</p>
              </div>
            </div>
          </div>
          <div className="description-col">
            <div>
              <Text tag="div" className="eyebrow" field={props.fields.Type}></Text>
              {props.fields.Premium?.value === true && <div className="eyebrow">Premium</div>}
            </div>
            <div>
              <Text tag="h2" className="speaker-name" field={props.fields.Name}></Text>
            </div>
            <div className="speaker-grid">
              <div className="speaker-header">{speakerHeader}</div>
              {props.fields.Speakers &&
                props.fields.Speakers.map((speaker, index) => (
                  <div key={index} className="speaker-info">
                    <div className="speaker-image">
                      <Image
                        field={speaker.fields?.Picture}
                        alt={speaker.fields?.Name?.value}
                        width={200}
                        height={200}
                      />
                      <div className="social-bar">
                        {!speaker.fields.FacebookProfileLink ? (
                          ''
                        ) : (
                          <a href={speaker.fields.FacebookProfileLink.value}>
                            <FontAwesomeIcon className="social-icon" icon={faFacebookF} />
                          </a>
                        )}
                        {!speaker.fields.TwitterProfileLink ? (
                          ''
                        ) : (
                          <a href={speaker.fields.TwitterProfileLink.value}>
                            <FontAwesomeIcon className="social-icon" icon={faTwitter} />
                          </a>
                        )}
                        {!speaker.fields.LinkedinProfileLink ? (
                          ''
                        ) : (
                          <a href={speaker.fields.LinkedinProfileLink.value}>
                            <FontAwesomeIcon className="social-icon" icon={faLinkedinIn} />
                          </a>
                        )}
                        {!speaker.fields.InstagramProfileLink ? (
                          ''
                        ) : (
                          <a href={speaker.fields.InstagramProfileLink.value}>
                            <FontAwesomeIcon className="social-icon" icon={faInstagram} />
                          </a>
                        )}
                      </div>
                    </div>
                    <div>
                      <Text tag="h3" className="speaker-name" field={speaker.fields.Name}></Text>

                      {speaker.fields.JobTitle && (
                        <span>
                          <span className="font-bold">Position: </span>
                          <Text field={speaker.fields.JobTitle}></Text>
                        </span>
                      )}
                      {speaker.fields.Company && (
                        <span className="block">
                          <span className="font-bold">Company: </span>
                          <Text field={speaker.fields.Company}></Text>
                        </span>
                      )}
                      {speaker.fields.Location && (
                        <span className="block">
                          <span className="font-bold">Location: </span>
                          <Text field={speaker.fields.Location}></Text>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <RichText field={props.fields.Description} />

            <div className="related-sessions" title="TODO: hardcoded for now...">
              <div className="session-title">Related Sessions</div>
              <div className="session">
                <p>Mon, 19th | 9:00 AM</p>
                <p className="session-title">10 Tips to get the most out of your routines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export type { Speaker };
export default SessionInformation;
