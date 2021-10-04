import Link from 'next/link';
import Image from 'next/image';

const SignupConfirmation = (): JSX.Element => {
  return (
    <section
      className="signupConfirmation banner"
      style={{
        backgroundImage:
          'url(' +
          'https://demoedge.sitecoresandbox.cloud/api/public/content/16ff8c68694a48a0bd6311025cb6a5c9?v=5d942ccf' +
          ')',
      }}
    >
      <div className="signupConfirmation__container container">
        <div className="logo">
          <Image
            src="https://demoedge.sitecoresandbox.cloud/api/public/content/c78f4095acc746a98146aaa38f57a04f?v=cf5688ab"
            width={200}
            height={100}
            className="left float"
            alt="Logo"
          />
        </div>

        <div className="signupConfirmation__container__content">
          <div className="signupConfirmation__container__content__text">
            <span className="headline">Stay Connected</span>
            <h1 className="title">Thank you!</h1>
            <p>
              We&apos;ve sent a information package to your inbox. Stay tuned for lots of PLAY!
              Summit info coming your way.
            </p>

            <div className="pt-5">
              <Link href="/" passHref>
                <button className="btn--main btn--main--round btn--main--big w-full">
                  End Session
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupConfirmation;
