import { PropsWithChildren } from 'react';
import useOcAuth from '../../hooks/useOcAuth';
import Link from 'next/link';
import { getLoginUrl, isAuthenticationEnabled } from '../../services/AuthenticationService';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

export const AccountLayout = (props: PropsWithChildren<unknown>): JSX.Element => {
  const router = useRouter();
  const { isAuthenticated, isAnonymous } = useOcAuth();

  if (!isAuthenticationEnabled) {
    return null;
  }

  // Show account content if user is logged in, otherwise show login/register prompt
  const accountContent =
    isAuthenticated && !isAnonymous ? (
      <>{props.children}</>
    ) : (
      <section className="section shop-container account-layout">
        <h1>Oops, it seems that you are not logged in.</h1>
        <p>Log in or register to view order history, saved addresses and more!</p>
        <div className="account-layout-grid">
          <div className="account-layout-grid-item">
            <FontAwesomeIcon icon={faSignInAlt} className="text-pink" />
            <h6 className="item-title">Already a member?</h6>
            <p>Log in your existing account!</p>
            <Link href={getLoginUrl(router.asPath)}>
              <a className="btn--main btn--main--round">Log in</a>
            </Link>
          </div>
          <div className="account-layout-grid-item">
            <FontAwesomeIcon icon={faPlus} className="text-orange" />
            <h6 className="item-title">Want more discounts?</h6>
            <p>Join us for more exclusive deals!</p>
            {/* TODO: Replace with signup url when available */}
            <Link href={getLoginUrl(router.asPath)}>
              <a className="btn--main btn--main--round">Sign up</a>
            </Link>
          </div>
        </div>
      </section>
    );

  return <>{accountContent}</>;
};
