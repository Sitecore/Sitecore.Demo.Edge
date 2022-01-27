import {
  Field,
  ImageField,
  Link,
  LinkField,
  RichText,
  Text,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type FullImageSectionProps = ComponentProps & {
  fields: {
    cssClass: Field<string>;
    position: Field<string>;
    title: Field<string>;
    subtitle: Field<string>;
    content: Field<string>;
    callToActionLink: LinkField;
    backgroundImage: ImageField;
  };
};

const FullImageSection = ({ fields }: FullImageSectionProps): JSX.Element => {
  const sectionCssClasses = `section section__full-image ${fields.cssClass.value}`;
  const positionCssClasses = `section__content section__full-image__content section__full-image__content--${fields.position.value} container`;

  const callToAction = fields.callToActionLink.value.text && (
    <Link field={fields.callToActionLink} className="btn--main btn--main--round" />
  );

  return (
    <section
      className={sectionCssClasses}
      style={{ backgroundImage: 'url(' + fields.backgroundImage?.value?.src + ')' }}
    >
      <div className={positionCssClasses}>
        <div className="section__full-image__content__card">
          <Text tag="h5" field={fields.subtitle} />
          <Text tag="h2" field={fields.title} />
          <RichText field={fields.content} />
          {callToAction}
        </div>
      </div>
    </section>
  );
};

export default withDatasourceCheck()<FullImageSectionProps>(FullImageSection);
