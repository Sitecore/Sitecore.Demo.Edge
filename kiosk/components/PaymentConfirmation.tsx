import Link from 'next/link';
import Image from 'next/image';
import qr from '../public/tickets/qr.png';
import { Ticket } from '../models/ticket';

type PaymentConfirmationProps = {
  ticket: Ticket;
};

const PaymentConfirmation = (props: PaymentConfirmationProps): JSX.Element => {
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
            <div className="mb-3 p-5">
              <Link href="/" passHref>
                <button className="btn--main btn--main--round btn--main--big block rounded-lg px-3 py-3">
                  End Session
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="panel-right w-full md:w-1/3 text-white rounded-r">
          <div className="p-10">
            <h2 className="font-bold text-xl mb-4">{props.ticket.pass}</h2>
            <div className="mb-4">
              <span className="text-2xl font-light lh-fix">{props.ticket.price}</span>
            </div>
            <div className="italic w-3/4 leading-normal mb-8">{props.ticket.name}</div>
            <div className="list-items mb-8">
              <div className="flex items-center mb-4">
                <div>
                  Access to <span className="font-bold">all</span> online sessions
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div>10% off all digital vendor goods</div>
              </div>
              <div className="flex items-center mb-4">
                <div>Free online sessions after the event</div>
              </div>
            </div>

            <div className="border-b border-solid border-blue-light"></div>

            <div className="testimonial pt-10 text-lg italic leading-normal mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales mi in magna
              accumsan.
            </div>

            <div className="flex items-center">
              <div className="text-lg font-bold">Alba</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
