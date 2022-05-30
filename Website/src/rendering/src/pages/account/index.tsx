import UserProfile from '../../components/Account/UserProfile';
import Head from 'next/head';
import { ShopLayout } from '../../components/Products/Shop';
import {
  clearAuthenticationTokens,
  isLoggedIn,
  isAuthenticationEnabled,
  getLoginUrl,
  logoutUrl,
} from '../../services/AuthenticationService';

const Account = (): JSX.Element => {
  /* eslint-disable @next/next/no-html-link-for-pages */
  const loginMenuItem = isAuthenticationEnabled && !isLoggedIn && (
    <div className="shop-navigation-menu-item">
      <a href={getLoginUrl('/shop')}>Login</a>
    </div>
  );

  const logoutMenuItem = isAuthenticationEnabled && isLoggedIn && (
    <div className="shop-navigation-menu-item">
      <a href={logoutUrl} onClick={clearAuthenticationTokens}>
        Logout
      </a>
    </div>
  );
  /* eslint-enable @next/next/no-html-link-for-pages */

  const userProfile = isLoggedIn && <UserProfile />;

  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - My Account</title>
      </Head>

      {userProfile}

      {/* TODO: Move login/logout inside the account popup */}
      {loginMenuItem}
      {logoutMenuItem}
    </ShopLayout>
  );
};

export default Account;
