import { NextApiHandler } from 'next';
import { DOrderCheckoutIntegrationEvent } from 'src/models/ordercloud/DOrderCheckoutIntegrationEvent';
import { DOrderCalculateResponse } from 'src/models/ordercloud/DOrderCalculateResponse';
import { withOcWebhookAuth } from '@ordercloud/catalyst';

// withOCWebhookAuth needs the raw body in order to validate the payload is coming from ordercloud
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * This endpoint will get hit when the buyer application indicates that it needs the order to be calculated
 * which it can do by calling this endpoint https://ordercloud.io/api-reference/seller/integration-events/calculate
 * it includes nearly anything about the order including the order worksheet to give you enough information to update the order
 *
 * Since this is a demo we're only using it to update tax cost but it can be used to override shipping cost or line items as well
 */
const routeHandler: NextApiHandler<DOrderCalculateResponse> = async (request, response) => {
  const event = request.body as DOrderCheckoutIntegrationEvent;
  const taxCost = Number((event.OrderWorksheet.Order.Total * 0.07).toFixed(2));

  return response.status(200).json({
    TaxTotal: taxCost,
  });
};

export default withOcWebhookAuth(routeHandler);
