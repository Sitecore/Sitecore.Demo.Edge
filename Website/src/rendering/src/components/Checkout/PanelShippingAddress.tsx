import AddressForm from '../Forms/AddressForm';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';
import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { saveShippingAddress } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';
import { useState } from 'react';
import AddressCard from './AddressCard';

const PanelShippingAddress = (): JSX.Element => {
  // TODO: this component should also allow choosing a saved address
  const dispatch = useAppDispatch();
  const { shippingAddress } = useOcCurrentOrder();
  const [isEditing, setIsEditing] = useState(false);

  const handleSetShippingAddress = (address: Partial<DBuyerAddress>) => {
    dispatch(saveShippingAddress(address));
  };

  const addressDisplay =
    shippingAddress && !isEditing ? (
      <AddressCard address={shippingAddress} editable={true} onEdit={() => setIsEditing(true)} />
    ) : (
      <AddressForm
        address={shippingAddress}
        onSubmit={(address) => handleSetShippingAddress(address)}
      />
    );

  const cancelEditButton = isEditing && (
    <button onClick={() => setIsEditing(false)}>Cancel edit</button>
  );

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Shipping Address</h2>
      </div>
      <div className="panel-body">
        {addressDisplay}
        {cancelEditButton}
      </div>
    </div>
  );
};

export default PanelShippingAddress;
