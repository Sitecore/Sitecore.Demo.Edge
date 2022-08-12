import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DBuyerAddress } from 'src/models/ordercloud/DBuyerAddress';

type AddressCardProps = {
  address: DBuyerAddress;
  editable?: boolean;
  onEdit?: (address: DBuyerAddress) => void;
};

const AddressCard = (props: AddressCardProps): JSX.Element => {
  const street2 = props.address.Street2 && <p>{props.address.Street2}</p>;

  const editButton = props.editable && (
    <button onClick={() => props.onEdit(props.address)} className="card-edit">
      <FontAwesomeIcon icon={faEdit} />
      Edit
    </button>
  );

  return (
    <>
      {editButton}
      <div className="info-card-address">
        <h6 className="card-name">{props.address.AddressName}</h6>
        <p>
          {props.address.FirstName} {props.address.LastName}
        </p>
        <p>{props.address.Street1}</p>
        {street2}
        <p>
          {props.address.City}, {props.address.State}, {props.address.Zip}
        </p>
        <p>{props.address.Country}</p>
      </div>
    </>
  );
};

export default AddressCard;
