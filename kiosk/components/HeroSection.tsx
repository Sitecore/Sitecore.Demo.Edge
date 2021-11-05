import Link from 'next/link';
import Image from 'next/image';
import { HeroResult } from '../interfaces/hero';
import { contentHubImageSrcGenerator } from '../utilities/contentHubImageLoader';

type HeroSectionProps = {
  hero: HeroResult;
};

const HeroSection = (props: HeroSectionProps): JSX.Element => {
  return (
    <section
      className="section__hero banner"
      style={{
        backgroundImage: 'url(' + contentHubImageSrcGenerator(props.hero.advertisement_Image) + ')',
      }}
    >
      <div className="section__hero__container container">
        <div className="section__hero__container__content">
          <div className="section__hero__container__content__text">
            <div className="logo">
              <Image
                src={contentHubImageSrcGenerator(props.hero.advertisement_Logo)}
                width={400}
                height={200}
                alt="Logo"
              />
            </div>
            <p className="slogan">{props.hero.advertisement_Slogan}</p>
            <h1 className="expo">{props.hero.advertisement_Eyebrow}</h1>
            <h3 className="title">{props.hero.advertisement_Title}</h3>
            <div
              dangerouslySetInnerHTML={{ __html: props.hero.advertisement_Body }}
              className="subtitle"
            ></div>
          </div>
          <div className="btn__area">
            <Link href="/tickets">
              <a className="btn--main btn--main--round btn--main--big">Get Started</a>
            </Link>
            <Link href="/signup">
              <a className="btn--main btn--main--round btn--main--big btn-right">Stay Connected</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
