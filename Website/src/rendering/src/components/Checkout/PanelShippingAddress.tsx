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
    <div className="panel">
      <div className="panel-header">
        <h2>Enter a delivery address</h2>
      </div>
      <div className="panel-body">
        <AddressForm
          address={shippingAddress}
          onSubmit={(address) => handleSetShippingAddress(address)}
        />
      </div>
    </div>
  );
};

export default PanelShippingAddress;
