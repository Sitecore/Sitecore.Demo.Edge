import { Field, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import css from '../assets/styles/header.module.scss';

type HeaderProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Header = (props: HeaderProps): JSX.Element => (
  <>
    <div className={css.header}>
      <div className={css.header__eyebrow}>
        <div className={css.header__eyebrow__content}>
          <a href="#" className="small">
            EN
          </a>
          <a href="#" className="small">
            Login
          </a>
        </div>
      </div>
      <div className={css.header__container}>
        <div className={css.header__container__content}>
          <a className={css.header__container__content__logo} href="#">
            <img src="assets/img/play-logo-stacked-light.svg" alt="PLAY! Summit logo" />
          </a>
          <Placeholder name="jss-header-content" rendering={props.rendering} />
        </div>
      </div>
    </div>
  </>
);

export default Header;
