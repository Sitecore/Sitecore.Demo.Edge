import { Field, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';

type HeaderProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Header = (props: HeaderProps): JSX.Element => (
  <>
    <div className="header__eyebrow">
      <div className="header__eyebrow__content">
        <a href="#" className="small">
          EN
        </a>
        <Link href="/account/login">
          <a className="small">Login</a>
        </Link>
      </div>
    </div>
    <div className="header__container">
      <div className="header__container__content">
        <a className="header__container__content__logo" href="/">
          <img src="/assets/img/play-logo-stacked-light.svg" alt="PLAY! Summit logo" />
        </a>
        <Placeholder name="jss-header-content" rendering={props.rendering} />
      </div>
    </div>
  </>
);

export default Header;
