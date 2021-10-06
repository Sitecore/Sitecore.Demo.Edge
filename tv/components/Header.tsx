import Link from 'next/link';

const Header = (): JSX.Element => {
  return (
    <header className="header absolute top-0 z-50 text-black-lightest">
      <Link href="/rooms" passHref>
        <a>Rooms</a>
      </Link>
      <Link href="/" passHref>
        <a>Home</a>
      </Link>
      <Link href="/schedule" passHref>
        <a>Schedule</a>
      </Link>
      <Link href="/sponsor" passHref>
        <a>Sponsor</a>
      </Link>
      <Link href="/speakers" passHref>
        <a>Speakers</a>
      </Link>
    </header>
  );
};

export default Header;
