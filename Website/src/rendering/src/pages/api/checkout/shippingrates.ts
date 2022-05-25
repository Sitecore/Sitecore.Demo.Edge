import { NextApiHandler } from 'next';
import { withOcWebhookAuth } from '@ordercloud/catalyst';
import { DOrderCheckoutIntegrationEvent } from 'src/models/ordercloud/DOrderCheckoutIntegrationEvent';
import { DShipEstimateResponse } from 'src/models/ordercloud/DShipEstimateResponse';

// withOcWebhookAuth needs the raw body in order to validate the payload is coming from ordercloud
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
            Cost: 0,
            EstimatedTransitDays: 3,
            xp: {
              Description: 'Receive your order at your home in 3-5 business days',
            },
          },
          {
            ID: 'EXPRESS_DELIVERY',
            Name: 'Express Delivery',
            Cost: 4.99,
            EstimatedTransitDays: 2,
            xp: {
              Description: 'Receive your order at your home in 1-2 business days',
            },
          },
          {
            ID: 'ONEDAY_DELIVERY',
            Name: 'One day delivery',
            Cost: 9.99,
            EstimatedTransitDays: 2,
            xp: {
              Description: 'Receive your order at your home the next business day',
            },
          },
        ],
      },
    ],
  });
};

export default withOcWebhookAuth(routeHandler);
