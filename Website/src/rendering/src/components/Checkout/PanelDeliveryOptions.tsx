import { Address } from 'ordercloud-javascript-sdk';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import { DeliveryTypes, DOrder } from '../../models/ordercloud/DOrder';
import { patchOrder, removeShippingAddress, saveShippingAddress } from '../../redux/ocCurrentCart';

const summitAddress: Address = {
  AddressName: 'Play! Summit',
  Street1: '101 California St',
  Street2: 'St #1600',
  City: 'San Francisco',
  State: 'CA',
  Country: 'US',
  Zip: '94111',
};

// TODO: hardcoding for now once we add suppliers we can pull that information
// more dynamically based on which line items are addded to the cart
const storeAddress: Address = {
  AddressName: 'Store #1234',
  Street1: '110 N. 5th St #300',
  City: 'Minneapolis',
  State: 'MN',
  Country: 'US',
  Zip: '55403',
};

const PanelDeliveryOptions = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { order } = useOcCurrentCart();
  const [deliveryType, setDeliveryType] = useState(order?.xp?.DeliveryType || DeliveryTypes.Ship);
  const [loading, setIsLoading] = useState(false);

  const onDeliveryTypeChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const updatedDeliveryType = event.target.value as DOrder['xp']['DeliveryType'];
    setDeliveryType(updatedDeliveryType);
    try {
      setIsLoading(true);
      await dispatch(patchOrder({ xp: { DeliveryType: updatedDeliveryType } }));
      if (updatedDeliveryType === DeliveryTypes.PickupFromSummit) {
        await dispatch(saveShippingAddress(summitAddress));
      } else if (updatedDeliveryType === DeliveryTypes.PickupInStore) {
        await dispatch(saveShippingAddress(storeAddress));
      } else {
        await dispatch(removeShippingAddress());
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="panel radio-options">
      <div className="panel-header">
        <h2>Delivery options</h2>
      </div>
      <div className="panel-body">
        <div className="option-item">
          <input
            type="radio"
            name="deliveryOption"
            id="deliveryOptionShip"
            value={DeliveryTypes.Ship}
            disabled={loading}
            checked={deliveryType === DeliveryTypes.Ship}
            onChange={onDeliveryTypeChange}
          />
          <label htmlFor="deliveryOptionShip">
            <span className="option-name">Delivery</span>
            <span className="option-desc">Ship to an address</span>
          </label>
        </div>
        <div className="option-item">
          <input
            type="radio"
            name="deliveryOption"
            id="deliveryOptionSummit"
            value={DeliveryTypes.PickupFromSummit}
            disabled={loading}
            checked={deliveryType === DeliveryTypes.PickupFromSummit}
            onChange={onDeliveryTypeChange}
          />
          <label htmlFor="deliveryOptionSummit">
            <span className="option-name">Pick up from the Summit</span>
            <span className="option-desc">Pick up your order at the Summit front desk</span>
          </label>
        </div>
        <div className="option-item">
          <input
            type="radio"
            name="deliveryOption"
            id="deliveryOptionStore"
            value={DeliveryTypes.PickupInStore}
            disabled={loading}
            checked={deliveryType === DeliveryTypes.PickupInStore}
            onChange={onDeliveryTypeChange}
          />
          <label htmlFor="deliveryOptionStore">
            <span className="option-name">Pick up from a store</span>
            <span className="option-desc">Pick up your order in-store</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PanelDeliveryOptions;
