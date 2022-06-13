import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type PageTitleSectionProps = ComponentProps & {
  fields: {
    pageTitle: Field<string>;
  };
};

const PageTitleSection = (props: PageTitleSectionProps): JSX.Element => (
  <section className="section page-title-section">
    <div className="section__content container">
      <Text field={props.fields.pageTitle} tag="h1" className="section__content__title" />
    </div>
  </section>
);

export default PageTitleSection;
