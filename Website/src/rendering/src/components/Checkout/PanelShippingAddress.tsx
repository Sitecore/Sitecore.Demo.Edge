import AddressForm from '../Forms/AddressForm';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';
import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { saveShippingAddress } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';

const PanelShippingAddress = (): JSX.Element => {
  // TODO: this component should also allow choosing a saved address
  const dispatch = useAppDispatch();
  const { shippingAddress } = useOcCurrentOrder();

  const handleSetShippingAddress = (address: Partial<DBuyerAddress>) => {
    dispatch(saveShippingAddress(address));
  };

  return (
    <div>
      <h2>Enter a delivery address</h2>
      <AddressForm
        address={shippingAddress}
        onSubmit={(address) => handleSetShippingAddress(address)}
      />
    </div>
  );
};

export default PanelShippingAddress;
