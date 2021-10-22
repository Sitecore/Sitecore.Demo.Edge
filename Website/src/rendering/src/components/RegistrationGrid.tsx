import Link from 'next/link';

const RegistrationGrid = (): JSX.Element => (
  <div className="registration-grid">
    <div className="grid-item">
      <span className="item-name">Attendee</span>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <Link href="/tickets">
        <a className="btn--main btn--main--round">Register Now</a>
      </Link>
    </div>
    <div className="grid-item">
      <span className="item-name">Vendor</span>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <Link href="/tickets">
        <a className="btn--main btn--main--round">Register Now</a>
      </Link>
    </div>
    <div className="grid-item">
      <span className="item-name">Sponsor</span>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <Link href="/tickets">
        <a className="btn--main btn--main--round">Register Now</a>
      </Link>
    </div>
    <div className="grid-item">
      <span className="item-name">Press</span>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <Link href="/tickets">
        <a className="btn--main btn--main--round">Register Now</a>
      </Link>
    </div>
    <div className="grid-item">
      <span className="item-name">Speaker</span>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <Link href="/tickets">
        <a className="btn--main btn--main--round">Register Now</a>
      </Link>
    </div>
    <div className="grid-item">
      <span className="item-name">Guest</span>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <Link href="/tickets">
        <a className="btn--main btn--main--round">Register Now</a>
      </Link>
    </div>
  </div>
);

export default RegistrationGrid;
