import { Tokens } from 'ordercloud-javascript-sdk';
import { orderCloudScope } from '../constants/ordercloud-scope';

const AUTH0_ENABLED = process.env.NEXT_PUBLIC_AUTH0_ENABLED === 'true';
const ORDERCLOUD_BASE_API_URL = process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL;
const ORDERCLOUD_OPENID_CONNECT_ID = process.env.NEXT_PUBLIC_ORDERCLOUD_OPENID_CONNECT_ID;
const ORDERCLOUD_BUYER_CLIENT_ID = process.env.NEXT_PUBLIC_ORDERCLOUD_BUYER_CLIENT_ID;

export const isAuthenticationEnabled =
  AUTH0_ENABLED &&
  ORDERCLOUD_BASE_API_URL &&
  ORDERCLOUD_OPENID_CONNECT_ID &&
  ORDERCLOUD_BUYER_CLIENT_ID;

// build up url for openid connect so user can log into ordercloud via auth0
const roles = orderCloudScope.join(' ');
export const getLoginUrl = (redirectTo = ''): string => {
  if (redirectTo) {
    redirectTo = `&appstartpath=${encodeURIComponent(redirectTo)}`;
  }
  return `${ORDERCLOUD_BASE_API_URL}/ocrplogin?id=${ORDERCLOUD_OPENID_CONNECT_ID}&cid=${ORDERCLOUD_BUYER_CLIENT_ID}&roles=${roles}${redirectTo}`;
};
export const logoutUrl = '/api/auth/logout';

export function clearAuthenticationTokens(): void {
  Tokens.RemoveAccessToken();
  Tokens.RemoveImpersonationToken();
  Tokens.RemoveRefreshToken();
}
