import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ThreeColumnCtaProps = ComponentProps & {
  fields: {
    leftHeading: Field<string>;
    leftDescription: Field<string>;
    middleHeading: Field<string>;
    middleDescription: Field<string>;
    rightHeading: Field<string>;
    rightDescription: Field<string>;
  };
};

const ThreeColumnCta = (props: ThreeColumnCtaProps): JSX.Element => (
  <section className="section three-columns-cta">
    <div className="container cta-content">
      <div className="cta">
        <Text tag="div" className="cta-heading" field={props.fields.leftHeading} />
        <Text tag="div" className="cta-description" field={props.fields.leftDescription} />
      </div>
      <div className="cta">
        <Text tag="div" className="cta-heading" field={props.fields.middleHeading} />
        <Text tag="div" className="cta-description" field={props.fields.middleDescription} />
      </div>
      <div className="cta">
        <Text tag="div" className="cta-heading" field={props.fields.rightHeading} />
        <Text tag="div" className="cta-description" field={props.fields.rightDescription} />
      </div>
    </div>
  </section>
);

export default withDatasourceCheck()<ThreeColumnCtaProps>(ThreeColumnCta);
