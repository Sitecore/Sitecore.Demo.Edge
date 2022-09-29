// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware

import { NextApiRequest, NextApiResponse } from 'next';

export function runNextApiMiddleware(
  request: NextApiRequest,
  response: NextApiResponse,
  fn: (
    request: NextApiRequest,
    response: NextApiResponse,
    callback: (result: unknown) => void
  ) => void
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    fn(request, response, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
