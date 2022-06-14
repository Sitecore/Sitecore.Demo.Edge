import { withDatasourceCheck, Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type TextBlockSectionProps = ComponentProps & {
  fields: {
    Text: Field<string>;
  };
};

const TextBlockSection = (props: TextBlockSectionProps): JSX.Element => (
  <section className="section text-block-section">
    <div className="section__content container">
      <RichText field={props.fields.Text} className="text-block" />
    </div>
  </section>
);

export default withDatasourceCheck()<TextBlockSectionProps>(TextBlockSection);
