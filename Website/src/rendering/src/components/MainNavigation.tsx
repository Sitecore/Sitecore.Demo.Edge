import Link from 'next/link';

const MainNavigation = (): JSX.Element => (
  <nav id="topNav" className="header__container__content__menu">
    <Link href="/schedule">Schedule</Link>
    <Link href="/speakers">Speakers</Link>
    <Link href="/vendors">Vendors</Link>
    <Link href="/map">Map</Link>
    <Link href="/shop">Shop</Link>
    <Link href="/news">News</Link>
    <Link href="/tickets">
      <a className="btn--main btn--main--round">Book Tickets</a>
    </Link>
  </nav>
);

export default MainNavigation;
