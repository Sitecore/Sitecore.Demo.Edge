import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, Image, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import {
  faBuilding,
  faCalendar,
  faClock,
  faDoorOpen,
  faMapMarkerAlt,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { getSessionDays, getSessionTime } from '../helpers/DateHelper';
import { Timeslot } from '../interfaces/Timeslot';
import { Speaker } from 'src/types/speaker';
import { Day } from 'src/types/day';
import { Room } from 'src/types/room';
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
  const premiumSessionTitle = props.fields.Premium.value ? 'premium' : '';

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

      <section className="information-page-hero">
        <div
          className="background-container"
          style={{
            backgroundImage: 'url(' + props.fields.Image.value?.src + ')',
          }}
        >
          <div className="content">
            <div
              className="image-container bg-cover  bg-center flex-1 min-h-full"
              style={{
                background:
                  'linear-gradient(to right, rgba(60, 60, 60, 0) 70%, rgba(0, 0, 0, 1) 100%)',
              }}
            ></div>
            <div className="content-container">
              <div
                className={
                  props.fields.Premium.value
                    ? 'container-content-text premium'
                    : 'container-content-text'
                }
              >
                <div>
                  <p className="title">
                    Explore the <span className="information-type">{premiumSessionTitle}</span>{' '}
                    session:
                  </p>
                  <h1 className="name">
                    <Text field={props.fields.Name} />
                  </h1>
                </div>
                <div>
                  <InfoText Icon={faDoorOpen}>
                    <Text tag="span" field={props.fields.Rooms[0].fields.Name} />
                  </InfoText>
                  <InfoText Icon={faCalendar}>
                    <span>{getSessionDays(props.fields.Day)}</span>
                  </InfoText>
                  <InfoText Icon={faClock}>
                    <span>{getSessionTime(props.fields.Timeslots)}</span>
                  </InfoText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
