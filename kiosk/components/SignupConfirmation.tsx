import { FormEvent } from 'react';
import Router from 'next/router';
import Image from 'next/image';
import { forgetCurrentGuest } from '../services/CdpService';

const SignupConfirmation = (): JSX.Element => {
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    return await forgetCurrentGuest().then(() => {
      Router.push('/start');
    });
  };

  return (
    <section
      className="signupConfirmation banner"
      style={{
        backgroundImage:
          'url(' +
          'https://playsummit.sitecoresandbox.cloud/api/public/content/16ff8c68694a48a0bd6311025cb6a5c9?v=5d942ccf' +
          ')',
      }}
    >
      <div className="signupConfirmation__container container">
        <div className="logo">
          <Image
            src="https://playsummit.sitecoresandbox.cloud/api/public/content/c78f4095acc746a98146aaa38f57a04f?v=cf5688ab"
            width={200}
            height={100}
            className="left float w-[200px] h-[100px]"
            alt="Logo"
            unoptimized
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
              <form onSubmit={handleFormSubmit}>
                <button
                  className="btn--main btn--main--round btn--main--primary btn--main--big block rounded-lg"
                  type="submit"
                >
                  End Session
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupConfirmation;
