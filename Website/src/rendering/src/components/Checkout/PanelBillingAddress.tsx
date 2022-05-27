import AddressForm from '../../components/Forms/AddressForm';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { removeBillingAddress, saveBillingAddress } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';
import { useState } from 'react';
import AddressCard from './AddressCard';
import { isSameAddress } from '../../helpers/AddressHelper';

const PanelBillingAddress = (): JSX.Element => {
  // TODO: this component should also allow choosing a saved address
  const dispatch = useAppDispatch();
  const { order, shippingAddress } = useOcCurrentCart();
  const billingAddress = order?.BillingAddress;
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSameAsBilling, setIsSameAsBilling] = useState(
    Boolean(billingAddress && shippingAddress && isSameAddress(billingAddress, shippingAddress))
  );
  const [tempAddress, setTempAddress] = useState({} as DBuyerAddress); // saves address prior to unchecking "same as billing" so we can revert to last saved address if necessary

  const handleSetBillingAddress = async (address: Partial<DBuyerAddress>) => {
    setLoading(true);
    await dispatch(saveBillingAddress(address));
    setLoading(false);
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

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const isShipOrder = order?.xp?.DeliveryType === 'Ship';

  const sameAsShippingCheckboxId = 'same-as-shipping-checkbox';
  const sameAsShippingCheckbox = isShipOrder && shippingAddress && (
    <div className="same-as-shipping">
      <input
        disabled={loading}
        id={sameAsShippingCheckboxId}
        type="checkbox"
        onChange={handleSameAsShipping}
        checked={isSameAsBilling}
      />
      <label htmlFor={sameAsShippingCheckboxId}>Same as Shipping</label>
    </div>
  );

  const getAddressDisplay = () => {
    if (isSameAsBilling && isShipOrder) {
      return <div></div>;
    } else if (isEditing || !billingAddress) {
      return (
        <AddressForm
          address={billingAddress}
          onSubmit={(address) => handleSetBillingAddress(address)}
          isEditing={isEditing}
          onCancelEdit={handleCancelEdit}
          loading={loading}
          prefix="billing"
        />
      );
    } else {
      return (
        <AddressCard address={billingAddress} editable={true} onEdit={() => setIsEditing(true)} />
      );
    }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Billing Address</h2>
      </div>
      <div className="panel-body">
        {sameAsShippingCheckbox}
        {getAddressDisplay()}
      </div>
    </div>
  );
};

export default PanelBillingAddress;
