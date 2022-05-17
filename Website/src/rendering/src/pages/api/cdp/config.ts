const clientKey = process.env.NEXT_PUBLIC_CDP_CLIENT_KEY;
const apiTargetEndpoint = process.env.CDP_AUTHENTICATED_API_TARGET_ENDPOINT;
const apiToken = process.env.CDP_API_TOKEN;

export const config = {
  clientKey,
  apiTargetEndpoint,
  apiToken,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(`${clientKey}:${apiToken}`).toString('base64')}`,
  },
};
