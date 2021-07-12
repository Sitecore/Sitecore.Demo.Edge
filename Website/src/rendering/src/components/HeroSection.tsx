import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/img/play-logo-wide-light.svg';

const HeroSection = (): JSX.Element => (
  <section className="section__hero banner">
    <div className="section__hero__container">
      <div className="section__hero__container__content">
        <div className="section__hero__container__content__text">
          <div className="hidden md:block">
            <Image src={logo} alt="PLAY! Summit" />
          </div>
          <p className="banner__title__eyebrow">Ready | Steady | Play!</p>
          <h1 className="banner__title__sub-title">Sports and Leisure Expo</h1>
          <h3 className="banner__title__title">Raise Your Game</h3>
          <p className="banner__title__p">
            Join us in person or online for the fifth annual PLAY! Summit.
          </p>
          <h3 className="banner__title__sub-title">August 24th – 25th</h3>
        </div>
        <div className="btn__area">
          <Link href="/tickets">
            <a className="btn--main btn--main--round btn--main--big">Book Tickets</a>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
