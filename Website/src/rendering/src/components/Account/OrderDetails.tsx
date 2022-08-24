import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  BuyerCreditCard,
  IntegrationEvents,
  OrderWorksheet,
  Payments,
  ShipMethod,
} from 'ordercloud-javascript-sdk';
import OrderDetailsContent from './OrderDetailsContent';

const OrderDetails = (): JSX.Element => {
  const [order, setOrder] = useState<OrderWorksheet>(undefined);
  const [shipMethod, setShipMethod] = useState<ShipMethod>(undefined);
  const [creditCard, setCreditCard] = useState<BuyerCreditCard>(undefined);
  const router = useRouter();

  const orderId = router?.query?.order?.length > 0 ? router.query.order : undefined;

  useEffect(() => {
    const getOrder = async () => {
      const orderPromise = IntegrationEvents.GetWorksheet<OrderWorksheet>(
        'All',
        orderId.toString()
      );
      const paymentPromise = Payments.List('All', orderId.toString());

      const [fetchedOrder, fetchedPayment] = await Promise.all([orderPromise, paymentPromise]);

      if (fetchedPayment?.Items?.length > 0) {
        setCreditCard(fetchedPayment.Items[0].xp.CreditCard);
      }

      if (fetchedOrder) {
        setOrder(fetchedOrder);
      }

      if (fetchedOrder?.ShipEstimateResponse?.ShipEstimates?.length > 0) {
        const shipMethods = fetchedOrder.ShipEstimateResponse.ShipEstimates[0]?.ShipMethods;
        const selectedShipMethodID =
          fetchedOrder.ShipEstimateResponse.ShipEstimates[0].SelectedShipMethodID;
        const selectedShipMethod = shipMethods.find((method) => method.ID == selectedShipMethodID);

        if (selectedShipMethod) {
          setShipMethod(selectedShipMethod);
        }
      }
    };

    if (orderId != undefined) {
      getOrder();
    }
  }, [orderId]);

  const orderDetailsContent =
    order && shipMethod && creditCard ? (
      <OrderDetailsContent order={order} shipMethod={shipMethod} creditCard={creditCard} />
    ) : null;

  return orderDetailsContent;
};

export default OrderDetails;
