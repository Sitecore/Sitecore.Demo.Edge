import { faEnvelope, faPrint, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const ThankYouSection = (): JSX.Element => (
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
      {/* TODO: Show if user is logged in */}
      {/* <li>
        <span className="item-icon">
          <FontAwesomeIcon icon={faPrint} />
        </span>
        <p>
          You can visit the <span className="font-medium">&quot;My account&quot;</span> page at any
          time to check the status of your order. Or{' '}
          <Link href="#">
            <a>click here</a>
          </Link>{' '}
          to print a copy of your receipt.
        </p>
      </li> */}
      {/* TODO: Don't show if user is logged in */}
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
      {/* TODO: Don't show if user is logged in */}
      <li>
        <span className="item-icon">
          <FontAwesomeIcon icon={faUsers} />
        </span>
        <p>
          To follow the state of your order, please{' '}
          <Link href="/account/login">
            <a>create an account</a>
          </Link>
          .
        </p>
      </li>
    </ul>
  </section>
);

export default ThankYouSection;
