import { FormEvent } from 'react';
import Router from 'next/router';
import qr from '../public/tickets/qr.png';
import { Ticket } from '../models/ticket';
import Image from 'next/image';
import { forgetCurrentGuest } from '../services/CdpService';
import copyTextToClipboard from '../utilities/clipboard';

type PaymentConfirmationProps = {
  ticket: Ticket;
};

const PaymentConfirmation = (props: PaymentConfirmationProps): JSX.Element => {
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    return await forgetCurrentGuest().then(() => Router.push('/'));
  };

  const handleQrClick = () => {
    const emailQueryStringValue = Router.query['email'];
    let email = '';
    if (emailQueryStringValue) {
      if (typeof emailQueryStringValue === 'string') {
        email = emailQueryStringValue as string;
      } else if (typeof emailQueryStringValue === 'object') {
        email = emailQueryStringValue[0];
      }
    }

    if (!email) {
      alert('Email must be provided.');
      return;
    }

    // Encode email to preserve any special characters (e.g. +, &)
    const encodedEmail = encodeURIComponent(email);

    const personalLinkToWebsite = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/?email=${encodedEmail}`;
    copyTextToClipboard(personalLinkToWebsite);
  };

  return (
    <section
      className="paymentConfirmation banner"
      style={{
        backgroundImage:
          'url(' +
          'https://playsummit.sitecoresandbox.cloud/api/public/content/69128c1b344947d283b3faf30b6078b1?v=288378d0' +
          ')',
      }}
    >
      <div className="paymentConfirmation__container container">
        <div className="paymentConfirmation__container__content">
          <div className="paymentConfirmation__container__content__text">
            <h1 className="heading">Payment Confirmed</h1>
            <h2>Thank You!</h2>
            <p>Thank you for your order. We look forward to seeing you at the PLAY! Summit.</p>
            <p>Use the following Code to check-in during the event.</p>
            <div className="qr">
              <Image
                src={qr}
                alt={props.ticket.name}
                width="200"
                height="200"
                title="Click to copy website personal link"
                onClick={handleQrClick}
              />
            </div>
            <form onSubmit={handleFormSubmit}>
              <button
                className="btn--main btn--main--round btn--main--primary btn--main--big block rounded-lg px-3 py-3"
                type="submit"
              >
                End Session
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentConfirmation;
