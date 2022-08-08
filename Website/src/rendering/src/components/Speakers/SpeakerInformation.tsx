import { ComponentProps } from 'lib/component-props';
import { Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import SessionList from '../Sessions/SessionList';
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
    <section className="section information-section">
      <div className="section-content container">
        <div className="information-grid">
          <div className="main-col">
            <div className="column-title">Biography:</div>
            <RichText className="rich-text" field={props.fields?.data?.contextItem?.description} />
          </div>
          <div className="sidebar-col">
            <div className="column-title">Sessions:</div>
            {sessions}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeakerInformation;
