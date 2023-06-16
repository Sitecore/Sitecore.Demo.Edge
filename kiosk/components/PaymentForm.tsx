import { FormEvent, useState } from 'react';
import Router from 'next/router';
import { Ticket, TicketItem, TicketOrder, TicketPayment } from '../models/ticket';
import TicketView from './Ticket';
import {
  identifyVisitor,
  logAddToCart,
  logOrderCheckout,
  logTicketPurchase,
} from '../services/CdpService';

type PaymentFormProps = {
  ticket: Ticket;
};

const PaymentForm = ({ ticket }: PaymentFormProps): JSX.Element => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert('All form fields must be filled.');
      return;
    }

    // Create ticketItem for the ADD CDP event
    const ticketItem: TicketItem = {
      type: 'Ticket',
      id: ticket.id,
      name: ticket.name,
      price: ticket.price,
    };

    // Create ticketOrder and ticketPayment for the ORDER_CHECKOUT CDP event
    const ticketOrder: TicketOrder = {
      id: ticket.id,
      total: ticket.price,
    };

    const ticketPayment: TicketPayment = {
      type: 'Card',
      cardType: 'Visa',
    };

    try {
      await identifyVisitor(email, firstName, lastName);
      await logAddToCart(ticketItem, 1);
      await logOrderCheckout(ticketOrder, ticketItem, ticketPayment);
      await logTicketPurchase(parseInt(ticket.id));

      // Encode email to preserve any special characters (e.g. +, &)
      const encodedEmail = encodeURIComponent(email);
      Router.push(`/payment/confirmed/${ticket.id}?email=${encodedEmail}`);
    } catch (e) {
      console.log(e);
      alert('An error occurred while processing the purchase.');
    }
  };

  return (
    <div className="paymentForm">
      <div className="title">Checkout</div>

      <div className="panel">
        <div className="ticket">
          <TicketView ticket={ticket} activeCssClass="" />
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
