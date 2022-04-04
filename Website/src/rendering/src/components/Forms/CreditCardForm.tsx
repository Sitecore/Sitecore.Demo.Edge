import { FormEvent, useState } from 'react';
import { getMockExpirationDate } from '../../stories/utils';
import {
  getIsoDateFromYearAndMonth,
  getMonthFromIsoDateString,
  getYearFromIsoDateString,
} from '../../helpers/DateHelper';
import { DBuyerCreditCard } from '../../models/ordercloud/DCreditCard';

type CreditCardFormProps = {
  creditCard?: DBuyerCreditCard;
  onSubmit?: (payment: DBuyerCreditCard) => void;
};

const CreditCardForm = (props: CreditCardFormProps): JSX.Element => {
  const [cardholderName, setCardholderName] = useState(
    props?.creditCard?.ID ? props?.creditCard?.CardholderName || '' : 'John Smith' // TODO: remove mocked data once we have saved credit cards
  );
  const [cardNumber, setCardNumber] = useState(props?.creditCard?.ID ? '' : '4111111111111111'); // TODO: remove mocked data once we have saved credit cards
  const [expirationMonth, setExpirationMonth] = useState(
    getMonthFromIsoDateString(
      props?.creditCard?.ID ? props?.creditCard?.ExpirationDate : getMockExpirationDate() // TODO: remove mocked data once we have saved credit cards
    )
  );
  const [expirationYear, setExpirationYear] = useState(
    getYearFromIsoDateString(
      props?.creditCard?.ID ? props?.creditCard?.ExpirationDate : getMockExpirationDate() // TODO: remove mocked data once we have saved credit cards
    )
  );

  const yearNow = new Date().getFullYear();
  const expirationYearRange = new Array(11).fill('').map((_, index) => yearNow + index);
  const expirationMonthRange = new Array(12)
    .fill('')
    .map((_, index) => `${index + 1}`.padStart(2, '0'));

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedCreditCard: DBuyerCreditCard = {
      ...(props.creditCard || {}),
      CardType: 'Visa', // hardcoding for now
      CardholderName: cardholderName,
      PartialAccountNumber: cardNumber.slice(-4),
      ExpirationDate: getIsoDateFromYearAndMonth(expirationYear, expirationMonth),
      // in a real application we would use a third party payment processor
      // to securely capture, store, and tokenize sensitive credit card details and store only the opaque token
      // it is against the terms of service to store sensitive credit card details on the platform
      Token: '',
    };

    if (props.onSubmit) {
      props.onSubmit(updatedCreditCard);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="form creditcard-form">
      <div className="floating-label-wrap">
        <input
          type="text"
          placeholder="Name on Card"
          id="cardholderName"
          required
          autoComplete="cc-name"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
        />
        <label htmlFor="cardholderName">Name on Card</label>
      </div>
      <div className="floating-label-wrap">
        <input
          type="text"
          placeholder="Card number"
          id="cardNumber"
          required
          autoComplete="cc-number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <label htmlFor="cardNumber">Card Number</label>
      </div>
      <div className="expiration-date">
        <span>Expiration Date</span>
        <div>
          <label htmlFor="expirationMonth">Expiration Month</label>
          <select
            id="expirationMonth"
            required
            onChange={(e) => setExpirationMonth(e.target.value)}
            value={expirationMonth}
          >
            <option key="blank" value="">
              MM
            </option>
            {expirationMonthRange.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="expirationYear">Expiration year</label>
          <select
            id="expirationYear"
            required
            onChange={(e) => setExpirationYear(e.target.value)}
            value={expirationYear}
          >
            <option key="blank" value="">
              YYYY
            </option>
            {expirationYearRange.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="button-area">
        <button className="btn--main btn--main--round" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default CreditCardForm;
