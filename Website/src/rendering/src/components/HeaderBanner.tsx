import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type HeaderBannerProps = ComponentProps & {
  fields: {
    eyebrow: Field<string>;
    title: Field<string>;
    subtitle: Field<string>;
    backgroundImage: Field<string>;
  };
};

const HeaderBanner = (props: HeaderBannerProps): JSX.Element => (
  <section className="section section__full-image">
    <div className="section__content section__full-image__content section__full-image__content--center">
      <Text className="" tag="h2" field={props.fields.title} />
    </div>
  </section>
);

export default HeaderBanner;
