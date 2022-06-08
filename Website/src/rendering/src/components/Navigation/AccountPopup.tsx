import Link from 'next/link';
import { useRouter } from 'next/router';
import useOcUser from '../../hooks/useOcUser';
import useOcAuth from '../../hooks/useOcAuth';
import {
  clearAuthenticationTokens,
  isAuthenticationEnabled,
  getLoginUrl,
  logoutUrl,
} from '../../services/AuthenticationService';

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
      <Link href={getLoginUrl(router.asPath)}>
        <a className="btn--secondary btn--secondary--light btn--secondary--round">Login</a>
      </Link>
      {/* TODO: Replace with signup url when available */}
      <Link href={getLoginUrl(router.asPath)}>
        <a className="btn--main btn--main--round">Register</a>
      </Link>
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
        <a
          className="btn--secondary btn--secondary--light btn--secondary--round"
          onClick={onNavigatingAway}
        >
          Address book
        </a>
      </Link>
      <Link href="/account/payment-methods">
        <a
          className="btn--secondary btn--secondary--light btn--secondary--round"
          onClick={onNavigatingAway}
        >
          Payment methods
        </a>
      </Link>
      <Link href="/account/orders">
        <a
          className="btn--secondary btn--secondary--light btn--secondary--round"
          onClick={onNavigatingAway}
        >
          Order history
        </a>
      </Link>
      <Link href={logoutUrl}>
        <a className="btn--main btn--main--round" onClick={clearAuthenticationTokens}>
          Logout
        </a>
      </Link>
    </>
  );

  return (
    // TODO: Remove conditions from JSX
    <div
      className={`account-popup ${
        isUserLoggedIn ? 'account-popup-logged' : 'account-popup-anonymous'
      }`}
    >
      {getGreeting()}
      <div className="account-popup-buttons">
        {guestMenuItems}
        {loggedInMenuItems}
      </div>
    </div>
  );
};

export default AccountPopup;
