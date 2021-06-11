import { Field, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type FullImageSectionProps = ComponentProps & {
  fields: {
    cssClass: Field<string>;
    position: Field<string>;
    title: Field<string>;
    subtitle: Field<string>;
    content: Field<string>;
    callToActionText: Field<string>;
  };
};

const FullImageSection = (props: FullImageSectionProps): JSX.Element => {
  const sectionCssClasses = `section section__full-image ${props.fields.cssClass.value}`;
  const positionCssClasses = `section__content section__full-image__content section__full-image__content--${props.fields.position.value}`;

  return (
    <section className={sectionCssClasses}>
      <div className={positionCssClasses}>
        <div className="section__full-image__content__card">
          <Text tag="h5" field={props.fields.subtitle} />
          <Text tag="h2" field={props.fields.title} />
          <RichText tag="p" field={props.fields.content} />
          <a href="#" className="btn--main btn--main--big">
            <Text field={props.fields.callToActionText} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FullImageSection;
