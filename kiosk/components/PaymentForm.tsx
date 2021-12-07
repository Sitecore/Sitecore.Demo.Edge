import { FormEvent, useState } from 'react';
import Router from 'next/router';
import { Ticket } from '../models/ticket';
import TicketView from './Ticket';
import { identifyVisitor, logTicketPurchase } from '../services/CdpService';

type PaymentFormProps = {
  ticket: Ticket;
};

const PaymentForm = (props: PaymentFormProps): JSX.Element => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert('All form fields must be filled.');
      return;
    }

    return await identifyVisitor(email, firstName, lastName)
      .then(() => logTicketPurchase(parseInt(props.ticket.id)))
      .then(() => Router.push(`/payment/confirmed/${props.ticket.id}?email=${email}`))
      .catch((e) => {
        console.log(e);
        alert('An error occurred while processing the purchase.');
      });
  };

  return (
    <div className="paymentForm">
      <div className="title">Checkout</div>

      <div className="panel">
        <div className="ticket">
          <TicketView ticket={props.ticket} activeCssClass="" />
        </div>
        <div className="payment">
          <form onSubmit={handleFormSubmit}>
            <h1 className="heading">Enter your payment details</h1>
            <div className="fields">
              <div className="mb-3">
                <label>First Name *</label>
                <div>
                  <input
                    placeholder="First Name"
                    type="text"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label>Last Name *</label>
                <div>
                  <input
                    placeholder="Last Name"
                    type="text"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label>Email *</label>
                <div>
                  <input
                    placeholder="Email"
                    type="text"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="complete">
              <button
                className="btn--main btn--main--round btn--main--primary btn--main--big block w-full max-w-xs mx-auto rounded-lg px-3 py-3"
                type="submit"
              >
                <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="paymentForm__buttons">
        <span
          className="btn--main btn--main--round btn--main--secondary btn--main--big"
          onClick={() => Router.back()}
        >
          Previous
        </span>
      </div>
    </div>
  );
};

export default PaymentForm;
