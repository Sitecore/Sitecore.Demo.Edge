import { RequiredDeep, ShipMethodSelection } from 'ordercloud-javascript-sdk';
import { selectShipMethods } from '../../redux/ocCurrentCart';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';
import { useAppDispatch } from '../../redux/store';
import ShipMethodsList from './ShipMethodsList';

const PanelShippingEstimates = (): JSX.Element => {
  // TODO: ordercloud supports multiple ship estimates, at this time we are
  // only returning a single set of ship estimates to keep it simple
  // expect to add a set of ship estimates by supplier in the future
  const dispatch = useAppDispatch();
  const { shipEstimateResponse, shippingAddress } = useOcCurrentOrder();
  const shipEstimate = shipEstimateResponse?.ShipEstimates?.length
    ? shipEstimateResponse.ShipEstimates[0]
    : null;

  const shipMethods = shipEstimate ? shipEstimate.ShipMethods : null;
  const selectedShipMethodId = shipEstimate?.SelectedShipMethodID;

  const handleShipMethodSelectionChange = (selection: RequiredDeep<ShipMethodSelection>) => {
    dispatch(selectShipMethods([selection]));
  };

  const shipMethodsList = shipMethods && (
    <ShipMethodsList
      shipEstimateId={shipEstimate.ID}
      shipMethods={shipMethods}
      selectedShipMethodId={selectedShipMethodId}
      onChange={handleShipMethodSelectionChange}
    />
  );

  const missingShippingAddress = !shippingAddress?.ID && (
    <div>Please enter shipping address to view delivery types</div>
  );

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Delivery Type</h2>
      </div>
      <div className="panel-body">
        {shipMethodsList}
        {missingShippingAddress}
      </div>
    </div>
  );
};

export default PanelShippingEstimates;
