import {
  Text,
  Field,
  RichText,
  ImageField,
  Placeholder,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { isCdpConfigured } from '../../services/CdpService';

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
  const css = `@media (min-width: 768px) {
  .hero_${props.rendering.uid} {
    background-image: url(${props.fields.Hero?.value?.src});
  }
}
.hero_${props.rendering.uid} .hero-background {
  background-image: url(${props.fields.Hero?.value?.src});
}`;

  const withCdp = isCdpConfigured && (
    <div id="cdp-audience-based-hero">
      {/* "ed45ca6f-b409-47ce-8891-da6e98793905" is the "Home Page Hero" variant ID of the Sitecore Personalize "Website - Audience-based home page hero" Web Experience */}
      <section
        id="bx-ed45ca6f-b409-47ce-8891-da6e98793905"
        className={`hero-section hero_${props.rendering.uid}`}
      ></section>
    </div>
  );

  const withoutCdp = !isCdpConfigured && (
    <>
      <style scoped suppressHydrationWarning>
        {css}
      </style>
      <section className={`hero-section hero_${props.rendering.uid}`}>
        <div className="hero-background"></div>
        <div className="hero-container container">
          <div className="container-content">
            <div className="content-text">
              <Text field={props.fields.Slogan} tag="p" className="slogan" />
              <Text field={props.fields.Eyebrow} tag="h1" className="expo" />
              <Text field={props.fields.Title} tag="h3" className="title" />
              <RichText field={props.fields.Body} tag="div" className="subtitle" />
            </div>
            <Placeholder name="jss-hero-section-content" rendering={props.rendering} />
          </div>
        </div>
      </section>
    </>
  );

  return (
    <>
      {withCdp}
      {withoutCdp}
    </>
  );
};

export default withDatasourceCheck()<HeroProps>(HeroSection);
