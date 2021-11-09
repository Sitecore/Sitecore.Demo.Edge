import Head from 'next/head';
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
import React from 'react';
import Link from 'next/link';

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
  // const premiumEyebrow = props.fields.Premium?.value && <div className="eyebrow">Premium</div>;

  const speakers = props.fields.Speakers && props.fields.Speakers.length > 0 && (
    <div className="sidebar-list sidebar-list__speaker">
      {props.fields.Speakers.map((speaker, index) => (
        <div
          key={index}
          className={
            speaker.fields.Featured.value ? 'information-block featured' : 'information-block'
          }
        >
          <div className="info-col-left">
            <Image
              field={speaker.fields?.Picture}
              alt={speaker.fields?.Name?.value}
              width={200}
              height={200}
            />
          </div>
          <div className="info-col-content">
            <Text field={speaker.fields.Name} tag="div" className="session-info-title" />
            <InfoText Icon={faUserTie}>
              <Text tag="span" field={speaker.fields.JobTitle} />
            </InfoText>
            <InfoText Icon={faBuilding}>
              <Text tag="span" field={speaker.fields.Company} />
            </InfoText>
            <InfoText Icon={faMapMarkerAlt}>
              <Text tag="span" field={speaker.fields.Location} />
            </InfoText>
            <div className="session-info-col-calendar">
              <Link href={'/speakers/${speaker.fields.Name}'}>
                <a className="btn--main btn--main--round">Learn more</a>
              </Link>
            </div>
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

      <section className="information-page-hero">
        <div className="content flex">
          <div
            className="image-container bg-cover bg-gradient-to-l from-black-lightest to-white-light bg-center flex-1"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(60, 60, 60, 0) 70%, rgba(0, 0, 0, 1) 100%), url(' +
                props.fields.Image.value?.src +
                ')',
            }}
          ></div>
          <div className="content-container">
            <div className="container-content-text">
              <div>
                <p className="title">Join us:</p>
                <h1 className="name">
                  <Text field={props.fields.Name} />
                </h1>
              </div>
              <InfoText Icon={faDoorOpen}>
                <Text tag="span" field={props.fields.Rooms[0].fields.Name} />
              </InfoText>
              <InfoText Icon={faCalendar}>
                <span>{getSessionDays(props.fields.Day)}</span>
              </InfoText>
              <InfoText Icon={faClock}>
                <span>{getSessionTime(props.fields.Timeslots)}</span>
              </InfoText>
              <div className="external-website-icons"></div>
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
            <div className="sidebar-col">
              <div className="column-title">Speaker(s):</div>
              {speakers}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SessionInformation;
