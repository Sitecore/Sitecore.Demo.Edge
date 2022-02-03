import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

import Link from 'next/link';

export type HeaderProps = ComponentProps;

const Header = (props: HeaderProps): JSX.Element => (
  <>
    <div className="header-eyebrow">
      <div className="content">
        <a href="#">EN</a>
        <Link href="/account/login">
          <a>Login</a>
        </Link>
        <Link href="/checkout/cart">
          <a>Cart</a>
        </Link>
      </div>
    </div>
    <Placeholder name="jss-header-content" rendering={props.rendering} />
  </>
);

export default Header;
