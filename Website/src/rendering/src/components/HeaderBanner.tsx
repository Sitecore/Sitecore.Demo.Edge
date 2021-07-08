import { Text, Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type HeaderBannerProps = ComponentProps & {
  fields: {
    eyebrow: Field<string>;
    title: Field<string>;
    subtitle: Field<string>;
    backgroundImage: ImageField;
  };
};

const HeaderBanner = (props: HeaderBannerProps): JSX.Element => (
  <section
    className="section pt-60 pb-10"
    style={{
      backgroundImage: 'url("' + props.fields.backgroundImage?.value?.src + '")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="section__content--left w-full text-white pl-2 flex flex-wrap content-end">
      <Text className="eyebrow" tag="h4" field={props.fields.eyebrow} />
      <Text className="" tag="h2" field={props.fields.title} />
      <Text className="" tag="p" field={props.fields.subtitle} />
    </div>
  </section>
);

export default HeaderBanner;
