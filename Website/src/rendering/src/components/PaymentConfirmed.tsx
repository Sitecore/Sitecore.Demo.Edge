import Link from 'next/link';

const PaymentConfirmed = (): JSX.Element => (
  <div className="grid justify-items-stretch w-full grid-cols-5 attendee-form gap-10">
    <div className="text-center space-y-5 attendee-form-content col-span-3 border border-gray-300 ml-4">
      <div className="p-5">
        <h2>Payment Confirmed</h2>
      </div>
      <p className="text-left m-5">
        Thank you for your order. We look forward to seeing you at the PLAY! Summit. Use the
        following Code to check-in during the event.
      </p>
      <div className="w-full">
        <img className="h-60 w-60 mx-auto" src="/assets/img/payment/qr.png" alt="confirmed" />
      </div>
      <div className="px-6 pt-4 pb-4">
        <Link href="/tickets">
          <a className="btn--main btn--main--round">Download Ticket</a>
        </Link>
      </div>
      <div className="px-6 pt-4 pb-4 pb-10">
        <Link href="/tickets">
          <a className="btn--main btn--main--round">Contact Support</a>
        </Link>
      </div>
    </div>
    <div className="attendee-form-form col-span-2 space-y-5">
      <div className="w-full align-top">
        <div className="bg-black p-5 text-white">
          <h2>Order Summary</h2>
        </div>
        <div className="bg-gray-light text-sm p-5 space-y-5">
          <div>
            <strong>Details</strong>
          </div>
          <div>
            <div className="flex">
              <span className="flex-1 w-1/2 font-bold">Regular Ticker</span>
              <span className="flex-2 w-1/2 font-bold">$149.00</span>
            </div>
            <div>
              <span className="flex-1 w-1/2">x 1 Regular Event Pass</span>
            </div>
          </div>
          <div>
            <div className="flex">
              <span className="flex-1 w-1/2 font-bold">Fees</span>
              <span className="flex-2 w-1/2 font-bold">$7.00</span>
            </div>
            <div>
              <span className="flex-1 w-1/2">x 1 Service Charge</span>
            </div>
          </div>
          <div className="flex">
            <span className="flex-1 w-1/2 font-bold">Total</span>
            <span className="flex-2 w-1/2 font-bold">$156.00</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PaymentConfirmed;
