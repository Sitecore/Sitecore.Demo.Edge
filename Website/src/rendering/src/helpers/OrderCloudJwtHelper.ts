import { DecodedToken } from 'ordercloud-javascript-sdk';
import { parseJwt } from './JwtHelper';

export function parseOrderCloudJwt(token: string): DecodedToken {
  return parseJwt(token) as DecodedToken;
}

export function isTokenExpired(token: string): boolean {
  try {
    if (!token) {
      return true;
    }
    const decoded = parseOrderCloudJwt(token);
    const currentSeconds = Date.now() / 1000;
    const currentSecondsWithBuffer = currentSeconds - 10;
    return decoded.exp < currentSecondsWithBuffer;
  } catch {
    return true;
  }
}

export function isAnonymousToken(token: string): boolean {
  try {
    if (!token) {
      return true;
    }
    const decoded = parseOrderCloudJwt(token);
    return Boolean(decoded.orderid);
  } catch {
    return true;
  }
}
