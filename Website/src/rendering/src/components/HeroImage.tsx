import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type HeroImageProps = ComponentProps & {
  fields: {
    hero: ImageField;
  };
};

const HeroImage = (props: HeroImageProps): JSX.Element => {
  if (props.fields.hero && props.fields.hero.value) {
    return (
      <section
        className="mt-20 banner bg-black bg-left bg-no-repeat bg-cover relative h-96"
        style={{ backgroundImage: 'url("' + props.fields.hero.value.src + '")' }}
      ></section>
    );
  }

  return <div>Datasource is empty</div>;
};

export default HeroImage;
