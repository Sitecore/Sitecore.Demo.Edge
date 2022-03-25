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
  const addressClasses = ['address-card'];
  if (props.active) {
    addressClasses.push('address-card__active');
  }
  const editButton = props.editable && (
    <button onClick={() => props.onEdit(props.address)}>Edit Address</button>
  );
  const onClick = (address: DBuyerAddress) => {
    if (props.onClick && typeof props.onClick === 'function') {
      props.onClick(address);
    }
  };
  return (
    <div onClick={() => onClick(props.address)} className={addressClasses.join(' ')}>
      <strong>{props.address.AddressName}</strong>
      <p>{props.address.Street1}</p>
      {street2}
      <p>
        {props.address.City}, {props.address.State} {props.address.Zip}
      </p>
      <p>{props.address.Country}</p>
      {editButton}
    </div>
  );
};

export default AddressCard;
