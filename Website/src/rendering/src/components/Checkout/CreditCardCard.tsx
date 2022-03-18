import { DBuyerCreditCard } from 'src/models/ordercloud/DCreditCard';

type CreditCardCardProps = {
  creditCard: DBuyerCreditCard;
  editable?: boolean;
  onEdit?: (creditCard: DBuyerCreditCard) => void;
};

const CreditCardCard = (props: CreditCardCardProps): JSX.Element => {
  const formattedExpirationDate = (isoDate: string) => {
    if (!isoDate) {
      return '';
    }
    const date = new Date(isoDate);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${year}`;
  };
  const editButton = props.editable && (
    <button onClick={() => props.onEdit(props.creditCard)}>Edit Credit Card</button>
  );
  return (
    <div>
      <p>{props.creditCard.CardType}</p>
      <p>Credit card ending in {props.creditCard.PartialAccountNumber}</p>
      <p>{props.creditCard.CardholderName}</p>
      <p>Expires: {formattedExpirationDate(props.creditCard.ExpirationDate)}</p>
      {editButton}
    </div>
  );
};

export default CreditCardCard;
