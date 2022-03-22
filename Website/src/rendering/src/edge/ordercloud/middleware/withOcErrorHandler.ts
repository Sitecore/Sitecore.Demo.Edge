import { catalystGlobalErrorHandler } from '@ordercloud/catalyst';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export default function withOcErrorHandler(handler: NextApiHandler): NextApiHandler {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    try {
      return handler(request, response);
    } catch (err) {
      catalystGlobalErrorHandler(err, response);
    }
  };
}
