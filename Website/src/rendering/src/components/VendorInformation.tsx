import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentProps } from 'lib/component-props';
import { Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import SessionList from './SessionList';

export type VendorInformationProps = ComponentProps & {
  fields: {
    Description: Field<string>;
  };
};

const VendorInformation = (props: VendorInformationProps): JSX.Element => (
  <section className="section information-section-with-sessions">
    <div className="section__content">
      <div className="information-grid">
        <div className="description-col">
          <div className="column-title">Vendor history:</div>
          <RichText field={props.fields.Description} />
        </div>
        <div className="sessions-col">
          <div className="column-title">Sessions:</div>
          <SessionList />
        </div>
      </div>
    </div>
  </section>
);

export default VendorInformation;
