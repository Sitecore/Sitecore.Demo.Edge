import { ComponentProps } from 'lib/component-props';
import { Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import SessionList from './SessionList';
import { GraphQLSession } from 'src/types/session';

export type SpeakerInformationProps = ComponentProps & {
  fields: {
    data: {
      contextItem: {
        description: Field<string>;
        sessions: {
          targetItems: GraphQLSession[];
        };
      };
    };
  };
};

const SpeakerInformation = (props: SpeakerInformationProps): JSX.Element => {
  const sessions =
    props.fields?.data?.contextItem?.sessions?.targetItems &&
    props.fields.data.contextItem.sessions.targetItems.length > 0 ? (
      <SessionList
        sessions={props.fields.data.contextItem.sessions.targetItems}
        showSpeakers={false}
      />
    ) : (
      <div>No sessions</div>
    );

  return (
    <section className="section information-section-with-sessions">
      <div className="section__content container">
        <div className="information-grid">
          <div className="description-col">
            <div className="column-title">Biography:</div>
            <RichText field={props.fields?.data?.contextItem?.description} />
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
