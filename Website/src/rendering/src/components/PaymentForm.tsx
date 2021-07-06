import Link from 'next/link';

const PaymentForm = (): JSX.Element => (
  <div className="section grid grid-cols-12 gap-4 w-full bg-white">
    <div className="section__content col-span-7 text-center flex p-10">
      <h2>Select Payment Method</h2>
      <input
        className="w-full md:w-4/5 rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="Card Number *"
      />
      <div className="flex">
        <input
          className="w-full rounded p-2 border border-white-dark text-sm font-medium"
          type="text"
          placeholder="Expiry Month *"
        />
        <input
          className="w-full rounded p-2 border border-white-dark text-sm font-medium"
          type="text"
          placeholder="Expiry Year *"
        />
        <input
          className="w-full rounded p-2 border border-white-dark text-sm font-medium"
          type="text"
          placeholder="CCV *"
        />
      </div>
      <input
        className="w-full md:w-4/5 rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="Email"
      />
      <input
        className="w-full md:w-4/5 rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="Password"
      />
      <input
        className="w-full md:w-4/5 rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="Confirm Password"
      />
      <h2>Billing Address</h2>
      <div className="flex">
        <input
          className="w-full md:w-4/5 rounded p-2 border border-white-dark text-sm font-medium"
          type="text"
          placeholder="First Name *"
        />
        <input
          className="w-full md:w-4/5 rounded p-2 border border-white-dark text-sm font-medium"
          type="text"
          placeholder="Last Name *"
        />
      </div>
      <input
        className="w-full md:w-4/5 rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="Address *"
      />
      <div className="flex">
        <input
          className="w-full md:w-4/5 rounded p-2 border border-white-dark text-sm font-medium"
          type="text"
          placeholder="Country *"
        />
        <input
          className="w-full md:w-4/5 rounded p-2 border border-white-dark text-sm font-medium"
          type="text"
          placeholder="City *"
        />
        <input
          className="w-full md:w-4/5 rounded p-2 border border-white-dark text-sm font-medium"
          type="text"
          placeholder="Zip / Postal Code *"
        />
      </div>
      <input
        className="w-full md:w-4/5 rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="Phone Number *"
      />
      <div className="text-left">
        <p>
          Including cell/ mobile number will enable us to contact you via text about upcoming event
          updates.
        </p>
        <p>
          <label className="inline-flex items-center pl-5">
            <input
              type="checkbox"
              className="form-checkbox align-top inline-block"
              defaultChecked
            />
            <span className="ml-2 text-sm">
              Store my credit card and billing information in our secure system for future
              purchases. Privacy Policy.
              <p>
                Note: Your credit card details will be removed after 12 months of inactivity on your
                account. You can manage your credit card details in Payments.
              </p>
            </span>
          </label>
        </p>
      </div>
      <div className="px-6 pt-4 pb-10">
        <Link href="/tickets">
          <a className="btn--main btn--main--round">Confirm Purchase</a>
        </Link>
      </div>
    </div>
    <div className="section__content col-span-5 text-left">
      <div className="w-full align-top">
        <div className="bg-black p-5">Order Summary</div>
        <div className="bg-gray p-5">
          <div>
            <strong>Details</strong>
          </div>
          <span className="w-1/2 font-bold">Regular Ticker</span>
          <span className="w-1/2 font-bold">$149.00</span>
          <span className="w-1/2">x 1 Regular Event Pass</span>
        </div>
      </div>
    </div>
  </div>
);

export default PaymentForm;
