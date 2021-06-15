// @ts-nocheck
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type HeroSectionProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const HeroSection = (props: HeroSectionProps): JSX.Element => (
  <section className="section__hero banner">
    <div className="section__hero__container">
      <div className="section__hero__container__content">
        <div className="section__hero__container__content__text">
          <img src="assets/img/play-logo-wide-light.svg" alt="PLAY! Summit" />
          <p className="banner__title__eyebrow">Ready | Steady | Play!</p>
          <h1 className="banner__title__sub-title">Sports and Leisure Expo</h1>
          <h3 className="banner__title__title">Raise Your Game</h3>
          <p className="banner__title__p">
            Join us in person or online for the fifth annual PLAY! Summit.
          </p>
          <h3 className="banner__title__sub-title">August 24th – 25th</h3>
        </div>
        <div className="btn__area">
          <a href="#" className="btn--main btn--main--big">
            Book tickets
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
