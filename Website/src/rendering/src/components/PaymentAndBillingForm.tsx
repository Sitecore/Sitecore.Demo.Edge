import Link from 'next/link';

const PaymentAndBillingForm = (): JSX.Element => (
  <div className="form payment-and-billing-form">
    <h2>Select Payment Method</h2>
    <img
      className="payment-methods"
      src="/assets/img/payment/pay-method.png"
      alt="payment methods"
    />
    <input type="text" placeholder="Card Number *" />
    <div className="inline-fields">
      <input type="text" placeholder="Expiry Month *" />
      <input type="text" placeholder="Expiry Year *" />
      <input type="text" placeholder="CCV *" />
    </div>
    <input type="text" placeholder="Email" />
    <input type="text" placeholder="Password" />
    <input type="text" placeholder="Confirm Password" />

    <h2>Billing Address</h2>
    <div className="inline-fields">
      <input type="text" placeholder="First Name *" />
      <input type="text" placeholder="Last Name *" />
    </div>
    <input type="text" placeholder="Address *" />
    <div className="inline-fields">
      <input type="text" placeholder="Country *" />
      <input type="text" placeholder="City *" />
      <input type="text" placeholder="Zip / Postal Code *" />
    </div>
    <input type="text" placeholder="Phone Number *" />

    <div className="footnote">
      <p>
        Including cell/ mobile number will enable us to contact you via text about upcoming event
        updates.
      </p>
      <p>
        <label className="checkbox-label">
          <input type="checkbox" defaultChecked />
          <span className="label-text">
            Store my credit card and billing information in our secure system for future purchases.
            Privacy Policy.
          </span>
        </label>
      </p>
      <p className="note">
        Note: Your credit card details will be removed after 12 months of inactivity on your
        account. You can manage your credit card details in Payments.
      </p>
    </div>
    <div className="button-area">
      <Link href="/tickets/payment/confirmed">
        <a className="btn--main btn--main--round">Confirm Purchase</a>
      </Link>
    </div>
  </div>
);

export default PaymentAndBillingForm;
