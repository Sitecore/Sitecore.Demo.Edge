import { FormEvent } from 'react';
import Router from 'next/router';
import qr from '../public/tickets/qr.png';
import { Ticket } from '../models/ticket';
import Image from 'next/image';
import TicketView from './Ticket';
import { forgetCurrentGuest } from '../services/CdpService';

type PaymentConfirmationProps = {
  ticket: Ticket;
};

const PaymentConfirmation = (props: PaymentConfirmationProps): JSX.Element => {
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    return await forgetCurrentGuest().then(() => {
      Router.push('/');
    });
  };

  return (
    <div className="min-h-full checkout bg-black mx-auto flex flex-row">
      <div className="panel flex flex-1 flex-col md:flex-row shadow-lg">
        <div className="panel-left w-full md:w-2/3 bg-white rounded-l">
          <h1 className="text-3xl font-normal p-10 border-b border-solid border-grey-light">
            Payment Confirmed
          </h1>
          <div className="p-5 pt-8 border-b border-solid border-grey-light">
            <div className="mb-3 p-5">
              <p>
                Thank you for your order. We look forward to seeing you at the PLAY! Summit. Use the
                following Code to check-in during the event.
              </p>
            </div>
            <div className="max-w-xs mx-auto ">
              <Image src={qr} alt="QR" width="200" height="200" />
            </div>
            <form className="mb-3 p-5" onSubmit={handleFormSubmit}>
              <button className="btn--main btn--main--round btn--main--big block rounded-lg px-3 py-3" type="submit">
                End Session
              </button>
            </form>
          </div>
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

export default PaymentConfirmation;
