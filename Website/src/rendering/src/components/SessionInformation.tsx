import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import Head from 'next/head';
import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, Image, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { faCalendar, faClock, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { getSessionTime } from '../helpers/DateHelper';
import { Timeslot } from '../interfaces/Timeslot';
import { Speaker } from 'src/types/speaker';
import { Day } from 'src/types/day';
import { Room } from 'src/types/room';
import SocialIcon from './SocialIcon';
import SpeakerInfoLine from './SpeakerInfoLine';
import InfoText from './InfoText';

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
  const premiumSessionMetaValue = props.fields.Premium.value ? 'true' : 'false';

  const room = props.fields.Rooms && props.fields.Rooms.length > 0 && (
    <InfoText Icon={faDoorOpen}>
      <Text tag="p" field={props.fields.Rooms[0].fields.Name} />
    </InfoText>
  );

  const day =
    props.fields.Day &&
    props.fields.Day.length > 0 &&
    props.fields.Day.map((day, index) => (
      <InfoText key={index} Icon={faCalendar}>
        <Text tag="p" field={day.fields.Name} />
      </InfoText>
    ));

  const timeSlots = props.fields.Timeslots && props.fields.Timeslots.length > 0 && (
    <InfoText Icon={faClock}>
      <span>{getSessionTime(props.fields.Timeslots)}</span>
    </InfoText>
  );

  const premiumEyebrow = props.fields.Premium?.value && <div className="eyebrow">Premium</div>;

  const speakerHeader = !props.fields.Speakers
    ? ''
    : props.fields.Speakers.length == 1
    ? 'Speaker'
    : 'Speakers';

  const speakers = props.fields.Speakers && props.fields.Speakers.length > 0 && (
    <div className="speaker-grid">
      <div className="speaker-header">{speakerHeader}</div>
      {props.fields.Speakers.map((speaker, index) => (
        <div key={index} className="speaker-info">
          <div className="speaker-image">
            <Image
              field={speaker.fields?.Picture}
              alt={speaker.fields?.Name?.value}
              width={200}
              height={200}
            />
            <div className="social-bar">
              <SocialIcon Icon={faFacebookF} Link={speaker.fields.FacebookProfileLink} />
              <SocialIcon Icon={faTwitter} Link={speaker.fields.TwitterProfileLink} />
              <SocialIcon Icon={faLinkedinIn} Link={speaker.fields.LinkedinProfileLink} />
              <SocialIcon Icon={faInstagram} Link={speaker.fields.InstagramProfileLink} />
            </div>
          </div>
          <div>
            <Text tag="h3" className="speaker-name" field={speaker.fields.Name} />
            <SpeakerInfoLine title="Position" field={speaker.fields.JobTitle} />
            <SpeakerInfoLine title="Company" field={speaker.fields.Company} />
            <SpeakerInfoLine title="Location" field={speaker.fields.Location} />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Head>
        <meta name="premiumSession" content={premiumSessionMetaValue} />
      </Head>

      <section className="section information-section session-information">
        <div className="section__content left__content">
          <div className="information-grid">
            <div className="image-col">
              <div>
                <Image field={props.fields?.Image} alt={props.fields?.Name?.value} />
                {room}
                {day}
                {timeSlots}
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
                <Text tag="div" className="eyebrow" field={props.fields.Type} />
                {premiumEyebrow}
              </div>
              <div>
                <Text tag="h2" className="speaker-name" field={props.fields.Name} />
              </div>
              {speakers}
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
    </>
  );
};

export default SessionInformation;
