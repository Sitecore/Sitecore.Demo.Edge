import Link from 'next/link';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TicketGrid = (): JSX.Element => (
  <section className="container section__tickets">
    <div className="ticket-grid-block ticket-grid-block--pink">
      <div className="slanted-spacer"></div>
      <h2 className="ticket-name">Online Ticket</h2>
      <span className="ticket-subtitle">Save 20% on early bird!</span>
      <p>
        <span className="ticket-price">$99</span>
        <ul>
          <li>
            <FontAwesomeIcon icon={faCheck} /> All access pass
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Exclusive network lunches
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> 20% off all thousands of goods
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Free online catalog
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Print and digital ticket
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Unlimited customize your agenda
          </li>
        </ul>
      </p>
      <div className="ticket-button-container">
        <Link href="/tickets/attendee">
          <a className="btn--main btn--main--round">Get Tickets</a>
        </Link>
      </div>
    </div>
    <div className="ticket-grid-block ticket-grid-block--orange">
      <div className="slanted-spacer"></div>
      <h2 className="ticket-name">Regular Ticket</h2>
      <span className="ticket-subtitle">Save 20% on early bird!</span>
      <p>
        <span className="ticket-price">$199</span>
        <ul>
          <li>
            <FontAwesomeIcon icon={faCheck} /> All access pass
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Exclusive network lunches
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> 20% off all thousands of goods
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Free online catalog
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Print and digital ticket
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Unlimited customize your agenda
          </li>
        </ul>
      </p>
      <div className="ticket-button-container">
        <Link href="/tickets/attendee">
          <a className="btn--main btn--main--round">Get Tickets</a>
        </Link>
      </div>
    </div>
    <div className="ticket-grid-block ticket-grid-block--blue">
      <div className="slanted-spacer"></div>
      <h2 className="ticket-name">VIP Ticket</h2>
      <span className="ticket-subtitle">Save 20% on early bird!</span>
      <p>
        <span className="ticket-price">$399</span>
        <ul>
          <li>
            <FontAwesomeIcon icon={faCheck} /> All access pass
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Exclusive network lunches
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> 20% off all thousands of goods
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Free online catalog
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Print and digital ticket
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Unlimited customize your agenda
          </li>
        </ul>
      </p>
      <div className="ticket-button-container">
        <Link href="/tickets/attendee">
          <a className="btn--main btn--main--round">Get Tickets</a>
        </Link>
      </div>
    </div>
  </section>
);

export default TicketGrid;
