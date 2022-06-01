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

const AccountPopup = (): JSX.Element => {
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
    let greeding = 'Greetings';
    if (user?.FirstName || user?.LastName) {
      greeding += `, ${user?.FirstName} ${user?.LastName}`;
    }
    return greeding;
  };

  const loggedInMenuItems = isUserLoggedIn && (
    <>
      <h3>{getGreeting()}</h3>
      <Link href={logoutUrl}>
        <a className="btn--main btn--main--round" onClick={clearAuthenticationTokens}>
          Logout
        </a>
      </Link>
    </>
  );

  return (
    <div className="account-popup">
      <div className="account-popup-buttons">
        {guestMenuItems}
        {loggedInMenuItems}
      </div>
    </div>
  );
};

export default AccountPopup;
