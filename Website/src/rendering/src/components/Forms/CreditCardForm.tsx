import { FormEvent, useState } from 'react';
import { DBuyerCreditCard } from '../../models/ordercloud/DCreditCard';
import Spinner from '../../components/ShopCommon/Spinner';
import PaymentCardForm, { PaymentCardFormChangeHandler } from './PaymentCardForm';

type CreditCardFormProps = {
  creditCard?: DBuyerCreditCard;
  onSubmit?: (payment: DBuyerCreditCard, fullCardNumber: string) => void;
  isEditing?: boolean;
  onCancelEdit?: () => void;
  loading?: boolean;
  fullCardNumber?: string;
};

const CreditCardForm = (props: CreditCardFormProps): JSX.Element => {
  const [cardNumber, setCardNumber] = useState(props?.fullCardNumber ? props.fullCardNumber : '');
  const [creditCard, setCreditCard] = useState(props?.creditCard);

  const handlePaymentCardFormChange: PaymentCardFormChangeHandler = ({
    creditCard,
    fullCardNumber,
  }) => {
    setCreditCard(creditCard);
    setCardNumber(fullCardNumber);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedCreditCard: DBuyerCreditCard = {
      ...(props.creditCard || {}),
      ...creditCard,
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
      <PaymentCardForm
        creditCard={props.creditCard}
        onChange={handlePaymentCardFormChange}
        fullCardNumber={props.fullCardNumber}
      />
      <div className="button-area">
        {cancelEditButton}
        <button className="btn-main" type="submit" disabled={props.loading}>
          <Spinner loading={props.loading} /> Save payment method
        </button>
      </div>
    </form>
  );
};

export default CreditCardForm;
