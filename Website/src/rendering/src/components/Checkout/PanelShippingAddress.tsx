import AddressForm from '../Forms/AddressForm';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { saveShippingAddress } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';
import { useEffect, useState } from 'react';
import AddressCard from './AddressCard';
import useOcAuth from '../../hooks/useOcAuth';
import useOcAddressBook from '../../hooks/useOcAddressBook';
import AddressList from './AddressList';

const PanelShippingAddress = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { shippingAddress, order } = useOcCurrentCart();
  const [activeAddressId, setActiveAddressId] = useState(shippingAddress?.ID || '');
  const { isAnonymous } = useOcAuth();
  const { addresses, saveAddress } = useOcAddressBook({
    pageSize: 10,
    filters: { Editable: true }, // personal addresses
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    setActiveAddressId(shippingAddress?.ID || '');
  }, [shippingAddress]);

  const handleSetShippingAddress = async (address: Partial<DBuyerAddress>) => {
    setLoading(true);
    setActiveAddressId(address.ID);
    await dispatch(saveShippingAddress(address));
    setLoading(false);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleSaveAddress = async (address: Partial<DBuyerAddress>) => {
    address.Shipping = true;
    address.Billing = true;
    setLoading(true);
    const updatedAddress = await saveAddress(address);
    await handleSetShippingAddress(updatedAddress);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsCreating(false);
  };

  const isPickupOrder = order?.xp?.DeliveryType !== 'Ship';

  const addressUpdateForm = (
    <AddressForm
      address={shippingAddress}
      onSubmit={(address) => handleSetShippingAddress(address)}
      isEditing={true}
      onCancelEdit={handleCancelEdit}
      showSaveToAddressBook={false}
      loading={loading}
      prefix="shipping"
    />
  );

  const addressCreateForm = (
    <AddressForm
      address={{}}
      onSubmit={(address, saveToAddressBook) =>
        isAnonymous || !saveToAddressBook
          ? handleSetShippingAddress(address)
          : handleSaveAddress(address)
      }
      isEditing={true}
      onCancelEdit={handleCancelEdit}
      showSaveToAddressBook={!isAnonymous}
      loading={loading}
      prefix="shipping"
    />
  );

  const addressCard = (
    <AddressCard
      address={shippingAddress}
      editable={!isPickupOrder}
      onEdit={() => setIsEditing(true)}
    />
  );

  const addressList = (
    <AddressList
      addresses={addresses}
      activeAddressId={activeAddressId}
      onClick={(address) => handleSetShippingAddress(address)}
    />
  );

  const getAddressDisplay = () => {
    if (isPickupOrder) {
      return shippingAddress ? addressCard : <div></div>;
    }
    if (isCreating) {
      return addressCreateForm;
    }
    if (isEditing) {
      return addressUpdateForm;
    }
    if (isAnonymous) {
      if (!shippingAddress) {
        return addressCreateForm;
      }
      return addressCard;
    } else {
      if (!addresses?.length) {
        if (shippingAddress) {
          return addressCard;
        }
        return addressCreateForm;
      }
      if (!shippingAddress) {
        return addressList;
      }
      const savedAddressIds = addresses.map((address) => address.ID);
      if (savedAddressIds.includes(shippingAddress.ID)) {
        return addressList;
      }
      return addressCard;
    }
  };

  return (
    <div className="panel">
      <div className="panel-header panel-shipping">
        <h2>Shipping Address</h2>
        <a
          onClick={() => {
            setIsCreating(true);
          }}
        >
          Add a new address
        </a>
      </div>
      <div className="panel-body">{getAddressDisplay()}</div>
    </div>
  );
};

export default PanelShippingAddress;
