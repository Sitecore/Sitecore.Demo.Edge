import { withDatasourceCheck, LinkField, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type CtaSectionProps = ComponentProps & {
  fields: {
    CallToAction: LinkField;
  };
};

const CtaSection = (props: CtaSectionProps): JSX.Element => (
  <section className="section cta-section">
    <div className="section__content container">
      <Link field={props.fields.CallToAction} className="btn--main btn--main--round" />
    </div>
  </section>
);

export default withDatasourceCheck()<CtaSectionProps>(CtaSection);
