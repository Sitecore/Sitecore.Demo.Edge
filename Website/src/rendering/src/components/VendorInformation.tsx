import { ComponentProps } from 'lib/component-props';
import { Field, RichText, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import SessionList from './SessionList';
import { SESSIONS } from '../models/mock-sessions';

export type VendorInformationProps = ComponentProps & {
  fields: {
    Description: Field<string>;
  };
};

const VendorInformation = (props: VendorInformationProps): JSX.Element => (
  <section className="section information-section-with-sessions">
    <div className="section__content container">
      <div className="information-grid">
        <div className="description-col">
          <div className="column-title">Vendor history:</div>
          <RichText field={props.fields.Description} />
        </div>
        <div className="sessions-col">
          <div className="column-title">Sessions:</div>
          <SessionList sessions={SESSIONS} showSpeakers={true} />
        </div>
      </div>
    </div>
  </section>
);

export default withDatasourceCheck()<VendorInformationProps>(VendorInformation);
