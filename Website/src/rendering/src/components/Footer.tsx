import Link from 'next/link';

const Footer = (): JSX.Element => (
  <div className="footer__content">
    <div className="footer__content__banner">
      <Link href="/">
        <a>
          <img src="/assets/img/play-logo.svg" alt="Play! Summit logo" />
        </a>
      </Link>
    </div>
    <footer className="footer__content__footer">
      <ul className="footer__content__footer__col">
        <li>Follow us</li>
        <li>
          <a href="#">Facebook</a>
        </li>
        <li>
          <a href="#">YouTube</a>
        </li>
        <li>
          <a href="#">Twitter</a>
        </li>
        <li>
          <a href="#">Instagram</a>
        </li>
        <li>
          <a href="#">LinkedIn</a>
        </li>
      </ul>
      <ul className="footer__content__footer__col">
        <li>Workshops</li>
        <li>
          <Link href="/workshops/one">PLAY workshop 1</Link>
        </li>
        <li>
          <Link href="/workshops/one">PLAY workshop 2</Link>
        </li>
        <li>
          <Link href="/workshops/one">PLAY workshop 3</Link>
        </li>
        <li>
          <Link href="/workshops/one">PLAY workshop 4</Link>
        </li>
        <li>
          <Link href="/workshops/one">PLAY workshop 5</Link>
        </li>
        <li>
          <Link href="/workshops/one">PLAY workshop 6</Link>
        </li>
        <li>
          <Link href="/workshops/one">PLAY workshop 7</Link>
        </li>
      </ul>
      <ul className="footer__content__footer__col">
        <li>Schedule</li>
        <li>
          <Link href="/speakers">Key speakers</Link>
        </li>
        <li>
          <Link href="/workshops">Event workshops</Link>
        </li>
        <li>
          <a href="#">Event Specials</a>
        </li>
        <li>
          <Link href="/shop">Featured Products</Link>
        </li>
        <li>
          <Link href="/vendors">Vendors</Link>
        </li>
        <li>
          <Link href="/sponsors">Sponsors</Link>
        </li>
      </ul>
      <ul className="footer__content__footer__col">
        <li>News</li>
        <li>
          <Link href="/news">Latest</Link>
        </li>
        <li>
          <Link href="/aboutus">About Us</Link>
        </li>
        <li>
          <Link href="/media/center">Media Center</Link>
        </li>
        <li>
          <Link href="/media/assets">Media Assets</Link>
        </li>
        <li>
          <Link href="/inquires">Inquires</Link>
        </li>
      </ul>
      <ul className="footer__content__footer__col">
        <li>Get Support</li>
        <li>
          <Link href="/support">Tech Support</Link>
        </li>
        <li>
          <Link href="/contactus">Mail Us</Link>
        </li>
        <li>
          <Link href="/faq">FAQ</Link>
        </li>
      </ul>
    </footer>
    <div className="footer__content__legal">
      <div className="footer__content__legal__links">
        <p>Copyright © 2014-2021 PLAY! Summit</p>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of Use</Link>
      </div>
      <div className="footer__content__legal__region">
        <a href="#">Region</a>
      </div>
    </div>
  </div>
);

export default Footer;
