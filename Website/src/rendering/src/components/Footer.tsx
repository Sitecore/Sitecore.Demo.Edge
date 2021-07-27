import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/img/play-logo-wide-light.svg';
import {
  faFacebookF,
  faYoutube,
  faTwitter,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = (): JSX.Element => (
  <div className="footer__content container">
    <div className="footer__content__banner">
      <Link href="/">
        <a>
          <Image src={logo} alt="PLAY! Summit" height="80" width="280" />
        </a>
      </Link>
    </div>
    <footer className="footer__content__footer">
      <ul className="footer__content__footer__col">
        <li>Follow us</li>
        <li>
          <FontAwesomeIcon fixedWidth icon={faFacebookF} /> <a href="#">Facebook</a>
        </li>
        <li>
          <FontAwesomeIcon fixedWidth icon={faYoutube} /> <a href="#">YouTube</a>
        </li>
        <li>
          <FontAwesomeIcon fixedWidth icon={faTwitter} /> <a href="#">Twitter</a>
        </li>
        <li>
          <FontAwesomeIcon fixedWidth icon={faInstagram} /> <a href="#">Instagram</a>
        </li>
        <li>
          <FontAwesomeIcon fixedWidth icon={faLinkedin} /> <a href="#">LinkedIn</a>
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
        <div>
          <p>Copyright © 2014-2021 PLAY! Summit</p>
        </div>
        <div>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
        <div>
          <Link href="/terms">Terms of Use</Link>
        </div>
      </div>
      <div className="footer__content__legal__region">
        <a href="#">Region</a>
      </div>
    </div>
  </div>
);

export default Footer;
