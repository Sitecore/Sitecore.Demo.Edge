import { Field, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
//import css from '../assets/styles/header.module.scss';

type HeaderProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Header = (props: HeaderProps): JSX.Element => (
  <div className="header">
    <div className="header__eyebrow">
      <div className="header__eyebrow__content">
        <a href="#" className="small">EN</a>
        <a href="#" className="small">Login</a>
      </div>
    </div>
    <div className="header__container">
      <div className="header__container__content">
        <a className="header__container__content__logo" href="#">
          <img src="assets/img/play-logo-stacked-light.svg" alt="PLAY! Summit logo" />
        </a>
        <nav id="topNav" className="header__container__content__menu">
          <a href="#">Schedule</a>
          <a href="#">Speakers</a>
          <a href="#">Vendors</a>
          <a href="#">Map</a>
          <a href="#">Shop</a>
          <a href="#">News</a>
          <a href="#" className="btn--main">
            Book Tickets
          </a>
        </nav>
      </div>
    </div>
  </div>
);

export default Header;
