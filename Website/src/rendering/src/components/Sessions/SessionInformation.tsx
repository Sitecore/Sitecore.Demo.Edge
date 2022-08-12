import Head from 'next/head';
import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { Timeslot } from '../../interfaces/Timeslot';
import { Speaker } from 'src/types/speaker';
import { Day } from 'src/types/day';
import { Room } from 'src/types/room';
import SpeakerList from '../Speakers/SpeakerList';
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
  const premiumSessionMetaValue = props.fields.Premium?.value ? 'true' : 'false';

  const speakers =
    props.fields?.Speakers && props.fields.Speakers.length > 0 ? (
      <SpeakerList speakers={props.fields.Speakers} />
    ) : (
      <div>No speakers</div>
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

      <section className="section information-section">
        <div className="section-content container">
          <div className="information-grid">
            <div className="main-col">
              <div className="column-title">Description:</div>
              <RichText className="rich-text" field={props.fields?.Description} />
            </div>
            <div className="sidebar-col">{speakers}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SessionInformation;
