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
        <FontAwesomeIcon icon={faCheck} /> All access VIP pass
      </li>
      <li>
        <FontAwesomeIcon icon={faCheck} /> VIP access to exclusive workshops and special keynotes
      </li>
      <li>
        <FontAwesomeIcon icon={faCheck} /> 20% off all vendor goods
      </li>
      <li>
        <FontAwesomeIcon icon={faCheck} /> Free online sessions after the event
      </li>
      <li>
        <FontAwesomeIcon icon={faCheck} /> Print and digital ticket
      </li>
      <li>
        <FontAwesomeIcon icon={faCheck} /> Unlimited customize your agenda
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
