import CheckoutAddressForm from '../Forms/CheckoutAddressForm';
import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';

type CheckoutNewAddressCardProps = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  editAddress: DBuyerAddress;
  setEditAddress: (editAddress: DBuyerAddress) => void;
  onEdit: (address: DBuyerAddress, saveAddress: boolean) => void;
  showSaveToAddressBook?: boolean;
  loading?: boolean;
  prefix?: string;
};

const CheckoutNewAddressCard = (props: CheckoutNewAddressCardProps): JSX.Element => {
  const handleAddressEdit = (address: DBuyerAddress, saveToAddressBook: boolean) => {
    props.setIsEditing(false);
    props.setEditAddress({});
    props.onEdit(address, saveToAddressBook);
  };

  const handleNewAddress = () => {
    if (props.isEditing) {
      return;
    }
    props.setEditAddress({});
    props.setIsEditing(true);
  };

  const handleCancelEdit = () => {
    props.setEditAddress({});
    props.setIsEditing(false);
  };

  const addressCreateForm = props.isEditing && (
    <CheckoutAddressForm
      address={props.editAddress}
      onSubmit={handleAddressEdit}
      isEditing={true}
      onCancelEdit={handleCancelEdit}
      showSaveToAddressBook={props.showSaveToAddressBook}
      loading={props.loading}
      prefix={props.prefix}
      showCancelWhenEmpty={true}
    />
  );

  const addressClasses = ['info-card'];
  if (props.isEditing) {
    addressClasses.push('info-card-active');
  }

  return (
    <div className={addressClasses.join(' ')} onClick={handleNewAddress}>
      {/* TODO: style to match mockup: https://xd.adobe.com/view/09adc8d4-cef8-43a7-84a5-84904880dc54-5cfe/ */}
      <input type="radio" checked={props.isEditing} readOnly />
      <div className="new-address">
        <h6 className="card-name mb-3">
          {props.editAddress?.Street1 ? 'Update address' : 'Add a new address'}
        </h6>
        {addressCreateForm}
      </div>
    </div>
  );
};

export default CheckoutNewAddressCard;
