import Link from 'next/link';

const PaymentAndBillingForm = (): JSX.Element => {
  const ticketType =
    typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('ticket');

  return (
    <div className="form payment-and-billing-form">
      <h2>Select Payment Method</h2>
      <img
        className="payment-methods"
        src="/assets/img/payment/pay-method.png"
        alt="payment methods"
      />
      <div className="floating-label-wrap">
        <input type="text" placeholder="Card Number *" id="cardNumber" />
        <label htmlFor="cardNumber">Card Number *</label>
      </div>
      <div className="inline-fields">
        <div className="floating-label-wrap">
          <input type="text" placeholder="Expiry Month *" id="expiryMonth" />
          <label htmlFor="expiryMonth">Expiry Month *</label>
        </div>
        <div className="floating-label-wrap">
          <input type="text" placeholder="Expiry Year *" id="expiryYear" />
          <label htmlFor="expiryYear">Expiry Year *</label>
        </div>
        <div className="floating-label-wrap">
          <input type="text" placeholder="CCV *" id="ccv" />
          <label htmlFor="ccv">CCV *</label>
        </div>
      </div>
      <div className="floating-label-wrap">
        <input type="text" placeholder="Email" id="email" />
        <label htmlFor="email">Email</label>
      </div>
      <div className="floating-label-wrap">
        <input type="password" placeholder="Password" id="password" />
        <label htmlFor="password">Password</label>
      </div>
      <div className="floating-label-wrap">
        <input type="password" placeholder="Confirm Password" id="comfirmPassword" />
        <label htmlFor="comfirmPassword">Confirm Password</label>
      </div>

      <h2>Billing Address</h2>
      <div className="inline-fields">
        <div className="floating-label-wrap">
          <input type="text" placeholder="First Name *" />
          <label htmlFor="firstName">First Name *</label>
        </div>
        <div className="floating-label-wrap">
          <input type="text" placeholder="Last Name *" />
          <label htmlFor="lastName">Last Name *</label>
        </div>
      </div>
      <div className="floating-label-wrap">
        <input type="text" placeholder="Address *" id="address" />
        <label htmlFor="address">Address *</label>
      </div>
      <div className="inline-fields">
        <div className="floating-label-wrap">
          <input type="text" placeholder="City *" id="city" />
          <label htmlFor="city">City *</label>
        </div>
        <div className="floating-label-wrap">
          <input type="text" placeholder="Country *" id="country" />
          <label htmlFor="country">Country *</label>
        </div>
        <div className="floating-label-wrap">
          <input type="text" placeholder="Zip / Postal Code *" id="postalCode" />
          <label htmlFor="postalCode">Zip / Postal Code *</label>
        </div>
      </div>
      <div className="floating-label-wrap">
        <input type="text" placeholder="Phone Number *" id="phoneNumber" />
        <label htmlFor="phoneNumber">Phone Number *</label>
      </div>

      <div className="footnote">
        <p>
          Including cell/ mobile number will enable us to contact you via text about upcoming event
          updates.
        </p>
        <p>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked />
            <span className="label-text">
              Store my credit card and billing information in our secure system for future
              purchases. Privacy Policy.
            </span>
          </label>
        </p>
        <p className="note">
          Note: Your credit card details will be removed after 12 months of inactivity on your
          account. You can manage your credit card details in Payments.
        </p>
      </div>
      <div className="button-area">
        <Link href={`/tickets/payment/confirmed?ticket=${ticketType}`}>
          <a className="btn--main btn--main--round">Confirm Purchase</a>
        </Link>
      </div>
    </div>
  );
};

export default PaymentAndBillingForm;
