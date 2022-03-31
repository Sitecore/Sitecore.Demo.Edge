import { RequiredDeep, ShipMethodSelection } from 'ordercloud-javascript-sdk';
import { estimateShipping, selectShipMethods } from '../../redux/ocCurrentCart';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';
import { useAppDispatch } from '../../redux/store';
import ShipMethodsList from './ShipMethodsList';
import { useEffect } from 'react';
import { DShipEstimateResponse } from 'src/models/ordercloud/DShipEstimateResponse';

const PanelShippingEstimates = (): JSX.Element => {
  // TODO: ordercloud supports multiple ship estimates, at this time we are
  // only returning a single set of ship estimates to keep it simple
  // expect to add a set of ship estimates by supplier in the future
  const dispatch = useAppDispatch();
  const { order, shipEstimateResponse, shippingAddress } = useOcCurrentOrder();
  const shipEstimateResponseStringified = JSON.stringify(shipEstimateResponse);

  useEffect(() => {
    const shipEstimateResponse = (
      shipEstimateResponseStringified ? JSON.parse(shipEstimateResponseStringified) : null
    ) as DShipEstimateResponse;
    if (
      order?.ID &&
      shippingAddress &&
      (!shipEstimateResponse || shipEstimateResponse.UnhandledErrorBody)
    ) {
      dispatch(estimateShipping(order?.ID));
    }
  }, [dispatch, order?.ID, shippingAddress, shipEstimateResponseStringified]);

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

  const missingShippingAddress = !shippingAddress && (
    <div>Please enter shipping address to view delivery types</div>
  );

  const shipEstimatesErrorBody = shipEstimateResponse?.UnhandledErrorBody;
  if (shipEstimatesErrorBody) {
    console.error(`Failed to retrieve shipping estimates due to error: ${shipEstimatesErrorBody}`);
  }

  const shipEstimateError = shipEstimatesErrorBody && (
    <div>There was an error retrieving shipping estimates</div>
  );

  return (
    <div className="panel radio-options">
      <div className="panel-header">
        <h2>Delivery Type</h2>
      </div>
      <div className="panel-body">
        {shipMethodsList}
        {missingShippingAddress}
        {shipEstimateError}
      </div>
    </div>
  );
};

export default PanelShippingEstimates;
