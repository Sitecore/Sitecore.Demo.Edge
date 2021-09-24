import Ticket from './Ticket';
import { TICKETS } from '../models/mock-tickets';
import Link from 'next/link';

// const handleClick = (e) => {
//   console.log('Free pizza!');
//   console.log(e);
// };

const TicketTiers = (): JSX.Element => {
  return (
    <div className="tickets">
      <div className="title">Select your ticket</div>
      <div className="section__tickets">
        <Ticket ticket={TICKETS[0]} color="pink" />
        <Ticket ticket={TICKETS[1]} color="orange" />
        <Ticket ticket={TICKETS[2]} color="blue" />
      </div>
      <div className="btn__area">
        <Link href="/tickets">
          <a className="btn--main btn--main--round btn--main--big">Previous</a>
        </Link>
        <Link href="/tickets">
          <a className="btn--main btn--main--round btn--main--big btn-right">Continue</a>
        </Link>
      </div>
    </div>
  );
};

export default TicketTiers;
