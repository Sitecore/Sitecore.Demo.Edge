import Link from 'next/link';
import Image from 'next/image';

const SignupConfirmation = (): JSX.Element => {
  return (
    <div className="min-h-full checkout bg-black mx-auto flex flex-row">
      <div className="panel flex flex-1 flex-col md:flex-row shadow-lg">
        <div className="panel-left w-full md:w-2/3 bg-white rounded-l">
          <h1 className="text-3xl font-normal p-10 border-b border-solid border-grey-light">
            Thank you for signing up!
          </h1>
          <div className="p-5 pt-8 border-b border-solid border-grey-light">
            <div className="mb-3 p-5">
              <p>
                We&apos;ve sent a information package to your inbox. Stay tuned for lots of PLAY!
                Summit info coming your way.
              </p>
            </div>
            <div className="mb-3 p-5">
              <Link href="/" passHref>
                <button className="btn--main btn--main--round btn--main--big block rounded-lg px-3 py-3">
                  End Session
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="panel-right w-full md:w-1/3 text-white rounded-r flex">
          <div className="p-10 flex-1 relative">
            <Image alt="Banner" src="/tickets/sport.jpg" layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupConfirmation;
