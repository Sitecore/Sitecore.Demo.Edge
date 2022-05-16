import { DecodedToken } from 'ordercloud-javascript-sdk';

export function parseJwt(token: string, type: 'body' | 'header' = 'body'): unknown {
  const base64 = token.split('.')[type === 'header' ? 0 : 1].replace(/-/g, '+').replace(/_/g, '/');
  const decoded = JSON.parse(
    decodeURIComponent(
      (typeof window !== 'undefined' ? atob(base64) : Buffer.from(base64, 'base64').toString())
        .split('')
        .map((c) => {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join('')
    )
  );
  return decoded;
}

// TODO: Move OrderCloud specific code in a OrderCloud specific file
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
