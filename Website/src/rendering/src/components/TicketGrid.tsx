import Link from 'next/link';
import {
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TicketGrid = (): JSX.Element => (
  <section className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 py-14">
    <div className="text-center space-y-6 align-bottom ticket-grid-block ticket-grid-block--blue">
      <div className="slanted-spacer"></div>
      <h2 className="text-4xl font-semibold text-pink">Online Ticket</h2>
      <span className="text-xl py-2 font-semibold">Save 20% on early bird!</span>
      <p>
        <span className="price">$99</span>
        <ul>
          <li><FontAwesomeIcon className="text-pink mr-3" icon={faCheck} /> All access pass</li>
          <li><FontAwesomeIcon className="text-pink mr-3" icon={faCheck} /> Exclusive network lunches</li>
          <li><FontAwesomeIcon className="text-pink mr-3" icon={faCheck} /> 20% off all thousands of goods</li>
          <li><FontAwesomeIcon className="text-pink mr-3" icon={faCheck} /> Free online catalog</li>
          <li><FontAwesomeIcon className="text-pink mr-3" icon={faCheck} /> Print and digital ticket</li>
          <li><FontAwesomeIcon className="text-pink mr-3" icon={faCheck} /> Unlimited customize your agenda</li>
        </ul>
      </p>
      <div className="px-6 pt-4 pb-10">
        <Link href="/tickets/attendee">
          <a className="btn--main btn--main--round font-bold">Get Tickets</a>
        </Link>
      </div>
    </div>
    <div className="text-center space-y-6 align-bottom ticket-grid-block ticket-grid-block--yellow">
      <div className="slanted-spacer"></div>
      <h2 className="text-4xl font-semibold text-orange">Regular Ticket</h2>
      <span className="text-xl py-2 font-semibold">Save 20% on early bird!</span>
      <p>
        <span className="price">$199</span>
        <ul>
          <li><FontAwesomeIcon className="text-orange mr-3" icon={faCheck} /> All access pass</li>
          <li><FontAwesomeIcon className="text-orange mr-3" icon={faCheck} /> Exclusive network lunches</li>
          <li><FontAwesomeIcon className="text-orange mr-3" icon={faCheck} /> 20% off all thousands of goods</li>
          <li><FontAwesomeIcon className="text-orange mr-3" icon={faCheck} /> Free online catalog</li>
          <li><FontAwesomeIcon className="text-orange mr-3" icon={faCheck} /> Print and digital ticket</li>
          <li><FontAwesomeIcon className="text-orange mr-3" icon={faCheck} /> Unlimited customize your agenda</li>
        </ul>
      </p>
      <div className="px-6 pt-4 pb-10">
        <Link href="/tickets/attendee">
          <a className="btn--main btn--main--round font-bold">Get Tickets</a>
        </Link>
      </div>
    </div>
    <div className="text-center space-y-6 align-bottom ticket-grid-block ticket-grid-block--pink">
      <div className="slanted-spacer"></div>
      <h2 className="text-4xl font-semibold text-blue">VIP Ticket</h2>
      <span className="text-xl py-2 font-semibold">Save 20% on early bird!</span>
      <p>
        <span className="price">$399</span>
        <ul>
          <li><FontAwesomeIcon className="text-blue mr-3" icon={faCheck} /> All access pass</li>
          <li><FontAwesomeIcon className="text-blue mr-3" icon={faCheck} /> Exclusive network lunches</li>
          <li><FontAwesomeIcon className="text-blue mr-3" icon={faCheck} /> 20% off all thousands of goods</li>
          <li><FontAwesomeIcon className="text-blue mr-3" icon={faCheck} /> Free online catalog</li>
          <li><FontAwesomeIcon className="text-blue mr-3" icon={faCheck} /> Print and digital ticket</li>
          <li><FontAwesomeIcon className="text-blue mr-3" icon={faCheck} /> Unlimited customize your agenda</li>
        </ul>
      </p>
      <div className="px-6 pt-4 pb-10">
        <Link href="/tickets/attendee">
          <a className="btn--main btn--main--round font-bold">Get Tickets</a>
        </Link>
      </div>
    </div>
  </section>
);

export default TicketGrid;
