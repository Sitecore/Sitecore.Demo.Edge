import { FormEvent, useState } from 'react';
import Router from 'next/router';
import Image from 'next/image';
import { identifyVisitor } from '../services/CdpService';
import Link from 'next/link';

const SignupForm = (): JSX.Element => {
  const [email, setEmail] = useState('');

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    return await identifyVisitor(email).then(() => Router.push(`/signup/confirmed`));
  };

  return (
    <section
      className="signupForm banner"
      style={{
        backgroundImage:
          'url(' +
          'https://playsummit.sitecoresandbox.cloud/api/public/content/16ff8c68694a48a0bd6311025cb6a5c9?v=5d942ccf' +
          ')',
      }}
    >
      <div className="signupForm__container container">
        <div className="logo">
          <Link href="/start">
            <Image
              src="https://playsummit.sitecoresandbox.cloud/api/public/content/c78f4095acc746a98146aaa38f57a04f?v=cf5688ab"
              width={200}
              height={100}
              className="left float w-[200px] h-[100px]"
              alt="Logo"
              title="Tap to go home"
              unoptimized
            />
          </Link>
        </div>
        <div className="signupForm__container__content">
          <div className="signupForm__container__content__text">
            <form onSubmit={handleFormSubmit}>
              <span className="headline">Stay Connected</span>
              <h1 className="title">Sign up for all the latest information about PLAY! Summit</h1>

              <div className="fields">
                <div className="mb-3">
                  <label className="font-bold text-sm mb-2 ml-1">Email *</label>
                  <div>
                    <input
                      className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Email"
                      type="text"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="checkboxes">
                <div className="flex">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">I wish to receive updates on the expo</span>
                  </label>
                </div>

                <div className="flex mt-6">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">
                      I wish to receive updates from third party vendors and promotions
                    </span>
                  </label>
                </div>
              </div>
              <div className="pt-5">
                <Link href="/signup/confirmed">
                  <button className="btn--main btn--main--round btn--main--primary btn--main--big w-full">
                    Continue
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
