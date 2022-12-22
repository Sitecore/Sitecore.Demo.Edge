import Link from 'next/link';
import Image from 'next/image';
import Screen from '../components/Screen';

const Custom404 = (): JSX.Element => {
  return (
    <Screen>
      <div
        className="flex h-full bg-black bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url("/backgrounds/cracked-screen.jpg")`,
        }}
      >
        <div className="m-auto text-white text-center text-xl">
          <Link href="/start">
            <Image
              src="https://playsummit.sitecoresandbox.cloud/api/public/content/c78f4095acc746a98146aaa38f57a04f?v=cf5688ab"
              width={200}
              height={100}
              alt="Logo"
              title="Tap to go home"
              unoptimized
            />
            <div>Oops! You broke the kiosk.</div>
            <div>Please click here to reboot system.</div>
          </Link>
        </div>
      </div>
    </Screen>
  );
};

export default Custom404;
