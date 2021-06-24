const Footer = (): JSX.Element => (
  <div className="footer__content">
    <div className="footer__content__banner">
      <a href="/">
        <img src="/assets/img/play-logo.svg" alt="Play! Summit logo" />
      </a>
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
          <a href="/workshops/one">PLAY workshop 1</a>
        </li>
        <li>
          <a href="/workshops/one">PLAY workshop 2</a>
        </li>
        <li>
          <a href="/workshops/one">PLAY workshop 3</a>
        </li>
        <li>
          <a href="/workshops/one">PLAY workshop 4</a>
        </li>
        <li>
          <a href="/workshops/one">PLAY workshop 5</a>
        </li>
        <li>
          <a href="/workshops/one">PLAY workshop 6</a>
        </li>
        <li>
          <a href="/workshops/one">PLAY workshop 7</a>
        </li>
      </ul>
      <ul className="footer__content__footer__col">
        <li>Schedule</li>
        <li>
          <a href="/speakers">Key speakers</a>
        </li>
        <li>
          <a href="/workshops">Event workshops</a>
        </li>
        <li>
          <a href="#">Event Specials</a>
        </li>
        <li>
          <a href="#">Featured Products</a>
        </li>
        <li>
          <a href="/vendors">Vendors</a>
        </li>
        <li>
          <a href="/sponsors">Sponsors</a>
        </li>
      </ul>
      <ul className="footer__content__footer__col">
        <li>News</li>
        <li>
          <a href="/news">Latest</a>
        </li>
        <li>
          <a href="/aboutus">About Us</a>
        </li>
        <li>
          <a href="/media/center">Media Center</a>
        </li>
        <li>
          <a href="/media/assets">Media Assets</a>
        </li>
        <li>
          <a href="#">Inquires</a>
        </li>
      </ul>
      <ul className="footer__content__footer__col">
        <li>Get Support</li>
        <li>
          <a href="/support">Tech Support</a>
        </li>
        <li>
          <a href="/contactus">Mail Us</a>
        </li>
        <li>
          <a href="/faq">FAQ</a>
        </li>
      </ul>
    </footer>
    <div className="footer__content__legal">
      <div className="footer__content__legal__links">
        <p>Copyright © 2014-2021 PLAY! Summit</p>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Use</a>
      </div>
      <div className="footer__content__legal__region">
        <a href="#">Region</a>
      </div>
    </div>
  </div>
);

export default Footer;
