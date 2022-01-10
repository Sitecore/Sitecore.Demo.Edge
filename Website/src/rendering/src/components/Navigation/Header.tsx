import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useUser } from '@auth0/nextjs-auth0';

import Link from 'next/link';

export type HeaderProps = ComponentProps;

const Header = (props: HeaderProps): JSX.Element => {
  const { user, error, isLoading } = useUser();
  console.log(user);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  /* eslint-disable */
  return (
    <>
      <div className="header-eyebrow">
        <div className="content">
          <a href="#">EN</a>
          {!user && <a href="/api/auth/login">Login</a>}
          <Link href="/cart">
            <a>Cart</a>
          </Link>
          {user && (
            <>
              <a href="#">{user?.name}</a>
              <a href="/api/auth/logout">Logout</a>
            </>
          )}
        </div>
      </div>
      <Placeholder name="jss-header-content" rendering={props.rendering} />
    </>
  );
  /* eslint-enable */
};

export default Header;
