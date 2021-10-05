import { FormEvent, useState } from 'react';
import Router from 'next/router';
import { Ticket } from '../models/ticket';
import TicketView from './Ticket';
import { createDataExtensionByName, identifyVisitor } from '../services/CdpService';
import { useRouter } from 'next/router';

type PaymentFormProps = {
  ticket: Ticket;
};

const PaymentForm = (props: PaymentFormProps): JSX.Element => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const router = useRouter();

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ticketId = router.query?.id?.toString() ?? '0';

    if (!ticketId?.trim()) {
      alert(
        'Ticket information unavailable. Please go back to the tickets page and select a valid ticket.'
      );
      return;
    }

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert('All form fields must be filled.');
      return;
    }

    const payload = { ticket_id: ticketId };
    const pushPayload = { ...payload, key: 'Ticket Type' };

    return await identifyVisitor(email, firstName, lastName)
      .then(() => {
        createDataExtensionByName('TicketPurchased', pushPayload);
      })
      .then(() => {
        Router.push(`/payment/confirmed/${props.ticket.id}`);
      });
  };

  return (
    <div className="min-h-full checkout bg-black mx-auto flex flex-row">
      <div className="panel flex flex-1 flex-col md:flex-row shadow-lg">
        <div className="panel-left w-full md:w-2/3 bg-white rounded-l">
          <form onSubmit={handleFormSubmit}>
            <h1 className="text-3xl font-normal p-10 border-b border-solid border-grey-light">
              Checkout
            </h1>
            <div className="p-5 pt-8 border-b border-solid border-grey-light">
              <div className="mb-3 -mx-2 flex items-end">
                <div className="px-2 w-1/2">
                  <div className="mb-3">
                    <label className="font-bold text-sm mb-2 ml-1">First Name *</label>
                    <div>
                      <input
                        className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="First Name"
                        type="text"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-2 w-1/2">
                  <div className="mb-3">
                    <label className="font-bold text-sm mb-2 ml-1">Last Name *</label>
                    <div>
                      <input
                        className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="Last Name"
                        type="text"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="font-bold text-sm mb-2 ml-1">Email *</label>
                <div>
                  <input
                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Email"
                    type="text"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="p-5 pt-8 border-b border-solid border-grey-light">
              <div className="mb-3">
                <label className="font-bold text-sm mb-2 ml-1">Card Number *</label>
                <div>
                  <input
                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="0000 0000 0000 0000"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="pt-5">
              <button
                className="btn--main btn--main--round btn--main--big block w-full max-w-xs mx-auto rounded-lg px-3 py-3"
                type="submit"
              >
                <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
              </button>
            </div>
          </form>
        </div>
        <div className="panel-right w-full md:w-1/3 rounded-r">
          <div className="p-10">
            <TicketView ticket={props.ticket} activeCssClass="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
