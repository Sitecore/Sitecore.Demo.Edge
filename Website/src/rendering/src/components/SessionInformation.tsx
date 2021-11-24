import Head from 'next/head';
import Link from 'next/link';
import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, Image, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { faBuilding, faMapMarkerAlt, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Timeslot } from '../interfaces/Timeslot';
import { Speaker } from 'src/types/speaker';
import { Day } from 'src/types/day';
import { Room } from 'src/types/room';
import InfoText from './InfoText';
import SessionInformationPageHero from './SessionInformationPageHero';

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

  const speakers = props.fields.Speakers && props.fields.Speakers.length > 0 && (
    <div className="sidebar-list sidebar-list__speaker">
      {props.fields.Speakers.map((speaker, index) => {
        const featuredSpeakerCssClass = speaker.fields.Featured.value ? 'featured' : '';

        const jobTitle = speaker.fields.JobTitle.value && (
          <InfoText Icon={faUserTie}>
            <Text tag="span" field={speaker.fields.JobTitle} />
          </InfoText>
        );

        const company = speaker.fields.Company.value && (
          <InfoText Icon={faBuilding}>
            <Text tag="span" field={speaker.fields.Company} />
          </InfoText>
        );

        const location = speaker.fields.Location.value && (
          <InfoText Icon={faMapMarkerAlt}>
            <Text tag="span" field={speaker.fields.Location} />
          </InfoText>
        );

        return (
          <div key={index} className={`information-block ${featuredSpeakerCssClass}`}>
            <div className="info-col-left">
              <Image
                field={speaker.fields?.Picture}
                alt={speaker.fields?.Name?.value}
                width={250}
                height={300}
              />
            </div>
            <div className="info-col-content">
              <Text field={speaker.fields.Name} tag="div" className="session-info-title" />
              {jobTitle}
              {company}
              {location}
              <div className="session-info-col-calendar">
                <Link href={'/speakers/${speaker.fields.Name}'}>
                  <a className="btn--main btn--main--round">Learn more</a>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <Head>
        <meta name="premiumSession" content={premiumSessionMetaValue} />
      </Head>

      {/*
        HACK: The SessionInformationPageHero component is added here to avoid creating a new Sitecore rendering, adding it to the page template, and serialize the Sitecore items. This is a temporary solution.
        TODO: Create a Sitecore rendering for this component and remove it from here.
      */}
      <SessionInformationPageHero {...props} />

      <section className="section information-section-with-sidebar">
        <div className="section__content container">
          <div className="information-grid">
            <div className="description-col">
              <div className="column-title">Description:</div>
              <RichText field={props.fields?.Description} />
            </div>
            <div className="sidebar-col">{speakers}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SessionInformation;
