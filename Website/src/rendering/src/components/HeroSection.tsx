import Image from 'next/image';
import logo from '../assets/img/play-logo-wide-light.svg';
import { ComponentProps } from 'lib/component-props';
import { Text, Field, LinkField, Link } from '@sitecore-jss/sitecore-jss-nextjs';

export type HeroProps = ComponentProps & {
  fields: {
    Slogan: Field<string>;
    Expo: Field<string>;
    Title: Field<string>;
    Subtitle: Field<string>;
    When: Field<string>;
    Link: LinkField;
  };
};

const HeroSection = ({ fields }: HeroProps): JSX.Element => {
  return (
    <section className="section__hero banner">
      <div className="section__hero__container container">
        <div className="section__hero__container__content">
          <div className="section__hero__container__content__text">
            <div className="hidden md:block">
              <Image src={logo} alt="PLAY! Summit" />
            </div>
            <p className="slogan">
              <Text field={fields.Slogan} />
            </p>
            <h1 className="expo">
              <Text field={fields.Expo} />
            </h1>
            <h3 className="title">
              <Text field={fields.Title} />
            </h3>
            <p className="subtitle">
              <Text field={fields.Subtitle} />
            </p>
            <h3 className="expo">
              <Text field={fields.When} />
            </h3>
          </div>
          <div className="btn__area">
            <Link field={fields.Link} className="btn--main btn--main--round btn--main--big" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
