import { PropsWithChildren } from 'react';
import useOcAuth from '../../hooks/useOcAuth';
import { isAuthenticationEnabled } from '../../services/AuthenticationService';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import OrderCloudLoginLink from '../ShopCommon/OrderCloudLoginLink';

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
            <OrderCloudLoginLink redirectToPathOnLogin={router.asPath} className="btn-main">
              Log in
            </OrderCloudLoginLink>
          </div>
          <div className="account-layout-grid-item">
            <FontAwesomeIcon icon={faPlus} className="text-orange" />
            <h6 className="item-title">Want more discounts?</h6>
            <p>Join us for more exclusive deals!</p>
            {/* TODO: Replace with signup url when available */}
            <OrderCloudLoginLink redirectToPathOnLogin={router.asPath} className="btn-main">
              Sign up
            </OrderCloudLoginLink>
          </div>
        </div>
      </section>
    );

  return <>{accountContent}</>;
};
