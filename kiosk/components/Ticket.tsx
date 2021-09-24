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
        <div className="ticket-price">{props.ticket.price}</div>
        <ul>
          <li>
            <FontAwesomeIcon icon={faCheck} /> {props.ticket.pass}
          </li>
          {props.ticket.benefits.map(function (item, i) {
            return (
              <li key={i}>
                <FontAwesomeIcon icon={faCheck} /> {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TicketView;
