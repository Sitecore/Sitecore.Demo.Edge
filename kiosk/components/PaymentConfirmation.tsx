import Link from 'next/link';
import qr from '../public/tickets/qr.png';
import { Ticket } from '../models/ticket';
import Image from 'next/image';

type PaymentConfirmationProps = {
  ticket: Ticket;
};

const PaymentConfirmation = (props: PaymentConfirmationProps): JSX.Element => {
  return (
    <section
      className="paymentConfirmation banner"
      style={{
        backgroundImage:
          'url(' +
          'https://demoedge.sitecoresandbox.cloud/api/public/content/115758f6f42b4b5387dd2f97f5e9b486?v=92f5a28e' +
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
              <Image src={qr} alt={props.ticket.name} width="200" height="200" />
            </div>
            <Link href="/" passHref>
              <button className="btn--main btn--main--round btn--main--big block rounded-lg py-3">
                End Session
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentConfirmation;
