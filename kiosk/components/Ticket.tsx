import { Ticket } from '../models/ticket';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type TicketProps = {
  ticket: Ticket;
  color: string;
};

const TicketView = (props: TicketProps): JSX.Element => {
  return (
    <div className={'ticket-content ticket-content--' + props.color}>
      {console.log(props.ticket)}
      <div className="slanted-spacer"></div>
      <div className="ticket-text">
        <h2 className="ticket-name">Online Ticket</h2>
        <div className="ticket-subtitle">Save 20% on early bird!</div>
        <div className="ticket-price">$99</div>
        <ul>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Digital Pass
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Access to all online sessions
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> 10% off all digital vendor goods
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Free online sessions after the event
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Digital ticket only
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} /> Unlimited customize your agenda
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TicketView;
