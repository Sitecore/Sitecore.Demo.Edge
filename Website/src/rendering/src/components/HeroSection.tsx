import { Text, Field, LinkField, Link, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentWithChildrenProps } from 'lib/component-props';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';

export type HeroProps = ComponentWithChildrenProps & {
  fields: {
    Hero: ImageField;
    Logo: ImageField;
    Slogan: Field<string>;
    Expo: Field<string>;
    Title: Field<string>;
    Subtitle: Field<string>;
    When: Field<string>;
    Link: LinkField;
  };
};

const HeroSection = (props: HeroProps): JSX.Element => {
  return (
    <section
      className="section__hero banner"
      style={{ backgroundImage: `url("${props.fields.Hero?.value?.src}")` }}
    >
      <div className="section__hero__container container">
        <div className="section__hero__container__content">
          <div className="section__hero__container__content__text">
            <p className="slogan">
              <Text field={props.fields.Slogan} />
            </p>
            <h1 className="expo">
              <Text field={props.fields.Expo} />
            </h1>
            <h3 className="title">
              <Text field={props.fields.Title} />
            </h3>
            <p className="subtitle">
              <Text field={props.fields.Subtitle} />
            </p>
          </div>
          <Placeholder name="jss-summit-hero-cta" rendering={props.rendering} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
