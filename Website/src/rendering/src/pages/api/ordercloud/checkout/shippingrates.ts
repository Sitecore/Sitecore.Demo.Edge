import { NextApiHandler } from 'next';
import withWebhookAuth from 'src/edge/ordercloud/middleware/withWebhookAuth';
import { DOrderCheckoutIntegrationEvent } from 'src/models/ordercloud/DOrderCheckoutIntegrationEvent';
import { DShipEstimateResponse } from 'src/models/ordercloud/DShipEstimateResponse';

// We're taking over body parsing, this is required on endpoints that use withWebhookAuth
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * This endpoint will get hit when the buyer application indicates that it needs shipping estimates
 * which it can do by calling this endpoint https://ordercloud.io/api-reference/seller/integration-events/estimate-shipping
 * it includes nearly anything about the order including the order worksheet to allow you to determine which shipping rates to return
 *
 * Since this is a demo we're keeping things simple and assuming all line items are in a single shipment and providing three static options
 */
const routeHandler: NextApiHandler<DShipEstimateResponse> = async (request, response) => {
  const event = request.body as DOrderCheckoutIntegrationEvent;

  return response.status(200).send({
    ShipEstimates: [
      {
        ID: 'STATIC_SINGLE_SHIPMENT',
        ShipEstimateItems: event.OrderWorksheet.LineItems.map((lineItem) => ({
          LineItemID: lineItem.ID,
          Quantity: lineItem.Quantity,
        })),
        ShipMethods: [
          {
            ID: 'STANDARD_DELIVERY',
            Name: 'Standard Delivery',
            Cost: 9.99,
            EstimatedTransitDays: 3,
          },
          {
            ID: 'EXPRESS_DELIVERY',
            Name: 'Express Delivery',
            Cost: 19.99,
            EstimatedTransitDays: 1,
          },
          {
            ID: 'PICKUP_FROM_SUMMIT',
            Name: 'Pick up from the Summit',
            Cost: 0,
            EstimatedTransitDays: 0,
          },
          {
            ID: 'PICKUP_IN_STORE',
            Name: 'Pick up in store',
            Cost: 0,
            EstimatedTransitDays: 0,
          },
        ],
      },
    ],
  });
};

export default withWebhookAuth(routeHandler);
