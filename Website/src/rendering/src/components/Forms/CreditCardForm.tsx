import { FormEvent, useState } from 'react';
import { getMockExpirationDate } from '../../stories/utils';
import {
  getIsoDateFromYearAndMonth,
  getMonthFromIsoDateString,
  getYearFromIsoDateString,
} from '../../helpers/DateHelper';
import { DBuyerCreditCard } from '../../models/ordercloud/DCreditCard';
import Spinner from '../../components/ShopCommon/Spinner';

type CreditCardFormProps = {
  creditCard?: DBuyerCreditCard;
  onSubmit?: (payment: DBuyerCreditCard, fullCardNumber: string) => void;
  isEditing?: boolean;
  onCancelEdit?: () => void;
  loading?: boolean;
  fullCardNumber?: string;
};

const CreditCardForm = (props: CreditCardFormProps): JSX.Element => {
  const [cardholderName, setCardholderName] = useState(
    props?.creditCard?.ID ? props?.creditCard?.CardholderName || '' : 'John Smith' // TODO: remove mocked data once we have saved credit cards
  );
  const [cardNumber, setCardNumber] = useState(
    props?.fullCardNumber ? props.fullCardNumber : props.creditCard ? '' : '4111111111111111'
  ); // TODO: remove mocked data once we have saved credit cards
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
      props.onSubmit(updatedCreditCard, cardNumber);
    }
  };

  const cancelEditButton = props.isEditing && (
    <button className="cancel-edit" onClick={props.onCancelEdit}>
      Cancel
    </button>
  );

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
      <div className="button-area">
        {cancelEditButton}
        <button className="btn--main btn--main--round" type="submit" disabled={props.loading}>
          <Spinner loading={props.loading} /> Save payment method
        </button>
      </div>
    </form>
  );
};

export default CreditCardForm;
