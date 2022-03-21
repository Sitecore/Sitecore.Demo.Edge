import { NextApiResponse } from 'next';

export function unauthorizedResponse(response: NextApiResponse): void {
  return errorResponse(
    response,
    'Access token is invalid or expired.',
    'Authorization.InvalidToken',
    401
  );
}

export function invalidClientResponse(response: NextApiResponse): void {
  return errorResponse(response, 'Invalid Client', 'Authorization.InvalidClient', 403);
}

export function errorResponse(
  response: NextApiResponse,
  message: string,
  errorCode: string,
  status = 400,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  data?: any
): void {
  // match response body that ordercloud uses
  const body = JSON.stringify({
    Errors: [
      {
        ErrorCode: errorCode,
        Message: message,
        Data: data || null,
      },
    ],
  });
  response.status(status).json(body);
}
