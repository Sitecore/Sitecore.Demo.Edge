import {
  Field,
  Link,
  LinkField,
  RichText,
  Text,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { DropLink } from 'src/interfaces/DropLink';

type FullImageSectionProps = ComponentProps & {
  fields: {
    cssClass: DropLink;
    position: DropLink;
    title: Field<string>;
    subtitle: Field<string>;
    content: Field<string>;
    callToActionLink: LinkField;
  };
};

const FullImageSection = ({ fields }: FullImageSectionProps): JSX.Element => {
  const sectionCssClasses = `section section__full-image ${fields.cssClass.fields.Value.value}`;
  const positionCssClasses = `section__content section__full-image__content section__full-image__content--${fields.position.fields.Value.value} container`;

  const callToAction = fields.callToActionLink && (
    <Link field={fields.callToActionLink} className="btn--main btn--main--round" />
  );

  return (
    <section className={sectionCssClasses}>
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
