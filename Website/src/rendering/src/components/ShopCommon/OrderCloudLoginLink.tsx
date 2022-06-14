import { Tokens } from 'ordercloud-javascript-sdk';
import { COOKIES_ANON_ORDER_ID, COOKIES_ANON_USER_TOKEN } from '../../constants/cookies';
import useOcAuth from '../../hooks/useOcAuth';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import { getLoginUrl } from '../../services/AuthenticationService';
import { setCookie } from '../../services/CookieService';

type OrderCloudLoginLinkProps = {
  children?: React.ReactNode;
  redirectToPathOnLogin?: string;
  className?: string;
};
const OrderCloudLoginLink = (props: OrderCloudLoginLinkProps): JSX.Element => {
  const { isAnonymous } = useOcAuth();
  const { order } = useOcCurrentCart();

  const handleClick = () => {
    if (isAnonymous && order?.LineItemCount > 0) {
      // store anon order details so we can transfer when user logs in
      const expireCookiesAfterMinutes = 5;
      setCookie(COOKIES_ANON_USER_TOKEN, Tokens.GetAccessToken(), expireCookiesAfterMinutes);
      setCookie(COOKIES_ANON_ORDER_ID, order.ID, expireCookiesAfterMinutes);
    }
    // redirect programatically to avoid race conditions if we were to define
    // both a click handler and an href
    location.href = getLoginUrl(props.redirectToPathOnLogin);
  };
  return (
    <a onClick={handleClick} {...props}>
      {props.children}
    </a>
  );
};

export default OrderCloudLoginLink;
