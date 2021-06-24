const MainNavigation = (): JSX.Element => (
  <nav id="topNav" className="header__container__content__menu">
    <a href="/schedule">Schedule</a>
    <a href="/speakers">Speakers</a>
    <a href="/vendors">Vendors</a>
    <a href="/map">Map</a>
    <a href="/shop">Shop</a>
    <a href="/news">News</a>
    <a href="#" className="btn--main btn--main--round">
      Book Tickets
    </a>
  </nav>
);

export default MainNavigation;
