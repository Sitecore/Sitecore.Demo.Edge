import Link from 'next/link';
import { Ticket } from '../models/ticket';
import TicketView from './Ticket';

type PaymentFormProps = {
  ticket: Ticket;
};

const PaymentForm = (props: PaymentFormProps): JSX.Element => {
  return (
    <div className="paymentForm">
      <div className="title">Checkout</div>

      <div className="panel flex flex-1 flex-col md:flex-row shadow-lg">
        <div className="ticket">
          <TicketView ticket={props.ticket} activeCssClass="" />
        </div>
        <div className="payment">
          <form action="#">
            <h1 className="heading">Enter your payment details</h1>
            <div className="fields">
              <div className="mb-3">
                <label>First Name</label>
                <div>
                  <input placeholder="Last Name" type="text" />
                </div>
              </div>

              <div className="mb-3">
                <label>Last Name</label>
                <div>
                  <input placeholder="Last Name" type="text" />
                </div>
              </div>

              <div className="mb-3">
                <label>Email</label>
                <div>
                  <input placeholder="Email" type="text" />
                </div>
              </div>
            </div>

            <div className="complete">
              <Link href={'/payment/confirmed/' + props.ticket.id} passHref>
                <button className="completePayment btn--main btn--main--round btn--main--big">
                  Complete Payment
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="paymentForm__buttons">
        <Link href="/">
          <a className="btn--main btn--main--round btn--main--big">Previous</a>
        </Link>
      </div>
    </div>
  );
};

export default PaymentForm;
