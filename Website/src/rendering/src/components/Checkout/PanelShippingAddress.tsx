import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { saveShippingAddress } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';
import { useEffect, useState } from 'react';
import AddressCard from './AddressCard';
import useOcAuth from '../../hooks/useOcAuth';
import useOcAddressBook from '../../hooks/useOcAddressBook';
import CheckoutAddressForm from '../Forms/CheckoutAddressForm';
import CheckoutAddressList from './CheckoutAddressList';
import { DeliveryTypes } from '../../models/ordercloud/DOrder';

const PanelShippingAddress = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { shippingAddress, order, initialized: cartInitialized } = useOcCurrentCart();
  const { isAnonymous } = useOcAuth();
  const { addresses, saveAddress, addressBookLoading } = useOcAddressBook({
    pageSize: 10,
    filters: { Editable: true }, // personal addresses
  });
  const [activeAddressId, setActiveAddressId] = useState(shippingAddress?.ID || '');
  const [isEditing, setIsEditing] = useState(false);

  let allAddresses = [...addresses];
  if (shippingAddress && !shippingAddress.ID) {
    // include one time address
    allAddresses = [...allAddresses, shippingAddress];
  }

  useEffect(() => {
    setActiveAddressId(shippingAddress?.ID || '');
  }, [shippingAddress]);

  const handleSetShippingAddress = async (address: Partial<DBuyerAddress>) => {
    setLoading(true);
    setActiveAddressId(address.ID);
    await dispatch(saveShippingAddress(address));
    setLoading(false);
    setIsEditing(false);
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
  };

  const isPickupOrder = order?.xp?.DeliveryType !== DeliveryTypes.Ship;

  const addressUpdateForm = (
    <CheckoutAddressForm
      address={shippingAddress || {}}
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
      showCancelWhenEmpty={false}
    />
  );

  const addressCard = (
    <div className="address-list">
      <div className="info-card info-card-active">
        <AddressCard
          address={shippingAddress}
          editable={!isPickupOrder}
          onEdit={() => setIsEditing(true)}
        />
      </div>
    </div>
  );

  const addressList = (
    <CheckoutAddressList
      addresses={allAddresses}
      prefix="shipping"
      activeAddressId={activeAddressId}
      loading={loading}
      showSaveToAddressBook={!isAnonymous}
      onClick={(address) => handleSetShippingAddress(address)}
      onEdit={(address, saveToAddressBook) =>
        isAnonymous || !saveToAddressBook
          ? handleSetShippingAddress(address)
          : handleSaveAddress(address)
      }
    />
  );

  const getAddressDisplay = () => {
    if (addressBookLoading || !cartInitialized) {
      return null;
    }
    if (isPickupOrder) {
      return shippingAddress ? addressCard : <div></div>;
    }
    if (isEditing) {
      return addressUpdateForm;
    }
    // anonymous user
    if (isAnonymous) {
      if (!shippingAddress) {
        return addressUpdateForm;
      }
      return addressCard;
    }
    // profiled user
    if (!addresses?.length) {
      if (shippingAddress) {
        return addressCard;
      }
      return addressUpdateForm;
    }
    if (!shippingAddress) {
      return addressList;
    }
    const savedAddressIds = addresses.map((address) => address.ID);
    if (savedAddressIds.includes(shippingAddress.ID) || !shippingAddress.ID) {
      return addressList;
    }
    return addressCard;
  };

  return (
    <div className="panel">
      <div className="panel-header panel-shipping">
        <h2>Shipping Address</h2>
      </div>
      <div className="panel-body">{getAddressDisplay()}</div>
    </div>
  );
};

export default PanelShippingAddress;
