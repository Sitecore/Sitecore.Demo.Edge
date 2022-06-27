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
  const brighnessCssClass = props.fields?.brightness?.value
    ? `section-${props.fields.brightness.value}`
    : '';
  const customCssClass = props.fields?.cssClass?.value ? props.fields.cssClass.value : '';
  const customContentCssClass = customCssClass ? `${customCssClass}-content` : '';

  const sectionCssClasses = `section ${brighnessCssClass} ${customCssClass}`;
  const sectionContentCssClasses = `section-content ${customContentCssClass} container`;

  const titleAndContent = props.fields && (
    <>
      <Text tag="h2" field={props.fields.title} className="section-content-title" />
      {props.fields.content && (
        <RichText tag="div" field={props.fields.content} className="section-content-p" />
      )}
    </>
  );

  const placeholder = !!props.rendering && (
    <Placeholder name="jss-section-content" rendering={props.rendering} />
  );

  const callToAction = !!props.fields?.callToActionLink?.value?.href && (
    <Link field={props.fields.callToActionLink} className="btn-main" />
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
