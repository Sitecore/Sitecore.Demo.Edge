import Link from 'next/link';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TICKETS } from '../../models/mock-tickets';

const TicketGrid = (): JSX.Element => {
  const ticketsToDisplay = TICKETS.filter((ticket) => !ticket.isUpgrade);

  const tickets =
    ticketsToDisplay &&
    ticketsToDisplay.length > 0 &&
    ticketsToDisplay.map((ticket, ticketIndex) => (
      <div className={`ticket-grid-block ticket-grid-block-${ticket.color}`} key={ticketIndex}>
        <div className="ticket-content">
          <div className="slanted-spacer"></div>
          <h2 className="ticket-name">{ticket.name}</h2>
          <span className="ticket-subtitle">Save 20% on early bird!</span>
          <div>
            <span className="ticket-price">${ticket.price}</span>
            {ticket.benefits && (
              <ul>
                {ticket.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex}>
                    <FontAwesomeIcon icon={faCheck} /> {benefit}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="ticket-button-container">
          <Link href={`/tickets/registration/attendee?ticket=${ticket.id}`}>
            <a className="btn-main">Get Tickets</a>
          </Link>
        </div>
      </div>
    ));

  return <section className="container ticket-grid">{tickets}</section>;
};

export default TicketGrid;
