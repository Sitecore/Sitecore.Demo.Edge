import { faIdBadge, faPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrderCloudLoginLink from '../ShopCommon/OrderCloudLoginLink';
import Link from 'next/link';

const PreCheckout = (): JSX.Element => {
  return (
    <section className="precheckout shop-container">
      <h1>Choose an option</h1>
      <p>to continue with checkout</p>
      <div className="precheckout-grid">
        <div className="precheckout-grid-item">
          <FontAwesomeIcon icon={faSignInAlt} className="text-pink" />
          <h6 className="item-title">Already a member?</h6>
          <p>Log in your existing account!</p>
          <OrderCloudLoginLink redirectToPathOnLogin="/shop/checkout/checkout" className="btn-main">
            Log in
          </OrderCloudLoginLink>
        </div>
        <div className="precheckout-grid-item">
          <FontAwesomeIcon icon={faPlus} className="text-orange" />
          <h6 className="item-title">Want more discounts?</h6>
          <p>Join us for more exclusive deals!</p>
          <OrderCloudLoginLink redirectToPathOnLogin="/shop/checkout/checkout" className="btn-main">
            Sign up
          </OrderCloudLoginLink>
        </div>
        <div className="precheckout-grid-item">
          <FontAwesomeIcon icon={faIdBadge} className="text-blue" />
          <h6 className="item-title">It will be a single purchase?</h6>
          <p>Continue to our guest option!</p>
          <Link href="/shop/checkout/checkout">
            <a className="btn-main">Continue</a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PreCheckout;
