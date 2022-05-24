import Link from 'next/link';
import useOcUser from '../../hooks/useOcUser';
import {
  clearAuthenticationTokens,
  isLoggedIn,
  isAuthenticationEnabled,
  loginUrl,
  logoutUrl,
} from '../../services/AuthenticationService';

const AccountPopup = (): JSX.Element => {
  const { user } = useOcUser();

  const guestMenuItems = isAuthenticationEnabled && !isLoggedIn && (
    <>
      <Link href={loginUrl}>
        <a className="btn--secondary btn--secondary--light btn--secondary--round">Login</a>
      </Link>
      {/* TODO Replace with signup url when available */}
      <Link href={loginUrl}>
        <a className="btn--main btn--main--round">Register</a>
      </Link>
    </>
  );

  const loggedInMenuItems = isAuthenticationEnabled && isLoggedIn && (
    <>
      <h3>
        Greetings, {user?.FirstName} {user?.LastName}
      </h3>
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
