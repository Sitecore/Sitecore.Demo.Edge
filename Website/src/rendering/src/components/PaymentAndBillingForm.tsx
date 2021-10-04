import router from 'next/router';
import { FormEvent } from 'react';
import { logEventByName, createDataExtensionByName } from '../services/CdpService';

const PaymentAndBillingForm = (): JSX.Element => {
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ticketId?.trim()) {
      alert(
        'Ticket information unavailable. Please go back to the tickets page and select a valid ticket.'
      );
      return;
    }

    const payload = { ticket_id: ticketId };
    const pushPayload = { ...payload, key: 'Ticket Type' };

    return await logEventByName('TICKET_PURCHASED', payload)
      .then(() => {
        createDataExtensionByName('TicketPurchased', pushPayload);
      })
      .then(() => {
        router.push('/tickets/payment/confirmed?ticket=' + ticketId);
      });
  };

  const ticketId =
    typeof window === 'undefined' ? '0' : new URLSearchParams(window.location.search).get('ticket');

  return (
    <form className="form payment-and-billing-form" onSubmit={handleFormSubmit}>
      <h2>Payment Information</h2>
      <div className="payment-methods">
        <input type="radio" value="Visa" name="payment" id="visa" />{' '}
        <label htmlFor="visa">
          <img src="/assets/img/payment/visa.png" alt="payment methods" />
        </label>
        <input type="radio" value="ppal" name="payment" id="ppal" />{' '}
        <label htmlFor="ppal">
          <img src="/assets/img/payment/paypal.png" alt="payment methods" />
        </label>
        <input type="radio" value="spay" name="payment" id="apay" />{' '}
        <label htmlFor="apay">
          <img src="/assets/img/payment/apay.png" alt="payment methods" />
        </label>
        <input type="radio" value="gpay" name="payment" id="gpay" />{' '}
        <label htmlFor="gpay">
          <img src="/assets/img/payment/gpay.png" alt="payment methods" />
        </label>
      </div>
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
        <button type="submit" className="btn--main btn--main--round">
          Confirm Purchase
        </button>
        {/* <Link href={`/tickets/payment/confirmed?ticket=${ticketId}`}>
          <a className="btn--main btn--main--round">Confirm Purchase</a>
        </Link> */}
      </div>
    </form>
  );
};

export default PaymentAndBillingForm;
