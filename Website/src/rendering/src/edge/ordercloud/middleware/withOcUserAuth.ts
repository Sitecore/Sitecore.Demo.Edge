import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { invalidClientResponse, unauthorizedResponse } from 'src/edge/ordercloud/responses';
import { parseJwtHeader } from 'src/helpers/JwtHelper';
import { getUserToken, tryDecodeToken, verifyTokenWithKeyId } from '../utils';

/**
 * Ensures that the api request that this wraps has a valid ordercloud token from the buyer API client
 */
export default function withOcUserAuth(handler: NextApiHandler): NextApiHandler {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const token = getUserToken(request);
    if (!token) {
      return unauthorizedResponse(response);
    }
    const decodedToken = tryDecodeToken(token);
    if (!decodedToken) {
      return unauthorizedResponse(response);
    }
    if (decodedToken.cid !== process.env.NEXT_PUBLIC_ORDERCLOUD_BUYER_CLIENT_ID) {
      return invalidClientResponse(response);
    }
    const header = parseJwtHeader(token);
    if (!header || !header?.kid) {
      return unauthorizedResponse(response);
    }
    const isValidToken = verifyTokenWithKeyId(header.kid, token);
    if (!isValidToken) {
      return unauthorizedResponse(response);
    }
    return handler(request, response);
  };
}
