import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { removeBillingAddress, saveBillingAddress } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';
import { useEffect, useState } from 'react';
import { isSameAddress } from '../../helpers/AddressHelper';
import useOcAddressBook from '../../hooks/useOcAddressBook';
import useOcAuth from '../../hooks/useOcAuth';
import CheckoutAddressList from './CheckoutAddressList';

const PanelBillingAddress = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { isAnonymous } = useOcAuth();
  const { order, shippingAddress } = useOcCurrentCart();

  const billingAddress = order?.BillingAddress;

  const [isSameAsBilling, setIsSameAsBilling] = useState(
    Boolean(billingAddress && shippingAddress && isSameAddress(billingAddress, shippingAddress))
  );
  const [activeAddressId, setActiveAddressId] = useState(
    billingAddress?.ID && !isSameAsBilling ? billingAddress.ID : ''
  );
  const [tempAddress, setTempAddress] = useState({} as DBuyerAddress); // saves address prior to unchecking "same as billing" so we can revert to last saved address if necessary
  const { saveAddress, addresses } = useOcAddressBook({
    pageSize: 10,
    filters: { Editable: true }, // personal addresses
  });

  const isShipOrder = order?.xp?.DeliveryType === 'Ship';

  useEffect(() => {
    setIsSameAsBilling(
      Boolean(billingAddress && shippingAddress && isSameAddress(billingAddress, shippingAddress))
    );
  }, [billingAddress, shippingAddress]);

  useEffect(() => {
    setActiveAddressId(billingAddress?.ID && !isSameAsBilling ? billingAddress.ID : '');
  }, [billingAddress, isSameAsBilling]);

  let allAddresses = [...addresses];
  if (billingAddress && !billingAddress.ID) {
    // include one time address
    allAddresses = [...allAddresses, billingAddress];
  }

  const handleSetBillingAddress = async (address: DBuyerAddress) => {
    setLoading(true);
    setActiveAddressId(address?.ID);
    await dispatch(saveBillingAddress(address));
    setLoading(false);
  };

  const handleSaveAddress = async (address: DBuyerAddress) => {
    address.Shipping = true;
    address.Billing = true;
    setLoading(true);
    const updatedAddress = await saveAddress(address);
    await handleSetBillingAddress(updatedAddress);
  };

  const handleSameAsShipping = async () => {
    const shouldUseSameAsBilling = !isSameAsBilling;
    setIsSameAsBilling(shouldUseSameAsBilling);
    if (shouldUseSameAsBilling) {
      setTempAddress(billingAddress);
      await handleSetBillingAddress(shippingAddress);
    } else {
      if (
        tempAddress?.Street1 &&
        tempAddress?.City &&
        tempAddress?.State &&
        tempAddress?.Zip &&
        tempAddress?.Country
      ) {
        await handleSetBillingAddress(tempAddress);
      } else {
        dispatch(removeBillingAddress());
      }
    }
  };

  const sameAsShippingClasses = ['info-card'];
  if (isSameAsBilling) {
    sameAsShippingClasses.push('info-card-active');
  }
  const sameAsShippingCard = isShipOrder && (
    <div className={sameAsShippingClasses.join(' ')} onClick={handleSameAsShipping}>
      {/* TODO: style to match mockup: https://xd.adobe.com/view/09adc8d4-cef8-43a7-84a5-84904880dc54-5cfe/ */}
      <input type="radio" checked={isSameAsBilling} readOnly />
      <h6 className="card-name">Same as shipping</h6>
    </div>
  );

  const addressList = (
    <CheckoutAddressList
      addresses={allAddresses}
      prefix="billing"
      activeAddressId={activeAddressId}
      loading={loading}
      showSaveToAddressBook={!isAnonymous}
      onClick={(address) => handleSetBillingAddress(address)}
      onEdit={(address, saveToAddressBook) =>
        isAnonymous || !saveToAddressBook
          ? handleSetBillingAddress(address)
          : handleSaveAddress(address)
      }
    />
  );

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Billing Address</h2>
      </div>
      <div className="panel-body">
        <div className="address-list">
          {sameAsShippingCard}
          {addressList}
        </div>
      </div>
    </div>
  );
};

export default PanelBillingAddress;
