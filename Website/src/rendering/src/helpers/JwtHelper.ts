import { DecodedToken } from 'ordercloud-javascript-sdk';

export interface JwtHeader {
  alg: string;
  kid: string;
  type: string;
}

export default function parseJwt(token: string): DecodedToken {
  const decoded = parse(token, 'header');
  return decoded as DecodedToken;
}

export function parseJwtBody(token: string): JwtHeader {
  const decoded = parse(token, 'body');
  return decoded as JwtHeader;
}

function parse(token: string, type: 'body' | 'header') {
  const base64 = token.split('.')[type === 'body' ? 0 : 1].replace(/-/g, '+').replace(/_/g, '/');
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
