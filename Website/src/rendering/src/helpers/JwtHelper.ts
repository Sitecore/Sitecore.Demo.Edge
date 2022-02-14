import { DecodedToken } from 'ordercloud-javascript-sdk';

export default function parseJwt(token: string): DecodedToken {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
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
  return decoded as DecodedToken;
}
