import { DBuyerAddress } from 'src/models/ordercloud/DBuyerAddress';

type AddressCardProps = {
  address: DBuyerAddress;
  onClick: (address: DBuyerAddress) => void;
  active: boolean
};

const AddressCard = (props: AddressCardProps): JSX.Element => {
  const street2 = props.address.Street2 && <p>{props.address.Street2}</p>
  let addressClasses = ['address-card']
  if(props.active) {
    addressClasses.push('address-card__active')
  }
  return (
    <div onClick={() => props.onClick(props.address)} className={addressClasses.join(' ')}>
      <strong>{props.address.AddressName}</strong>
      <p>{props.address.Street1}</p>
      {street2}
      <p>{props.address.City}, {props.address.State} {props.address.Zip}</p>
      <p>{props.address.Country}</p>
    </div>
  );
};

export default AddressCard;
