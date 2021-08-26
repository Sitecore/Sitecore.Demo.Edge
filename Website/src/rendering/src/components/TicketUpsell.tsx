import Link from 'next/link';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TicketUpsell = (): JSX.Element => (
  <div className="ticket-upsell">
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
);

export default TicketUpsell;
