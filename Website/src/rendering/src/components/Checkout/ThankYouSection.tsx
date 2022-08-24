import { faEnvelope, faPrint, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import useOcAuth from '../../hooks/useOcAuth';
import OrderCloudLoginLink from '../ShopCommon/OrderCloudLoginLink';

const ThankYouSection = (): JSX.Element => {
  const { isAuthenticated, isAnonymous } = useOcAuth();

  const content =
    isAuthenticated && !isAnonymous ? (
      <li>
        <span className="item-icon">
          <FontAwesomeIcon icon={faPrint} />
        </span>
        <p>
          You can visit the{' '}
          <span className="font-medium">
            <Link href="/account/orders">Order history</Link>
          </span>{' '}
          page at any time to check the status of your order or view order history. Or{' '}
          <Link href="#">
            <a>click here</a>
          </Link>{' '}
          to print a copy of your receipt.
        </p>
      </li>
    ) : (
      <>
        <li>
          <span className="item-icon">
            <FontAwesomeIcon icon={faPrint} />
          </span>
          <p>
            You can now{' '}
            <Link href="#">
              <a>print a copy</a>
            </Link>{' '}
            of your receipt.
          </p>
        </li>
        <li>
          <span className="item-icon">
            <FontAwesomeIcon icon={faUsers} />
          </span>
          <p>
            To follow the state of your order and view order history, please{' '}
            <OrderCloudLoginLink redirectToPathOnLogin="/account/orders">
              create an account
            </OrderCloudLoginLink>
            .
          </p>
        </li>
      </>
    );

  return (
    <section className="thank-you-section">
      <ul>
        <li>
          <span className="item-icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <p>
            An email receipt including the details of your order has been sent to the email address
            provided. Please keep it for your records.
          </p>
        </li>
        {content}
      </ul>
    </section>
  );
};

export default ThankYouSection;
