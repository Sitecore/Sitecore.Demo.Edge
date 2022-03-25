import jwt, { JwtPayload } from 'jsonwebtoken';
import jwkToPem, { JWK } from 'jwk-to-pem';
import { NextApiRequest } from 'next';
import {
  Auth,
  Certs,
  Configuration,
  DecodedToken,
  PublicKey,
  Tokens,
} from 'ordercloud-javascript-sdk';
import parseJwt from 'src/helpers/JwtHelper';
import cacheData from 'memory-cache';

export function tryDecodeToken(token: string): DecodedToken {
  if (!token) {
    return null;
  }
  try {
    return parseJwt(token);
  } catch {
    return null;
  }
}

export async function verifyTokenWithKeyId(keyId: string, token: string): Promise<boolean> {
  const cacheKey = `ordercloud_keyId_${keyId}`;
  const cachedResponse = cacheData.get(cacheKey) as boolean;
  if (cachedResponse) {
    return cachedResponse;
  } else {
    let isValid = false;
    const publicKey = await tryGetPublicKey(keyId);
    if (!publicKey) {
      return false;
    }
    const decodedToken = verifyTokenCryptographically(publicKey, token);
    if (decodedToken) {
      const currentSeconds = Date.now() / 1000;
      const currentSecondsWithBuffer = currentSeconds - 10;
      const expiresInMilliseconds = (decodedToken.exp - currentSecondsWithBuffer) * 1000;
      cacheData.put(cacheKey, true, expiresInMilliseconds);
      isValid = true;
    } else {
      const sixHoursInMilliseconds = 6 * 60 * 1000;
      cacheData.put(cacheKey, false, sixHoursInMilliseconds);
    }
    return isValid;
  }
}

async function tryGetPublicKey(keyID: string) {
  try {
    return await Certs.GetPublicKey(keyID);
  } catch {
    return null;
  }
}

function verifyTokenCryptographically(publicKey: PublicKey, token: string): JwtPayload {
  try {
    const pemString = jwkToPem(publicKey as JWK);
    return jwt.verify(token, pemString) as JwtPayload;
  } catch {
    return null;
  }
}
export async function initializeMiddlewareClient(): Promise<void> {
  const token = Tokens.GetAccessToken();
  if (token) {
    // already initialized
    return;
  }
  Configuration.Set({
    baseApiUrl: process.env.ORDERCLOUD_BASE_API_URL,
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
