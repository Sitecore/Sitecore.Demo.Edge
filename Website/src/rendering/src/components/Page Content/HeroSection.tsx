import {
  Text,
  Field,
  RichText,
  ImageField,
  Placeholder,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type HeroProps = ComponentProps & {
  fields: {
    Hero: ImageField;
    Slogan: Field<string>;
    Eyebrow: Field<string>;
    Title: Field<string>;
    Body: Field<string>;
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
            <Text field={props.fields.Slogan} tag="p" className="slogan" />
            <Text field={props.fields.Eyebrow} tag="h1" className="expo" />
            <Text field={props.fields.Title} tag="h3" className="title" />
            <RichText field={props.fields.Body} tag="div" className="subtitle" />
          </div>
          <Placeholder name="jss-hero-section-content" rendering={props.rendering} />
        </div>
      </div>
    </section>
  );
};

export default withDatasourceCheck()<HeroProps>(HeroSection);
