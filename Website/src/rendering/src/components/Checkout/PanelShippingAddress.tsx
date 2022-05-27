import AddressForm from '../Forms/AddressForm';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { saveShippingAddress } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';
import { useState } from 'react';
import AddressCard from './AddressCard';

const PanelShippingAddress = (): JSX.Element => {
  // TODO: this component should also allow choosing a saved address
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { shippingAddress, order } = useOcCurrentCart();
  const [isEditing, setIsEditing] = useState(false);

  const handleSetShippingAddress = async (address: Partial<DBuyerAddress>) => {
    setLoading(true);
    await dispatch(saveShippingAddress(address));
    setLoading(false);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const isPickupOrder = order?.xp?.DeliveryType !== 'Ship';

  const addressDisplay =
    !shippingAddress || (isEditing && !isPickupOrder) ? (
      <AddressForm
        address={shippingAddress}
        onSubmit={(address) => handleSetShippingAddress(address)}
        isEditing={isEditing}
        onCancelEdit={handleCancelEdit}
        loading={loading}
        prefix="shipping"
      />
    ) : (
      <AddressCard
        address={shippingAddress}
        editable={!isPickupOrder}
        onEdit={() => setIsEditing(true)}
      />
    );

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Shipping Address</h2>
      </div>
      <div className="panel-body">{addressDisplay}</div>
    </div>
  );
};

export default PanelShippingAddress;
