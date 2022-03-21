import { DecodedToken } from 'ordercloud-javascript-sdk';

export default function parseJwt(token: string): DecodedToken {
  const decoded = parse(token, 'body');
  return decoded as DecodedToken;
}

export function parseJwtHeader(token: string): JwtHeader {
  const decoded = parse(token, 'header');
  return decoded as JwtHeader;
}

function parse(token: string, type: 'body' | 'header') {
  const base64 = token.split('.')[type === 'body' ? 0 : 1].replace(/-/g, '+').replace(/_/g, '/');
  const decoded = JSON.parse(
    decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join('')
    )
  );
  return decoded;
}

export interface JwtHeader {
  alg: string;
  kid: string;
  type: string;
}
