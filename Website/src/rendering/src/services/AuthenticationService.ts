import { Tokens } from 'ordercloud-javascript-sdk';
import { isAnonymousToken, isTokenExpired } from '../helpers/JwtHelper';
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
export const loginUrl = `${ORDERCLOUD_BASE_API_URL}/ocrplogin?id=${ORDERCLOUD_OPENID_CONNECT_ID}&cid=${ORDERCLOUD_BUYER_CLIENT_ID}&roles=${roles}`;
export const logoutUrl = '/api/auth/logout';

export const isLoggedIn = !isAnonymous() && isAuthenticated();

function isAuthenticated(): boolean {
  try {
    const token = Tokens.GetAccessToken();
    return !isTokenExpired(token);
  } catch {
    return false;
  }
}

function isAnonymous(): boolean {
  try {
    const token = Tokens.GetAccessToken();
    return isAnonymousToken(token);
  } catch {
    return false;
  }
}

export function clearAuthenticationTokens(): void {
  Tokens.RemoveAccessToken();
  Tokens.RemoveImpersonationToken();
  Tokens.RemoveRefreshToken();
}
