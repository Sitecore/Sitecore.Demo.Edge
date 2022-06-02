import { FormEvent, useEffect, useState } from 'react';
import {
  getIsoDateFromYearAndMonth,
  getMonthFromIsoDateString,
  getYearFromIsoDateString,
} from '../../helpers/DateHelper';
import { DBuyerCreditCard } from '../../models/ordercloud/DCreditCard';
import Spinner from '../../components/ShopCommon/Spinner';

type PaymentMethodsFormProps = {
  creditCard?: DBuyerCreditCard;
  onSubmit?: (payment: DBuyerCreditCard) => void;
  loading?: boolean;
  isEditing?: boolean;
};

const PaymentMethodsForm = (props: PaymentMethodsFormProps): JSX.Element => {
  const [cardholderName, setCardholderName] = useState(props?.creditCard?.CardholderName || '');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState(
    getMonthFromIsoDateString(props?.creditCard?.ExpirationDate)
  );
  const [expirationYear, setExpirationYear] = useState(
    getYearFromIsoDateString(props?.creditCard?.ExpirationDate)
  );
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(props?.creditCard?.xp?.Default);

  useEffect(() => {
    setCardholderName(props?.creditCard?.CardholderName);
    setExpirationMonth(getMonthFromIsoDateString(props?.creditCard?.ExpirationDate));
    setExpirationYear(getYearFromIsoDateString(props?.creditCard?.ExpirationDate));
    setDefaultPaymentMethod(props?.creditCard?.xp?.Default);
  }, [props?.creditCard]);

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
      xp: {
        Default: defaultPaymentMethod,
      },
      Token: '',
    };

    if (props.onSubmit) {
      props.onSubmit(updatedCreditCard);
    }
  };

  const cardNumberField = props?.creditCard?.ID ? (
    <p>Credit card ending in: ****{props.creditCard?.PartialAccountNumber}</p>
  ) : (
    <div>
      <label htmlFor="cardNumber">Card Number</label>
      <input
        type="text"
        id="cardNumber"
        required
        autoComplete="cc-number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
    </div>
  );

  const submitBtnText = props?.creditCard?.ID ? 'Apply changes' : 'Create payment method';

  return (
    <form onSubmit={handleFormSubmit} className="form creditcard-form">
      <div>
        <label htmlFor="cardholderName">Name on Card</label>
        <input
          type="text"
          id="cardholderName"
          required
          autoComplete="cc-name"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
        />
      </div>
      {cardNumberField}
      <div className="expiration-date">
        <span>Expiration Date</span>
        <div>
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
      <div>
        <input
          type="checkbox"
          id="default-payment-method"
          autoComplete="default-payment-method"
          onChange={(e) => setDefaultPaymentMethod(e.target.checked)}
          checked={defaultPaymentMethod}
        />
        <label htmlFor="default-payment-method">Set as default payment method</label>
      </div>
      <div className="button-area">
        <button className="btn--main btn--main--round" type="submit" disabled={props.loading}>
          <Spinner loading={props.loading} /> {submitBtnText}
        </button>
      </div>
    </form>
  );
};

export default PaymentMethodsForm;
