import { NextApiRequest } from 'next';
import { Auth, Configuration, Tokens } from 'ordercloud-javascript-sdk';
import { isTokenExpired } from 'src/helpers/OrderCloudJwtHelper';

export async function initializeOrderCloudMiddlewareClient(): Promise<void> {
  const token = Tokens.GetAccessToken();
  if (token && !isTokenExpired(token)) {
    // already initialized
    return;
  }
  Configuration.Set({
    baseApiUrl: process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL,
    clientID: process.env.ORDERCLOUD_MIDDLEWARE_CLIENT_ID,
  });
  const authResponse = await Auth.ClientCredentials(
    process.env.ORDERCLOUD_MIDDLEWARE_CLIENT_SECRET,
    process.env.ORDERCLOUD_MIDDLEWARE_CLIENT_ID,
    ['OrderAdmin', 'UnsubmittedOrderReader']
  );
  Tokens.SetAccessToken(authResponse.access_token);
  Tokens.SetRefreshToken(authResponse.refresh_token);
}

export function getUserToken(request: NextApiRequest): string {
  const authHeader = request.headers.authorization;
  return authHeader.replace('Bearer ', '');
}
