import AddressForm from '../../components/Forms/AddressForm';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';
import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { removeBillingAddress, saveBillingAddress } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';
import { useState } from 'react';
import AddressCard from './AddressCard';

const PanelBillingAddress = (): JSX.Element => {
  // TODO: this component should also allow choosing a saved address
  const dispatch = useAppDispatch();
  const { order, shippingAddress } = useOcCurrentOrder();
  const billingAddress = order?.BillingAddress;
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSameAsBilling, setIsSameAsBilling] = useState(
    billingAddress?.ID && shippingAddress?.ID && billingAddress?.ID === shippingAddress?.ID
  );
  const [tempAddress, setTempAddress] = useState({} as DBuyerAddress); // saves address prior to unchecking "same as billing" so we can revert if necessary

  const handleSetBillingAddress = async (address: Partial<DBuyerAddress>) => {
    setLoading(true);
    await dispatch(saveBillingAddress(address));
    setLoading(false);
  };

  const handleSameAsShipping = () => {
    const shouldUseSameAsBilling = !isSameAsBilling;
    setIsSameAsBilling(shouldUseSameAsBilling);
    if (shouldUseSameAsBilling) {
      setTempAddress(billingAddress);
      handleSetBillingAddress(shippingAddress);
    } else {
      if (
        tempAddress?.Street1 &&
        tempAddress?.City &&
        tempAddress?.State &&
        tempAddress?.Zip &&
        tempAddress?.Country
      ) {
        handleSetBillingAddress(tempAddress);
      } else {
        removeBillingAddress();
      }
    }
  };

  const sameAsShippingCheckboxId = 'same-as-shipping-checkbox';
  const sameAsShippingCheckbox = shippingAddress?.ID && (
    <div>
      <label htmlFor={sameAsShippingCheckboxId}>Same as Shipping</label>
      <input
        disabled={loading}
        id={sameAsShippingCheckboxId}
        type="checkbox"
        onChange={handleSameAsShipping}
        checked={isSameAsBilling}
      />
    </div>
  );

  const addressDisplay =
    !isSameAsBilling &&
    (billingAddress && !isEditing ? (
      <AddressCard address={billingAddress} editable={true} onEdit={() => setIsEditing(true)} />
    ) : (
      <AddressForm
        address={billingAddress}
        onSubmit={(address) => handleSetBillingAddress(address)}
      />
    ));

  const cancelEditButton = isEditing && (
    <button onClick={() => setIsEditing(false)}>Cancel edit</button>
  );

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Billing Address</h2>
      </div>
      <div className="panel-body">
        {sameAsShippingCheckbox}
        {addressDisplay}
        {cancelEditButton}
      </div>
    </div>
  );
};

export default PanelBillingAddress;
