import Link from 'next/link';
import { useRouter } from 'next/router';
import useOcUser from '../../hooks/useOcUser';
import useOcAuth from '../../hooks/useOcAuth';
import {
  clearAuthenticationTokens,
  isAuthenticationEnabled,
  logoutUrl,
} from '../../services/AuthenticationService';
import OrderCloudLoginLink from '../ShopCommon/OrderCloudLoginLink';

type AccountPopupProps = {
  onNavigatingAway: () => void;
};

const AccountPopup = ({ onNavigatingAway }: AccountPopupProps): JSX.Element => {
  const router = useRouter();
  const { user } = useOcUser();
  const { isAnonymous, isAuthenticated } = useOcAuth();

  if (!isAuthenticationEnabled) {
    return null;
  }

  const isUserLoggedIn = !isAnonymous && isAuthenticated;

  const guestMenuItems = !isUserLoggedIn && (
    <>
      <OrderCloudLoginLink className="btn-secondary-light" redirectToPathOnLogin={router.asPath}>
        Login
      </OrderCloudLoginLink>
      {/* TODO: Replace with signup url when available */}
      <OrderCloudLoginLink className="btn-main" redirectToPathOnLogin={router.asPath}>
        Register
      </OrderCloudLoginLink>
    </>
  );

  const getGreeting = () => {
    if (!isUserLoggedIn) {
      return null;
    }

    let greeting = <h3>Greetings</h3>;
    if (user?.FirstName || user?.LastName) {
      greeting = (
        <h3>
          Greetings,{' '}
          <Link href="/account">
            <a>
              {user?.FirstName} {user?.LastName}
            </a>
          </Link>
        </h3>
      );
    }
    return greeting;
  };

  const loggedInMenuItems = isUserLoggedIn && (
    <>
      <Link href="/account/address-book">
        <a className="btn-secondary-light" onClick={onNavigatingAway}>
          Address book
        </a>
      </Link>
      <Link href="/account/payment-methods">
        <a className="btn-secondary-light" onClick={onNavigatingAway}>
          Payment methods
        </a>
      </Link>
      <Link href="/account/orders">
        <a className="btn-secondary-light" onClick={onNavigatingAway}>
          Order history
        </a>
      </Link>
      <Link href={logoutUrl}>
        <a className="btn-main" onClick={clearAuthenticationTokens}>
          Logout
        </a>
      </Link>
    </>
  );

  const loggedInClass = isUserLoggedIn ? 'account-popup-logged' : '';

  return (
    <div className={`account-popup ${loggedInClass}`}>
      {getGreeting()}
      <div className="account-popup-buttons">
        {guestMenuItems}
        {loggedInMenuItems}
      </div>
    </div>
  );
};

export default AccountPopup;
