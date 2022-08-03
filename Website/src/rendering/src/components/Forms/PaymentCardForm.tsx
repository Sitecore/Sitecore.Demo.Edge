import { useEffect, useState } from 'react';
import {
  getIsoDateFromYearAndMonth,
  getMonthFromIsoDateString,
  getYearFromIsoDateString,
} from '../../helpers/DateHelper';
import { DBuyerCreditCard } from '../../models/ordercloud/DCreditCard';

type PaymentCardFormProps = {
  creditCard?: DBuyerCreditCard;
  onChange?: ({
    creditCard,
    fullCardNumber,
  }: {
    creditCard: DBuyerCreditCard;
    fullCardNumber: string;
  }) => void;
  isEditing?: boolean;
  loading?: boolean;
  fullCardNumber?: string;
};

const PaymentCardForm = (props: PaymentCardFormProps): JSX.Element => {
  const [cardholderName, setCardholderName] = useState(
    props?.creditCard?.ID ? props?.creditCard?.CardholderName : ''
  );
  const [cardNumber, setCardNumber] = useState(props?.fullCardNumber ? props.fullCardNumber : '');
  const [expirationMonth, setExpirationMonth] = useState(
    getMonthFromIsoDateString(props?.creditCard?.ID ? props?.creditCard?.ExpirationDate : '')
  );
  const [expirationYear, setExpirationYear] = useState(
    getYearFromIsoDateString(props?.creditCard?.ID ? props?.creditCard?.ExpirationDate : '')
  );

  useEffect(() => {
    props.onChange({
      fullCardNumber: cardNumber,
      creditCard: {
        CardType: 'Visa', // hardcoding for now
        CardholderName: cardholderName,
        PartialAccountNumber: cardNumber.slice(-4),
        ExpirationDate: getIsoDateFromYearAndMonth(expirationYear, expirationMonth),
        // in a real application we would use a third party payment processor
        // to securely capture, store, and tokenize sensitive credit card details and store only the opaque token
        // it is against the terms of service to store sensitive credit card details on the platform
        Token: '',
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardholderName, cardNumber, expirationMonth, expirationYear]);

  const yearNow = new Date().getFullYear();
  const expirationYearRange = new Array(11).fill('').map((_, index) => yearNow + index);
  const expirationMonthRange = new Array(12)
    .fill('')
    .map((_, index) => `${index + 1}`.padStart(2, '0'));

  const cardNumberField = props?.creditCard?.ID ? (
    <p>Credit card ending in: •••• {props.creditCard?.PartialAccountNumber}</p>
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

  return (
    <>
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
    </>
  );
};

export default PaymentCardForm;
