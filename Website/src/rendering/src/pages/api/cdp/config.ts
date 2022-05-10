const clientKey = process.env.NEXT_PUBLIC_CDP_CLIENT_KEY;
const apiTargetEndpoint = process.env.NEXT_PUBLIC_CDP_API_TARGET_ENDPOINT;
const apiToken = process.env.CDP_API_TOKEN;

export const config = {
  clientKey,
  apiTargetEndpoint,
  apiToken,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${clientKey}:${apiToken}`,
  },
};
