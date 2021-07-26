import { Text, Field, Link, Placeholder, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type SectionProps = ComponentProps & {
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
  const sectionContentCssClasses = `section__content ${props.fields?.cssClass?.value}__content`;
  const titleCssClasses = `section__content__title section__content__title--${props.fields?.brightness?.value}`;
  const contentCssClasses = `section__content__p section__content__p--${props.fields?.brightness?.value} text-sm`;

  return (
    <section className={sectionCssClasses}>
      <div className={sectionContentCssClasses}>
        {props.fields && (
          <>
            <Text tag="h2" field={props.fields?.title} className={titleCssClasses} />
            <div
              className={contentCssClasses}
              dangerouslySetInnerHTML={{ __html: props.fields?.content?.value }}
            ></div>
          </>
        )}
        {!!props.rendering && (
          <Placeholder name="jss-section-content" rendering={props.rendering} />
        )}
        {!!props.fields?.callToActionLink?.value.href && (
          <Link
            field={props.fields.callToActionLink}
            className="btn--main btn--main--round btn--main--big"
          ></Link>
        )}
      </div>
    </section>
  );
};

export default Section;
