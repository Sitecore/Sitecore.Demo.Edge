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
    className="section pt-60 pb-10 bg-gradient-to-r from-gray-50 to-transparent"
    style={{
      backgroundImage:
        'linear-gradient(to right, rgba(50,50,50,.6), rgba(255,0,0,0)), url("' +
        props.fields.backgroundImage?.value?.src +
        '")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="section__content section__content--left text-white flex flex-wrap content-start w-full font-extrabold pl-0">
      <Text className="eyebrow pb-10" tag="h4" field={props.fields.eyebrow} />
      <Text className="uppercase" tag="h2" field={props.fields.title} />
      <Text className="text-yellow" tag="p" field={props.fields.subtitle} />
    </div>
  </section>
);

export default HeaderBanner;
