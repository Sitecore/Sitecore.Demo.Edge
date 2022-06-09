import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCreditCardExpirationDate } from '../../helpers/DateHelper';
import { DBuyerCreditCard } from '../../models/ordercloud/DCreditCard';

type CreditCardCardProps = {
  creditCard: DBuyerCreditCard;
  editable?: boolean;
  onEdit?: (creditCard: DBuyerCreditCard) => void;
};

const CreditCardCard = (props: CreditCardCardProps): JSX.Element => {
  const editButton = props.editable && (
    <button onClick={() => props.onEdit(props.creditCard)} className="card-edit">
      <FontAwesomeIcon icon={faEdit} />
      Edit
    </button>
  );

  return (
    <div className="info-card">
      {editButton}
      <p className="card-name">{props.creditCard.CardType}</p>
      <p>{props.creditCard.CardholderName}</p>
      <p>Credit card ending in: •••• {props.creditCard.PartialAccountNumber}</p>
      <p>Expires: {getCreditCardExpirationDate(props.creditCard.ExpirationDate)}</p>
    </div>
  );
};

export default CreditCardCard;
