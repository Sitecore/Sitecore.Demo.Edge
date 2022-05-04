import Head from 'next/head';
import { ShopLayout } from '../../components/Products/Shop';
import {
  clearAuthenticationTokens,
  isLoggedIn,
  isLoginEnabled,
  loginUrl,
  logoutUrl,
} from '../../services/AuthenticationService';

const Account = (): JSX.Element => {
  /* eslint-disable @next/next/no-html-link-for-pages */
  const loginMenuItem = isLoginEnabled && !isLoggedIn && (
    <div className="shop-navigation-menu-item">
      <a href={loginUrl}>Login</a>
    </div>
  );

  const logoutMenuItem = isLoginEnabled && isLoggedIn && (
    <div className="shop-navigation-menu-item">
      <a href={logoutUrl} onClick={clearAuthenticationTokens}>
        Logout
      </a>
    </div>
  );
  /* eslint-enable @next/next/no-html-link-for-pages */

  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - My Account</title>
      </Head>

      <p>My Account</p>

      {/* TODO: Move login/logout inside the account popup */}
      {loginMenuItem}
      {logoutMenuItem}
    </ShopLayout>
  );
};

export default Account;
