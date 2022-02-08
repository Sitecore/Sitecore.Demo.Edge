import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type TextCtaProps = ComponentProps & {
  fields: {
    title: Field<string>;
    subTitle: Field<string>;
  };
};

const TextCta = (props: TextCtaProps): JSX.Element => (
  <section className="text-cta">
    <div className="container cta-content">
      <Text tag="h2" className="cta-title" field={props.fields.title} />
      <Text tag="p" className="cta-subtitle" field={props.fields.subTitle} />
    </div>
  </section>
);

export default withDatasourceCheck()<TextCtaProps>(TextCta);
