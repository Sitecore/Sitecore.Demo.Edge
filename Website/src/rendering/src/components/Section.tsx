import {
  RichText,
  Text,
  Field,
  Link,
  Placeholder,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentWithChildrenProps } from 'lib/component-props';

type SectionProps = ComponentWithChildrenProps & {
  fields: {
    cssClass: Field<string>;
    brightness: Field<string>;
    title: Field<string>;
    content: Field<string>;
    callToActionLink: LinkField;
  };
};

const Section = (props: SectionProps): JSX.Element => {
  const sectionCssClasses = `section ${props.fields?.cssClass?.value}`;
  const sectionContentCssClasses = `section__content ${props.fields?.cssClass?.value}__content container`;
  const titleCssClasses = `section__content__title section__content__title--${props.fields?.brightness?.value}`;
  const contentCssClasses = `section__content__p section__content__p--${props.fields?.brightness?.value}`;

  const titleAndContent = props.fields && (
    <>
      <Text tag="h2" field={props.fields.title} className={titleCssClasses} />
      <RichText tag="div" field={props.fields.content} className={contentCssClasses} />
    </>
  );

  const placeholder = !!props.rendering && (
    <Placeholder name="jss-section-content" rendering={props.rendering} />
  );

  const callToAction = !!props.fields?.callToActionLink?.value?.href && (
    <Link
      field={props.fields.callToActionLink}
      className="btn--main btn--main--round btn--main--big"
    />
  );

  return (
    <section className={sectionCssClasses}>
      <div className={sectionContentCssClasses}>
        {titleAndContent}
        {placeholder}
        {props.children}
        {callToAction}
      </div>
    </section>
  );
};

export default Section;
