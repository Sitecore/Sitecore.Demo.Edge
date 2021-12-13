import { ImageField, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type HeroImageProps = ComponentProps & {
  fields: {
    hero: ImageField;
  };
};

const HeroImage = (props: HeroImageProps): JSX.Element => {
  if (props.fields?.hero?.value?.src) {
    return (
      <section
        className="hero-image"
        style={{ backgroundImage: `url("${props.fields.hero.value.src}")` }}
      />
    );
  }

  return <div>Hero image is missing from the datasource</div>;
};

export default withDatasourceCheck()<HeroImageProps>(HeroImage);
