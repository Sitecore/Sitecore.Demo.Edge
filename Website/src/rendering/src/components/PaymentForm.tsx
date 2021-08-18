import Link from 'next/link';

const PaymentForm = (): JSX.Element => (
  <div className="grid justify-items-stretch w-full grid-cols-5 attendee-form gap-10">
    <div className="text-center space-y-5 attendee-form-content col-span-3">
      <div className="p-5">
        <h2>Select Payment Method</h2>
      </div>
      <img className="mx-auto" src="/assets/img/payment/pay-method.png" alt="payment methods"></img>
      <input
        className="w-full rounded p-2 border border-dark-light text-sm font-medium"
        type="text"
        placeholder="Card Number *"
      />
      <div className="flex">
        <input
          className="w-full rounded p-2 border border-dark-light text-sm font-medium"
          type="text"
          placeholder="Expiry Month *"
        />
        <input
          className="w-full rounded p-2 ml-2 border border-dark-light text-sm font-medium"
          type="text"
          placeholder="Expiry Year *"
        />
        <input
          className="w-full rounded p-2 ml-2 border border-dark-light text-sm font-medium"
          type="text"
          placeholder="CCV *"
        />
      </div>
      <input
        className="w-full rounded p-2 border border-dark-light text-sm font-medium"
        type="text"
        placeholder="Email"
      />
      <input
        className="w-full rounded p-2 border border-dark-light text-sm font-medium"
        type="text"
        placeholder="Password"
      />
      <input
        className="w-full rounded p-2 border border-dark-light text-sm font-medium"
        type="text"
        placeholder="Confirm Password"
      />
      <h2>Billing Address</h2>
      <div className="flex">
        <input
          className="w-full md:w-4/5 rounded p-2 border border-dark-light text-sm font-medium"
          type="text"
          placeholder="First Name *"
        />
        <input
          className="w-full md:w-4/5 rounded p-2 ml-2 border border-dark-light text-sm font-medium"
          type="text"
          placeholder="Last Name *"
        />
      </div>
      <input
        className="w-full rounded p-2 border border-dark-light text-sm font-medium"
        type="text"
        placeholder="Address *"
      />
      <div className="flex">
        <input
          className="w-full rounded p-2 border border-dark-light text-sm font-medium"
          type="text"
          placeholder="Country *"
        />
        <input
          className="w-full rounded p-2 border ml-2 border-dark-light text-sm font-medium"
          type="text"
          placeholder="City *"
        />
        <input
          className="w-full rounded p-2 border ml-2 border-dark-light text-sm font-medium"
          type="text"
          placeholder="Zip / Postal Code *"
        />
      </div>
      <input
        className="w-full rounded p-2 border border-dark-light text-sm font-medium"
        type="text"
        placeholder="Phone Number *"
      />
      <div className="text-left text-sm">
        <p>
          Including cell/ mobile number will enable us to contact you via text about upcoming event
          updates.
        </p>
        <p className="mt-2">
          <label className="inline-flex items-center pl-5">
            <input
              type="checkbox"
              className="form-checkbox align-top inline-block"
              defaultChecked
            />
            <span className="ml-2 text-sm">
              Store my credit card and billing information in our secure system for future
              purchases. Privacy Policy.
            </span>
          </label>
        </p>
        <p className="ml-10 mt-2">
          Note: Your credit card details will be removed after 12 months of inactivity on your
          account. You can manage your credit card details in Payments.
        </p>
      </div>
      <div className="px-6 pt-4 pb-10">
        <Link href="/tickets/payment/confirmed">
          <a className="btn--main btn--main--round">Confirm Purchase</a>
        </Link>
      </div>
    </div>
    <div className="attendee-form-form col-span-2 space-y-5">
      <div className="w-full align-top">
        <div className="bg-black p-5 text-white">
          <h2>Order Summary</h2>
        </div>
        <div className="bg-gray-light p-5 space-y-5 text-sm">
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

export default PaymentForm;
