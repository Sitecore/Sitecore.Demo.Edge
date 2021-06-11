import { Text, RichText, Field, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type SectionProps = ComponentProps & {
  fields: {
    cssClass: Field<string>;
    brightness: Field<string>;
    title: Field<string>;
    content: Field<string>;
    callToActionText: Field<string>;
  };
};

const Section = (props: SectionProps): JSX.Element => {
  const sectionCssClasses = `section ${props.fields.cssClass.value}`;
  const sectionContentCssClasses = `section__content ${props.fields.cssClass.value}__content`;
  const titleCssClasses = `section__content__title section__content__title--${props.fields.brightness.value}`;
  const contentCssClasses = `section__content__p section__content__p--${props.fields.brightness.value}`;

  return (
    <section className={sectionCssClasses}>
      <div className={sectionContentCssClasses}>
        <Text tag="h2" field={props.fields.title} className={titleCssClasses} />
        <RichText tag="p" field={props.fields.content} className={contentCssClasses} />
        <Placeholder name="jss-section-content" rendering={props.rendering} />
        <a href="#" className="btn--main btn--main--big">
          <Text field={props.fields.callToActionText} />
        </a>
      </div>
    </section>
  );
};

export default Section;
