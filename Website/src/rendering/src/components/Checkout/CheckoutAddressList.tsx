import { useState } from 'react';
import { DBuyerAddress } from 'src/models/ordercloud/DBuyerAddress';
import CheckoutAddressCard from './CheckoutAddressCard';
import CheckoutNewAddressCard from './CheckoutNewAddressCard';

type CheckoutAddressListProps = {
  addresses: DBuyerAddress[];
  activeAddressId?: string;
  showSaveToAddressBook?: boolean;
  loading?: boolean;
  prefix?: string;
  onClick: (address: DBuyerAddress) => void;
  onEdit: (address: DBuyerAddress, saveAddress: boolean) => void;
};

const CheckoutAddressList = (props: CheckoutAddressListProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [editAddress, setEditAddress] = useState({} as DBuyerAddress);

  const handleAddressCardClick = (address: DBuyerAddress) => {
    if (address.ID) {
      // user selected another address clear out edit address data
      setEditAddress({});
    }
    setIsEditing(false);
    props.onClick(address);
  };

  const handleOneTimeAddressEdit = (address: DBuyerAddress) => {
    setEditAddress(address);
    setIsEditing(true);
  };

  const addressList =
    props.addresses.length > 0 &&
    props.addresses
      .filter((address) => (isEditing ? Boolean(address.ID) : true)) // filter out one time address when editing it
      .map((address) => (
        <CheckoutAddressCard
          onClick={handleAddressCardClick}
          onEdit={handleOneTimeAddressEdit}
          key={address.ID}
          address={address}
          active={!isEditing && (address.ID === props.activeAddressId || !address.ID)}
        />
      ));

  return (
    <div className="address-list">
      {addressList}
      <CheckoutNewAddressCard
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editAddress={editAddress}
        setEditAddress={setEditAddress}
        onEdit={props.onEdit}
        showSaveToAddressBook={props.showSaveToAddressBook}
        loading={props.loading}
        prefix={props.prefix}
      />
    </div>
  );
};

export default CheckoutAddressList;
