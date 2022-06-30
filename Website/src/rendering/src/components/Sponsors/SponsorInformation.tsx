import { Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import SessionList from '../Sessions/SessionList';
import { GraphQLSession } from 'src/types/session';

export type SponsorInformationProps = ComponentProps & {
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

const SponsorInformation = (props: SponsorInformationProps): JSX.Element => {
  const SessionListSidebar =
    props.fields.data.contextItem.sessions.targetItems.length > 0 ? (
      <>
        <div className="column-title">Sessions:</div>
        <SessionList
          sessions={props.fields.data.contextItem.sessions.targetItems}
          showSpeakers={true}
        />
      </>
    ) : (
      <div>No sessions</div>
    );

  return (
    <section className="section information-section">
      <div className="section-content container">
        <div className="information-grid">
          <div className="main-col">
            <div className="column-title">Sponsor history:</div>
            <RichText className="rich-text" field={props.fields.data.contextItem.description} />
          </div>
          <div className="sidebar-col">{SessionListSidebar}</div>
        </div>
      </div>
    </section>
  );
};

export default SponsorInformation;
