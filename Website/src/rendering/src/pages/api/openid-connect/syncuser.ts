import { NextApiHandler } from 'next';
import { withOcWebhookAuth } from '@ordercloud/catalyst';
import {
  Configuration,
  OpenIdConnectPayload,
  OpenIdConnectResponse,
  Users,
} from 'ordercloud-javascript-sdk';
import { parseJwt } from '../../../helpers/JwtHelper';
import { Auth0Claims } from '../../../interfaces/Auth0';
import { isOrderCloudError } from '../../../helpers/TypeGuards';
import { PROFILED_BUYER_ID } from '../../../constants/seeding';

Configuration.Set({ baseApiUrl: process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL });

// withOCWebhookAuth needs the raw body in order to validate the payload is coming from ordercloud
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Enables single sign on via ordercloud's openid connect feature: https://ordercloud.io/knowledge-base/sso-via-openid-connect
 * this endpoint gets called by the OrderCloud API whenever a user needs to get a new ordercloud token via openidconnect AFTER first login
 * it is responsible for updating user details in ordercloud when they have changed in the idp (Auth0 in our case)
 */
const routeHandler: NextApiHandler<OpenIdConnectResponse> = async (request, response) => {
  const payload = request.body as OpenIdConnectPayload;

  // the ordercloud user associated with the user in auth0
  const existingUser = payload.ExistingUser;

  // The claims (user details) from parsing auth0's ID token, claims here vary by provider
  const claims = parseJwt(payload.TokenResponse.id_token) as Auth0Claims;

  // we should sync the user if Username, Email, FirstName, or LastName have changed
  const shouldSyncUser =
    existingUser.Username !== claims.email || // claims.email is guaranteed
    existingUser.Email !== claims.email || // claims.email is guaranteed
    (existingUser.FirstName !== claims.given_name && existingUser.FirstName !== 'NOT_AVAILABLE') ||
    (existingUser.LastName !== claims.family_name && existingUser.LastName !== 'NOT_AVAILABLE');

  // if there is no reason to sync the user then simply return a success response
  if (!shouldSyncUser) {
    return response.status(200).json({
      Username: existingUser.Username,
      ErrorMessage: null,
    });
  }

  try {
    const updatedUser = await Users.Patch(
      PROFILED_BUYER_ID,
      existingUser.ID,
      {
        Username: claims.email || 'NOT_AVAILABLE',
        Email: claims.email || 'NOT_AVAILABLE',
        FirstName: claims.given_name || 'NOT_AVAILABLE',
        LastName: claims.family_name || 'NOT_AVAILABLE',
      },
      // access token has been granted elevated role BuyerUserAdmin required to patch users
      { accessToken: payload.OrderCloudAccessToken }
    );
    return response.status(200).json({
      Username: updatedUser.Username,
      ErrorMessage: null,
    });
  } catch (error) {
    let errorMessage: string;
    if (isOrderCloudError(error)) {
      errorMessage = error.isOrderCloudError ? JSON.stringify(error.errors) : error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return response.status(200).json({
      Username: null,
      ErrorMessage:
        errorMessage ||
        `Successfully logged in via auth0 but an error occured while updating the OrderCloud user. ${errorMessage}`,
    });
  }
};

export default withOcWebhookAuth(routeHandler);
