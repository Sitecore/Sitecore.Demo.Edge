import Link from 'next/link';

const Footer = (): JSX.Element => {
  return (
    <div className="footer">
      <div className="controller">
        <span className="controller-text">^</span>
      </div>
      <div className="controls">
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
      </div>
    </div>
  );
};

export default Footer;
