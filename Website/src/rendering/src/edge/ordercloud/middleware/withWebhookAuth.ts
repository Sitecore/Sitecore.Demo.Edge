import { createHmac } from 'crypto';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { errorResponse } from 'src/edge/ordercloud/responses';
import { readRawBody } from '../utils';

const hashKey = process.env.ORDERCLOUD_MIDDLEWARE_WEBHOOK_HASH_KEY;

/**
 Ensures requests are coming from OrderCloud API by validating that the request is hashed with our provided webhook hash key
 In order to do the validation we need access to the raw request body which nextjs does not provide so we need to take over
 body parsing and do it ourselves, this means any endpoint that uses this needs to tell nextjs not to parse the body by adding
 the following config to the api endpoint:

 export const config = {
    api: {
      bodyParser: false,
    },
  };

  context on body parsing issue: https://github.com/vercel/next.js/discussions/13405
 */
const withWebhookAuth =
  (handler: NextApiHandler) =>
  async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
    const expectedHash = request.headers['x-oc-hash'];
    if (!expectedHash) {
      return errorResponse(
        response,
        'Missing required header x-oc-hash',
        'Webhook.MissingHash',
        401
      );
    }
    const rawBody = await readRawBody(request);
    const hash = createHmac('sha256', hashKey).update(rawBody).digest('base64');
    if (hash === expectedHash) {
      return handler(request, response);
    } else {
      return errorResponse(
        response,
        'Webhook hash does not match expected',
        'Webhook.HashFailure',
        403
      );
    }
  };

export default withWebhookAuth;
