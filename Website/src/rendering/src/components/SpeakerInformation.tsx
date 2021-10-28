import { ComponentProps } from 'lib/component-props';
import { Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import SessionList from './SessionList';
import { Session } from 'src/types/session';

// TODO: Change the source of this component to a GraphQL query to get the expanded Timeslots and Day field values
export type SpeakerInformationProps = ComponentProps & {
  fields: {
    Description: Field<string>;
    Sessions: Session[];
  };
};

const SpeakerInformation = (props: SpeakerInformationProps): JSX.Element => {
  const sessions =
    props.fields.Sessions && props.fields.Sessions.length > 0 ? (
      <SessionList sessions={props.fields.Sessions} showSpeakers={false} />
    ) : (
      <div>No sessions</div>
    );

  return (
    <section className="section information-section-with-sessions">
      <div className="section__content container">
        <div className="information-grid">
          <div className="description-col">
            <div className="column-title">Biography:</div>
            <RichText field={props.fields.Description} />
          </div>
          <div className="sessions-col">
            <div className="column-title">Sessions:</div>
            {sessions}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeakerInformation;
