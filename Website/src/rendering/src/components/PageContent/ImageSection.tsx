import { withDatasourceCheck, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ImageSectionProps = ComponentProps & {
  fields: {
    Image: ImageField;
  };
};

const ImageSection = (props: ImageSectionProps): JSX.Element => (
  <section className="section image-section">
    <div className="section__content container">
      <Image field={props.fields.Image} />
    </div>
  </section>
);

export default withDatasourceCheck()<ImageSectionProps>(ImageSection);
