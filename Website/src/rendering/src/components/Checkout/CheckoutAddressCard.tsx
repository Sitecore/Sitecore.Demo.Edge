import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DBuyerAddress } from 'src/models/ordercloud/DBuyerAddress';
import AddressCard from './AddressCard';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { SyntheticEvent } from 'react';

type CheckoutAddressCardProps = {
  address: DBuyerAddress;
  onClick?: (address: DBuyerAddress) => void;
  onEdit?: (address: DBuyerAddress) => void;
  active?: boolean;
};

const CheckoutAddressCard = (props: CheckoutAddressCardProps): JSX.Element => {
  const isOneTimeAddress = props.address && !props.address.ID;
  const address = { ...props.address };
  if (!props.address.AddressName) {
    address.AddressName = 'New Address';
  }
  const addressClasses = ['info-card'];
  if (props.active) {
    addressClasses.push('info-card-active');
  }

  const onClick = (address: DBuyerAddress) => {
    if (props.onClick) {
      props.onClick(address);
    }
  };

  function onEdit(event: SyntheticEvent) {
    event.stopPropagation();
    props.onEdit(props.address);
  }

  const compactAddressCard = (
    <div className="info-card-address">
      <h6 className="card-name">{props.address.AddressName}</h6>
      <p>{props.address.Street1}</p>
    </div>
  );

  const addressDisplay = props.active ? (
    <AddressCard address={address} editable={false} />
  ) : (
    compactAddressCard
  );

  const editButton = (
    <button onClick={onEdit} className="card-edit">
      <FontAwesomeIcon icon={faEdit} />
      Edit
    </button>
  );

  /* TODO: style to match mockup: https://xd.adobe.com/view/09adc8d4-cef8-43a7-84a5-84904880dc54-5cfe/ */
  const radioButton = <input type="radio" checked={props.active} readOnly />;

  const actionButton = isOneTimeAddress ? editButton : radioButton;

  return (
    <div onClick={() => onClick(props.address)} className={addressClasses.join(' ')}>
      {actionButton}
      {addressDisplay}
    </div>
  );
};

export default CheckoutAddressCard;
