import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DBuyerAddress } from 'src/models/ordercloud/DBuyerAddress';

type AddressCardProps = {
  address: DBuyerAddress;
  onClick?: (address: DBuyerAddress) => void;
  active?: boolean;
  editable?: boolean;
  onEdit?: (address: DBuyerAddress) => void;
};

const AddressCard = (props: AddressCardProps): JSX.Element => {
  const street2 = props.address.Street2 && <p>{props.address.Street2}</p>;

  const addressClasses = ['info-card'];
  if (props.active) {
    addressClasses.push('info-card-active');
  }

  const editButton = props.editable && (
    <button onClick={() => props.onEdit(props.address)} className="card-edit">
      <FontAwesomeIcon icon={faEdit} />
      Edit
    </button>
  );

  const onClick = (address: DBuyerAddress) => {
    if (props.onClick) {
      props.onClick(address);
    }
  };

  return (
    <div onClick={() => onClick(props.address)} className={addressClasses.join(' ')}>
      {editButton}
      <h6 className="card-name">{props.address.AddressName}</h6>
      <p>{props.address.Street1}</p>
      {street2}
      <p>
        {props.address.City}, {props.address.State} {props.address.Zip}
      </p>
      <p>{props.address.Country}</p>
    </div>
  );
};

export default AddressCard;
