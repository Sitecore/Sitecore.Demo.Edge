import {
  Field,
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
  };
};

const FullImageSection = ({ fields }: FullImageSectionProps): JSX.Element => {
  const sectionCssClasses = `section full-image-section ${fields.cssClass.value}`;
  const positionCssClasses = `section-content full-image-section-content full-image-section-content-${fields.position.value} container`;

  const callToAction = fields.callToActionLink && (
    <Link field={fields.callToActionLink} className="btn-main" />
  );

  return (
    <section className={sectionCssClasses}>
      <div className={positionCssClasses}>
        <div className="content-card">
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
