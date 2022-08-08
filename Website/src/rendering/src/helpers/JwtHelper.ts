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
