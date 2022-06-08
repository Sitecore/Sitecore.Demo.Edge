import { RequiredDeep, ShipMethodSelection } from 'ordercloud-javascript-sdk';
import { estimateShipping, selectShipMethods } from '../../redux/ocCurrentCart';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import { useAppDispatch } from '../../redux/store';
import ShipMethodsList from './ShipMethodsList';
import { useEffect, useRef, useState } from 'react';
import { DShipEstimateResponse } from 'src/models/ordercloud/DShipEstimateResponse';
import Skeleton from 'react-loading-skeleton';

const ShipMethodsSkeleton = (): JSX.Element => {
  const optionCount = 4;
  return (
    // TODO: Refactor to avoid HTML repetition
    <div className="shipmethods-list">
      {new Array(optionCount).fill('').map((_, index) => (
        <div key={index} className="option-item">
          <span className="skeleton-radio-button">
            <Skeleton borderRadius="100%" height={20} width={20} />
          </span>
          <label>
            <span className="option-name">
              <Skeleton width={220} />
            </span>
            <span className="option-desc">
              <Skeleton width={300} />
            </span>
          </label>
        </div>
      ))}
    </div>
  );
};

const PanelShippingEstimates = (): JSX.Element => {
  // TODO: ordercloud supports multiple ship estimates, at this time we are
  // only returning a single set of ship estimates to keep it simple
  // expect to add a set of ship estimates by supplier in the future
  const dispatch = useAppDispatch();
  const [changeLoading, setChangeLoading] = useState(false);
  const [initalizeLoading, setInitializeLoading] = useState(false);
  const { order, shipEstimateResponse, shippingAddress } = useOcCurrentCart();
  const shipEstimateResponseStringified = JSON.stringify(shipEstimateResponse);
  const shippingAddressStringified = JSON.stringify(shippingAddress);
  const shippingEstimatesInitialized = useRef(false);

  // update shipping estimates if estimates have already been initialized but address changed
  useEffect(() => {
    (async function () {
      if (shippingAddressStringified && shippingEstimatesInitialized.current) {
        setInitializeLoading(true);
        await dispatch(estimateShipping(order?.ID));
        setInitializeLoading(false);
      }
    })();
  }, [dispatch, order?.ID, shippingAddressStringified, shippingEstimatesInitialized]);

  // initialize shipping estimates
  useEffect(() => {
    (async function () {
      const shipEstimateResponse = shipEstimateResponseStringified
        ? (JSON.parse(shipEstimateResponseStringified) as DShipEstimateResponse)
        : null;
      if (
        order?.ID &&
        shippingAddressStringified &&
        (!shipEstimateResponse || shipEstimateResponse.UnhandledErrorBody)
      ) {
        setInitializeLoading(true);
        await dispatch(estimateShipping(order?.ID));
        setInitializeLoading(false);
        shippingEstimatesInitialized.current = true;
      }
      if (
        shipEstimateResponse &&
        !shipEstimateResponse?.UnhandledErrorBody &&
        !shippingEstimatesInitialized.current
      ) {
        shippingEstimatesInitialized.current = true;
      }
    })();
  }, [
    dispatch,
    order?.ID,
    shippingAddressStringified,
    shipEstimateResponseStringified,
    shippingEstimatesInitialized,
  ]);

  const shipEstimate = shipEstimateResponse?.ShipEstimates?.length
    ? shipEstimateResponse.ShipEstimates[0]
    : null;

  const shipMethods = shipEstimate ? shipEstimate.ShipMethods : null;
  const selectedShipMethodId = shipEstimate?.SelectedShipMethodID;

  const handleShipMethodSelectionChange = async (selection: RequiredDeep<ShipMethodSelection>) => {
    setChangeLoading(true);
    await dispatch(selectShipMethods([selection]));
    setChangeLoading(false);
  };

  const shipMethodsList = shipMethods && shippingAddress && (
    <ShipMethodsList
      shipEstimateId={shipEstimate?.ID}
      shipMethods={shipMethods}
      selectedShipMethodId={selectedShipMethodId}
      onChange={handleShipMethodSelectionChange}
      loading={changeLoading}
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

  const panelBody = initalizeLoading ? (
    <ShipMethodsSkeleton />
  ) : (
    <div className="panel-body">
      {shipMethodsList}
      {missingShippingAddress}
      {shipEstimateError}
    </div>
  );

  return (
    <div className="panel radio-options">
      <div className="panel-header">
        <h2>Delivery Type</h2>
      </div>
      {panelBody}
    </div>
  );
};

export default PanelShippingEstimates;
