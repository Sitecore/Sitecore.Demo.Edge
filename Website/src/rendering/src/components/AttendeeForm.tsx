import Link from 'next/link';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AttendeeForm = (): JSX.Element => (
  <div className="attendee-form">
    <div className="section__content--top attendee-form-content">
      <div>
        <h2>VIP Ticket</h2>
        <span>Save 20% with early bird!</span>
      </div>
      <ul>
        <li>
          <FontAwesomeIcon icon={faCheck} /> 10% off workshops
        </li>
        <li>
          <FontAwesomeIcon icon={faCheck} /> Free speaker events
        </li>
        <li>
          <FontAwesomeIcon icon={faCheck} /> Discounts on thousands of products
        </li>
        <li>
          <FontAwesomeIcon icon={faCheck} /> Free online catalog
        </li>
        <li>
          <FontAwesomeIcon icon={faCheck} /> 20% off VIP upgrade
        </li>
      </ul>
      <div className="button-area">
        <Link href="/tickets">
          <a className="btn--main btn--main--round">VIP Upgrade</a>
        </Link>
      </div>
    </div>
    <div className="section__content--top attendee-form-form">
      <h2>Attendee Registration</h2>
      <input type="text" placeholder="First name" />
      <input type="text" placeholder="Last name" />
      <input type="text" placeholder="Email" />
      <input type="text" placeholder="Password" />
      <label className="checkbox-label">
        <input type="checkbox" className="form-checkbox" defaultChecked />
        <span className="label-text">If you wish to receive updates on the expo</span>
      </label>
      <label className="checkbox-label">
        <input type="checkbox" className="form-checkbox" defaultChecked />
        <span className="label-text">
          If you wish to receive updates from third party vendors and promotions
        </span>
      </label>
      <div className="button-area">
        <Link href="/tickets/payment">
          <a className="btn--main btn--main--round">Submit</a>
        </Link>
      </div>
      <div className="footnote">
        <p>
          Already have an account? <Link href="/account/login">Log in.</Link>
        </p>
        <p>
          To find out more about how we are using this information you are giving up, please review
          our <Link href="/privacy">privacy statement</Link>
        </p>
      </div>
    </div>
  </div>
);

export default AttendeeForm;
