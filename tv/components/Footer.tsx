import Link from 'next/link';
import { useState } from 'react';

const Footer = (): JSX.Element => {
  const [showMe, setShowMe] = useState(false);
  function toggle() {
    setShowMe(!showMe);
    document.getElementsByClassName('footer')[0].classList.toggle('active');
  }

  return (
    <div className="footer">
      <div className="controller" onClick={toggle}>
        <span className="controller-text">^</span>
      </div>
      <div className="controls">
        <Link href="/rooms" passHref>
          <a>Room</a>
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
