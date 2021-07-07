import Link from 'next/link';

const PaymentConfirmed = (): JSX.Element => (
  <div className="section gap-4 w-full bg-white flex item-start text-left">
    <div className="section__content p-10 space-y-6 border border-gray-300 ml-4">
      <h2>Payment Confirmed</h2>
      <p className="text-left">
        Thank you for your order. We look forward to seeing you at the PLAY! Summit.Use the
        following Code to check-in during the event.
      </p>
      <div className="w-full">
        <img
          className="h-60 w-60 mx-auto"
          src="/assets/img/payment/Moe_Epsilon_QR_code_vector.svg"
          alt="confirmed"
        />
      </div>
      <div className="px-6 pt-4 pb-4">
        <Link href="/tickets">
          <a className="btn--main btn--main--round">Download Ticket</a>
        </Link>
      </div>
      <div className="px-6 pt-4 pb-4">
        <Link href="/tickets">
          <a className="btn--main btn--main--round">Contact Support</a>
        </Link>
      </div>
    </div>
    <div className="section__content">
      <div className="w-full align-top">
        <div className="bg-black p-5 text-white">
          <h2>Order Summary</h2>
        </div>
        <div className="bg-gray p-5 space-y-5">
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
