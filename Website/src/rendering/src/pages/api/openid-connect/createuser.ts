import { NextApiHandler } from 'next';
import { withOcWebhookAuth } from '@ordercloud/catalyst';
import { OpenIdConnectPayload, OpenIdConnectResponse, Users } from 'ordercloud-javascript-sdk';
import { parseJwt } from '../../../helpers/JwtHelper';
import { isOrderCloudError } from '../../../helpers/TypeGuards';
import { Auth0Claims } from '../../../interfaces/Auth0';

// withOCWebhookAuth needs the raw body in order to validate the payload is coming from ordercloud
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Enables single sign on via ordercloud's openid connect feature: https://ordercloud.io/knowledge-base/sso-via-openid-connect
 * This endpoint will be called after a user has successfully logged in via their IDP (Auth0 in our case) but before they are redirected to the application
 * It is responsible for associating a user from the idp with a user from ordercloud and expects a username be returned
 */
const routeHandler: NextApiHandler<OpenIdConnectResponse> = async (request, response) => {
  const payload = request.body as OpenIdConnectPayload;

  try {
    // The claims (user details) from parsing auth0's ID token, claims here vary by provider
    const claims = parseJwt(payload.TokenResponse.id_token) as Auth0Claims;

    // create a new user in ordercloud on the fly to call out to associate with the incoming idp identity
    const newUser = await Users.Create(
      process.env.ORDERCLOUD_PROFILED_BUYER_ID,
      {
        Username: claims.email, // claims.email is guaranteed
        Email: claims.email, // claims.email is guaranteed
        FirstName: claims.given_name || 'NOT_AVAILABLE',
        LastName: claims.family_name || 'NOT_AVAILABLE',
        Active: true,
      },
      // access token has been granted elevated role BuyerUserAdmin required to create users
      { accessToken: payload.OrderCloudAccessToken }
    );
    return response.status(200).json({
      Username: newUser.Username,
      ErrorMessage: '',
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
      ErrorMessage: `Successfully logged in via auth0 but an error occured while creating the OrderCloud user. ${errorMessage}`,
    });
  }
};

export default withOcWebhookAuth(routeHandler);