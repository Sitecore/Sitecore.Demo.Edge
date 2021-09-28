import Link from 'next/link';
import Image from 'next/image';

const HeroSection = (): JSX.Element => {
  return (
    <section
      className="section__hero banner"
      style={{
        backgroundImage:
          'url(' +
          'https://demoedge.sitecoresandbox.cloud/api/public/content/b1a88e26f6a54a9ea64a5f759c5eea84?v=5aea50fb' +
          ')',
      }}
    >
      <div className="section__hero__container container">
        <div className="section__hero__container__content">
          <div className="section__hero__container__content__text">
            <div className="logo">
              <Image
                src="https://demoedge.sitecoresandbox.cloud/api/public/content/c78f4095acc746a98146aaa38f57a04f?v=cf5688ab"
                width={400}
                height={200}
                alt="Logo"
              />
            </div>
            <p className="slogan">READY | STEADY | PLAY!</p>
            <h1 className="expo">Sports and Leisure Expo</h1>
            <h3 className="title">Book Your Ticket</h3>
            <p className="subtitle">Don&apos;t miss the super early bird offer.</p>
            <h3 className="date">August 24th – 25th</h3>
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
