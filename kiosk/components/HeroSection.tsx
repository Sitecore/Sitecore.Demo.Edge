import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo/play-logo-wide-light.svg';

const HeroSection = (): JSX.Element => {
  return (
    <section
      className="section__hero banner"
      style={{
        backgroundImage:
          'url(' +
          'https://edge-nightly-website-sitecoredemo.vercel.app/assets/img/home-hero-background.jpg' +
          ')',
      }}
    >
      <div className="section__hero__container container">
        <div className="section__hero__container__content">
          <div className="section__hero__container__content__text">
            <div className="logo">
              <Image src={logo} alt="Logo" />
            </div>
            <p className="slogan">READY | STEADY | PLAY!</p>
            <h1 className="expo">Sports and Leisure Expo</h1>
            <h3 className="title">RAISE YOUR GAME</h3>
            <p className="subtitle">
              Join us in person or online for the fifth annual PLAY! Summit.
            </p>
            <h3 className="expo">August 24th – 25th</h3>
          </div>
          <div className="btn__area">
            <Link href="/tickets">
              <a className="btn--main btn--main--round btn--main--big">Get Started</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
