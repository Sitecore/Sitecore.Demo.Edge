import { Text, RichText, Field, Link, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type HeroSectionProps = ComponentProps & {
  fields: {
    eyebrow: Field<string>;
    title: Field<string>;
    subtitle: Field<string>;
    content: Field<string>;
    subcontent: Field<string>;
    callToActionLink: LinkField;
  };
};

const HeroSection = (props: HeroSectionProps): JSX.Element => {
  const eyebrowCssClasses = `banner__title__eyebrow`;
  const titleCssClasses = `banner__title__title`;
  const subtitleCssClasses = `banner__title__sub-title`;
  const contentCssClasses = `banner__title__p`;
  const subcontentCssClasses = `banner__title__sub-title`;

  return (
    <section className="section__hero banner">
      <div className="section__hero__container">
        <div className="section__hero__container__content">
          <div className="section__hero__container__content__text">
            <img src="/assets/img/play-logo-wide-light.svg" alt="PLAY! Summit" />
            <RichText tag="p" field={props.fields.eyebrow} className={eyebrowCssClasses} />
            <Text tag="h1" field={props.fields.subtitle} className={subtitleCssClasses} />
            <Text tag="h3" field={props.fields.title} className={titleCssClasses} />
            <RichText tag="p" field={props.fields.content} className={contentCssClasses} />
            <Text tag="h3" field={props.fields.subcontent} className={subcontentCssClasses} />
          </div>
          <div className="btn__area">
            <Link
              field={props.fields.callToActionLink}
              className="btn--main btn--main--round btn--main--big"
            ></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
